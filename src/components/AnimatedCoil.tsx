"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Highlight from "@/components/Highlight";

export default function AnimatedCoil({
  className = "",
  opacity,
}: {
  className?: string;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <motion.div ref={ref} style={reduceMotion ? undefined : { y, x }}>
      <motion.div
        animate={reduceMotion ? undefined : { scaleY: [1, 0.86, 1], scaleX: [1, 1.03, 1] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
        style={{ transformOrigin: "left center" }}
      >
        <Highlight shape="rings" className={className} opacity={opacity} />
      </motion.div>
    </motion.div>
  );
}
