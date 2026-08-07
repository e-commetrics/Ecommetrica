"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";

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
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      // overflow-clip rather than -hidden: both crop the decorative layers
      // below, but `hidden` also makes the section a scroll container, so any
      // overhang lets focus or scrollIntoView jog the whole hero sideways.
      // `clip` can never scroll — see the matching note in Pillars/BigNav.
      className="relative overflow-clip bg-ecom-black text-white"
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
        className="relative shell pt-28 pb-32 lg:pt-40 lg:pb-48"
      >
        {/* Eyebrow and sub sit on one row at opposite edges rather than stacked
            down the left — that asymmetry is what lets the headline below own
            the full width instead of competing with a column of small text. */}
        <motion.div
          variants={item}
          className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16"
        >
          <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
            {t.hero.eyebrow}
          </p>
          <p className="max-w-md text-lg leading-relaxed text-white/60 lg:text-right">
            {t.hero.sub}
          </p>
        </motion.div>

        {/* Fluid size: scales with the viewport so the headline stays edge-to-edge
            at every width instead of stepping between fixed breakpoints. */}
        <motion.h1
          variants={item}
          className="mt-14 text-balance font-display text-[clamp(2.75rem,7.5vw,8.5rem)] leading-[0.95] font-medium tracking-[-0.035em] lg:mt-20"
        >
          {t.hero.headlinePre}{" "}
          <span className="text-ecom-orange">{t.hero.headlineAccent}</span>{" "}
          {t.hero.headlinePost}
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-14 flex flex-wrap items-center gap-6 lg:mt-20"
        >
          <Link
            href={localizedHref(lang, "/#services")}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 text-sm font-medium text-white uppercase tracking-wide transition-colors duration-300 hover:bg-white hover:text-ecom-black"
          >
            {t.hero.ctaServices}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              &#8599;
            </span>
          </Link>
          <Link
            href={localizedHref(lang, "/work")}
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/60 transition-colors duration-300 hover:text-white"
          >
            {t.hero.ctaWork}
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
