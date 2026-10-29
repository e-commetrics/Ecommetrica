"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import PortalRings from "@/components/PortalRings";
import { localizedHref } from "@/lib/i18n/localizedHref";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: EASE } }),
};

/** One headline line rising out of its own mask. */
function MaskLine({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Studio hero — "portal de anillos": the brand rings as a 3D tunnel (PortalRings) behind a
 * centered three-line headline. Dark in every theme (bg-ecom-black, white text).
 */
export default function PortalHero() {
  const { t, lang } = useLanguage();

  return (
    // overflow-clip, not -hidden: crops the canvas without becoming a scroll container.
    <section className="relative flex min-h-hero items-center overflow-clip bg-ecom-black text-white">
      <PortalRings />

      {/* Dark halo behind the copy: the rings keep moving around it, never through the
          words. Follows the theme's black so it blends into the section in every theme. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 42% 40% at 50% 52%, color-mix(in srgb, var(--color-ecom-black) 92%, transparent) 0%, color-mix(in srgb, var(--color-ecom-black) 70%, transparent) 45%, transparent 75%)",
        }}
      />

      <div className="relative shell flex flex-col items-center pt-32 pb-36 text-center lg:pt-40 lg:pb-44">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.5}
          className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow-dark uppercase"
        >
          {t.hero.eyebrow}
        </motion.p>

        <h1 className="mt-8 max-w-[14ch] font-display text-[clamp(3rem,8.5vw,9.5rem)] leading-[0.9] font-medium tracking-[-0.045em]">
          <MaskLine delay={0.2}>{t.hero.headlinePre}</MaskLine>
          <MaskLine delay={0.32} className="text-ecom-orange">
            {t.hero.headlineAccent}
          </MaskLine>
          <MaskLine delay={0.44}>{t.hero.headlinePost}</MaskLine>
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.8}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/65"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.95}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          <Link
            href={localizedHref(lang, "/#services")}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 btn-text text-ecom-on-accent uppercase tracking-wide transition-colors duration-300 hover:bg-white hover:text-ecom-black"
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
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Seam: dissolves the black into the section that follows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-ecom-surface"
      />
    </section>
  );
}
