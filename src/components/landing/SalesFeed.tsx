"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Lang } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;
const EVENT_MS = 1700;

type Kind = "order" | "booking" | "review" | "ads";

const COPY = {
  es: {
    title: "Ventas · últimos 30 días",
    live: "En vivo",
    kpis: ["Pedidos", "Reservas", "Reseñas"],
    pay: "Pagar",
    paid: "Pagado",
    events: [
      { kind: "order", text: "Pedido pagado", detail: "$1,250" },
      { kind: "booking", text: "Reserva confirmada", detail: "Sáb · 6:00 pm" },
      { kind: "review", text: "Nueva reseña", detail: "★★★★★" },
      { kind: "ads", text: "Campaña Meta", detail: "+34 visitas" },
      { kind: "order", text: "Pedido pagado", detail: "$680" },
      { kind: "booking", text: "Reserva confirmada", detail: "Lun · 10:30 am" },
    ],
  },
  en: {
    title: "Sales · last 30 days",
    live: "Live",
    kpis: ["Orders", "Bookings", "Reviews"],
    pay: "Pay",
    paid: "Paid",
    events: [
      { kind: "order", text: "Order paid", detail: "$1,250" },
      { kind: "booking", text: "Booking confirmed", detail: "Sat · 6:00 pm" },
      { kind: "review", text: "New review", detail: "★★★★★" },
      { kind: "ads", text: "Meta campaign", detail: "+34 visits" },
      { kind: "order", text: "Order paid", detail: "$680" },
      { kind: "booking", text: "Booking confirmed", detail: "Mon · 10:30 am" },
    ],
  },
} as const;

// An upward revenue line (viewBox 300×110) and the area under it.
const LINE = "M0 92 C 30 88, 45 80, 70 78 S 110 70, 130 64 S 170 60, 190 46 S 230 40, 250 28 S 285 16, 300 10";
const AREA = `${LINE} L300 110 L0 110 Z`;

function Icon({ kind }: { kind: Kind }) {
  const paths: Record<Kind, string> = {
    order: "M5 7h14l-1.5 9H6.5zM9 7V5a3 3 0 0 1 6 0v2",
    booking: "M5 6h14v13H5zM5 10h14M9 4v4M15 4v4",
    review: "M12 4l2.4 5 5.4.6-4 3.7 1.1 5.3L12 16l-4.9 2.6 1.1-5.3-4-3.7 5.4-.6z",
    ads: "M4 13l12-6v12L4 13zm12-2h3v4h-3",
  };
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <path d={paths[kind]} />
    </svg>
  );
}

/**
 * Traction (Tracción) hero visual: the site, selling. A live sales dashboard — the revenue
 * line draws itself, the KPIs tick up — while a checkout flips to "paid" and live events
 * (paid orders, confirmed bookings, reviews, the Meta campaign) stream in. Loops forever.
 * Decorative (aria-hidden); with reduced motion it shows a filled, still dashboard.
 */
export default function SalesFeed({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const still = Boolean(useReducedMotion());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setTick((t) => t + 1), EVENT_MS);
    return () => window.clearInterval(id);
  }, [still]);

  const n = still ? 3 : tick;
  // Newest first; three on screen.
  const feed = [0, 1, 2]
    .map((back) => n - back)
    .filter((i) => i >= 0)
    .map((i) => ({ id: i, ...c.events[i % c.events.length] }));
  const kpis = [128 + n * 3, 42 + Math.floor(n / 2) * 2, 310 + Math.floor(n / 3)];
  const paid = n % 2 === 1;

  return (
    <div aria-hidden className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-ecom-red/20 blur-[80px]" />

      <div className="relative">
        {/* Dashboard */}
        <div className="rounded-2xl border border-white/12 bg-ecom-black/90 p-5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] sm:mr-16">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.65rem] tracking-[0.12em] text-white/55 uppercase">{c.title}</p>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.15em] text-ecom-orange uppercase">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-ecom-orange"
                animate={still ? undefined : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              {c.live}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {c.kpis.map((label, i) => (
              <div key={label} className="rounded-xl bg-white/[0.05] px-3 py-2.5">
                <p className="text-[0.6rem] text-white/50">{label}</p>
                <motion.p key={kpis[i]} initial={{ y: still ? 0 : 6, opacity: still ? 1 : 0.4 }} animate={{ y: 0, opacity: 1 }} className="font-display text-xl font-medium text-white tabular-nums">
                  {kpis[i]}
                </motion.p>
              </div>
            ))}
          </div>

          <svg viewBox="0 0 300 110" className="mt-4 h-28 w-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sales-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-ecom-orange)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--color-ecom-orange)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[28, 55, 82].map((y) => (
              <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="white" strokeOpacity="0.07" />
            ))}
            <motion.path d={AREA} fill="url(#sales-area)" initial={false} animate={{ opacity: 1 }} />
            <motion.path
              d={LINE}
              fill="none"
              stroke="var(--color-ecom-orange)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: still ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: EASE }}
            />
            <motion.circle
              cx="300"
              cy="10"
              r="4"
              fill="var(--color-ecom-orange)"
              animate={still ? undefined : { r: [4, 7, 4], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.7, repeat: Infinity }}
            />
          </svg>
        </div>

        {/* Checkout */}
        <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-white/12 bg-ecom-black/95 p-3 pr-4 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.95)]">
          <span className="h-9 w-9 rounded-lg bg-linear-to-br from-ecom-red to-ecom-orange/80" />
          <span className="space-y-1.5">
            <span className="block h-1.5 w-16 rounded-full bg-white/50" />
            <span className="block h-1.5 w-10 rounded-full bg-white/25" />
          </span>
          <motion.span
            layout
            className={`ml-2 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${
              paid ? "bg-[#34C759] text-ecom-black" : "bg-ecom-orange text-ecom-on-accent"
            }`}
          >
            {paid ? `✓ ${c.paid}` : c.pay}
          </motion.span>
        </div>

        {/* Live events */}
        <div className="absolute top-[42%] right-0 hidden w-56 space-y-2 sm:block">
          <AnimatePresence initial={false}>
            {feed.map((event, i) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1 - i * 0.22, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex items-center gap-3 rounded-xl border border-white/12 bg-ecom-black/95 px-3 py-2.5 shadow-[0_20px_40px_-25px_rgba(0,0,0,0.95)] backdrop-blur"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ecom-orange/15 text-ecom-orange">
                  <Icon kind={event.kind} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-medium text-white">{event.text}</span>
                  <span className="block text-[0.65rem] text-white/55">{event.detail}</span>
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="h-6" />
    </div>
  );
}
