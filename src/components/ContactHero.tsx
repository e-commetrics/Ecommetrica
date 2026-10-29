"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { useContactPrefill } from "@/components/ContactPrefillProvider";
import { smoothScrollTo } from "@/components/SmoothScroll";

const EASE = [0.22, 1, 0.36, 1] as const;
const LOGO_SRC = "/Logos/Ecommetrica%20consultoria%20tecnologica%20y%20desarrollo%20web.png";
const GLYPHS = "!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const MORPH_MS = 3800;

/** Characters cycle through random glyphs and settle left to right. */
function scramble(el: HTMLElement, text: string, duration: number) {
  const t0 = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    const settled = Math.floor(p * text.length);
    let out = text.slice(0, settled);
    for (let i = settled; i < text.length; i++) out += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    el.textContent = out;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

type Particle = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; white: boolean };

/**
 * Contact hero — "partículas de marca": thousands of particles assemble the Ecommetrica
 * logo, then the contact words in turn; the cursor scatters them. HUD corners carry the
 * Tijuana coordinates and local time; the headline decodes on load and on hover.
 * Dark in every theme. Reduced motion: particles start on the logo and stay still.
 */
export default function ContactHero() {
  const { t } = useLanguage();
  const h = t.contactHero;
  const { packageSummary } = useContactPrefill();
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [clock, setClock] = useState("");
  const lines = [h.line1, h.line2, h.accent];

  // Live Tijuana time for the HUD.
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("es-MX", { timeZone: "America/Tijuana", hour12: false }));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Headline decode on arrival.
  useEffect(() => {
    if (reducedMotion) return;
    const timers = lineRefs.current.map((el, i) =>
      el ? window.setTimeout(() => scramble(el, lines[i], 1000 + i * 150), 300 + i * 220) : 0,
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [h.line1, h.line2, h.accent, reducedMotion]);

  // Particle field.
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !ctx) return;
    let stopped = false;
    let frame = 0;
    const timers: number[] = [];
    let mx = -9999;
    let my = -9999;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => { mx = my = -9999; };

    (async () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const wide = W >= 900;
      const region = wide ? { x: W * 0.42, y: H * 0.14, w: W * 0.54, h: H * 0.52 } : { x: W * 0.05, y: 130, w: W * 0.9, h: H * 0.28 };
      const N = wide ? 3200 : 2000;
      const fontFamily = getComputedStyle(document.documentElement).getPropertyValue("--font-clash").trim() || "sans-serif";
      await document.fonts.load(`600 100px ${fontFamily}`).catch(() => undefined);
      const logo = new Image();
      logo.src = LOGO_SRC;
      await logo.decode().catch(() => undefined);
      if (stopped) return;

      // Sample a shape (logo or word) into points inside the region.
      const sample = (shape: { img?: HTMLImageElement; text?: string }) => {
        const oc = document.createElement("canvas");
        oc.width = Math.max(1, Math.round(region.w));
        oc.height = Math.max(1, Math.round(region.h));
        const o = oc.getContext("2d", { willReadFrequently: true });
        if (!o) return [];
        if (shape.img) {
          if (!shape.img.naturalWidth) return [];
          const s = Math.min((oc.width * 0.96) / shape.img.naturalWidth, (oc.height * 0.7) / shape.img.naturalHeight);
          const w = shape.img.naturalWidth * s;
          const hh = shape.img.naturalHeight * s;
          o.drawImage(shape.img, (oc.width - w) / 2, (oc.height - hh) / 2, w, hh);
        } else if (shape.text) {
          let fs = oc.height * 0.62;
          o.font = `600 ${fs}px ${fontFamily}`;
          while (o.measureText(shape.text).width > oc.width * 0.96 && fs > 10) { fs *= 0.92; o.font = `600 ${fs}px ${fontFamily}`; }
          o.fillStyle = "#fff";
          o.textAlign = "center";
          o.textBaseline = "middle";
          o.fillText(shape.text, oc.width / 2, oc.height / 2);
        }
        const d = o.getImageData(0, 0, oc.width, oc.height).data;
        const pts: [number, number][] = [];
        for (let y = 0; y < oc.height; y += 3) for (let x = 0; x < oc.width; x += 3) if (d[(y * oc.width + x) * 4 + 3] > 128) pts.push([region.x + x, region.y + y]);
        for (let i = pts.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [pts[i], pts[j]] = [pts[j], pts[i]]; }
        return pts;
      };
      const shapes = [{ img: logo }, ...h.words.map((text) => ({ text }))].map(sample).filter((p) => p.length);
      if (!shapes.length) return;
      const P: Particle[] = Array.from({ length: N }, (_, i) => ({ x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, tx: 0, ty: 0, white: i % 5 === 0 }));
      const assign = (pts: [number, number][]) =>
        P.forEach((p, i) => { const q = pts[i % pts.length]; p.tx = q[0] + (Math.random() - 0.5) * 1.2; p.ty = q[1] + (Math.random() - 0.5) * 1.2; });
      let shapeIdx = 0;
      assign(shapes[0]);
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-ecom-orange").trim() || "#e84a34";
      const size = wide ? 2 : 1.6;
      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = accent;
        for (const p of P) if (!p.white) ctx.fillRect(p.x, p.y, size, size);
        ctx.fillStyle = "rgba(255,255,255,.85)";
        for (const p of P) if (p.white) ctx.fillRect(p.x, p.y, size, size);
      };

      if (reducedMotion) {
        P.forEach((p) => { p.x = p.tx; p.y = p.ty; });
        draw();
        return;
      }

      timers.push(window.setInterval(() => {
        shapeIdx = (shapeIdx + 1) % shapes.length;
        assign(shapes[shapeIdx]);
        P.forEach((p) => { p.vx += (Math.random() - 0.5) * 16; p.vy += (Math.random() - 0.5) * 16; });
      }, MORPH_MS));
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);

      const R = wide ? 110 : 70;
      const R2 = R * R;
      const loop = () => {
        if (stopped) return;
        for (const p of P) {
          p.vx += (p.tx - p.x) * 0.012;
          p.vy += (p.ty - p.y) * 0.012;
          const dx = p.x - mx;
          const dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) { const d = Math.sqrt(d2) || 1; const f = (1 - d / R) * 5.5; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
          p.vx *= 0.86; p.vy *= 0.86; p.x += p.vx; p.y += p.vy;
        }
        draw();
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    })();

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      timers.forEach((id) => window.clearInterval(id));
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [h.words, reducedMotion]);

  const toForm = (event: React.MouseEvent) => {
    event.preventDefault();
    smoothScrollTo("#contact-form");
  };

  return (
    <section ref={sectionRef} className="relative min-h-hero overflow-clip bg-ecom-black text-white">
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      {/* HUD corners (decorative). */}
      <div aria-hidden className="absolute top-24 left-5 z-10 font-mono text-[0.7rem] leading-relaxed tracking-[0.12em] text-white/50 uppercase sm:left-8 lg:left-12">
        Ecommetrica / Studio
        <br />
        <span className="text-ecom-orange">32.5149° N · 117.0382° W</span>
      </div>
      <div aria-hidden className="absolute top-24 right-5 z-10 hidden text-right font-mono text-[0.7rem] leading-relaxed tracking-[0.12em] text-white/50 uppercase sm:right-8 min-[900px]:block lg:right-12">
        <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#3ddc84] align-middle shadow-[0_0_10px_#3ddc84]" />
        {h.status}
        <br />
        TIJ {clock}
      </div>
      <div aria-hidden className="absolute right-5 bottom-7 z-10 hidden text-right font-mono text-[0.7rem] tracking-[0.12em] text-white/45 uppercase sm:right-8 lg:right-12 [@media(hover:hover)]:min-[900px]:block">
        {h.hint}
      </div>

      <div className="pointer-events-none relative z-10 shell flex min-h-hero flex-col justify-end pt-32 pb-12 lg:pb-14">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow-dark uppercase"
        >
          {t.contactPage.eyebrow}
        </motion.p>
        <h1
          aria-label={lines.join(" ")}
          className="pointer-events-auto mt-5 max-w-[15ch] font-display text-[clamp(2.6rem,5.4vw,6rem)] leading-[0.95] font-medium tracking-[-0.035em]"
        >
          {lines.map((line, i) => (
            <span
              key={i}
              aria-hidden
              ref={(el) => { lineRefs.current[i] = el; }}
              onPointerEnter={(e) => !reducedMotion && scramble(e.currentTarget, line, 700)}
              className={`block whitespace-pre ${i === lines.length - 1 ? "text-ecom-orange" : ""}`}
            >
              {reducedMotion ? line : " "}
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="mt-5 max-w-xl text-lg leading-relaxed text-white/65"
        >
          {t.contactPage.sub}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="pointer-events-auto mt-7 flex flex-wrap items-center gap-6"
        >
          <a
            href="#contact-form"
            onClick={toForm}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 btn-text text-ecom-on-accent uppercase tracking-wide transition-colors duration-300 hover:bg-white hover:text-ecom-black"
          >
            {packageSummary ? t.contactPage.scrollToFormCta : h.cta}
            <motion.span
              aria-hidden
              animate={reducedMotion ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              &darr;
            </motion.span>
          </a>
        </motion.div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-ecom-surface" />
    </section>
  );
}
