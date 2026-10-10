"use client";

import { Fragment, useState, type ReactNode } from "react";
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

type Plan = (typeof plans)[number];
type CellValue = string | number | boolean | null;

export default function PlanMatrix() {
  const { t, lang } = useLanguage();
  const { region } = useRegion();
  const p = t.pricingPage;
  const codingRate = codingHourRate[region];
  const [selected, setSelected] = useState<string[]>([]);
  const [onlyDiff, setOnlyDiff] = useState(true);

  const comparing = selected.length === 2;
  const visible = comparing ? plans.filter((plan) => selected.includes(plan.id)) : plans;
  const columns = visible.length;

  const togglePlan = (id: string) =>
    setSelected((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : current.length < 2
          ? [...current, id]
          : [current[1], id],
    );

  const cellBase = "px-3 py-2.5 text-center text-xs";
  const featuredCell = (featured?: boolean) => (featured ? "bg-ecom-orange/[0.05]" : "");
  const labelCell = "sticky left-0 z-10 bg-ecom-surface px-4 py-2.5 text-xs";

  const differs = (values: CellValue[]) => comparing && new Set(values).size > 1;
  const rowKey = (row: Parameters<typeof planHasRow>[0], plan: Plan) =>
    `${planHasRow(row, plan.id, region)}-${isUsOnlyCell(row, plan.id, region)}`;

  const renderRow = (
    key: string,
    label: ReactNode,
    strong: boolean,
    read: (plan: Plan) => CellValue,
    render: (plan: Plan) => ReactNode,
    cellClass: string,
    last = false,
  ) => {
    const diff = differs(visible.map(read));
    if (comparing && onlyDiff && !diff) return null;
    return (
      <tr key={key} className={last ? "" : "border-b border-ecom-ink/10"}>
        <th
          scope="row"
          className={`${labelCell} ${strong ? "font-medium text-ecom-ink" : "font-normal text-ecom-ink/70"}`}
        >
          {label}
        </th>
        {visible.map((plan) => (
          <td
            key={plan.id}
            className={`${cellBase} ${cellClass} ${diff ? "bg-ecom-orange/[0.09]" : featuredCell(plan.featured)}`}
          >
            {render(plan)}
          </td>
        ))}
      </tr>
    );
  };

  const specRows = [
    [p.specsLabels.size, (plan: Plan) => plan.specs.size],
    [p.specsLabels.pages, (plan: Plan) => plan.specs.pages[lang]],
    [p.specsLabels.products, (plan: Plan) => plan.specs.products[lang]],
    [p.specsLabels.blog, (plan: Plan) => plan.specs.blog[lang]],
    [p.specsLabels.social, (plan: Plan) => plan.specs.social[lang]],
  ] as const;

  const categories = matrix.map((category) => ({
    category,
    rows: category.rows
      .filter((row) => row.availability[region].length > 0)
      .filter((row) => !(comparing && onlyDiff) || differs(visible.map((plan) => rowKey(row, plan)))),
  }));

  return (
    <section className="mt-24">
      <h2 className="font-display text-2xl font-medium tracking-tight text-ecom-ink sm:text-3xl">
        {p.compareTitle}
      </h2>
      <p className="mt-3 text-sm text-ecom-ink/60">
        {p.compareSub}
        {region === "us" && ` · ${p.footnote}`}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {plans.map((plan) => {
          const active = selected.includes(plan.id);
          return (
            <button
              key={plan.id}
              type="button"
              aria-pressed={active}
              onClick={() => togglePlan(plan.id)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors duration-300 ${
                active
                  ? "border-ecom-orange bg-ecom-orange text-white"
                  : "border-ecom-ink/15 text-ecom-ink/70 hover:border-ecom-ink/40 hover:text-ecom-ink"
              }`}
            >
              {plan.name[lang]}
            </button>
          );
        })}
        {comparing ? (
          <>
            <label className="ml-2 inline-flex cursor-pointer items-center gap-2 text-xs text-ecom-ink/70">
              <input
                type="checkbox"
                checked={onlyDiff}
                onChange={(event) => setOnlyDiff(event.target.checked)}
                className="accent-ecom-orange"
              />
              {p.compareOnlyDiff}
            </label>
            <button
              type="button"
              onClick={() => setSelected([])}
              className="text-xs font-medium tracking-wide text-ecom-ink/60 uppercase underline-offset-4 hover:text-ecom-ink hover:underline"
            >
              {p.compareClear}
            </button>
          </>
        ) : (
          <span className="ml-2 text-xs text-ecom-ink/50">{p.compareHint}</span>
        )}
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-ecom-ink/10">
        <table className={`w-full border-collapse text-left ${comparing ? "min-w-[480px]" : "min-w-[820px]"}`}>
          <thead>
            <tr className="bg-ecom-black text-white">
              <th scope="col" className="sticky left-0 z-10 bg-ecom-black px-4 py-3 text-xs font-medium tracking-wide uppercase">
                {p.colService}
              </th>
              {visible.map((plan) => (
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
            {renderRow("price", p.rowPrice, true, (plan) => plan.priceValue[region], (plan) => formatUSD(plan.priceValue[region]), "font-medium text-ecom-ink")}
            {renderRow("duration", p.rowDuration, true, (plan) => plan.duration[lang], (plan) => plan.duration[lang], "text-ecom-ink/70")}
            {renderRow("total", p.rowTotal, true, (plan) => planTotal(plan, region), (plan) => formatUSD(planTotal(plan, region)), "font-medium text-ecom-ink")}
            {specRows.map(([label, read]) => renderRow(label, label, false, read, read, "text-ecom-ink/70"))}

            {categories.map(({ category, rows }) =>
              rows.length === 0 ? null : (
                <Fragment key={category.id}>
                  <tr className="bg-ecom-ink/[0.04]">
                    <th
                      scope="colgroup"
                      colSpan={columns + 1}
                      className="sticky left-0 px-4 py-2 text-left text-[0.7rem] font-medium tracking-[0.15em] text-ecom-ink/60 uppercase"
                    >
                      {category.title[lang]}
                    </th>
                  </tr>
                  {rows.map((row) => {
                    const diff = differs(visible.map((plan) => rowKey(row, plan)));
                    return (
                      <tr key={row.id} className="border-b border-ecom-ink/10">
                        <th scope="row" className={`${labelCell} font-normal text-ecom-ink/80`}>
                          {row.text[lang]}
                        </th>
                        {visible.map((plan) => {
                          const has = planHasRow(row, plan.id, region);
                          const star = isUsOnlyCell(row, plan.id, region);
                          return (
                            <td
                              key={plan.id}
                              className={`${cellBase} ${diff ? "bg-ecom-orange/[0.09]" : featuredCell(plan.featured)}`}
                            >
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
                    );
                  })}
                </Fragment>
              ),
            )}

            <tr className="bg-ecom-black text-white">
              <th
                scope="colgroup"
                colSpan={columns + 1}
                className="sticky left-0 px-4 py-2.5 text-left text-xs font-medium tracking-wide uppercase"
              >
                {p.summaryTitle}
              </th>
            </tr>
            {renderRow("services", p.rowServices, true, (plan) => planServiceCount(plan, region), (plan) => planServiceCount(plan, region), "font-medium text-ecom-ink")}
            {renderRow(
              "perService",
              p.rowPerService,
              true,
              (plan) => (plan.oneTime ? "one" : planPerService(plan, region)),
              (plan) => (plan.oneTime ? p.oneTimeLabel : formatUSD(planPerService(plan, region))),
              "text-ecom-ink",
            )}
            {renderRow(
              "saving",
              p.rowSaving,
              true,
              (plan) => plan.savingPercent[region],
              (plan) => {
                const saving = plan.savingPercent[region];
                return (
                  <span className={plan.featured ? "font-medium text-ecom-orange" : "text-ecom-ink"}>
                    {saving === null ? p.comparedWithMarket : `${saving.toFixed(1)}%`}
                  </span>
                );
              },
              "",
            )}
            {renderRow("stage", p.rowStage, true, (plan) => plan.stage[lang], (plan) => plan.stage[lang], "text-ecom-ink/70")}
            {renderRow("renewal", p.rowRenewal, true, (plan) => plan.renewal[lang], (plan) => plan.renewal[lang], "text-[0.7rem] leading-snug text-ecom-ink/70", true)}
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
