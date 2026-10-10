"use client";

import Link from "next/link";
import {
  plans,
  formatUSD,
  planTotal,
  planPerService,
  planServiceCount,
} from "@/lib/pricing";
import PlanFeatures from "@/components/PlanFeatures";
import ExpressPlanCard from "@/components/ExpressPlanCard";
import PlanMatrix from "@/components/PlanMatrix";
import CustomPlanBanner from "@/components/CustomPlanBanner";
import { useLanguage } from "@/components/LanguageProvider";
import { useRegion } from "@/components/RegionProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";

export default function PricingGrid() {
  const { t, lang } = useLanguage();
  const { region } = useRegion();
  const p = t.pricingPage;

  return (
    <div className="shell py-20 lg:py-28">
      <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
        {p.eyebrow}
      </p>
      <h1 className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
        {p.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ecom-ink/70">{p.sub}</p>

      <div className="mt-10 rounded-2xl border-l-4 border-ecom-orange bg-ecom-ink/[0.03] p-6">
        <p className="text-ecom-ink">
          <span className="font-medium">{region === "us" ? p.bannerTitleUs : p.bannerTitle}</span>{" "}
          {p.bannerBody}
        </p>
      </div>

      <div className="mt-14">
        <ExpressPlanCard ctaLabel={p.selectCta} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        {plans
          .filter((plan) => !plan.oneTime)
          .map((plan) => {
          const total = planTotal(plan, region);
          const perService = planPerService(plan, region);
          return (
            <div
              key={plan.id}
              className={`relative flex h-full flex-col rounded-3xl border p-7 ${
                plan.featured
                  ? "border-ecom-orange bg-ecom-orange/[0.05]"
                  : "border-ecom-ink/12"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-ecom-orange px-3 py-1 text-xs font-medium tracking-widest text-white uppercase">
                  {p.bestValueBadge}
                </span>
              )}
              <p className="mb-3 text-xs font-medium tracking-[0.15em] text-ecom-orange uppercase">
                {plan.stage[lang]}
              </p>
              <h3 className="font-display text-lg font-medium tracking-wide text-ecom-ink">
                {plan.name[lang]}
              </h3>
              <p className="mt-1 text-xs tracking-wide text-ecom-ink/50 uppercase">
                {plan.duration[lang]}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ecom-ink/70">{plan.tagline[lang]}</p>

              <p className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-ecom-ink">
                {formatUSD(plan.priceValue[region])}
                <span className="ml-1 text-sm font-normal text-ecom-ink/50">{p.perMonth}</span>
              </p>
              <p className="mt-1 text-xs text-ecom-ink/50">
                {p.totalLabel} {formatUSD(total)} · {planServiceCount(plan, region)} {p.servicesLabel}
              </p>
              <p
                className={`mt-3 rounded-lg px-3 py-2 text-xs font-medium ${
                  plan.featured
                    ? "bg-ecom-orange/10 text-ecom-orange"
                    : "bg-ecom-ink/5 text-ecom-ink/70"
                }`}
              >
                {formatUSD(perService)} {p.perServiceLabel}
                {plan.featured ? ` — ${p.lowestBadge}` : ""}
              </p>

              <div className="flex-1">
                <PlanFeatures plan={plan} lang={lang} region={region} variant="light" />
              </div>

              <Link
                href={`${localizedHref(lang, "/packages")}?plan=${plan.id}`}
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  plan.featured
                    ? "bg-ecom-orange text-white hover:bg-ecom-ink"
                    : "bg-ecom-ink/5 text-ecom-ink hover:bg-ecom-orange hover:text-white"
                }`}
              >
                {p.selectCta}
              </Link>
            </div>
          );
        })}
      </div>

      {region === "us" && <p className="mt-6 text-sm text-ecom-ink/50">{p.footnote}</p>}

      <CustomPlanBanner />

      <PlanMatrix />

      <p className="mt-10 border-t border-ecom-ink/10 pt-6 text-sm text-ecom-ink/50">{p.footer}</p>
    </div>
  );
}
