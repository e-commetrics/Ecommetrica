"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";
import type { Lang } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Phone captures of live client sites (public/projects/mobile, 360px WebP). */
const CAPTURES = [
  "palmas", "lumban", "monge", "cesia", "chik", "ciapara", "dentalreforma",
  "bordergrower", "carbonetics", "centraltoreo", "diaz", "ecommetrics", "gpe", "kamili",
  "bodega", "pamela", "proyectotijuana", "reformadental", "syltalento", "wislin", "ziggiz",
].map((name) => `/projects/mobile/${name}.webp`);

const COLUMNS = 6;
const PROJECT_COUNT = 40;

/** Captures for one column: every Nth capture plus two neighbours, so columns differ. */
function columnCaptures(column: number) {
  const picks = CAPTURES.filter((_, i) => i % COLUMNS === column);
  return [...picks, CAPTURES[(column * 3 + 1) % CAPTURES.length], CAPTURES[(column * 3 + 2) % CAPTURES.length]];
}

/**
 * Work hero — "linterna": a tilted wall of client sites in their phone version drifts in
 * columns, dark and desaturated; the cursor is a flashlight that shows them in full
 * color. On touch screens the light wanders on its own. Dark in every theme.
 */
export default function WorkHero({ lang }: { lang: Lang }) {
  const t = getDict(lang).workHero;
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [lensVisible, setLensVisible] = useState(false);

  // Flashlight position lives in CSS variables, so moving it never re-renders React.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const set = (x: number, y: number) => {
      section.style.setProperty("--x", `${x * 100}%`);
      section.style.setProperty("--y", `${y * 100}%`);
    };
    set(0.62, 0.38);

    const canHover = window.matchMedia("(hover: hover)").matches;
    let following = false;
    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      following = true;
      setLensVisible(true);
      set((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
    };
    const onLeave = () => {
      following = false;
      setLensVisible(false);
    };
    if (canHover) {
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);
    }

    // Wander while nobody is steering (touch screens, or the pointer is elsewhere).
    let frame = 0;
    if (!reduceMotion) {
      const wander = (time: number) => {
        if (!following) {
          const a = time / 1000;
          set(0.55 + Math.cos(a * 0.45) * 0.28, 0.4 + Math.sin(a * 0.6) * 0.2);
        }
        frame = requestAnimationFrame(wander);
      };
      frame = requestAnimationFrame(wander);
    }
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion]);

  // "+0" → "+40"
  useEffect(() => {
    const el = countRef.current;
    if (!el) return;
    if (reduceMotion) {
      el.textContent = `+${PROJECT_COUNT}`;
      return;
    }
    const controls = animate(0, PROJECT_COUNT, {
      duration: 1.8,
      delay: 0.5,
      ease: EASE,
      onUpdate: (v) => (el.textContent = `+${Math.round(v)}`),
    });
    return () => controls.stop();
  }, [reduceMotion]);

  const lens = "circle var(--rad) at var(--x) var(--y)";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-clip bg-ecom-black text-white [--rad:min(30vmin,260px)] [--x:62%] [--y:38%]"
    >
      {/* The wall: tilted, oversized so its rotated edges never show. */}
      <div aria-hidden className="absolute -inset-x-[8%] -inset-y-[12%] rotate-[-8deg] scale-110">
        <div className="grid h-full grid-cols-3 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: COLUMNS }, (_, column) => {
            const shots = columnCaptures(column);
            return (
              <div
                key={column}
                className={`flex flex-col gap-3 sm:gap-4 ${column % 2 ? "animate-wall-down" : "animate-wall-up"} ${
                  column >= 4 ? "hidden lg:flex" : column === 3 ? "hidden md:flex" : ""
                }`}
              >
                {[...shots, ...shots].map((src, i) => (
                  // Decorative wall: plain img keeps 40+ tiles cheap (no next/image wrappers).
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${src}-${i}`}
                    src={src}
                    alt=""
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="block aspect-[390/844] w-full rounded-2xl object-cover object-top ring-1 ring-white/10"
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Outside the light: desaturated and dimmed. Inside: full color. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 backdrop-grayscale backdrop-brightness-50"
        style={{
          WebkitMaskImage: `radial-gradient(${lens}, transparent 40%, #000 100%)`,
          maskImage: `radial-gradient(${lens}, transparent 40%, #000 100%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(${lens}, transparent 0%, color-mix(in srgb, var(--color-ecom-black) 25%, transparent) 45%, color-mix(in srgb, var(--color-ecom-black) 92%, transparent) 100%)`,
        }}
      />
      {/* Bottom shade so the headline always reads over the wall. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-ecom-black via-ecom-black/70 to-transparent" />

      {/* Cursor ring (pointer devices only). */}
      <div
        aria-hidden
        className={`pointer-events-none absolute z-10 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1.5px] border-ecom-orange text-[0.6rem] tracking-[0.15em] text-ecom-orange uppercase transition-opacity duration-300 [@media(hover:hover)]:grid ${
          lensVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: "var(--x)", top: "var(--y)" }}
      >
        {t.lensLabel}
      </div>

      <div className="relative z-10 shell flex min-h-[100svh] flex-col justify-end pt-32 pb-16 lg:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow-dark uppercase"
        >
          {t.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="mt-6 font-display text-[clamp(3rem,8vw,9rem)] leading-[0.9] font-medium tracking-[-0.045em] [text-shadow:0_10px_50px_rgba(0,0,0,0.6)]"
        >
          <span ref={countRef} className="tabular-nums">
            +0
          </span>{" "}
          {t.line1}
          <br />
          {t.line2} <span className="text-ecom-orange">{t.accent}</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-6"
        >
          <Link
            href={localizedHref(lang, "/packages")}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 btn-text text-ecom-on-accent uppercase tracking-wide transition-colors duration-300 hover:bg-white hover:text-ecom-black"
          >
            {t.cta}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              &#8599;
            </span>
          </Link>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/65 transition-colors duration-300 hover:text-white"
          >
            {t.ctaProjects}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
              &darr;
            </span>
          </a>
        </motion.div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-b from-transparent to-ecom-surface" />
    </section>
  );
}
