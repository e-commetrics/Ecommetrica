"use client";

import { useEffect, useRef } from "react";

const RINGS = 9;
const PARTICLES = 70;

/**
 * The brand rings as a 3D tunnel on a canvas (home hero): rings fly toward the viewer
 * in a loop, tilt with the pointer, and carry small orbiting particles. Decorative only.
 *
 * - Pauses its frame loop while off screen (browsers already pause it in hidden tabs).
 * - With prefers-reduced-motion it draws one still frame.
 * - On touch devices (no hover) the tilt drifts on its own instead of following a pointer.
 * The color is read every frame from --color-ecom-hero, so it follows the theme switcher.
 */
export default function PortalRings({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const rootStyle = getComputedStyle(document.documentElement);

    let width = 0;
    let height = 0;
    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    // Resizing a canvas clears it; in reduced motion there's no loop to repaint, so redraw.
    const resize = new ResizeObserver(() => {
      fit();
      if (reduceMotion) draw(4000);
    });
    resize.observe(canvas);

    // Pointer target (-0.5..0.5) and its eased follower.
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - 0.5;
      targetY = (event.clientY - rect.top) / rect.height - 0.5;
    };
    if (canHover) host.addEventListener("pointermove", onMove);

    const particles = Array.from({ length: PARTICLES }, () => ({
      angle: Math.random() * Math.PI * 2,
      ring: Math.floor(Math.random() * RINGS),
      speed: 0.2 + Math.random() * 0.6,
      size: 0.6 + Math.random() * 1.8,
    }));

    const draw = (time: number) => {
      const t = time / 1000;
      if (!canHover && !reduceMotion) {
        targetX = Math.sin(t * 0.35) * 0.22;
        targetY = Math.cos(t * 0.27) * 0.16;
      }
      x += (targetX - x) * 0.05;
      y += (targetY - y) * 0.05;

      const hero = rootStyle.getPropertyValue("--color-ecom-hero").trim() || "#e84a34";
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(hero.slice(i, i + 2), 16));
      const [pr, pg, pb] = [r, g, b].map((c) => Math.round((c + 510) / 3));

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2 + x * 80;
      const cy = height / 2 + y * 60;
      const base = Math.min(width, height);

      for (let i = RINGS - 1; i >= 0; i--) {
        // Depth 0..1, looping forward so rings keep flying toward the viewer.
        const z = (i / RINGS + t * 0.06) % 1;
        const scale = 0.15 + z * z * 2.1;
        const rx = base * 0.42 * scale;
        const ry = Math.max(4, rx * (0.28 + y * 0.25 + 0.12 * Math.sin(t * 0.5 + i)));
        const ox = -x * 260 * (1 - z);
        const oy = -y * 200 * (1 - z);
        const alpha = Math.min(1, z * 1.6) * (1 - Math.max(0, z - 0.85) / 0.15);

        ctx.save();
        ctx.translate(cx + ox, cy + oy);
        ctx.rotate(x * 0.5 + Math.sin(t * 0.3 + i * 0.4) * 0.06);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.85 * alpha})`;
        ctx.lineWidth = 2 + z * 22;
        ctx.shadowColor = `rgba(${r},${g},${b},0.6)`;
        ctx.shadowBlur = 30 * z;
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = `rgba(${pr},${pg},${pb},${alpha})`;
        for (const p of particles) {
          if (p.ring !== i) continue;
          if (!reduceMotion) p.angle += p.speed * 0.01;
          ctx.beginPath();
          ctx.arc(cx + ox + Math.cos(p.angle) * rx, cy + oy + Math.sin(p.angle) * ry, p.size * (0.5 + z), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    if (reduceMotion) {
      draw(4000);
      return () => resize.disconnect();
    }

    // Runs from mount; the observer only pauses it once it reports the canvas off
    // screen. (Hidden tabs need no handling: browsers already stop rAF there.)
    let frame = 0;
    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    start();

    return () => {
      stop();
      io.disconnect();
      resize.disconnect();
      host.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
