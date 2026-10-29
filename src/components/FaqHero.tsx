"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";
import { smoothScrollTo } from "@/components/SmoothScroll";
import type { Lang } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;
const SLOT_MS = 2200;

/** A headline line whose letters rise one by one out of a mask. */
function RisingLine({ text, delay, still }: { text: string; delay: number; still: boolean }) {
  return (
    <span aria-hidden className="block overflow-hidden pb-[0.06em]">
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={still ? false : { y: "110%", rotate: 8 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 1, delay: delay + i * 0.035, ease: EASE }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * FAQ hero — "tipografía cinética": giant type whose letters rise in, a slot-machine
 * word that flips every couple of seconds, a headline that leans toward the cursor with
 * an orange glow following it, and an outlined ribbon of FAQ topics. Dark in every theme.
 */
export default function FaqHero({ lang }: { lang: Lang }) {
  const h = getDict(lang).faqHero;
  const still = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const leanRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [slot, setSlot] = useState(0);

  useEffect(() => {
    if (still || h.slots.length < 2) return;
    const id = window.setInterval(() => setSlot((s) => (s + 1) % h.slots.length), SLOT_MS);
    return () => window.clearInterval(id);
  }, [h.slots.length, still]);

  // Lean + glow follow the pointer (pointer devices only); styles set directly, no re-render.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || still || !window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      if (leanRef.current) leanRef.current.style.transform = `skewX(${-x * 6}deg) translateX(${x * 18}px)`;
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX - r.left}px`;
        glowRef.current.style.top = `${e.clientY - r.top}px`;
      }
    };
    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, [still]);

  const ribbon = [...h.topics, ...h.topics];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-hero flex-col overflow-clip text-white"
      style={{ background: "radial-gradient(120% 80% at 80% 0%, color-mix(in srgb, var(--color-ecom-red) 30%, var(--color-ecom-black)) 0%, var(--color-ecom-black) 55%)" }}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute top-[40%] left-[70%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[10px] transition-[left,top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-ecom-orange) 28%, transparent), transparent 65%)" }}
      />

      <div className="relative shell flex flex-1 flex-col justify-center pt-32 pb-12">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow-dark uppercase"
        >
          FAQ
        </motion.p>

        <h1
          aria-label={`${h.line1} ${h.slots[0]} ${h.line3}`}
          className="mt-7 font-display text-[clamp(3.2rem,11vw,12rem)] leading-[0.88] font-medium tracking-[-0.045em]"
        >
          <span ref={leanRef} className="block transition-transform duration-200 ease-linear will-change-transform">
            <RisingLine text={h.line1} delay={0} still={still} />
            {/* Slot word: each option stacked in one cell; the current one sits in view. */}
            <span aria-hidden className="block overflow-hidden pb-[0.06em]">
              <span className="inline-grid h-[1em] overflow-hidden align-bottom text-ecom-orange">
                {h.slots.map((word, i) => {
                  const prev = (slot - 1 + h.slots.length) % h.slots.length;
                  const y = i === slot ? "0%" : i === prev ? "-130%" : "130%";
                  return (
                    <span
                      key={word}
                      className="whitespace-nowrap transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] [grid-area:1/1]"
                      style={{ transform: `translateY(${y})`, transitionDuration: i === slot || i === prev ? undefined : "0ms" }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            </span>
            <RisingLine text={h.line3} delay={0.35} still={still} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          className="mt-11 flex flex-wrap items-end justify-between gap-x-16 gap-y-7"
        >
          <p className="max-w-xl text-lg leading-relaxed text-white/65">{h.sub}</p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#questions"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("#questions"); }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 btn-text text-ecom-on-accent uppercase tracking-wide transition-colors duration-300 hover:bg-white hover:text-ecom-black"
            >
              {h.ctaQuestions}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">&darr;</span>
            </a>
            <Link
              href={localizedHref(lang, "/contact")}
              className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/65 transition-colors duration-300 hover:text-white"
            >
              {h.ctaContact}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Topic ribbon: content twice so the -50% marquee loops seamlessly. */}
      <div aria-hidden className="relative overflow-hidden border-t border-white/10 py-5 whitespace-nowrap">
        <div className="animate-marquee inline-flex items-center gap-12 font-display text-[clamp(1.75rem,4vw,3.5rem)] font-medium tracking-[-0.02em]">
          {ribbon.map((topic, i) => (
            <span key={i} className="inline-flex items-center gap-12">
              <span className="text-stroke text-white/45">{topic}</span>
              <span className="text-ecom-orange">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
