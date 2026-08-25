"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { plans, customPlan, customPlanSummaryMessage, formatUSD } from "@/lib/pricing";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { useRegion } from "@/components/RegionProvider";
import { useContactPrefill } from "@/components/ContactPrefillProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";

export default function Planes() {
  const { t, lang } = useLanguage();
  const p = t.pricingPage;
  const { region } = useRegion();
  const { setPackageSummary } = useContactPrefill();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    // id="planes": #services now belongs to ServicesOverview, so this keeps a pricing deep link under its own name.
    <section
      id="planes"
      ref={sectionRef}
      // overflow-clip, not -hidden: keeps the section from becoming a scroll container.
      className="relative scroll-mt-24 overflow-clip bg-ecom-black py-24 lg:py-32"
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

      <div className="relative shell">
        <Reveal>
          <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-white/50 uppercase">
            {t.planes.eyebrow}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            {t.planes.sub}
          </p>
          <Link
            href={localizedHref(lang, "/pricing")}
            className="group/all mt-5 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-white/70 uppercase transition-colors duration-300 hover:text-white"
          >
            {t.planes.viewAll}
            <span aria-hidden className="transition-transform duration-300 group-hover/all:translate-x-1">
              &rarr;
            </span>
          </Link>
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
                  <span className="absolute -top-3 left-8 rounded-full bg-ecom-orange px-3 py-1 text-xs font-medium tracking-widest text-white uppercase">
                    {t.planes.popular}
                  </span>
                )}
                <h3 className="font-display text-lg font-medium tracking-wide">
                  {plan.name[lang]}
                </h3>
                <p className="mt-5 font-display text-4xl font-medium tracking-[-0.02em]">
                  {formatUSD(plan.priceValue[region])}
                  <span className="ml-1.5 text-sm font-normal tracking-normal text-white/50">
                    / {plan.duration[lang]}
                  </span>
                </p>
                <ul className="mt-8 flex flex-1 flex-col gap-3.5 border-t border-white/10 pt-7 text-sm leading-relaxed text-white/70">
                  {plan.features
                    .filter((feature) => !feature.usOnly || region === "us")
                    .map((feature) => (
                      <li key={feature.text.en} className="flex items-start gap-2.5">
                        <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ecom-orange" />
                        {feature.text[lang]}
                      </li>
                    ))}
                </ul>
                <Link
                  href={`${localizedHref(lang, "/packages")}?plan=${plan.id}`}
                  className={`group/cta mt-9 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    plan.featured
                      ? "bg-white text-ecom-black hover:bg-ecom-orange hover:text-white"
                      : "bg-white/10 hover:bg-ecom-orange"
                  }`}
                >
                  {t.planes.select}
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

        <Reveal delay={plans.length * 0.1}>
          <div className="mt-6 flex flex-col gap-8 rounded-3xl border border-white/12 bg-linear-to-r from-white/[0.04] to-ecom-red/10 p-8 backdrop-blur-sm lg:flex-row lg:items-center lg:gap-12 lg:p-10">
            <div className="lg:w-1/3 lg:shrink-0">
              <h3 className="font-display text-lg font-medium tracking-wide text-white">
                {customPlan.name[lang]}
              </h3>
              <p className="mt-1 text-xs tracking-wide text-white/50 uppercase">
                {customPlan.minDuration[lang]}
              </p>
              <p className="mt-5 font-display text-4xl font-medium tracking-[-0.02em] text-white">
                {p.customFromLabel} {formatUSD(customPlan.priceFromValue[region])}
                <span className="ml-1.5 text-sm font-normal tracking-normal text-white/50">
                  /mo
                </span>
              </p>
              <Link
                href={`${localizedHref(lang, "/contact")}#contact-form`}
                onClick={() =>
                  setPackageSummary(
                    customPlanSummaryMessage(lang, region, t.packagesFlow.messagePlanLabel),
                  )
                }
                className="group/cta mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-medium tracking-wide text-ecom-black transition-colors duration-300 hover:bg-ecom-orange hover:text-white"
              >
                {p.customCta}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover/cta:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12 xl:grid-cols-3">
              {customPlan.modules.map((module) => (
                <div key={module.title.en}>
                  <p className="font-display text-sm font-medium text-white">
                    {module.title[lang]}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                    {module.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
