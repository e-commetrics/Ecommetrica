"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Buttons drift toward the cursor while it's over them. */
function magnet(event: ReactPointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.transform = `translate(${(event.clientX - r.left - r.width / 2) * 0.3}px, ${(event.clientY - r.top - r.height / 2) * 0.45}px)`;
}
function unmagnet(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.transform = "";
}

/**
 * Home hero — "anillos en gravedad": glossy brand rings gravitate together, collide, get
 * shoved by the cursor and scatter on click, under a water layer that also ripples the
 * headline (gravityScene.ts, three.js, loaded after the page paints).
 *
 * The headline is real HTML text in the page flow; the scene paints its copy over that
 * same box, and once the first frame is drawn the HTML one crossfades to transparent
 * (still in the DOM for search engines and screen readers). Dark in every theme.
 */
export default function GravityHero() {
  const { t, lang } = useLanguage();
  const h = t.homeHero;
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [blobBig, setBlobBig] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const headline = headlineRef.current;
    if (!section || !canvas || !headline) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    setReady(false);

    // Wait for the page to settle, then pull in three.js (its own chunk).
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = (cb: () => void) => (hasIdle ? window.requestIdleCallback(cb, { timeout: 1500 }) : window.setTimeout(cb, 300));
    const handle = idle(async () => {
      try {
        const fontFamily = getComputedStyle(document.documentElement).getPropertyValue("--font-clash").trim();
        if (fontFamily) await document.fonts.load(`500 100px ${fontFamily}`).catch(() => undefined);
        const { mountGravityScene } = await import("@/components/gravityScene");
        if (cancelled) return;
        cleanup = mountGravityScene({
          section,
          canvas,
          headline,
          blob: blobRef.current,
          lines: [h.line1, h.line2, h.accent],
          reducedMotion,
          onReady: () => !cancelled && setReady(true),
        });
      } catch {
        // No WebGL or the chunk failed: the HTML headline simply stays.
      }
    });

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      cleanup?.();
    };
  }, [h.line1, h.line2, h.accent, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-hero touch-pan-y overflow-clip bg-ecom-black text-white [@media(hover:hover)]:cursor-none [@media(hover:hover)]:[&_a]:cursor-none"
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 block h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      />

      <div
        ref={blobRef}
        aria-hidden
        className={`pointer-events-none absolute top-[-100px] left-[-100px] z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-[width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:block ${
          blobBig ? "h-20 w-20" : "h-5 w-5"
        }`}
      />

      {/* Bottom shade: keeps the copy legible when rings drift behind it. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-ecom-black/85 to-transparent" />

      <div className="pointer-events-none relative z-10 shell flex min-h-hero flex-col pt-28 pb-10 lg:pt-32">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow-dark uppercase"
          >
            {t.hero.eyebrow}
          </motion.p>
          <p className="hidden font-mono text-[0.7rem] tracking-[0.15em] text-white/45 uppercase [@media(hover:hover)]:block">
            {h.hint}
          </p>
        </div>

        {/* The headline as text, in the flow so the layout always keeps room for it. The
            3D scene paints it over this exact box; then it turns transparent but stays in
            the DOM for search engines and screen readers. */}
        <h1
          ref={headlineRef}
          className={`mt-10 mb-12 font-display text-[min(15vw,11svh)] leading-[0.9] font-medium tracking-[-0.035em] transition-opacity duration-700 min-[900px]:my-auto min-[900px]:text-[min(10vw,20svh)] ${
            ready ? "opacity-0" : ""
          }`}
        >
          {/* Spaces between the block lines keep the text readable as one sentence. */}
          <span className="block whitespace-nowrap">{h.line1}</span>{" "}
          <span className="block whitespace-nowrap">{h.line2}</span>{" "}
          <span className="block whitespace-nowrap text-ecom-orange">{h.accent}</span>
        </h1>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-7 min-[900px]:mt-0">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            className="max-w-md text-lg leading-relaxed text-white/70"
          >
            {h.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            className="pointer-events-auto flex flex-wrap items-center gap-6"
            onPointerEnter={() => setBlobBig(true)}
            onPointerLeave={() => setBlobBig(false)}
          >
            <Link
              href={localizedHref(lang, "/#services")}
              onPointerMove={magnet}
              onPointerLeave={unmagnet}
              className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 btn-text text-ecom-on-accent uppercase tracking-wide transition-[background-color,color,transform] duration-300 hover:bg-white hover:text-ecom-black"
            >
              {t.hero.ctaServices}
              <span aria-hidden>&#8599;</span>
            </Link>
            <Link
              href={localizedHref(lang, "/work")}
              onPointerMove={magnet}
              onPointerLeave={unmagnet}
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/65 transition-[color,transform] duration-300 hover:text-white"
            >
              {t.hero.ctaWork}
              <span aria-hidden>&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Seam: dissolves into the section that follows */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-ecom-surface" />
    </section>
  );
}
