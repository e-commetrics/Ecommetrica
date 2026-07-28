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
            "linear-gradient(115deg, transparent 40%, rgba(232,74,52,0.25) 55%, transparent 70%), repeating-linear-gradient(115deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 40px)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-6 pt-24 pb-28 lg:px-10 lg:pt-32 lg:pb-40"
      >
        <motion.p
          variants={item}
          className="text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase"
        >
          Ecommetrica Studio
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-6xl lg:text-[5.25rem]"
        >
          We build brands that transform industries and boost businesses.
        </motion.h1>
        <motion.p variants={item} className="mt-8 max-w-xl text-lg text-white/60">
          Through strategies based on market realities.
        </motion.p>
        <motion.div variants={item} className="mt-10">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 rounded-full bg-ecom-orange px-7 py-3.5 text-sm font-medium text-white uppercase tracking-wide transition-colors hover:bg-white hover:text-ecom-black"
          >
            Discover the services
            <span aria-hidden>&#8599;</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
