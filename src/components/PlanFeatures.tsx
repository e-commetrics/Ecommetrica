"use client";

import { useState } from "react";
import Link from "next/link";
import { getPlan, isUsOnlyCell, planNewRows, type Plan } from "@/lib/pricing";
import type { Lang, Region } from "@/lib/i18n/types";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";

/**
 * Shared "what's in this plan" block for Planes.tsx (dark), PricingGrid.tsx and
 * PackagesConfigurator's PlanStep (both light) — one implementation so the three
 * surfaces can't drift out of sync again the way the price label did.
 *
 * Two layers, not one flat list: a row of short tags for scanning a plan in a
 * couple of seconds, and a collapsed full list (inherited-plan line + every
 * feature with its description) for anyone comparing in detail.
 */
export default function PlanFeatures({
  plan,
  lang,
  region,
  variant = "light",
}: {
  plan: Plan;
  lang: Lang;
  region: Region;
  variant?: "light" | "dark";
}) {
  const { t } = useLanguage();
  const p = t.pricingPage;
  const [expanded, setExpanded] = useState(false);

  const visibleFeatures = planNewRows(plan, region);
  const specs = [
    [p.specsLabels.size, plan.specs.size],
    [p.specsLabels.pages, plan.specs.pages[lang]],
    [p.specsLabels.products, plan.specs.products[lang]],
    [p.specsLabels.blog, plan.specs.blog[lang]],
    [p.specsLabels.social, plan.specs.social[lang]],
  ];
  const inheritedPlan = plan.inheritsFromPlanId ? getPlan(plan.inheritsFromPlanId) : undefined;
  const dark = variant === "dark";

  return (
    <div>
      <dl
        className={`mt-6 flex flex-col gap-2 border-t pt-6 ${
          dark ? "border-white/10" : "border-ecom-ink/10"
        }`}
      >
        {specs.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-3">
            <dt className={`text-xs tracking-wide uppercase ${dark ? "text-white/40" : "text-ecom-ink/50"}`}>
              {label}
            </dt>
            <dd className={`text-right text-sm font-medium ${dark ? "text-white/90" : "text-ecom-ink"}`}>
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div
        className={`mt-6 flex flex-wrap gap-2 border-t pt-6 ${
          dark ? "border-white/10" : "border-ecom-ink/10"
        }`}
      >
        {visibleFeatures.map((feature) => (
          <span
            key={feature.id}
            className={`rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${
              dark
                ? "border-white/15 bg-white/[0.04] text-white/80"
                : "border-ecom-ink/12 bg-ecom-ink/[0.03] text-ecom-ink/80"
            }`}
          >
            {(feature.shortLabel ?? feature.text)[lang]}
            {isUsOnlyCell(feature, plan.id, region) && " ★"}
          </span>
        ))}
      </div>

      <button
        type="button"
        // stopPropagation: PlanStep's card is itself a clickable element that selects the
        // plan — without this, toggling the list would also select/deselect it.
        onClick={(event) => {
          event.stopPropagation();
          setExpanded((value) => !value);
        }}
        aria-expanded={expanded}
        className={`mt-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase transition-colors duration-300 ${
          dark ? "text-white/60 hover:text-white" : "text-ecom-ink/60 hover:text-ecom-ink"
        }`}
      >
        {expanded ? p.viewLess : p.viewAllIncluded}
        <span
          aria-hidden
          className={`transition-transform duration-300 ${expanded ? "-rotate-180" : ""}`}
        >
          &darr;
        </span>
      </button>

      {expanded && (
        <ul
          className={`mt-4 flex flex-col gap-3 border-t pt-4 text-sm leading-relaxed ${
            dark ? "border-white/10 text-white/70" : "border-ecom-ink/10 text-ecom-ink/70"
          }`}
        >
          {inheritedPlan && (
            <li
              className={`flex items-start gap-2.5 font-medium ${
                dark ? "text-white/50" : "text-ecom-ink/60"
              }`}
            >
              <span aria-hidden>&#10003;</span>
              <span>{p.includesAllFrom(inheritedPlan.name[lang])}</span>
            </li>
          )}
          {visibleFeatures.map((feature) => (
            <li key={feature.id} className="flex items-start gap-2.5">
              <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ecom-orange" />
              <span>
                {feature.text[lang]}
                {isUsOnlyCell(feature, plan.id, region) && " ★"}
                {feature.description && (
                  <span className={`block italic ${dark ? "text-white/40" : "text-ecom-ink/50"}`}>
                    {feature.description[lang]}
                  </span>
                )}
                {feature.learnMoreSlug && (
                  <Link
                    href={localizedHref(lang, `/${feature.learnMoreSlug}`)}
                    onClick={(event) => event.stopPropagation()}
                    className="ml-1.5 inline-flex items-center gap-1 text-ecom-orange hover:underline"
                  >
                    {p.learnMore}
                    <span aria-hidden>&rarr;</span>
                  </Link>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
