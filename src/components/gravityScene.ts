import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

/**
 * The home hero scene (GravityHero): glossy brand rings that gravitate to a shared center,
 * collide, get shoved by the cursor and scatter on click, bouncing off the screen edges;
 * all seen through a water layer. Imported dynamically by GravityHero, so three.js stays
 * out of the initial bundle.
 *
 * Two layers, two water strengths: the painted headline + grid get the full ripple
 * (bend + RGB split); the rings get a softer one so their gloss stays clean.
 */
export type GravitySceneOptions = {
  section: HTMLElement;
  canvas: HTMLCanvasElement;
  /** The HTML h1; its box decides where the painted headline goes. */
  headline: HTMLElement;
  blob: HTMLElement | null;
  /** Headline lines; the last one is painted in the accent color. */
  lines: [string, string, string];
  reducedMotion: boolean;
  onReady: () => void;
};

const GW = 200; // water grid
const GH = 112;
const CAMERA_Z = 22;
const FOV = 35;

const RIPPLE_VERTEX = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }";
const RIPPLE_FRAGMENT = `
  uniform sampler2D tDiffuse; uniform sampler2D tBg; uniform sampler2D tH; uniform vec2 px; varying vec2 vUv;
  void main(){
    float l = texture2D(tH, vUv - vec2(px.x, 0.)).r, r = texture2D(tH, vUv + vec2(px.x, 0.)).r;
    float d = texture2D(tH, vUv - vec2(0., px.y)).r, u = texture2D(tH, vUv + vec2(0., px.y)).r;
    vec2 g = vec2(r - l, u - d);
    vec2 ob = g * .09;
    vec3 bg = vec3(texture2D(tBg, vUv + ob).r, texture2D(tBg, vUv + ob * 1.4).g, texture2D(tBg, vUv + ob * 1.8).b);
    vec2 orr = g * .05;
    vec4 ring = texture2D(tDiffuse, vUv + orr);
    vec3 rc = vec3(ring.r, texture2D(tDiffuse, vUv + orr * 1.15).g, texture2D(tDiffuse, vUv + orr * 1.3).b);
    float s = pow(clamp(dot(normalize(vec3(-g * 7., 1.)), normalize(vec3(-.5, .6, 1.))), 0., 1.), 30.);
    gl_FragColor = vec4(mix(bg + s * .22, rc + s * .1, clamp(ring.a, 0., 1.)), 1.);
  }`;

type Ring = { m: THREE.Mesh; v: THREE.Vector3; w: THREE.Vector3; r: number; inside: boolean; hit: boolean };

