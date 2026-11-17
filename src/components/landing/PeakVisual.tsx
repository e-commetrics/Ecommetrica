"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Lang } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_MS = 800;
const PULSE_S = 0.72;

/** The graph's coordinate space: the SVG viewBox, and the box the HTML nodes are placed in. */
const W = 100;
const H = 104;
const HUB = { x: 12, y: 34, w: 76, h: 36 };
const LOG_ROW_PX = 38;

type NodeId = "store" | "crm" | "whatsapp" | "email" | "payments" | "bi";

type SystemNode = {
  id: NodeId;
  x: number;
  y: number;
  /** Where its wire meets the hub's edge. */
  port: number;
  top: boolean;
  icon: string;
};

const NODES: SystemNode[] = [
  { id: "store", x: 16, y: 14, port: 30, top: true, icon: "M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 0 1 6 0v2" },
  { id: "crm", x: 50, y: 14, port: 50, top: true, icon: "M5 6h14v14H5zM5 10h14M9 4v4M15 4v4" },
  { id: "whatsapp", x: 84, y: 14, port: 70, top: true, icon: "M5 5h14v10h-9l-4 4v-4H5z" },
  { id: "email", x: 16, y: 90, port: 30, top: false, icon: "M4 6h16v12H4zM4 7l8 6 8-6" },
  { id: "payments", x: 50, y: 90, port: 50, top: false, icon: "M3 6h18v12H3zM3 10h18M7 15h3" },
  { id: "bi", x: 84, y: 90, port: 70, top: false, icon: "M5 20V10M12 20V4M19 20v-7" },
];

type Edge = { d: string; portY: number; xs: number[]; ys: number[]; xsBack: number[]; ysBack: number[] };

/** A node's wire to the hub (an S-curve), plus points sampled along it for the pulses. */
function buildEdge(node: SystemNode): Edge {
  const portY = node.top ? HUB.y : HUB.y + HUB.h;
  const midY = (node.y + portY) / 2;
  const cubic = (a: number, b: number, c: number, d: number, t: number) =>
    (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t ** 2 * c + t ** 3 * d;
  const SAMPLES = 16;
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    xs.push(Number(cubic(node.x, node.x, node.port, node.port, t).toFixed(2)));
    ys.push(Number(cubic(node.y, midY, midY, portY, t).toFixed(2)));
  }
  return {
    d: `M${node.x} ${node.y}C${node.x} ${midY} ${node.port} ${midY} ${node.port} ${portY}`,
    portY,
    xs,
    ys,
    xsBack: [...xs].reverse(),
    ysBack: [...ys].reverse(),
  };
}

const EDGES = Object.fromEntries(NODES.map((node) => [node.id, buildEdge(node)])) as Record<NodeId, Edge>;

/** One automation: a system sends data into the command center, which triggers the others. */
const SCENARIOS: { from: NodeId; to: NodeId[] }[] = [
  { from: "store", to: ["payments", "whatsapp"] },
  { from: "crm", to: ["email"] },
  { from: "payments", to: ["bi"] },
  { from: "whatsapp", to: ["crm"] },
  { from: "email", to: ["crm", "bi"] },
];
const N = SCENARIOS.length;

const COPY = {
  es: {
    hub: "Centro de mando",
    live: "En vivo",
    kpis: ["Pedidos", "Leads", "Automático"],
    nodes: { store: "Tienda", crm: "CRM", whatsapp: "WhatsApp", email: "Correo", payments: "Pagos", bi: "BI" },
    events: [
      "Pedido → factura → WhatsApp enviado",
      "Lead nuevo → correo de bienvenida",
      "Pago recibido → reporte BI actualizado",
      "Mensaje → cita en el calendario",
      "Campaña enviada → respuestas al CRM",
    ],
  },
  en: {
    hub: "Command center",
    live: "Live",
    kpis: ["Orders", "Leads", "Automated"],
    nodes: { store: "Store", crm: "CRM", whatsapp: "WhatsApp", email: "Email", payments: "Payments", bi: "BI" },
    events: [
      "Order → invoice → WhatsApp sent",
      "New lead → welcome email",
      "Payment received → BI report updated",
      "Message → calendar booking",
      "Campaign sent → replies to CRM",
    ],
  },
} as const;

