"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ecom-black text-white"
    >
      {/* Placeholder diagonal backdrop — swap for real photography when available */}
      <motion.div
        aria-hidden
        style={{ y: backdropY }}
        className="pointer-events-none absolute inset-0 opacity-40"
        initial={{
          background:
            "linear-gradient(115deg, transparent 40%, color-mix(in srgb, var(--color-ecom-orange) 25%, transparent) 55%, transparent 70%), repeating-linear-gradient(115deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 40px)",
        }}
      />

      {/* Accent glow anchored behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-24 -left-32 h-[38rem] w-[38rem] rounded-full bg-ecom-orange/20 blur-[120px]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-6 pt-28 pb-32 lg:px-10 lg:pt-40 lg:pb-48"
      >
        <motion.p
          variants={item}
          className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase"
        >
          Ecommetrica Studio
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-8 max-w-5xl text-balance font-display text-[2.75rem] leading-[1.02] font-medium tracking-[-0.02em] sm:text-6xl lg:text-[5.5rem]"
        >
          We build brands that{" "}
          <span className="text-ecom-orange">transform industries</span> and
          boost businesses.
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/60"
        >
          Through strategies based on market realities.
        </motion.p>
        <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-6">
          <Link
            href="/#services"
            className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 text-sm font-medium text-white uppercase tracking-wide transition-colors duration-300 hover:bg-white hover:text-ecom-black"
          >
            Discover the services
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              &#8599;
            </span>
          </Link>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/60 transition-colors duration-300 hover:text-white"
          >
            See our work
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Seam: dissolves the black into the cream section that follows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-ecom-surface"
      />
    </section>
  );
}
