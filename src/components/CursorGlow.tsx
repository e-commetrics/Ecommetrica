"use client";

import { useEffect, useRef } from "react";

/**
 * The cursor effect from the "tipografía cinética" hero, for sections that otherwise have
 * no motion: an orange glow follows the pointer inside the section, and any heading marked
 * `data-cursor-lean` leans slightly toward it.
 *
 * Drop it in as the first child of the section; it attaches to its parent element:
 *   <section> <CursorGlow /> <h1 data-cursor-lean>…</h1> … </section>
 * The glow layer clips itself and sits behind the content (the parent gets `isolation`
 * and, if static, `position: relative`), so it never bleeds into neighbouring sections.
 * Pointer devices only; off with prefers-reduced-motion.
 */
export default function CursorGlow({
  strength = 0.18,
  size = 420,
}: {
  /** Glow opacity at its center (orange). ~0.18 on light surfaces, ~0.3 on dark blocks. */
  strength?: number;
  size?: number;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const glow = glowRef.current;
    const host = layer?.parentElement;
    if (!layer || !glow || !host) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (getComputedStyle(host).position === "static") host.style.position = "relative";
    host.style.isolation = "isolate";
    const leaners = Array.from(host.querySelectorAll<HTMLElement>("[data-cursor-lean]"));
    leaners.forEach((el) => {
      el.style.transition = "transform 0.25s linear";
      el.style.willChange = "transform";
    });

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      glow.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`;
      glow.style.opacity = "1";
      const nx = x / rect.width - 0.5;
      leaners.forEach((el) => (el.style.transform = `skewX(${-nx * 6}deg) translateX(${nx * 18}px)`));
    };
    const onLeave = () => {
      glow.style.opacity = "0";
      leaners.forEach((el) => (el.style.transform = ""));
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      leaners.forEach((el) => (el.style.transform = ""));
    };
  }, [size]);

  return (
    <div ref={layerRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        ref={glowRef}
        className="absolute top-0 left-0 rounded-full opacity-0 blur-[10px] transition-[opacity,transform] duration-[400ms,400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, color-mix(in srgb, var(--color-ecom-orange) ${Math.round(strength * 100)}%, transparent), transparent 65%)`,
        }}
      />
    </div>
  );
}
