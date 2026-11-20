"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Lang } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;
const TICK_MS = 80;
// Timeline of one loop, in ms: the brief types out, then the page builds in STEPS steps
// (each reveals more of it) across the plan's 3 days, then it holds "live" and restarts.
const TYPE_MS = 2600;
const GEN_START = 3000;
const STEP_MS = 650;
const STEPS = 7;
const DAYS = 3; // AI Express: ready in 3 days from complete content
const LIVE_AT = GEN_START + STEPS * STEP_MS;
const LOOP_MS = LIVE_AT + 2800;

const COPY = {
  es: {
    brief: "Crea el sitio de mi taquería en Tijuana: bilingüe, con menú, fotos y botón de WhatsApp.",
    model: "IA Exprés",
    generating: "Generando tu sitio…",
    day: "Día",
    live: "En línea",
    url: "tutaqueria.com",
    langs: ["ES", "EN"],
  },
  en: {
    brief: "Build my taco shop's site in Tijuana: bilingual, with a menu, photos and a WhatsApp button.",
    model: "AI Express",
    generating: "Generating your site…",
    day: "Day",
    live: "Live",
    url: "yourtacoshop.com",
    langs: ["EN", "ES"],
  },
} as const;

function Sparkle({ spinning }: { spinning: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-ecom-orange"
      animate={spinning ? { rotate: 360, scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
      transition={spinning ? { rotate: { duration: 2.4, ease: "linear", repeat: Infinity }, scale: { duration: 1.2, repeat: Infinity } } : { duration: 0.4 }}
    >
      <path fill="currentColor" d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z" />
      <path fill="currentColor" opacity=".6" d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </motion.svg>
  );
}

/**
 * AI Express hero visual: an AI prompt types the business brief and is sent; then the AI
 * streams the site into a browser window — a scan line sweeps it while each piece renders
 * out of a blur over the 3-day bar — and the site goes live. Loops.
 * Decorative (aria-hidden); with reduced motion it shows the finished, live page.
 */
export default function AiPromptSite({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const still = Boolean(useReducedMotion());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setElapsed((t) => (t + TICK_MS >= LOOP_MS ? 0 : t + TICK_MS)), TICK_MS);
    return () => window.clearInterval(id);
  }, [still]);

  const now = still ? LOOP_MS - 1 : elapsed;
  const typed = Math.min(c.brief.length, Math.floor((now / TYPE_MS) * c.brief.length));
  const sent = now >= TYPE_MS;
  const generating = now >= GEN_START && now < LIVE_AT;
  const step = now < GEN_START ? 0 : Math.min(STEPS, Math.floor((now - GEN_START) / STEP_MS) + 1);
  const day = Math.ceil((step * DAYS) / STEPS);
  const live = now >= LIVE_AT;
  const shown = (fromStep: number) => step >= fromStep;
  const second = step >= 5 && step % 2 === 1;

  const block = (fromDay: number, className: string) => (
    <motion.div
      initial={false}
      animate={shown(fromDay) ? { opacity: 1, filter: "blur(0px)", scale: 1 } : { opacity: 0.08, filter: "blur(4px)", scale: 0.98 }}
      transition={{ duration: still ? 0 : 0.7, ease: EASE }}
      className={className}
    />
  );

  return (
    <div aria-hidden className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-ecom-red/20 blur-[80px]" />

      {/* The prompt */}
      <div className="relative rounded-2xl border border-white/12 bg-ecom-black/90 p-4 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.15em] text-white/55 uppercase">
            <Sparkle spinning={generating} />
            {c.model}
          </span>
          {sent && !live && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, backgroundPositionX: ["0%", "200%"] }}
              transition={{ opacity: { duration: 0.3 }, backgroundPositionX: { duration: 1.6, ease: "linear", repeat: Infinity } }}
              className="bg-linear-to-r from-white/40 via-ecom-orange to-white/40 bg-[length:200%_100%] bg-clip-text font-mono text-[0.65rem] tracking-wide text-transparent"
            >
              {c.generating}
            </motion.span>
          )}
          {live && <span className="font-mono text-[0.65rem] tracking-[0.15em] text-ecom-orange uppercase">● {c.live}</span>}
        </div>
        <div className="mt-3 flex items-end gap-3">
          <p className="min-h-[2.6em] flex-1 text-sm leading-snug text-white/85">
            {c.brief.slice(0, typed)}
            {!sent && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-ecom-orange" />}
          </p>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
              typed > 0 && !sent ? "bg-ecom-orange text-ecom-on-accent" : "bg-white/10 text-white/40"
            }`}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" />
            </svg>
          </span>
        </div>
      </div>

      {/* The site the AI streams in */}
      <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/12 bg-ecom-black/90 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </span>
          <span className="flex-1 truncate rounded-md bg-white/[0.06] px-3 py-1 font-mono text-[0.65rem] text-white/50">{c.url}</span>
          <span className="flex overflow-hidden rounded-full border border-white/15 font-mono text-[0.6rem]">
            {c.langs.map((code, i) => (
              <span
                key={code}
                className={`px-2 py-0.5 transition-colors duration-500 ${
                  shown(5) && (second ? i === 1 : i === 0) ? "bg-ecom-orange text-ecom-on-accent" : "text-white/50"
                }`}
              >
                {code}
              </span>
            ))}
          </span>
        </div>

        <div className="relative space-y-3.5 p-5">
          {/* Scan line while generating */}
          {generating && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 h-20 bg-linear-to-b from-transparent via-ecom-orange/15 to-transparent"
              initial={{ top: "-20%" }}
              animate={{ top: ["-20%", "100%"] }}
              transition={{ duration: 1.3, ease: "linear", repeat: Infinity }}
            />
          )}
          <div className="flex items-center justify-between">
            {block(1, "h-3 w-20 rounded-full bg-ecom-orange")}
            <div className="flex gap-2">
              {block(1, "h-2 w-8 rounded-full bg-white/25")}
              {block(1, "h-2 w-8 rounded-full bg-white/25")}
              {block(1, "h-2 w-8 rounded-full bg-white/25")}
            </div>
          </div>
          <div className="grid grid-cols-5 items-center gap-4 pt-1">
            <div className="col-span-3 space-y-2.5">
              {block(2, "h-4 w-11/12 rounded-full bg-white/80")}
              {block(2, "h-4 w-3/4 rounded-full bg-white/80")}
              {block(3, "h-2 w-full rounded-full bg-white/25")}
              {block(3, "h-2 w-5/6 rounded-full bg-white/25")}
              {block(4, "mt-2 h-6 w-28 rounded-full bg-ecom-orange")}
            </div>
            {block(3, "col-span-2 aspect-square rounded-xl bg-linear-to-br from-ecom-red to-ecom-orange/70")}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {block(5, "h-14 rounded-lg border border-white/10 bg-white/[0.06]")}
            {block(5, "h-14 rounded-lg border border-white/10 bg-white/[0.06]")}
            {block(6, "h-14 rounded-lg border border-white/10 bg-white/[0.06]")}
          </div>
          <div className="flex items-center justify-between">
            {block(6, "h-2 w-24 rounded-full bg-white/20")}
            {block(7, "h-7 w-7 rounded-full bg-[#25D366]")}
          </div>
        </div>
      </div>

      {/* Seven days */}
      <div className="relative mt-4 flex items-center gap-3">
        <div className="flex flex-1 gap-1.5">
          {Array.from({ length: DAYS }, (_, i) => (
            <span key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="block h-full rounded-full bg-ecom-orange"
                initial={false}
                animate={{ width: day > i ? "100%" : "0%" }}
                transition={{ duration: still ? 0 : (STEP_MS * STEPS) / DAYS / 1000, ease: "linear" }}
              />
            </span>
          ))}
        </div>
        <span className={`min-w-[5.5rem] text-right font-mono text-xs tracking-[0.15em] uppercase ${live ? "text-ecom-orange" : "text-white/60"}`}>
          {live ? `● ${c.live}` : `${c.day} ${Math.max(1, day)}/${DAYS}`}
        </span>
      </div>
    </div>
  );
}
