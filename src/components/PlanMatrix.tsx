"use client";

import { Fragment } from "react";
import {
  plans,
  matrix,
  formatUSD,
  planTotal,
  planPerService,
  planServiceCount,
  planHasRow,
  isUsOnlyCell,
  hostingRenewalValue,
  codingHourRate,
} from "@/lib/pricing";
import { useLanguage } from "@/components/LanguageProvider";
import { useRegion } from "@/components/RegionProvider";

const COLUMNS = plans.length;

export default function PlanMatrix() {
  const { t, lang } = useLanguage();
  const { region } = useRegion();
  const p = t.pricingPage;
  const codingRate = codingHourRate[region];

  const cellBase = "px-3 py-2.5 text-center text-xs";
  const featuredCell = (featured?: boolean) => (featured ? "bg-ecom-orange/[0.05]" : "");

  return (
    <section className="mt-24">
      <h2 className="font-display text-2xl font-medium tracking-tight text-ecom-ink sm:text-3xl">
        {p.compareTitle}
      </h2>
      <p className="mt-3 text-sm text-ecom-ink/60">
        {p.compareSub}
        {region === "us" && ` · ${p.footnote}`}
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-ecom-ink/10">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="bg-ecom-black text-white">
              <th scope="col" className="sticky left-0 z-10 bg-ecom-black px-4 py-3 text-xs font-medium tracking-wide uppercase">
                {p.colService}
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className="px-3 py-3 text-center text-xs font-medium tracking-wide uppercase"
                >
                  {plan.name[lang]}
                  {plan.featured && (
                    <span className="mt-1 block text-[0.65rem] tracking-widest text-ecom-orange">
                      {p.bestValueBadge}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-ecom-ink/10">
              <th scope="row" className="sticky left-0 z-10 bg-ecom-surface px-4 py-2.5 text-xs font-medium text-ecom-ink">
                {p.rowPrice}
              </th>
              {plans.map((plan) => (
                <td key={plan.id} className={`${cellBase} font-medium text-ecom-ink ${featuredCell(plan.featured)}`}>
                  {formatUSD(plan.priceValue[region])}
                </td>
              ))}
            </tr>
            <tr className="border-b border-ecom-ink/10">
              <th scope="row" className="sticky left-0 z-10 bg-ecom-surface px-4 py-2.5 text-xs font-medium text-ecom-ink">
                {p.rowDuration}
              </th>
              {plans.map((plan) => (
                <td key={plan.id} className={`${cellBase} text-ecom-ink/70 ${featuredCell(plan.featured)}`}>
                  {plan.duration[lang]}
                </td>
              ))}
            </tr>
            <tr className="border-b border-ecom-ink/10">
              <th scope="row" className="sticky left-0 z-10 bg-ecom-surface px-4 py-2.5 text-xs font-medium text-ecom-ink">
                {p.rowTotal}
              </th>
              {plans.map((plan) => (
                <td key={plan.id} className={`${cellBase} font-medium text-ecom-ink ${featuredCell(plan.featured)}`}>
                  {formatUSD(planTotal(plan, region))}
                </td>
              ))}
            </tr>
            {(
              [
                [p.specsLabels.size, (plan: (typeof plans)[number]) => plan.specs.size],
                [p.specsLabels.pages, (plan: (typeof plans)[number]) => plan.specs.pages[lang]],
                [p.specsLabels.products, (plan: (typeof plans)[number]) => plan.specs.products[lang]],
                [p.specsLabels.blog, (plan: (typeof plans)[number]) => plan.specs.blog[lang]],
                [p.specsLabels.social, (plan: (typeof plans)[number]) => plan.specs.social[lang]],
              ] as const
            ).map(([label, read]) => (
              <tr key={label} className="border-b border-ecom-ink/10">
                <th scope="row" className="sticky left-0 z-10 bg-ecom-surface px-4 py-2.5 text-xs font-normal text-ecom-ink/70">
                  {label}
                </th>
                {plans.map((plan) => (
                  <td key={plan.id} className={`${cellBase} text-ecom-ink/70 ${featuredCell(plan.featured)}`}>
                    {read(plan)}
                  </td>
                ))}
              </tr>
            ))}

            {matrix.map((category) => (
              <Fragment key={category.id}>
                <tr className="bg-ecom-ink/[0.04]">
                  <th
                    scope="colgroup"
                    colSpan={COLUMNS + 1}
                    className="sticky left-0 px-4 py-2 text-left text-[0.7rem] font-medium tracking-[0.15em] text-ecom-ink/60 uppercase"
                  >
                    {category.title[lang]}
                  </th>
                </tr>
                {category.rows
                  .filter((row) => row.availability[region].length > 0)
                  .map((row) => (
                    <tr key={row.id} className="border-b border-ecom-ink/10">
                      <th scope="row" className="sticky left-0 z-10 bg-ecom-surface px-4 py-2.5 text-xs font-normal text-ecom-ink/80">
                        {row.text[lang]}
                      </th>
                      {plans.map((plan) => {
                        const has = planHasRow(row, plan.id, region);
                        const star = isUsOnlyCell(row, plan.id, region);
                        return (
                          <td key={plan.id} className={`${cellBase} ${featuredCell(plan.featured)}`}>
                            {has ? (
                              <span
                                role="img"
                                aria-label={p.includedAria}
                                className={star ? "text-ecom-orange" : "text-ecom-ink"}
                              >
                                {star ? "★" : "✓"}
                              </span>
                            ) : (
                              <span className="sr-only">{p.notIncludedAria}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </Fragment>
            ))}

            <tr className="bg-ecom-black text-white">
              <th
                scope="colgroup"
                colSpan={COLUMNS + 1}
                className="sticky left-0 px-4 py-2.5 text-left text-xs font-medium tracking-wide uppercase"
              >
                {p.summaryTitle}
              </th>
            </tr>
            <tr className="border-b border-ecom-ink/10">
              <th scope="row" className="sticky left-0 z-10 bg-ecom-surface px-4 py-2.5 text-xs font-medium text-ecom-ink">
                {p.rowServices}
              </th>
              {plans.map((plan) => (
                <td key={plan.id} className={`${cellBase} font-medium text-ecom-ink ${featuredCell(plan.featured)}`}>
                  {planServiceCount(plan, region)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-ecom-ink/10">
              <th scope="row" className="sticky left-0 z-10 bg-ecom-surface px-4 py-2.5 text-xs font-medium text-ecom-ink">
                {p.rowPerService}
              </th>
              {plans.map((plan) => (
                <td key={plan.id} className={`${cellBase} text-ecom-ink ${featuredCell(plan.featured)}`}>
                  {plan.oneTime ? p.oneTimeLabel : formatUSD(planPerService(plan, region))}
                </td>
              ))}
            </tr>
            <tr className="border-b border-ecom-ink/10">
              <th scope="row" className="sticky left-0 z-10 bg-ecom-surface px-4 py-2.5 text-xs font-medium text-ecom-ink">
                {p.rowSaving}
              </th>
              {plans.map((plan) => {
                const saving = plan.savingPercent[region];
                return (
                  <td
                    key={plan.id}
                    className={`${cellBase} ${featuredCell(plan.featured)} ${
                      plan.featured ? "font-medium text-ecom-orange" : "text-ecom-ink"
                    }`}
                  >
                    {saving === null ? p.comparedWithMarket : `${saving.toFixed(1)}%`}
                  </td>
                );
              })}
            </tr>
            <tr className="border-b border-ecom-ink/10">
              <th scope="row" className="sticky left-0 z-10 bg-ecom-surface px-4 py-2.5 text-xs font-medium text-ecom-ink">
                {p.rowStage}
              </th>
              {plans.map((plan) => (
                <td key={plan.id} className={`${cellBase} text-ecom-ink/70 ${featuredCell(plan.featured)}`}>
                  {plan.stage[lang]}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="sticky left-0 z-10 bg-ecom-surface px-4 py-2.5 text-xs font-medium text-ecom-ink">
                {p.rowRenewal}
              </th>
              {plans.map((plan) => (
                <td key={plan.id} className={`${cellBase} text-[0.7rem] leading-snug text-ecom-ink/70 ${featuredCell(plan.featured)}`}>
                  {plan.renewal[lang]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-3 text-sm leading-relaxed text-ecom-ink/50">
        <p>{p.notes.inheritance}</p>
        <p>{p.notes.hosting(formatUSD(hostingRenewalValue[region]))}</p>
        <p>{p.notes.coding(codingRate ? formatUSD(codingRate) : null)}</p>
      </div>
    </section>
  );
}
