"use client";

import Link from "next/link";
import { customPlan, customPlanSummaryMessage, formatUSD } from "@/lib/pricing";
import { useLanguage } from "@/components/LanguageProvider";
import { useRegion } from "@/components/RegionProvider";
import { useContactPrefill } from "@/components/ContactPrefillProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";

export default function CustomPlanBanner({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { t, lang } = useLanguage();
  const { region } = useRegion();
  const { setPackageSummary } = useContactPrefill();
  const p = t.pricingPage;
  const dark = variant === "dark";

  return (
    <div
      className={`mt-6 flex flex-col gap-8 rounded-3xl border p-8 lg:flex-row lg:items-center lg:gap-12 lg:p-10 ${
        dark
          ? "border-white/12 bg-linear-to-r from-white/[0.04] to-ecom-red/10 backdrop-blur-sm"
          : "border-ecom-ink/12"
      }`}
    >
      <div className="lg:w-1/3 lg:shrink-0">
        <h3
          className={`font-display text-lg font-medium tracking-wide ${
            dark ? "text-white" : "text-ecom-ink"
          }`}
        >
          {customPlan.name[lang]}
        </h3>
        <p
          className={`mt-1 text-xs tracking-wide uppercase ${
            dark ? "text-white/50" : "text-ecom-ink/50"
          }`}
        >
          {customPlan.minDuration[lang]}
        </p>
        <p
          className={`mt-3 text-sm leading-relaxed ${dark ? "text-white/60" : "text-ecom-ink/70"}`}
        >
          {customPlan.tagline[lang]}
        </p>
        <ul
          className={`mt-4 flex flex-col gap-1.5 text-sm leading-relaxed ${
            dark ? "text-white/60" : "text-ecom-ink/70"
          }`}
        >
          {customPlan.highlights
            .filter((highlight) => !highlight.usOnly || region === "us")
            .map((highlight) => (
              <li key={highlight.text.en}>
                {highlight.text[lang]}
                {highlight.usOnly && " ★"}
              </li>
            ))}
        </ul>
        <p
          className={`mt-5 font-display text-4xl font-medium tracking-[-0.02em] ${
            dark ? "text-white" : "text-ecom-ink"
          }`}
        >
          {p.customFromLabel} {formatUSD(customPlan.priceFromValue[region])}
          <span
            className={`ml-1.5 text-sm font-normal tracking-normal ${
              dark ? "text-white/50" : "text-ecom-ink/50"
            }`}
          >
            {p.perMonth}
          </span>
        </p>
        <Link
          href={`${localizedHref(lang, "/contact")}#contact-form`}
          onClick={() =>
            setPackageSummary(
              customPlanSummaryMessage(lang, region, t.packagesFlow.messagePlanLabel, p.perMonth),
            )
          }
          className={`group/cta mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-ecom-orange hover:text-white ${
            dark ? "bg-white text-ecom-black" : "bg-ecom-ink/5 text-ecom-ink"
          }`}
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

      <div
        className={`grid flex-1 grid-cols-1 gap-6 border-t pt-8 sm:grid-cols-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12 xl:grid-cols-3 ${
          dark ? "border-white/10" : "border-ecom-ink/10"
        }`}
      >
        {customPlan.modules.map((module) => (
          <div key={module.title.en}>
            <p
              className={`font-display text-sm font-medium ${
                dark ? "text-white" : "text-ecom-ink"
              }`}
            >
              {module.title[lang]}
            </p>
            <p
              className={`mt-1.5 text-sm leading-relaxed ${
                dark ? "text-white/60" : "text-ecom-ink/60"
              }`}
            >
              {module.description[lang]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
