"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { plans } from "@/lib/pricing";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";

export default function Planes() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    // `#services` now belongs to ServicesOverview — the CTA that pointed here
    // said "discover the services" and landed on pricing. This keeps a pricing
    // deep link available under its own name.
    <section
      id="planes"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-ecom-black py-24 lg:py-32"
    >
      <motion.div
        aria-hidden
        style={{ x: drift }}
        className="pointer-events-none absolute inset-x-0 top-40 select-none text-center lg:top-16"
      >
        <span className="text-stroke font-display text-[16vw] leading-none font-medium text-white/20">
          {t.planes.bigWord}
        </span>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-40 h-[30rem] w-[30rem] rounded-full bg-ecom-red/15 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-white/50 uppercase">
            {t.planes.eyebrow}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            {t.planes.sub}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.name.en} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-8 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 ${
                  plan.featured
                    ? "border-ecom-orange/60 bg-linear-to-b from-ecom-red to-ecom-black text-white shadow-[0_30px_70px_-35px_var(--color-ecom-orange)]"
                    : "border-white/12 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.07]"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-ecom-orange px-3 py-1 text-[0.65rem] font-medium tracking-widest text-white uppercase">
                    {t.planes.popular}
                  </span>
                )}
                <h3 className="font-display text-lg font-medium tracking-wide">
                  {plan.name[lang]}
                </h3>
                <p className="mt-5 font-display text-4xl font-medium tracking-[-0.02em]">
                  {plan.price}
                  <span className="ml-1.5 text-sm font-normal tracking-normal text-white/50">
                    / {plan.duration[lang]}
                  </span>
                </p>
                <ul className="mt-8 flex flex-1 flex-col gap-3.5 border-t border-white/10 pt-7 text-sm leading-relaxed text-white/70">
                  {plan.features.map((feature) => (
                    <li key={feature.en} className="flex items-start gap-2.5">
                      <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ecom-orange" />
                      {feature[lang]}
                    </li>
                  ))}
                </ul>
                <Link
                  href={localizedHref(lang, "/contact")}
                  className={`group/cta mt-9 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    plan.featured
                      ? "bg-white text-ecom-black hover:bg-ecom-orange hover:text-white"
                      : "bg-white/10 hover:bg-ecom-orange"
                  }`}
                >
                  {t.nav.talk}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover/cta:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
