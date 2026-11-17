"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
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

const PLAY_MS = 10_000; // time playing with the rings before the subtitle types in
const TYPE_MS = 32;
const TRAIL = 3; // newest characters that flicker as glyphs before settling
// Letters, digits and symbols that never add a line-break opportunity, so the flicker
// can't rewrap the text.
const GLYPHS = "01<>=#*_&x";

/**
 * Shows `line` (the location eyebrow, with its dash) until `run`; then `text` types over
 * it like code: a caret sweeps through, the newest characters flicker as glyphs before
 * they settle, and every eyebrow character the caret passes is overwritten. The typed
 * block's full height is reserved from the start (untyped text is invisible), so nothing
 * around it moves. Decorative: the parent carries the real text for screen readers.
 */
function CodeOverwrite({ line, text, run, still }: { line: string; text: string; run: boolean; still: boolean }) {
  const [typed, setTyped] = useState({ n: 0, trail: "" });
  const [caretGone, setCaretGone] = useState(false);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!run || still) return;
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      const trail = Array.from({ length: TRAIL }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("");
      setTyped({ n, trail });
      if (n >= text.length + TRAIL) window.clearInterval(id);
    }, TYPE_MS);
    return () => window.clearInterval(id);
  }, [run, still, text.length]);

  const n = run && still ? text.length + TRAIL : typed.n;
  const head = Math.min(n, text.length);
  const settled = Math.max(0, Math.min(n - TRAIL, text.length));
  const done = n >= text.length + TRAIL;
  const flicker = [...text.slice(settled, head)].map((ch, i) => (ch === " " ? ch : typed.trail[i] ?? ch)).join("");

  // Overwrite: hide every eyebrow character (and the dash) the caret has passed, in
  // reading order: lines above the caret's, and anything left of it on its own line.
  useLayoutEffect(() => {
    const units = lineRef.current?.children;
    if (!units) return;
    const caret = caretRef.current?.getBoundingClientRect();
    for (const el of Array.from(units) as HTMLElement[]) {
      let passed = done;
      if (!passed && caret && n > 0) {
        const r = el.getBoundingClientRect();
        const cy = (r.top + r.bottom) / 2;
        passed = cy < caret.top || (cy <= caret.bottom && r.left < caret.left);
      }
      el.style.visibility = passed ? "hidden" : "";
    }
  }, [n, done]);

  return (
    <div aria-hidden className="grid">
      <p ref={lineRef} className="self-start text-sm font-medium tracking-[0.2em] text-ecom-eyebrow-dark uppercase [grid-area:1/1]">
        <span className="mr-3 inline-block h-px w-7 bg-(--ecom-dash) align-middle opacity-(--ecom-dash-opacity)" />
        {[...line].map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </p>
      <p className="self-start font-mono text-[0.95rem] leading-relaxed text-white/80 [grid-area:1/1]">
        {text.slice(0, settled)}
        <span className="text-ecom-orange">{flicker}</span>
        {/* Zero-width anchor, so the caret never pushes the text around. */}
        {n > 0 && !still && !caretGone && (
          <span className="relative">
            <span
              ref={caretRef}
              onAnimationEnd={() => setCaretGone(true)}
              className={`absolute top-[0.2em] left-0 h-[1.15em] w-[0.55em] bg-ecom-orange ${done ? "animate-caret-blink" : ""}`}
            />
          </span>
        )}
        <span className="invisible">{text.slice(head)}</span>
      </p>
    </div>
  );
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
  const [played, setPlayed] = useState(false);

  // Ten seconds of play with the rings (the pointer moving over the hero; pauses under a
  // second still count) types the subtitle over the location line.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || played) return;
    let total = 0;

    // Phones have no cursor to play with (a swipe scrolls the page), so there it's ten
    // seconds with the hero on screen instead.
    if (!window.matchMedia("(hover: hover)").matches) {
      let since = 0;
      let timer = 0;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !timer) {
            since = performance.now();
            timer = window.setTimeout(() => setPlayed(true), PLAY_MS - total);
          } else if (!entry.isIntersecting && timer) {
            window.clearTimeout(timer);
            timer = 0;
            total += performance.now() - since;
          }
        },
        { threshold: 0.4 },
      );
      io.observe(section);
      return () => {
        io.disconnect();
        window.clearTimeout(timer);
      };
    }

    let last = -Infinity;
    const onMove = () => {
      const now = performance.now();
      if (now - last < 1000) total += now - last;
      last = now;
      if (total >= PLAY_MS) setPlayed(true);
    };
    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, [played]);

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
        <p className="hidden self-end font-mono text-[0.7rem] tracking-[0.15em] text-white/45 uppercase [@media(hover:hover)]:block">
          {h.hint}
        </p>

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
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            className="max-w-3xl flex-[1_1_22rem]"
          >
            <p className="sr-only">{t.hero.eyebrow}</p>
            <p className="sr-only">{h.sub}</p>
            <CodeOverwrite line={t.hero.eyebrow} text={h.sub} run={played} still={reducedMotion} />
          </motion.div>
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
