"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function RotatingWord({
  words,
  interval = 2800,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words, interval, reduceMotion]);

  const current = words[index % words.length];

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden className="inline-block overflow-clip align-bottom pb-[0.12em] -mb-[0.12em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            className="inline-block"
            initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