/** A dot of data travelling along a wire: into the hub, or (`back`) out of it to a system. */
function Pulse({ id, back = false }: { id: NodeId; back?: boolean }) {
  const edge = EDGES[id];
  const xs = back ? edge.xsBack : edge.xs;
  const ys = back ? edge.ysBack : edge.ys;
  const transition = {
    duration: PULSE_S,
    ease: "linear",
    opacity: { duration: PULSE_S, times: [0, 0.12, 0.85, 1], ease: "linear" },
  } as const;
  return (
    <>
      <motion.circle
        r={2.8}
        className="fill-ecom-orange"
        initial={{ cx: xs[0], cy: ys[0], opacity: 0 }}
        animate={{ cx: xs, cy: ys, opacity: [0, 0.28, 0.28, 0] }}
        transition={transition}
      />
      <motion.circle
        r={0.95}
        className="fill-white"
        initial={{ cx: xs[0], cy: ys[0], opacity: 0 }}
        animate={{ cx: xs, cy: ys, opacity: [0, 1, 1, 0] }}
        transition={transition}
      />
    </>
  );
}

/**
 * Peak hero visual: the business's systems (store, CRM, WhatsApp, email, payments, BI) wired
 * into one command center. An automation fires every few beats: data pulses from one system
 * into the hub, the hub fans it out to the others, they light up, the dashboard's KPIs and
 * chart move, and the run is logged below. It never stops. Decorative (aria-hidden); with
 * reduced motion it shows everything connected and the log filled in, with nothing moving.
 */
