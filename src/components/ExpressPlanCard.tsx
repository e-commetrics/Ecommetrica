"use client";

import Link from "next/link";
import { getPlan, formatUSD, planServiceCount } from "@/lib/pricing";
import PlanFeatures from "@/components/PlanFeatures";
import { useLanguage } from "@/components/LanguageProvider";
import { useRegion } from "@/components/RegionProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";

export default function ExpressPlanCard({
  variant = "light",
  ctaLabel,
}: {
  variant?: "light" | "dark";
  ctaLabel: string;
}) {
  const { t, lang } = useLanguage();
  const { region } = useRegion();
  const p = t.pricingPage;
  const plan = getPlan("express");
  if (!plan) return null;
  const dark = variant === "dark";

  return (
    <div
      className={`flex flex-col gap-8 rounded-3xl border p-7 lg:flex-row lg:gap-12 lg:p-9 ${
        dark
          ? "border-white/12 bg-linear-to-r from-white/[0.04] to-ecom-red/10 text-white backdrop-blur-sm"
          : "border-ecom-ink/12"
      }`}
    >
      <div className="lg:w-2/5 lg:shrink-0">
        <p className="text-xs font-medium tracking-[0.15em] text-ecom-orange uppercase">
          {p.stageLabel} · {plan.stage[lang]}
        </p>
        <h3
          className={`mt-3 font-display text-lg font-medium tracking-wide ${
            dark ? "text-white" : "text-ecom-ink"
          }`}
        >
          {plan.name[lang]}
        </h3>
        <p className={`mt-1 text-xs tracking-wide uppercase ${dark ? "text-white/50" : "text-ecom-ink/50"}`}>
          {plan.duration[lang]}
        </p>
        <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-white/60" : "text-ecom-ink/70"}`}>
          {plan.tagline[lang]}
        </p>
        <p
          className={`mt-5 font-display text-4xl font-medium tracking-[-0.02em] ${
            dark ? "text-white" : "text-ecom-ink"
          }`}
        >
          {formatUSD(plan.priceValue[region])}
        </p>
        <p className={`mt-1 text-xs ${dark ? "text-white/40" : "text-ecom-ink/50"}`}>
          {p.oneTimeLabel} · {planServiceCount(plan, region)} {p.servicesLabel}
        </p>
        {plan.note && (
          <p
            className={`mt-4 rounded-lg px-3 py-2 text-xs font-medium ${
              dark ? "bg-white/[0.06] text-white/70" : "bg-ecom-ink/5 text-ecom-ink/70"
            }`}
          >
            {plan.note[lang]}
          </p>
        )}
        <Link
          href={`${localizedHref(lang, "/packages")}?plan=${plan.id}`}
          className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
            dark
              ? "bg-white text-ecom-black hover:bg-ecom-orange hover:text-white"
              : "bg-ecom-ink/5 text-ecom-ink hover:bg-ecom-orange hover:text-white"
          }`}
        >
          {ctaLabel}
        </Link>
      </div>

      <div className="flex-1">
        <PlanFeatures plan={plan} lang={lang} region={region} variant={variant} />
      </div>
    </div>
  );
}
