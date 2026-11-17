"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Lang } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;
const TICK_MS = 100;
const MONTH_MS = 3200; // one "month" of the 3-month plan
const MONTHS = 3;
const LOOP_MS = MONTHS * MONTH_MS + 2600;

const COPY = {
  es: {
    months: ["Tu marca", "Tu sitio y tus redes", "Inauguración"],
    month: "Mes",
    open: "Abierto ahora",
    brand: "Identidad visual",
    url: "tumarca.com",
    reviews: "Google Business",
  },
  en: {
    months: ["Your brand", "Your site and social", "Opening day"],
    month: "Month",
    open: "Open now",
    brand: "Visual identity",
    url: "yourbrand.com",
    reviews: "Google Business",
  },
} as const;

/** The brand mark the visual "designs": two interlocking arcs, drawn stroke by stroke. */
function Mark({ draw, className = "" }: { draw: boolean; className?: string }) {
  const path = { initial: false, transition: { duration: 1.2, ease: EASE } } as const;
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" strokeLinecap="round">
      <motion.path d="M10 30a14 14 0 1 1 14 14" stroke="currentColor" strokeWidth="5" {...path} animate={{ pathLength: draw ? 1 : 0 }} />
      <motion.path d="M38 18A14 14 0 1 1 24 4" className="stroke-ecom-orange" strokeWidth="5" {...path} animate={{ pathLength: draw ? 1 : 0 }} transition={{ duration: 1.2, delay: 0.35, ease: EASE }} />
    </svg>
  );
}

/**
 * Launch (Arranque) hero visual: one plan, three months. Month 1 designs the brand — the
 * mark draws itself, the palette and type drop in; month 2 builds the site and the social
 * posts in that brand; month 3 opens the doors (Google Business "open now"). Then it loops.
 * Decorative (aria-hidden); with reduced motion it shows the finished launch.
 */
export default function BrandKitLaunch({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const still = Boolean(useReducedMotion());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setElapsed((t) => (t + TICK_MS >= LOOP_MS ? 0 : t + TICK_MS)), TICK_MS);
    return () => window.clearInterval(id);
  }, [still]);

  const now = still ? LOOP_MS - 1 : elapsed;
  const month = Math.min(MONTHS, Math.floor(now / MONTH_MS) + 1);
  const at = (ms: number) => now >= ms;
  const appear = (on: boolean, y = 16) => ({
    initial: false as const,
    animate: on ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale: 0.97 },
    transition: { duration: still ? 0 : 0.7, ease: EASE },
  });

  return (
    <div aria-hidden className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-ecom-red/20 blur-[80px]" />

      <div className="relative aspect-[100/88]">
        {/* Month 1 · the brand kit */}
        <motion.div
          {...appear(at(0))}
          className="absolute top-0 left-0 w-[58%] rounded-2xl border border-white/12 bg-ecom-black/90 p-4 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)] sm:p-5"
        >
          <p className="font-mono text-[0.6rem] tracking-[0.15em] text-white/45 uppercase">{c.brand}</p>
          <div className="mt-3 flex items-center gap-3">
            <Mark draw={at(300)} className="h-11 w-11 text-white sm:h-14 sm:w-14" />
            <motion.span {...appear(at(1300), 8)} className="font-display text-3xl font-medium text-white sm:text-4xl">
              Aa
            </motion.span>
          </div>
          <div className="mt-4 flex gap-2">
            {["bg-ecom-orange", "bg-ecom-red", "bg-white", "bg-white/20"].map((color, i) => (
              <motion.span
                key={color}
                initial={false}
                animate={at(1700 + i * 250) ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
                transition={{ duration: still ? 0 : 0.5, ease: EASE }}
                className={`h-7 flex-1 rounded-md sm:h-8 ${color}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Month 2 · the site, in that brand */}
        <motion.div
          {...appear(at(MONTH_MS), 24)}
          className="absolute right-0 bottom-[6%] w-[74%] overflow-hidden rounded-2xl border border-white/12 bg-ecom-black/95 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="ml-2 truncate font-mono text-[0.6rem] text-white/45">{c.url}</span>
          </div>
          <div className="space-y-2.5 p-4">
            <div className="flex items-center justify-between">
              <Mark draw={at(MONTH_MS)} className="h-5 w-5 text-white" />
              <span className="flex gap-1.5">
                <span className="h-1.5 w-6 rounded-full bg-white/25" />
                <span className="h-1.5 w-6 rounded-full bg-white/25" />
                <span className="h-1.5 w-6 rounded-full bg-white/25" />
              </span>
            </div>
            <div className="grid grid-cols-5 items-center gap-3 pt-1">
              <div className="col-span-3 space-y-2">
                <div className="h-3 w-11/12 rounded-full bg-white/85" />
                <div className="h-3 w-2/3 rounded-full bg-white/85" />
                <div className="h-1.5 w-full rounded-full bg-white/25" />
                <div className="mt-1 h-5 w-20 rounded-full bg-ecom-orange" />
              </div>
              <div className="col-span-2 aspect-[4/3] rounded-lg bg-linear-to-br from-ecom-red to-ecom-orange/80" />
            </div>
          </div>
        </motion.div>

        {/* Month 2 · social posts on a phone */}
        <motion.div
          {...appear(at(MONTH_MS + 900), 24)}
          className="absolute top-[22%] right-[4%] w-[26%] rounded-[1.1rem] border border-white/15 bg-ecom-black p-1.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.95)]"
        >
          <div className="grid grid-cols-2 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                initial={false}
                animate={at(MONTH_MS + 1200 + i * 300) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                transition={{ duration: still ? 0 : 0.45, ease: EASE }}
                className={`aspect-square rounded-md ${i % 3 === 0 ? "bg-ecom-orange" : i % 3 === 1 ? "bg-ecom-red" : "bg-white/80"}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Month 3 · open for business */}
        <motion.div
          {...appear(at(2 * MONTH_MS + 400), 18)}
          className="absolute bottom-0 left-[2%] flex items-center gap-3 rounded-2xl border border-white/12 bg-ecom-black/95 px-4 py-3 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.95)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-ecom-orange" fill="currentColor">
              <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>
          </span>
          <span>
            <span className="block text-[0.65rem] text-white/50">{c.reviews} · ★★★★★</span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-white">
              <motion.span
                className="h-2 w-2 rounded-full bg-[#34C759]"
                animate={still ? undefined : { opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              {c.open}
            </span>
          </span>
        </motion.div>
      </div>

      {/* Three months */}
      <div className="relative mt-5 flex items-center gap-3">
        <div className="flex flex-1 gap-1.5">
          {Array.from({ length: MONTHS }, (_, i) => (
            <span key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="block h-full rounded-full bg-ecom-orange"
                initial={false}
                animate={{ width: month >= i + 1 ? "100%" : "0%" }}
                transition={{ duration: still || month !== i + 1 ? 0.3 : MONTH_MS / 1000, ease: "linear" }}
              />
            </span>
          ))}
        </div>
        <span className="min-w-[9.5rem] text-right font-mono text-[0.7rem] tracking-[0.12em] text-white/60 uppercase">
          {c.month} {month}/{MONTHS} · {c.months[month - 1]}
        </span>
      </div>
    </div>
  );
}
