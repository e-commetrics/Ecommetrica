"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useReducedMotion } from "framer-motion";
import type { ServiceLayer, ServiceLayerId } from "@/lib/services";

const EASE = [0.22, 1, 0.36, 1] as const;
const RX = 230;
const RY = 46;
const DRAW_S = 1.6;

/** Each ring sits a step down and to the left of the one above — the brand coil. */
const ringCenter = (i: number) => ({ cx: 300 - i * 22, cy: 70 + i * 40 });

/**
 * The brand rings redrawn as SVG, one ring per service layer, so each can be animated
 * and lit on its own: they draw in when scrolled into view, then sway continuously,
 * with a dot orbiting the active ring. Clicking a ring selects its layer — the layer
 * buttons next to it (ServicesOverview) are the accessible control, so the SVG itself
 * stays aria-hidden.
 */
export default function ServiceRings({
  layers,
  active,
  onSelect,
  className = "",
}: {
  layers: ServiceLayer[];
  active: ServiceLayerId | null;
  onSelect?: (id: ServiceLayerId) => void;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const dotRef = useRef<SVGCircleElement>(null);
  const activeIndex = Math.max(0, layers.findIndex((layer) => layer.id === active));

  useAnimationFrame((time) => {
    const dot = dotRef.current;
    if (!dot || reduceMotion) return;
    const { cx, cy } = ringCenter(activeIndex);
    const angle = (time / 1000) * 0.9;
    dot.setAttribute("cx", String(cx + RX * Math.cos(angle)));
    dot.setAttribute("cy", String(cy + RY * Math.sin(angle)));
  });

  return (
    <svg
      viewBox="0 0 560 300"
      aria-hidden
      className={`h-auto w-full overflow-visible ${className}`}
    >
      {layers.map((layer, i) => {
        const { cx, cy } = ringCenter(i);
        const isActive = i === activeIndex && active !== null;
        return (
          <motion.g
            key={layer.id}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={reduceMotion ? undefined : { x: [0, -14, 0], scaleY: [1, 0.9, 1] }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              delay: DRAW_S + i * 0.35,
            }}
          >
            <motion.ellipse
              cx={cx}
              cy={cy}
              rx={RX}
              ry={RY}
              fill="none"
              stroke="var(--color-ecom-orange)"
              strokeLinecap="round"
              onClick={onSelect ? () => onSelect(layer.id) : undefined}
              className={onSelect ? "cursor-pointer" : undefined}
              style={{ pointerEvents: onSelect ? "stroke" : "none" }}
              // Lit/dim goes through `animate`, not `style`: a motion element only
              // reads `style` once, so later highlight changes would be ignored.
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0.38, strokeWidth: 14 }}
              animate={{
                opacity: isActive ? 1 : active ? 0.22 : 0.38,
                strokeWidth: isActive ? 18 : 14,
              }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                pathLength: { duration: DRAW_S, delay: i * 0.14, ease: EASE },
                default: { duration: 0.45, ease: EASE },
              }}
            />
            {isActive && !reduceMotion && (
              <motion.circle
                ref={dotRef}
                r={9}
                cx={cx + RX}
                cy={cy}
                fill="var(--color-ecom-orange)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: DRAW_S }}
              />
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}
