"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Lang } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;
const MONTH_MS = 1300;
const MONTHS = 6;
const HOLD_MONTHS = 2;
// Each month compounds on the last.
const HEIGHTS = [26, 36, 50, 66, 86, 110];

const COPY = {
  es: {
    channels: ["Google Ads", "Meta Ads", "SEO / AEO", "Video", "WhatsApp + correo"],
    engine: ["Estrategia", "mensual"],
    growth: "Crecimiento",
    month: "M",
  },
  en: {
    channels: ["Google Ads", "Meta Ads", "SEO / AEO", "Video", "WhatsApp + email"],
    engine: ["Monthly", "strategy"],
    growth: "Growth",
    month: "M",
  },
} as const;

// viewBox 560 × 420: channels on the left, the engine in the middle, the chart on the right.
const CHANNEL_Y = [62, 136, 210, 284, 358];
const ENGINE = { x: 262, y: 210 };
const channelPath = (y: number) => `M166 ${y} C 212 ${y}, 212 ${ENGINE.y}, ${ENGINE.x - 58} ${ENGINE.y}`;
const OUT_PATH = `M${ENGINE.x + 58} ${ENGINE.y} C 350 ${ENGINE.y}, 350 300, 384 300`;

/**
 * Scale (Escala) hero visual: a growth engine. Five channels feed particles into the
 * monthly strategy at the center, which drives a chart that compounds month over month
 * (M1–M6), then starts the next cycle. SVG with SMIL particles; decorative (aria-hidden).
 * With reduced motion: no particles, full chart.
 */
export default function GrowthEngine({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const still = Boolean(useReducedMotion());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setTick((t) => (t + 1) % (MONTHS + HOLD_MONTHS)), MONTH_MS);
    return () => window.clearInterval(id);
  }, [still]);

  const months = still ? MONTHS : Math.min(MONTHS, tick + 1);

  return (
    <div aria-hidden className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-ecom-red/20 blur-[80px]" />
      <div className="relative rounded-2xl border border-white/12 bg-ecom-black/90 p-3 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] sm:p-4">
        <svg viewBox="0 0 560 420" className="h-auto w-full overflow-visible" fontFamily="inherit">
          <defs>
            <radialGradient id="engine-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-ecom-orange)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--color-ecom-red)" stopOpacity="0.15" />
            </radialGradient>
            <linearGradient id="bar-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-ecom-orange)" />
              <stop offset="100%" stopColor="var(--color-ecom-red)" />
            </linearGradient>
          </defs>

          {/* Wires */}
          <g fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="1.5">
            {CHANNEL_Y.map((y) => (
              <path key={y} d={channelPath(y)} />
            ))}
            <path d={OUT_PATH} />
          </g>

          {/* Particles flowing in, and out to the chart */}
          {!still && (
            <g className="fill-ecom-orange">
              {CHANNEL_Y.map((y, i) =>
                [0, 1].map((k) => (
                  <circle key={`${y}-${k}`} r="3.5" opacity="0.9">
                    <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${i * 0.35 + k * 1.1}s`} path={channelPath(y)} />
                  </circle>
                )),
              )}
              {[0, 0.55, 1.1, 1.65].map((b) => (
                <circle key={b} r="4.5">
                  <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${b}s`} path={OUT_PATH} />
                </circle>
              ))}
            </g>
          )}

          {/* Channels */}
          {CHANNEL_Y.map((y, i) => (
            <g key={y}>
              <rect x="4" y={y - 19} width="162" height="38" rx="19" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.14" />
              <circle cx="24" cy={y} r="5" className="fill-ecom-orange" />
              <text x="37" y={y + 5} fill="white" fillOpacity="0.85" fontSize="13.5">
                {c.channels[i]}
              </text>
            </g>
          ))}

          {/* Engine */}
          <circle cx={ENGINE.x} cy={ENGINE.y} r="58" fill="url(#engine-core)" />
          <motion.g
            style={{ originX: `${ENGINE.x}px`, originY: `${ENGINE.y}px` }}
            animate={still ? undefined : { rotate: 360 }}
            transition={{ duration: 9, ease: "linear", repeat: Infinity }}
          >
            <circle cx={ENGINE.x} cy={ENGINE.y} r="70" fill="none" stroke="var(--color-ecom-orange)" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="6 10" />
          </motion.g>
          <text x={ENGINE.x} y={ENGINE.y - 3} textAnchor="middle" fill="white" fontSize="15" fontWeight="600">
            {c.engine[0]}
          </text>
          <text x={ENGINE.x} y={ENGINE.y + 16} textAnchor="middle" fill="white" fontSize="15" fontWeight="600">
            {c.engine[1]}
          </text>

          {/* Chart */}
          <text x="384" y="62" fill="white" fillOpacity="0.55" fontSize="12" letterSpacing="1.5">
            {c.growth.toUpperCase()}
          </text>
          <line x1="384" x2="552" y1="330" y2="330" stroke="white" strokeOpacity="0.15" />
          {HEIGHTS.map((h, i) => {
            const x = 390 + i * 27;
            const on = i < months;
            return (
              <g key={i}>
                <motion.rect
                  x={x}
                  width="18"
                  rx="4"
                  fill="url(#bar-fill)"
                  initial={false}
                  animate={{ y: on ? 330 - h * 2.2 : 330, height: on ? h * 2.2 : 0 }}
                  transition={{ duration: still ? 0 : 0.8, ease: EASE }}
                />
                <text x={x + 9} y="350" textAnchor="middle" fill="white" fillOpacity={on ? 0.7 : 0.3} fontSize="11">
                  {c.month}
                  {i + 1}
                </text>
              </g>
            );
          })}
          <motion.path
            d={`M399 ${330 - HEIGHTS[0] * 2.2} ${HEIGHTS.map((h, i) => `L${399 + i * 27} ${330 - h * 2.2}`).join(" ")}`}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="4 5"
            initial={false}
            animate={{ pathLength: months / MONTHS, opacity: 0.8 }}
            transition={{ duration: still ? 0 : 0.8, ease: EASE }}
          />
        </svg>
      </div>
    </div>
  );
}
