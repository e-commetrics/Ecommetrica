"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Lang } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRINT_MS = 1800;
const SPRINTS = 6;
const ORBIT_S = 40;

const COPY = {
  es: {
    center: ["Tu", "aliado"],
    // One senior lead per Aliado module, plus 24/7 support (see customPlan in pricing.ts).
    roles: [
      { abbr: "DD", title: "Director Digital" },
      { abbr: "LD", title: "Líder de Desarrollo" },
      { abbr: "IA", title: "Ingeniero de IA Agéntica" },
      { abbr: "SH", title: "Especialista Shopify Sr." },
      { abbr: "CI", title: "Estratega de Contenido IA" },
      { abbr: "24", title: "Ingeniero de Soporte 24/7" },
    ],
    sprint: "Sprint",
    delivered: "Entregado",
    roadmap: "Avance del proyecto",
    support: "Soporte 24/7 · en línea",
    deliveries: ["Diagnóstico y propuesta", "Arquitectura y presupuesto", "Tienda Shopify a escala", "Agente de IA en producción", "Motor de contenido con IA", "App a la medida · v1"],
  },
  en: {
    center: ["Your", "partner"],
    roles: [
      { abbr: "DD", title: "Digital Director" },
      { abbr: "LD", title: "Lead Developer" },
      { abbr: "AI", title: "Agentic AI Engineer" },
      { abbr: "SH", title: "Senior Shopify Specialist" },
      { abbr: "CI", title: "AI Content Strategist" },
      { abbr: "24", title: "24/7 Support Engineer" },
    ],
    sprint: "Sprint",
    delivered: "Delivered",
    roadmap: "Project progress",
    support: "24/7 support · online",
    deliveries: ["Diagnosis and proposal", "Architecture and budget", "Shopify at scale", "AI agent in production", "AI content engine", "Custom app · v1"],
  },
} as const;

/**
 * Partner (Aliado) hero visual: your embedded team. A senior lead for each Aliado module
 * orbits "your partner", wired in with live pulses, working as part of the business;
 * below, the project ships its milestones ("Delivered") while 24/7 support stays online.
 * Loops forever. Decorative (aria-hidden); with reduced motion the orbit stands still and
 * every milestone shows as delivered.
 */
export default function TeamOrbit({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const still = Boolean(useReducedMotion());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setTick((t) => t + 1), SPRINT_MS);
    return () => window.clearInterval(id);
  }, [still]);

  // Sprints delivered so far (1–6), cycling; the newest one is announced below.
  const done = still ? SPRINTS : (tick % SPRINTS) + 1;
  const latest = done - 1;
  const roles = c.roles.map((role, i) => {
    const angle = (i / c.roles.length) * Math.PI * 2 - Math.PI / 2;
    return { role, x: 50 + Math.cos(angle) * 40, y: 50 + Math.sin(angle) * 40 };
  });

  return (
    <div aria-hidden className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-ecom-red/25 blur-[90px]" />

      {/* The orbit */}
      <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="0.3" strokeDasharray="1 1.6" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="0.3" />
        </svg>

        <motion.div
          className="absolute inset-0"
          animate={still ? undefined : { rotate: 360 }}
          transition={{ duration: ORBIT_S, ease: "linear", repeat: Infinity }}
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
            {roles.map(({ x, y }, i) => (
              <g key={i}>
                <line x1="50" y1="50" x2={x} y2={y} stroke="white" strokeOpacity="0.12" strokeWidth="0.3" />
                {!still && (
                  <circle r="0.9" className="fill-ecom-orange">
                    <animateMotion dur="1.8s" repeatCount="indefinite" begin={`${i * 0.3}s`} path={`M${x} ${y} L50 50`} />
                  </circle>
                )}
              </g>
            ))}
          </svg>
          {roles.map(({ role, x, y }) => (
            <motion.div
              key={role.abbr}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={still ? undefined : { rotate: -360 }}
              transition={{ duration: ORBIT_S, ease: "linear", repeat: Infinity }}
            >
              {/* Phones: a stacked badge (initials over a two-line title) so the long
                  senior titles never collide as the orbit turns; sm+: a single pill. */}
              <span className="flex w-[5.5rem] flex-col items-center gap-1 rounded-xl border border-white/15 bg-ecom-black/95 px-1.5 py-1.5 text-center shadow-[0_14px_30px_-18px_rgba(0,0,0,0.9)] sm:w-auto sm:max-w-[9.5rem] sm:flex-row sm:gap-2 sm:rounded-2xl sm:py-1.5 sm:pr-3 sm:pl-1.5 sm:text-left">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-ecom-orange to-ecom-red text-[0.6rem] font-semibold text-white">
                  {role.abbr}
                </span>
                <span className="text-[0.56rem] leading-tight font-medium text-white/90 sm:text-[0.68rem]">{role.title}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Your business, at the center */}
        <div className="absolute top-1/2 left-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ecom-orange/60 bg-ecom-black text-center shadow-[0_0_60px_-10px_var(--color-ecom-orange)]">
          <motion.span
            className="absolute inset-0 rounded-full border border-ecom-orange/50"
            animate={still ? undefined : { scale: [1, 1.35], opacity: [0.7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="font-display text-sm leading-tight font-medium text-white sm:text-base">
            {c.center[0]}
            <br />
            {c.center[1]}
          </span>
        </div>
      </div>

      {/* Roadmap + support */}
      <div className="relative mt-4 rounded-2xl border border-white/12 bg-ecom-black/90 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[0.6rem] tracking-[0.12em] text-white/55 uppercase">{c.roadmap}</p>
          <span className="inline-flex items-center gap-1.5 text-[0.65rem] text-white/75">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#34C759]"
              animate={still ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.3, repeat: Infinity }}
            />
            {c.support}
          </span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {Array.from({ length: SPRINTS }, (_, i) => (
            <motion.span
              key={i}
              initial={false}
              animate={{ opacity: i < done ? 1 : 0.35 }}
              className={`flex h-7 flex-1 items-center justify-center rounded-md text-[0.6rem] font-semibold transition-colors duration-500 ${
                i < done ? "bg-ecom-orange text-ecom-on-accent" : "bg-white/[0.06] text-white/50"
              }`}
            >
              S{i + 1}
            </motion.span>
          ))}
        </div>
        <div className="mt-3 h-5 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={still ? "still" : tick}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-xs text-white/80"
            >
              <span className="text-ecom-orange">✓ {c.delivered}</span> · {c.sprint} {latest + 1} · {c.deliveries[latest]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