export function mountGravityScene(o: GravitySceneOptions): () => void {
  const { section, canvas, headline, blob, lines, reducedMotion } = o;
  const css = () => getComputedStyle(document.documentElement);
  const fontFamily = css().getPropertyValue("--font-clash").trim() || "sans-serif";

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  let W = canvas.clientWidth;
  let H = canvas.clientHeight;
  renderer.setPixelRatio(dpr);
  renderer.setSize(W, H, false);
  renderer.toneMapping = THREE.NoToneMapping; // keep the brand orange exact
  renderer.setClearColor(0x000000, 0); // the rings layer renders over transparency

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, W / H, 0.1, 100);
  camera.position.set(0, 0, CAMERA_Z);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const key = new THREE.DirectionalLight(0xffd8cc, 1.5);
  key.position.set(-6, 8, 10);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xe84a34, 2.4);
  rim.position.set(8, -4, -6);
  scene.add(rim);

  // ---- Headline + grid, painted, composited under the rings in the ripple pass ----
  const wide = () => W >= 900;
  const headlineBox = () => {
    const r = headline.getBoundingClientRect();
    const s = section.getBoundingClientRect();
    return { x: r.left - s.left, top: r.top - s.top, height: r.height, fs: parseFloat(getComputedStyle(headline).fontSize) || 64 };
  };
  const bgCanvas = document.createElement("canvas");
  const bgTex = new THREE.CanvasTexture(bgCanvas);
  bgTex.colorSpace = THREE.SRGBColorSpace;
  const paintBg = () => {
    const black = css().getPropertyValue("--color-ecom-black").trim() || "#121213";
    const accent = css().getPropertyValue("--color-ecom-orange").trim() || "#e84a34";
    bgCanvas.width = Math.round(W * dpr);
    bgCanvas.height = Math.round(H * dpr);
    const c = bgCanvas.getContext("2d");
    if (!c) return;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = black;
    c.fillRect(0, 0, W, H);
    c.strokeStyle = "rgba(255,255,255,.055)";
    c.lineWidth = 1;
    const step = wide() ? 80 : 56;
    for (let x = step; x < W; x += step) { c.beginPath(); c.moveTo(x + 0.5, 0); c.lineTo(x + 0.5, H); c.stroke(); }
    for (let y = step; y < H; y += step) { c.beginPath(); c.moveTo(0, y + 0.5); c.lineTo(W, y + 0.5); c.stroke(); }
    // Painted exactly over the HTML h1 (same box, size, tracking and line height), so the
    // page layout keeps room for it and the crossfade doesn't jump.
    const box = headlineBox();
    c.font = `500 ${box.fs}px ${fontFamily}`;
    if ("letterSpacing" in c) (c as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${-box.fs * 0.035}px`;
    const m = c.measureText(lines[0]);
    const ascent = m.fontBoundingBoxAscent || box.fs * 0.95;
    const descent = m.fontBoundingBoxDescent || box.fs * 0.25;
    const lh = box.fs * 0.9;
    let y = box.top + (lh - ascent - descent) / 2 + ascent;
    lines.forEach((text, i) => {
      c.fillStyle = i === lines.length - 1 ? accent : "#ffffff";
      c.fillText(text, box.x, y);
      y += lh;
    });
    bgTex.needsUpdate = true;
  };
  paintBg();

  // ---- Where the rings gravitate: right of the headline on desktop, below it on phones ----
  const worldH = () => 2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_Z;
  const worldW = () => (worldH() * W) / H;
  const center = new THREE.Vector3();
  const setCenter = () => (wide() ? center.set(worldW() * 0.2, 0, 0) : center.set(0, -worldH() * 0.12, 0));
  setCenter();

  const geo = new THREE.TorusGeometry(0.8, 0.28, 32, 96);
  const mats = [
    new THREE.MeshPhysicalMaterial({ roughness: 0.22, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.1 }),
    new THREE.MeshPhysicalMaterial({ roughness: 0.28, metalness: 0.35, clearcoat: 1, clearcoatRoughness: 0.15 }),
    new THREE.MeshPhysicalMaterial({ color: 0xf2ede9, roughness: 0.35, metalness: 0, clearcoat: 0.6 }),
  ];
  const tintRings = () => {
    const hero = css().getPropertyValue("--color-ecom-hero").trim() || "#e84a34";
    mats[0].color.set(hero);
    mats[1].color.set(css().getPropertyValue("--color-ecom-dark").trim() || "#1c1c1f");
    rim.color.set(hero);
  };
  tintRings();
  const count = wide() ? 22 : 12;
  const sizeScale = wide() ? 1 : 0.85;
  const rings: Ring[] = [];
  for (let i = 0; i < count; i++) {
    const s = (0.6 + Math.random() * 0.45) * sizeScale;
    const k = i % 10;
    const m = new THREE.Mesh(geo, mats[k < 5 ? 0 : k < 8 ? 1 : 2]);
    m.scale.setScalar(s);
    m.rotation.set(Math.random() * 6.28, Math.random() * 6.28, 0);
    const a = Math.random() * Math.PI * 2;
    const d = 11 + Math.random() * 8;
    m.position.set(center.x + Math.cos(a) * d, center.y + Math.sin(a) * d, (Math.random() - 0.5) * 4);
    scene.add(m);
    rings.push({ m, v: new THREE.Vector3(), w: new THREE.Vector3().randomDirection().multiplyScalar(0.6), r: 1.08 * s, inside: false, hit: false });
  }

  // ---- Water: wave-equation height field + ripple post-process ----
  const msaa = new THREE.WebGLRenderTarget(W * dpr, H * dpr, { type: THREE.HalfFloatType, samples: 4 });
  const composer = new EffectComposer(renderer, msaa);
  composer.setPixelRatio(dpr);
  composer.setSize(W, H);
  composer.addPass(new RenderPass(scene, camera));
  let cur = new Float32Array(GW * GH);
  let prev = new Float32Array(GW * GH);
  const bytes = new Uint8Array(GW * GH).fill(128);
  const hTex = new THREE.DataTexture(bytes, GW, GH, THREE.RedFormat, THREE.UnsignedByteType);
  hTex.magFilter = THREE.LinearFilter;
  hTex.minFilter = THREE.LinearFilter;
  hTex.needsUpdate = true;
  const ripple = new ShaderPass({
    uniforms: { tDiffuse: { value: null }, tBg: { value: null }, tH: { value: null }, px: { value: new THREE.Vector2(1 / GW, 1 / GH) } },
    vertexShader: RIPPLE_VERTEX,
    fragmentShader: RIPPLE_FRAGMENT,
  });
  // ShaderPass clones its uniforms; the live textures must be the originals.
  ripple.uniforms.tBg.value = bgTex;
  ripple.uniforms.tH.value = hTex;
  composer.addPass(ripple);
  composer.addPass(new OutputPass());

  /** x, y in CSS px from the top-left; height rows run bottom-up. */
  const drop = (x: number, y: number, strength: number) => {
    const gx = Math.round((x / W) * (GW - 1));
    const gy = Math.round((1 - y / H) * (GH - 1));
    for (let j = -2; j <= 2; j++) {
      for (let i = -2; i <= 2; i++) {
        const X = gx + i;
        const Y = gy + j;
        if (X < 1 || Y < 1 || X >= GW - 1 || Y >= GH - 1) continue;
        const f = 1 - Math.hypot(i, j) / 3;
        if (f > 0) cur[Y * GW + X] += strength * f;
      }
    }
  };
  const simulateWater = () => {
    for (let y = 1; y < GH - 1; y++) {
      for (let x = 1; x < GW - 1; x++) {
        const i = y * GW + x;
        prev[i] = ((cur[i - 1] + cur[i + 1] + cur[i - GW] + cur[i + GW]) * 0.5 - prev[i]) * 0.975;
      }
    }
    const swap = prev;
    prev = cur;
    cur = swap;
    for (let i = 0; i < cur.length; i++) {
      const v = 128 + cur[i] * 38;
      bytes[i] = v < 0 ? 0 : v > 255 ? 255 : v;
    }
    hTex.needsUpdate = true;
  };

  // ---- Pointer: a solid, invisible sphere on the z = 0 plane ----
  const ndc = new THREE.Vector2();
  const ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mouse = new THREE.Vector3(999, 999, 0);
  const mousePrev = mouse.clone();
  const mouseVel = new THREE.Vector3();
  let mouseActive = false;
  let lx: number | null = null;
  let ly: number | null = null;
  let lastMove = 0;
  const onMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (blob) { blob.style.left = `${x}px`; blob.style.top = `${y}px`; }
    ndc.set((x / W) * 2 - 1, -(y / H) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    if (ray.ray.intersectPlane(plane, mouse)) {
      if (!mouseActive) mousePrev.copy(mouse);
      mouseActive = true;
    }
    if (lx !== null && ly !== null) {
      const n = Math.min(12, Math.ceil(Math.hypot(x - lx, y - ly) / 10));
      for (let k = 1; k <= n; k++) drop(lx + ((x - lx) * k) / n, ly + ((y - ly) * k) / n, 0.9);
    }
    lx = x;
    ly = y;
    lastMove = performance.now();
  };
  const onLeave = () => {
    mouseActive = false;
    lx = ly = null;
    if (blob) blob.style.left = "-100px";
  };

  // ---- Physics ----
  const tmp = new THREE.Vector3();
  const n = new THREE.Vector3();
  const kick = (r: Ring, imp: number) => {
    r.w.x += (Math.random() - 0.5) * imp * 1.1;
    r.w.y += (Math.random() - 0.5) * imp * 1.1;
    r.w.z += (Math.random() - 0.5) * imp * 1.1;
  };
  // Click = slow, wide dispersion: a fading outward current while gravity relaxes.
  let gravity = 1;
  let spread = 0;
  const disperse = () => {
    gravity = 0;
    spread = 10;
    rings.forEach((r) => {
      tmp.copy(r.m.position).sub(center).normalize();
      r.v.addScaledVector(tmp, 2.5 + Math.random() * 1.5);
      kick(r, 2);
    });
  };
  const onClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    disperse();
    const rect = canvas.getBoundingClientRect();
    drop(e.clientX - rect.left, e.clientY - rect.top, 7);
  };

  const MOUSE_R = 1.7;
  let simTime = 0;
  const step = (dt: number) => {
    simTime += dt;
    gravity += (1 - gravity) * Math.min(1, dt * 0.35);
    spread *= Math.exp(-0.35 * dt);
    for (const r of rings) {
      tmp.copy(center).sub(r.m.position);
      const dist = tmp.length() || 1;
      r.v.addScaledVector(tmp, ((Math.min(dist, 8) * 1.6 * gravity) / dist) * dt);
      if (spread > 0.05) r.v.addScaledVector(tmp, (-spread / dist) * dt);
      r.v.z -= r.m.position.z * 2.5 * dt;
      // Liquid: slow swirling current + buoyant bob, then viscous drag.
      const p = r.m.position;
      r.v.x += Math.sin(p.y * 0.45 + simTime * 0.6 + r.r * 3) * 0.55 * dt;
      r.v.y += Math.cos(p.x * 0.4 + simTime * 0.5 + r.r * 5) * 0.55 * dt + Math.sin(simTime * 1.1 + r.r * 9) * 0.25 * dt;
      r.v.multiplyScalar(Math.exp(-2.3 * dt));
    }
    for (let it = 0; it < 2; it++) {
      for (let i = 0; i < rings.length; i++) {
        for (let j = i + 1; j < rings.length; j++) {
          const a = rings[i];
          const b = rings[j];
          n.copy(a.m.position).sub(b.m.position);
          const d = n.length();
          const min = a.r + b.r;
          if (d < min && d > 1e-4) {
            n.divideScalar(d);
            const ov = (min - d) / 2;
            a.m.position.addScaledVector(n, ov);
            b.m.position.addScaledVector(n, -ov);
            const vn = tmp.copy(a.v).sub(b.v).dot(n);
            if (vn < 0) {
              const imp = (-1.3 * vn) / 2;
              a.v.addScaledVector(n, imp);
              b.v.addScaledVector(n, -imp);
              kick(a, imp);
              kick(b, imp);
            }
          }
        }
      }
    }
    if (mouseActive) {
      for (const r of rings) {
        n.copy(r.m.position).sub(mouse);
        n.z *= 0.3;
        const d = n.length();
        const min = r.r + MOUSE_R;
        if (d < min && d > 1e-4) {
          n.divideScalar(d);
          r.m.position.addScaledVector(n, min - d);
          const vn = r.v.dot(n) - mouseVel.dot(n);
          if (vn < 0) { r.v.addScaledVector(n, -vn * 1.1); kick(r, -vn * 0.4); }
        }
      }
    }
    // Screen edges are walls once a ring has entered the view.
    const hw = worldW() / 2;
    const hh = worldH() / 2;
    for (const r of rings) {
      const p = r.m.position;
      const limX = hw - r.r;
      const limY = hh - r.r;
      if (!r.inside) {
        if (Math.abs(p.x) < limX && Math.abs(p.y) < limY) r.inside = true;
        continue;
      }
      if (p.x > limX) { p.x = limX; r.v.x = -Math.abs(r.v.x) * 0.75; kick(r, 0.6); r.hit = true; }
      if (p.x < -limX) { p.x = -limX; r.v.x = Math.abs(r.v.x) * 0.75; kick(r, 0.6); r.hit = true; }
      if (p.y > limY) { p.y = limY; r.v.y = -Math.abs(r.v.y) * 0.75; kick(r, 0.6); r.hit = true; }
      if (p.y < -limY) { p.y = -limY; r.v.y = Math.abs(r.v.y) * 0.75; kick(r, 0.6); r.hit = true; }
    }
    for (const r of rings) {
      r.m.position.addScaledVector(r.v, dt);
      r.m.rotation.x += r.w.x * dt;
      r.m.rotation.y += r.w.y * dt;
      r.m.rotation.z += r.w.z * dt;
      r.w.multiplyScalar(Math.exp(-1.1 * dt));
    }
  };

  // Wakes: moving rings disturb the water (a stronger splash when one hits a wall).
  const screen = new THREE.Vector3();
  let wakeTick = 0;
  const wakes = () => {
    if (++wakeTick % 3) return;
    for (const r of rings) {
      const speed = r.v.length();
      if (speed < 0.6 && !r.hit) continue;
      screen.copy(r.m.position).project(camera);
      drop((screen.x * 0.5 + 0.5) * W, (-screen.y * 0.5 + 0.5) * H, r.hit ? 2.2 : Math.min(0.9, speed * 0.12));
      r.hit = false;
    }
  };

  // ---- Resize, theme changes ----
  const resize = new ResizeObserver(() => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h || (w === W && h === H)) return;
    W = w;
    H = h;
    renderer.setSize(W, H, false);
    composer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    setCenter();
    paintBg();
    if (reducedMotion) composer.render();
  });
  resize.observe(canvas);
  // ThemeSwitcher repoints the color tokens on <html>'s inline style: repaint the backdrop and rings.
  const themeWatch = new MutationObserver(() => {
    paintBg();
    tintRings();
    if (reducedMotion) composer.render();
  });
  themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });

  // ---- Frame loop ----
  const timers: number[] = [];
  let frame = 0;
  let stopped = false;
  let last = performance.now();
  const loop = (now: number) => {
    if (stopped) return;
    const dt = Math.min(0.033, (now - last) / 1000) || 0.016;
    last = now;
    mouseVel.copy(mouse).sub(mousePrev).divideScalar(dt);
    mousePrev.copy(mouse);
    if (!mouseActive) mouseVel.set(0, 0, 0);
    step(dt);
    wakes();
    simulateWater();
    composer.render();
    frame = requestAnimationFrame(loop);
  };
  const start = () => {
    if (!frame && !stopped) { last = performance.now(); frame = requestAnimationFrame(loop); }
  };
  const pause = () => { cancelAnimationFrame(frame); frame = 0; };
  // Runs from mount; pauses only once the observer reports the hero off screen.
  const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : pause()));

  const cleanup = () => {
    stopped = true;
    cancelAnimationFrame(frame);
    timers.forEach((id) => clearTimeout(id));
    resize.disconnect();
    themeWatch.disconnect();
    io.disconnect();
    section.removeEventListener("pointermove", onMove);
    section.removeEventListener("pointerleave", onLeave);
    section.removeEventListener("click", onClick);
    geo.dispose();
    mats.forEach((m) => m.dispose());
    pmrem.dispose();
    bgTex.dispose();
    hTex.dispose();
    msaa.dispose();
    composer.dispose();
    renderer.dispose();
  };

  if (reducedMotion) {
    // One still frame of the settled pile; no motion, no water.
    for (let i = 0; i < 300; i++) step(1 / 60);
    composer.render();
    o.onReady();
    return cleanup;
  }

  section.addEventListener("pointermove", onMove);
  section.addEventListener("pointerleave", onLeave);
  section.addEventListener("click", onClick);

  // Idle drops, plus one wave across the headline on arrival.
  const rain = window.setInterval(() => {
    if (performance.now() - lastMove > 1500) drop(Math.random() * W, Math.random() * H, 2.6);
  }, 750);
  const arrival = headlineBox();
  const waveY = arrival.top + arrival.height / 2;
  for (let k = 0; k <= 48; k++) {
    timers.push(window.setTimeout(() => drop((W * k) / 48, waveY + Math.sin(k * 0.5) * arrival.height * 0.18, 2.4), 300 + k * 22));
  }

  io.observe(canvas);
  start();
  // First frame drawn: tell the component to crossfade from its HTML headline.
  requestAnimationFrame(() => requestAnimationFrame(() => !stopped && o.onReady()));

  return () => {
    window.clearInterval(rain);
    cleanup();
  };
}
