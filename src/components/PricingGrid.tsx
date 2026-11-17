"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  plans,
  matrix,
  formatUSD,
  formatSaving,
  planTotal,
  planPerService,
  planServiceCount,
  planHasRow,
  type Plan,
  type PlanId,
} from "@/lib/pricing";
import PlanFeatures from "@/components/PlanFeatures";
import PartnerTeaser from "@/components/PartnerTeaser";
import { smoothScrollTo } from "@/components/SmoothScroll";
import { useLanguage } from "@/components/LanguageProvider";
import { useRegion } from "@/components/RegionProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The monthly plans; AI Express (one-time) lives on its own landing, reached from the menu. */
const MONTHLY = plans.filter((plan) => !plan.oneTime);

/**
 * /pricing: help people pick a plan rather than read every feature. A stage chooser
 * recommends one, every card says who it's for ("Elígelo si"), and any two plans can be
 * compared side by side — only their differences and what the bigger one adds. The full
 * feature matrix is deliberately not shown here.
 */
export default function PricingGrid() {
  const { t, lang } = useLanguage();
  const { region } = useRegion();
  const p = t.pricingPage;
  const [recommended, setRecommended] = useState<PlanId | null>(null);
  const [compare, setCompare] = useState<PlanId[]>([]);

  const toggleCompare = (id: PlanId) => {
    const next = compare.includes(id)
      ? compare.filter((value) => value !== id)
      : compare.length < 2
        ? [...compare, id]
        : [compare[1], id];
    setCompare(next);
    if (next.length === 2) requestAnimationFrame(() => smoothScrollTo("#compare"));
  };

  // Picking a stage never moves the page (a jump left the stage buttons under the header
  // that slides back in after a scroll); the "Ver plan" link scrolls only when asked.
  const recommendedPlan = MONTHLY.find((plan) => plan.id === recommended);

  // Lower plan first, whatever order they were picked in.
  const pair = MONTHLY.filter((plan) => compare.includes(plan.id));

  return (
    <div className="shell py-20 lg:py-28">
      <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow uppercase">{p.eyebrow}</p>
      <h1 className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
        {p.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ecom-ink/70">{p.sub}</p>

      {/* Stage chooser */}
      <section aria-labelledby="chooser-title" className="mt-12 rounded-3xl border border-ecom-ink/12 p-6 sm:p-8">
        <h2 id="chooser-title" className="font-display text-2xl font-medium text-ecom-ink">
          {p.chooserTitle}
        </h2>
        <p className="mt-1 text-ecom-meta">{p.chooserSub}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {MONTHLY.map((plan) => (
            <button
              key={plan.id}
              type="button"
              aria-pressed={recommended === plan.id}
              onClick={() => setRecommended(plan.id)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                recommended === plan.id
                  ? "border-ecom-orange bg-ecom-orange text-ecom-on-accent"
                  : "border-ecom-ink/20 text-ecom-ink hover:border-ecom-orange hover:text-ecom-eyebrow"
              }`}
            >
              {plan.stage[lang]}
            </button>
          ))}
        </div>
        {recommendedPlan && (
          <p aria-live="polite" className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-ecom-ink">
            <span>
              {p.chooserResult} <span className="font-display text-lg font-medium">{recommendedPlan.name[lang]}</span>{" "}
              <span className="text-ecom-meta">
                · {formatUSD(recommendedPlan.priceValue[region])}
                {p.perMonth}
              </span>
            </span>
            <a
              href={`#plan-${recommendedPlan.id}`}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(`#plan-${recommendedPlan.id}`, -140);
              }}
              className="group inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-ecom-eyebrow uppercase"
            >
              {p.chooserSee}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">&darr;</span>
            </a>
          </p>
        )}
      </section>

      {/* Plans */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {MONTHLY.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            recommended={recommended === plan.id}
            comparing={compare.includes(plan.id)}
            onCompare={() => toggleCompare(plan.id)}
          />
        ))}
      </div>
      {region === "us" && <p className="mt-6 text-sm text-ecom-meta">{p.footnote}</p>}

      {/* Two-plan compare */}
      <AnimatePresence>
        {pair.length === 2 && (
          <motion.section
            id="compare"
            key="compare"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-12 scroll-mt-28 overflow-hidden rounded-3xl border border-ecom-orange"
          >
            <ComparePanel lower={pair[0]} upper={pair[1]} onClear={() => setCompare([])} />
          </motion.section>
        )}
      </AnimatePresence>

      <div className="mt-12">
        <PartnerTeaser />
      </div>

      {/* How to choose */}
      <section className="mt-24">
        <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow uppercase">{p.guideEyebrow}</p>
        <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-medium tracking-[-0.03em] text-ecom-ink">
          {p.guideTitle}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {p.guide.map((item, i) => (
            <div key={item.title} className="border-t border-ecom-ink/15 pt-5">
              <p className="font-display text-sm text-ecom-eyebrow">0{i + 1}</p>
              <h3 className="mt-3 font-display text-xl font-medium text-ecom-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ecom-meta">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 border-t border-ecom-ink/10 pt-6 text-sm text-ecom-meta">{p.footer}</p>

      {/* One plan picked: ask for the second */}
      <AnimatePresence>
        {compare.length === 1 && (
          <motion.div
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            exit={{ y: "120%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ecom-black/95 p-3 pl-5 text-sm text-white shadow-2xl backdrop-blur"
            role="status"
          >
            <span>
              <span className="font-medium">{MONTHLY.find((plan) => plan.id === compare[0])?.name[lang]}</span>
              <span className="text-white/60"> · {p.compareTrayOne}</span>
            </span>
            <button
              type="button"
              onClick={() => setCompare([])}
              className="shrink-0 rounded-full border border-white/20 px-4 py-2 text-xs transition-colors hover:border-ecom-orange hover:text-ecom-orange"
            >
              {p.compareClear}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlanCard({
  plan,
  recommended,
  comparing,
  onCompare,
}: {
  plan: Plan;
  recommended: boolean;
  comparing: boolean;
  onCompare: () => void;
}) {
  const { t, lang } = useLanguage();
  const { region } = useRegion();
  const p = t.pricingPage;
  const strong = recommended || plan.featured;

  return (
    <div
      id={`plan-${plan.id}`}
      className={`relative flex h-full scroll-mt-32 flex-col rounded-3xl border p-7 transition-[border-color,box-shadow,background-color] duration-500 ${
        recommended
          ? "border-ecom-orange bg-ecom-orange/[0.07] shadow-[0_24px_60px_-30px_var(--color-ecom-orange)]"
          : plan.featured
            ? "border-ecom-orange/60 bg-ecom-orange/[0.04]"
            : "border-ecom-ink/12"
      }`}
    >
      {(recommended || plan.featured) && (
        <span className="absolute -top-3 left-7 rounded-full bg-ecom-orange px-3 py-1 text-xs font-medium tracking-widest text-ecom-on-accent uppercase">
          {recommended ? p.recommendedBadge : p.bestValueBadge}
        </span>
      )}
      <p className="mb-3 text-xs font-medium tracking-[0.15em] text-ecom-eyebrow uppercase">{plan.stage[lang]}</p>
      <h3 className="font-display text-2xl font-medium text-ecom-ink">{plan.name[lang]}</h3>
      <p className="mt-1 text-xs tracking-wide text-ecom-meta uppercase">{plan.duration[lang]}</p>
      <p className="mt-3 text-sm leading-relaxed text-ecom-ink/70">{plan.tagline[lang]}</p>

      <p className="mt-5 font-display text-3xl font-medium tracking-[-0.02em] text-ecom-ink">
        {formatUSD(plan.priceValue[region])}
        <span className="ml-1 text-sm font-normal text-ecom-meta">{p.perMonth}</span>
      </p>
      <p className="mt-1 text-xs text-ecom-meta">
        {p.totalLabel} {formatUSD(planTotal(plan, region))} · {planServiceCount(plan, region)} {p.servicesLabel}
      </p>

      {plan.chooseIf && (
        <div className="mt-5 rounded-2xl bg-ecom-ink/[0.04] p-4">
          <p className="text-xs font-medium tracking-[0.12em] text-ecom-eyebrow uppercase">{p.chooseIfLabel}</p>
          <ul className="mt-2.5 space-y-2">
            {plan.chooseIf.map((item) => (
              <li key={item.en} className="flex gap-2 text-sm leading-snug text-ecom-ink">
                <span aria-hidden className="text-ecom-eyebrow">&#10003;</span>
                {item[lang]}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex-1">
        <PlanFeatures plan={plan} lang={lang} region={region} variant="light" />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          href={`${localizedHref(lang, "/packages")}?plan=${plan.id}`}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 btn-text tracking-wide uppercase transition-colors duration-300 ${
            strong
              ? "bg-ecom-orange text-ecom-on-accent hover:bg-ecom-accent-hover hover:text-ecom-on-accent-hover"
              : "bg-ecom-ink/5 text-ecom-ink hover:bg-ecom-orange hover:text-ecom-on-accent"
          }`}
        >
          {p.selectCta}
        </Link>
        <button
          type="button"
          aria-pressed={comparing}
          onClick={onCompare}
          className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
            comparing
              ? "border-ecom-orange text-ecom-eyebrow"
              : "border-ecom-ink/15 text-ecom-ink/70 hover:border-ecom-orange hover:text-ecom-eyebrow"
          }`}
        >
          <span
            aria-hidden
            className={`flex h-4 w-4 items-center justify-center rounded border text-[0.65rem] ${
              comparing ? "border-ecom-orange bg-ecom-orange text-ecom-on-accent" : "border-current"
            }`}
          >
            {comparing ? "✓" : ""}
          </span>
          {comparing ? p.compareAdded : p.compareAdd}
        </button>
      </div>
    </div>
  );
}

function ComparePanel({ lower, upper, onClear }: { lower: Plan; upper: Plan; onClear: () => void }) {
  const { t, lang } = useLanguage();
  const { region } = useRegion();
  const p = t.pricingPage;
  const pct = (plan: Plan) => {
    const value = plan.savingPercent[region];
    return value === null ? "—" : formatSaving(value);
  };

  const rows: [string, (plan: Plan) => string][] = [
    [p.rowStage, (plan) => plan.stage[lang]],
    [p.rowPrice, (plan) => `${formatUSD(plan.priceValue[region])}${p.perMonth}`],
    [p.rowDuration, (plan) => plan.duration[lang]],
    [p.rowTotal, (plan) => formatUSD(planTotal(plan, region))],
    [p.rowServices, (plan) => String(planServiceCount(plan, region))],
    [p.rowPerService, (plan) => formatUSD(planPerService(plan, region))],
    [p.rowSaving, pct],
    [p.specsLabels.pages, (plan) => plan.specs.pages[lang]],
    [p.specsLabels.products, (plan) => plan.specs.products[lang]],
    [p.specsLabels.blog, (plan) => plan.specs.blog[lang]],
    [p.specsLabels.social, (plan) => plan.specs.social[lang]],
  ];

  // What the bigger plan brings that the smaller one doesn't, by category.
  const adds = matrix
    .map((category) => ({
      title: category.title[lang],
      rows: category.rows.filter((row) => planHasRow(row, upper.id, region) && !planHasRow(row, lower.id, region)),
    }))
    .filter((category) => category.rows.length > 0);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 bg-ecom-orange/[0.07] px-6 py-5 sm:px-8">
        <h2 className="font-display text-2xl font-medium text-ecom-ink">
          {lower.name[lang]} <span className="text-ecom-meta">vs.</span> {upper.name[lang]}
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="rounded-full border border-ecom-ink/20 px-4 py-2 text-xs font-medium text-ecom-ink transition-colors hover:border-ecom-orange hover:text-ecom-eyebrow"
        >
          {p.compareClear}
        </button>
      </div>

      <div className="grid items-start gap-10 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ecom-ink/15 text-left">
              <th scope="col" className="py-3 pr-4 font-normal text-ecom-meta">
                <span className="sr-only">{p.colService}</span>
              </th>
              <th scope="col" className="py-3 pr-4 font-display text-base font-medium text-ecom-ink">{lower.name[lang]}</th>
              <th scope="col" className="py-3 font-display text-base font-medium text-ecom-ink">{upper.name[lang]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, read]) => {
              const a = read(lower);
              const b = read(upper);
              return (
                <tr key={label} className="border-b border-ecom-ink/10 last:border-0">
                  <th scope="row" className="py-3 pr-4 text-left font-normal text-ecom-meta">{label}</th>
                  <td className="py-3 pr-4 text-ecom-ink">{a}</td>
                  <td className={`py-3 ${a !== b ? "font-medium text-ecom-eyebrow" : "text-ecom-ink"}`}>{b}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          <h3 className="font-display text-xl font-medium text-ecom-ink">{p.compareAddsTitle(upper.name[lang], lower.name[lang])}</h3>
          <div className="mt-5 space-y-6">
            {adds.map((category) => (
              <div key={category.title}>
                <p className="text-xs font-medium tracking-[0.12em] text-ecom-meta uppercase">{category.title}</p>
                <ul className="mt-2 space-y-1.5">
                  {category.rows.map((row) => (
                    <li key={row.id} className="flex gap-2 text-sm text-ecom-ink">
                      <span aria-hidden className="text-ecom-eyebrow">&#10003;</span>
                      {(row.shortLabel ?? row.text)[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[lower, upper].map((plan) => (
              <Link
                key={plan.id}
                href={`${localizedHref(lang, "/packages")}?plan=${plan.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-ecom-ink/5 px-5 py-2.5 text-sm font-medium text-ecom-ink transition-colors duration-300 hover:bg-ecom-orange hover:text-ecom-on-accent"
              >
                {p.selectCta} {plan.name[lang]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