export default function PeakVisual({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const still = Boolean(useReducedMotion());
  // Starts one full round in, so the log and the counters are already populated.
  const [tick, setTick] = useState(N * 3);

  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, [still]);

  // Each automation takes three beats: 0 data goes in, 1 the hub sends it out, 2 the targets fire.
  const phase = still ? -1 : tick % 3;
  const run = Math.floor(tick / 3);
  const active = SCENARIOS[run % N];
  const fired = still ? N : run + (phase === 2 ? 1 : 0);
  const timesFired = (scenario: number) => Math.floor((fired + N - 1 - scenario) / N);
  const kpis = [128 + timesFired(0), 42 + timesFired(1), 310 + fired];

  const isSource = (id: NodeId) => phase >= 0 && active.from === id;
  const isTarget = (id: NodeId) => phase >= 1 && active.to.includes(id);
  const wireOn = (id: NodeId) => still || (phase === 0 && isSource(id)) || isTarget(id);
  const nodeOn = (id: NodeId) => still || isSource(id) || (phase === 2 && isTarget(id));
  const hubOn = still || phase >= 1;

  const pct = (value: number, of: number) => `${(value / of) * 100}%`;

  return (
    <div aria-hidden className="relative select-none">
      {/* Glow behind the graph */}
      <div className="pointer-events-none absolute inset-6 rounded-full bg-ecom-red/25 blur-[90px]" />

      <div className="relative aspect-[100/104] w-full">
        <svg viewBox={`0 0 ${W} ${H}`} fill="none" className="absolute inset-0 h-full w-full overflow-visible">
          {/* Orbit around the command center */}
          <motion.circle
            cx={W / 2}
            cy={H / 2}
            r={47}
            className="stroke-white/10"
            strokeWidth={1}
            strokeDasharray="2 7"
            vectorEffect="non-scaling-stroke"
            animate={still ? undefined : { rotate: 360 }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          />
          <circle cx={W / 2} cy={H / 2} r={33} className="stroke-white/[0.06]" strokeWidth={1} vectorEffect="non-scaling-stroke" />

          {NODES.map((node) => {
            const edge = EDGES[node.id];
            const on = wireOn(node.id);
            return (
              <g key={node.id}>
                <path d={edge.d} className="stroke-white/15" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                {/* Idle data flow toward the hub */}
                <motion.path
                  d={edge.d}
                  className="stroke-white/30"
                  strokeWidth={1}
                  strokeDasharray="2 10"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  animate={still ? undefined : { strokeDashoffset: [0, -24] }}
                  transition={{ duration: 1.6, ease: "linear", repeat: Infinity }}
                />
                <path
                  d={edge.d}
                  className="stroke-ecom-orange transition-opacity duration-500"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity={on ? (still ? 0.55 : 0.9) : 0}
                />
                <circle
                  cx={node.port}
                  cy={edge.portY}
                  r={1}
                  className={`transition-colors duration-300 ${on ? "fill-ecom-orange" : "fill-white/40"}`}
                />
              </g>
            );
          })}

          {phase === 0 && <Pulse key={`in-${tick}`} id={active.from} />}
          {phase === 1 && active.to.map((id) => <Pulse key={`out-${tick}-${id}`} id={id} back />)}
        </svg>

        {/* The command center */}
        <div
          className={`absolute flex flex-col overflow-hidden rounded-2xl border bg-ecom-black/90 p-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition-colors duration-500 sm:p-4 ${
            hubOn ? "border-ecom-orange/60" : "border-white/12"
          }`}
          style={{ left: pct(HUB.x, W), top: pct(HUB.y, H), width: pct(HUB.w, W), height: pct(HUB.h, H) }}
        >
          <div className="flex items-center justify-between gap-2 font-mono text-[0.55rem] tracking-[0.14em] uppercase sm:text-[0.68rem]">
            <span className="truncate text-white/60">{c.hub}</span>
            <span className="flex shrink-0 items-center gap-1.5 text-ecom-orange">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-ecom-orange"
                animate={still ? undefined : { opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
              />
              {c.live}
            </span>
          </div>

          <div className="mt-1.5 grid grid-cols-3 gap-1.5 sm:mt-3 sm:gap-3">
            {c.kpis.map((label, i) => (
              <div key={label} className="min-w-0 rounded-lg bg-white/[0.05] px-2 py-1 sm:px-3 sm:py-2">
                <p className="truncate text-[0.5rem] tracking-wide text-white/50 uppercase sm:text-[0.62rem]">{label}</p>
                <p className="overflow-hidden font-display text-base leading-tight font-medium text-white tabular-nums sm:text-2xl">
                  <motion.span
                    key={kpis[i]}
                    className="block"
                    initial={still ? false : { y: "60%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    {kpis[i]}
                  </motion.span>
                </p>
              </div>
            ))}
          </div>

          {/* BI chart: it redraws every time an automation lands */}
          <div className="mt-1.5 flex min-h-0 flex-1 items-end gap-1 sm:mt-3 sm:gap-1.5">
            {Array.from({ length: 12 }, (_, i) => (
              <motion.span
                key={i}
                className={`h-full flex-1 origin-bottom rounded-t-[3px] ${
                  i === 11 ? "bg-linear-to-t from-ecom-red to-ecom-orange" : i > 7 ? "bg-white/30" : "bg-white/15"
                }`}
                initial={false}
                animate={{ scaleY: 0.22 + i * 0.055 + (((i * 7 + fired * 3) % 5) * 0.035) }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            ))}
          </div>
        </div>

        {/* The systems */}
        {NODES.map((node) => {
          const on = nodeOn(node.id);
          const firing = phase === 2 && isTarget(node.id);
          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pct(node.x, W), top: pct(node.y, H) }}
            >
              <span
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border bg-ecom-black transition-colors duration-300 sm:h-14 sm:w-14 ${
                  on ? "border-ecom-orange text-ecom-orange" : "border-white/20 text-white/70"
                }`}
              >
                {firing && (
                  <motion.span
                    key={tick}
                    className="absolute inset-0 rounded-full border border-ecom-orange"
                    initial={{ scale: 1, opacity: 0.9 }}
                    animate={{ scale: 1.9, opacity: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                  />
                )}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[1.125rem] w-[1.125rem] sm:h-6 sm:w-6"
                >
                  <path d={node.icon} />
                </svg>
              </span>
              <span
                className={`absolute left-1/2 -translate-x-1/2 font-mono text-[0.58rem] tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-300 sm:text-[0.7rem] ${
                  node.top ? "bottom-full mb-1.5" : "top-full mt-1.5"
                } ${on ? "text-white" : "text-white/55"}`}
              >
                {c.nodes[node.id]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Automation log: the newest run slides in on top */}
      <div className="relative mt-4 overflow-hidden" style={{ height: LOG_ROW_PX * 3 - 6 }}>
        {[0, 1, 2, 3].map((rank) => {
          const n = fired - 1 - rank;
          if (n < 0) return null;
          return (
            <motion.div
              key={n}
              className="absolute inset-x-0 top-0 flex h-8 items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] px-3"
              initial={still || n < N ? false : { y: -LOG_ROW_PX, opacity: 0 }}
              animate={{ y: rank * LOG_ROW_PX, opacity: [1, 0.6, 0.35, 0][rank] }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 shrink-0 text-ecom-orange"
              >
                <path d="M4.5 10.5l3.5 3.5 7.5-8" />
              </svg>
              <span className="min-w-0 flex-1 truncate text-[0.7rem] text-white/85 sm:text-[0.8rem]">{c.events[n % N]}</span>
              <span className="shrink-0 font-mono text-[0.58rem] tracking-[0.14em] text-white/45 uppercase">auto</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
