"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { plans, formatUSD, getPlan, planTotal, type Plan } from "@/lib/pricing";
import { packagePhases, type PackageAddon } from "@/lib/packages";
import PlanFeatures from "@/components/PlanFeatures";
import { useLanguage } from "@/components/LanguageProvider";
import { useRegion } from "@/components/RegionProvider";
import { useContactPrefill } from "@/components/ContactPrefillProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";
import type { Lang, Region } from "@/lib/i18n/types";
import type { Dict } from "@/lib/i18n/dict";

const EASE = [0.22, 1, 0.36, 1] as const;
// 0: plan, 1..n: one per addon phase, last: summary
const TOTAL_STEPS = packagePhases.length + 2;
const SUMMARY_STEP = TOTAL_STEPS - 1;
const isPhaseStep = (index: number) => index >= 1 && index < SUMMARY_STEP;

/** The AI Express → Launch upgrade credit concerns exactly these two plans, so the note
 *  shows when either is picked. Returns null for every other plan. */
function expressCreditNote(
  plan: Plan | null,
  region: Region,
  expressCredit: (amount: string) => string,
) {
  if (!plan || (plan.id !== "express" && plan.id !== "simple")) return null;
  const express = getPlan("express");
  return express ? expressCredit(formatUSD(express.priceValue[region])) : null;
}

export default function PackagesConfigurator() {
  const { t, lang } = useLanguage();
  const { region } = useRegion();
  const { setPackageSummary } = useContactPrefill();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedAddonIds, setSelectedAddonIds] = useState<Set<string>>(new Set());
  const [showPlanNotice, setShowPlanNotice] = useState(false);

  // A plan card on the home page can deep-link here with ?plan=<id> — land the
  // visitor straight on the extras step with that plan already selected (or on the
  // summary for AI Express, which takes no extras).
  useEffect(() => {
    const requestedPlan = plans.find((plan) => plan.id === searchParams.get("plan"));
    if (requestedPlan) {
      const landing = requestedPlan.oneTime ? SUMMARY_STEP : 1;
      setSelectedPlanId(requestedPlan.id);
      setStep(landing);
      setMaxStepReached(landing);
    }
    // Only ever consulted on first render — later step changes are user-driven.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) ?? null,
    [selectedPlanId],
  );

  const selectedAddons = useMemo(() => {
    const list: PackageAddon[] = [];
    for (const phase of packagePhases) {
      for (const addon of phase.addons) {
        if (selectedAddonIds.has(addon.id)) list.push(addon);
      }
    }
    return list;
  }, [selectedAddonIds]);

  // AI Express is sold alone, as a single one-time payment — it never carries extras,
  // even ones picked before switching to it.
  const isExpress = Boolean(selectedPlan?.oneTime);
  const activeAddons = isExpress ? [] : selectedAddons;

  // Everything else is priced per month: extras are monthly too, so the plan's monthly
  // fee and the extras add up to one monthly figure, run for the plan's whole term.
  const addonsMonthly = activeAddons.reduce(
    (sum, addon) => sum + (addon.price[region] ?? 0),
    0,
  );
  const monthlyTotal = (selectedPlan?.priceValue[region] ?? 0) + addonsMonthly;
  const packageTotal = !selectedPlan
    ? 0
    : isExpress
      ? planTotal(selectedPlan, region)
      : monthlyTotal * selectedPlan.durationMonths;
  const creditNote = expressCreditNote(selectedPlan, region, t.packagesFlow.expressCredit);

  function isIncluded(addon: PackageAddon) {
    return Boolean(selectedPlanId && addon.includedInPlanIds.includes(selectedPlanId));
  }

  function toggleAddon(addon: PackageAddon) {
    if (isIncluded(addon)) return;
    setSelectedAddonIds((prev) => {
      const next = new Set(prev);
      if (next.has(addon.id)) next.delete(addon.id);
      else next.add(addon.id);
      return next;
    });
  }

  function selectPlan(planId: string) {
    setSelectedPlanId(planId);
    setShowPlanNotice(false);
  }

  function goToStep(index: number) {
    if (isExpress && isPhaseStep(index)) return;
    if (index <= maxStepReached) setStep(index);
  }

  function handleContinue() {
    if (step === 0 && !selectedPlanId) {
      setShowPlanNotice(true);
      return;
    }
    const next = isExpress ? SUMMARY_STEP : Math.min(step + 1, SUMMARY_STEP);
    setStep(next);
    setMaxStepReached((m) => Math.max(m, next));
  }

  function handleBack() {
    setStep((s) => (isExpress ? 0 : Math.max(s - 1, 0)));
  }

  function buildSummaryMessage() {
    const lines: string[] = [];
    const perMonth = t.pricingPage.perMonth;
    if (selectedPlan) {
      const planPrice = formatUSD(selectedPlan.priceValue[region]);
      lines.push(
        isExpress
          ? `${t.packagesFlow.messagePlanLabel}: ${selectedPlan.name[lang]} (${planPrice} · ${selectedPlan.duration[lang]})`
          : `${t.packagesFlow.messagePlanLabel}: ${selectedPlan.name[lang]} (${planPrice}${perMonth} · ${selectedPlan.duration[lang]})`,
      );
    }
    if (activeAddons.length > 0) {
      lines.push("");
      lines.push(`${t.packagesFlow.messageExtrasLabel}:`);
      for (const addon of activeAddons) {
        lines.push(`- ${addon.name[lang]} (${addonPriceLabel(addon, region, t)})`);
      }
    }
    lines.push("");
    lines.push(
      !selectedPlan || isExpress
        ? `${t.packagesFlow.messageTotalLabel}: ${formatUSD(packageTotal)}`
        : `${t.packagesFlow.messageTotalLabel}: ${formatUSD(monthlyTotal)}${perMonth} (${t.packagesFlow.summaryPlanTotal.toLowerCase()} ${formatUSD(packageTotal)} · ${selectedPlan.duration[lang]})`,
    );
    if (creditNote) {
      lines.push("");
      lines.push(`${t.packagesFlow.messageNoteLabel}: ${creditNote}`);
    }
    return lines.join("\n");
  }

  const currentPhase =
    step >= 1 && step <= packagePhases.length ? packagePhases[step - 1] : null;

  return (
    <div className="mt-16">
      <Stepper
        step={step}
        maxStepReached={maxStepReached}
        labels={t.packagesFlow.stepLabels}
        stepOfLabel={t.packagesFlow.stepOf(step + 1, TOTAL_STEPS)}
        onStepClick={goToStep}
        isSkipped={(index) => isExpress && isPhaseStep(index)}
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {step === 0 && (
              <PlanStep
                selectedPlanId={selectedPlanId}
                onSelect={selectPlan}
                selectLabel={t.packagesFlow.choosePlanCta}
                selectedLabel={t.packagesFlow.planSelected}
                lang={lang}
                region={region}
              />
            )}

            {currentPhase && (
              <AddonStep
                phase={currentPhase}
                selectedAddonIds={selectedAddonIds}
                isIncluded={isIncluded}
                onToggle={toggleAddon}
                addLabel={t.packagesFlow.addCta}
                addedLabel={t.packagesFlow.addedCta}
                includedLabel={t.packagesFlow.includedBadge}
                lang={lang}
                region={region}
              />
            )}

            {step === SUMMARY_STEP && (
              <SummaryStep
                plan={selectedPlan}
                addons={activeAddons}
                monthlyTotal={monthlyTotal}
                packageTotal={packageTotal}
                creditNote={creditNote}
                lang={lang}
                region={region}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {step > 0 && (
          <OrderSummary
            plan={selectedPlan}
            addons={activeAddons}
            addonsMonthly={addonsMonthly}
            monthlyTotal={monthlyTotal}
            packageTotal={packageTotal}
            creditNote={creditNote}
            lang={lang}
            region={region}
          />
        )}
      </div>

      <AnimatePresence>
        {showPlanNotice && step === 0 && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-6 text-sm font-medium text-ecom-orange"
          >
            {t.packagesFlow.requirePlanNotice}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-between border-t border-ecom-ink/10 pt-8">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-full border border-ecom-ink/15 px-6 py-3 text-sm font-medium text-ecom-ink transition-colors duration-300 hover:border-ecom-ink/30 disabled:cursor-not-allowed disabled:opacity-0"
        >
          <span aria-hidden>&larr;</span>
          {t.packagesFlow.backCta}
        </button>

        {step < SUMMARY_STEP ? (
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center gap-2 rounded-full bg-ecom-ink px-8 py-3.5 text-sm font-medium text-ecom-surface transition-colors duration-300 hover:bg-ecom-orange hover:text-white"
          >
            {t.packagesFlow.continueCta}
            <span aria-hidden>&rarr;</span>
          </button>
        ) : (
          <Link
            href={`${localizedHref(lang, "/contact")}#contact-form`}
            onClick={() => setPackageSummary(buildSummaryMessage())}
            className="inline-flex items-center gap-2 rounded-full bg-ecom-orange px-8 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-ecom-ink"
          >
            {t.packagesFlow.summarySendCta}
            <span aria-hidden>&rarr;</span>
          </Link>
        )}
      </div>
    </div>
  );
}

function Stepper({
  step,
  maxStepReached,
  labels,
  stepOfLabel,
  onStepClick,
  isSkipped,
}: {
  step: number;
  maxStepReached: number;
  labels: readonly string[];
  stepOfLabel: string;
  onStepClick: (index: number) => void;
  /** Steps that don't apply to the chosen plan (the extras, for AI Express). */
  isSkipped: (index: number) => boolean;
}) {
  return (
    <div>
      <p className="text-sm font-medium tracking-[0.2em] text-ecom-ink/50 uppercase lg:hidden">
        {stepOfLabel}
      </p>
      <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-3 lg:mt-0">
        {labels.map((label, index) => {
          const skipped = isSkipped(index);
          const isActive = index === step;
          const isDone = index < step && !skipped;
          const reachable = index <= maxStepReached && !skipped;
          return (
            <li key={label} className="flex items-center">
              {index > 0 && (
                <span
                  aria-hidden
                  className={`mx-2 h-px w-6 sm:w-10 ${
                    reachable ? "bg-ecom-orange/50" : "bg-ecom-ink/10"
                  }`}
                />
              )}
              <button
                type="button"
                onClick={() => onStepClick(index)}
                disabled={!reachable}
                aria-current={isActive ? "step" : undefined}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-300 sm:px-4 ${
                  isActive
                    ? "border-ecom-orange bg-ecom-orange text-white"
                    : isDone
                      ? "border-ecom-orange/40 text-ecom-ink hover:border-ecom-orange"
                      : "border-ecom-ink/15 text-ecom-ink/40"
                } ${reachable ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                    isActive ? "bg-white/25" : isDone ? "bg-ecom-orange/15 text-ecom-orange" : "bg-ecom-ink/10"
                  }`}
                >
                  {isDone ? "✓" : index + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function PlanStep({
  selectedPlanId,
  onSelect,
  selectLabel,
  selectedLabel,
  lang,
  region,
}: {
  selectedPlanId: string | null;
  onSelect: (id: string) => void;
  selectLabel: string;
  selectedLabel: string;
  lang: Lang;
  region: Region;
}) {
  const { t } = useLanguage();
  return (
    <>
    <div className="grid gap-6 sm:grid-cols-2">
      {plans.map((plan: Plan) => {
        const isSelected = plan.id === selectedPlanId;
        return (
          <div
            key={plan.id}
            onClick={() => onSelect(plan.id)}
            className={`relative flex h-full cursor-pointer flex-col rounded-3xl border p-7 text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
              isSelected
                ? "border-ecom-orange bg-ecom-orange/[0.06] shadow-[0_20px_50px_-30px_var(--color-ecom-orange)]"
                : "border-ecom-ink/12 hover:border-ecom-orange/40"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-ecom-orange px-3 py-1 text-xs font-medium tracking-widest text-white uppercase">
                {t.pricingPage.bestValueBadge}
              </span>
            )}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-medium tracking-wide text-ecom-ink">
                  {plan.name[lang]}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ecom-ink/60">
                  {plan.tagline[lang]}
                </p>
              </div>
              <span
                aria-hidden
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm transition-colors duration-300 ${
                  isSelected
                    ? "border-ecom-orange bg-ecom-orange text-white"
                    : "border-ecom-ink/20 text-transparent"
                }`}
              >
                ✓
              </span>
            </div>
            <p className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-ecom-ink">
              {formatUSD(plan.priceValue[region])}
              {!plan.oneTime && (
                <span className="ml-1.5 text-sm font-normal tracking-normal text-ecom-ink/50">
                  {t.pricingPage.perMonth}
                </span>
              )}
            </p>
            <p className="mt-1 text-xs text-ecom-ink/50">
              {plan.oneTime
                ? plan.duration[lang]
                : `${t.pricingPage.totalLabel} ${formatUSD(planTotal(plan, region))} · ${plan.duration[lang]}`}
            </p>
            <div className="flex-1">
              <PlanFeatures plan={plan} lang={lang} region={region} variant="light" />
            </div>
            <button
              type="button"
              aria-pressed={isSelected}
              className={`mt-6 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecom-orange ${
                isSelected ? "bg-ecom-orange text-white" : "bg-ecom-ink/5 text-ecom-ink/70"
              }`}
            >
              {isSelected ? selectedLabel : selectLabel}
            </button>
          </div>
        );
      })}
    </div>
    {region === "us" && <p className="mt-6 text-sm text-ecom-ink/50">{t.pricingPage.footnote}</p>}
    </>
  );
}

function AddonStep({
  phase,
  selectedAddonIds,
  isIncluded,
  onToggle,
  addLabel,
  addedLabel,
  includedLabel,
  lang,
  region,
}: {
  phase: (typeof packagePhases)[number];
  selectedAddonIds: Set<string>;
  isIncluded: (addon: PackageAddon) => boolean;
  onToggle: (addon: PackageAddon) => void;
  addLabel: string;
  addedLabel: string;
  includedLabel: string;
  lang: Lang;
  region: Region;
}) {
  const { t } = useLanguage();
  return (
    <div>
      <h2 className="font-display text-2xl font-medium tracking-tight text-ecom-ink sm:text-3xl">
        {phase.title[lang]}
      </h2>
      <p className="mt-3 max-w-xl text-ecom-ink/70">{phase.description[lang]}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {phase.addons.map((addon) => {
          const included = isIncluded(addon);
          const selected = selectedAddonIds.has(addon.id);
          return (
            <div
              key={addon.id}
              className={`flex flex-col rounded-2xl border p-6 transition-colors duration-300 ${
                included
                  ? "border-ecom-ink/10 bg-ecom-ink/[0.03]"
                  : selected
                    ? "border-ecom-orange bg-ecom-orange/[0.06]"
                    : "border-ecom-ink/12"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-base font-medium text-ecom-ink">
                  {addon.name[lang]}
                </h3>
                <span className="shrink-0 font-display text-lg font-medium text-ecom-ink">
                  {addonPriceLabel(addon, region, t)}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ecom-ink/60">
                {addon.description[lang]}
              </p>
              <button
                type="button"
                onClick={() => onToggle(addon)}
                disabled={included}
                aria-pressed={selected}
                className={`mt-5 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  included
                    ? "cursor-not-allowed border-ecom-ink/10 text-ecom-ink/40"
                    : selected
                      ? "border-ecom-orange bg-ecom-orange text-white"
                      : "border-ecom-ink/15 text-ecom-ink/70 hover:border-ecom-orange/50 hover:text-ecom-ink"
                }`}
              >
                {included ? includedLabel : selected ? addedLabel : addLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Extras are monthly, like the plans: "+$450/mes", or "quote on request". */
function addonPriceLabel(addon: PackageAddon, region: Region, t: Dict) {
  const price = addon.price[region];
  return price == null
    ? t.packagesFlow.quoteOnRequestLabel
    : `+${formatUSD(price)}${t.pricingPage.perMonth}`;
}

/** The headline total — monthly for every plan except one-time AI Express — plus the
 *  whole-term figure underneath. Shared by the summary step and the side panel. */
function TotalBlock({
  plan,
  monthlyTotal,
  packageTotal,
  size,
  lang,
}: {
  plan: Plan | null;
  monthlyTotal: number;
  packageTotal: number;
  size: "lg" | "md";
  lang: Lang;
}) {
  const { t } = useLanguage();
  const oneTime = !plan || plan.oneTime;
  const amountClass =
    size === "lg"
      ? "font-display text-3xl font-medium tracking-[-0.02em] text-ecom-orange"
      : "font-display text-2xl font-medium tracking-[-0.02em] text-ecom-orange";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span
          className={
            size === "lg"
              ? "font-display text-lg font-medium text-ecom-ink"
              : "text-sm font-medium text-ecom-ink"
          }
        >
          {t.packagesFlow.summaryTotal}
        </span>
        <span className={amountClass}>
          {formatUSD(oneTime ? packageTotal : monthlyTotal)}
          {!oneTime && (
            <span className="ml-1 text-sm font-normal tracking-normal text-ecom-ink/50">
              {t.pricingPage.perMonth}
            </span>
          )}
        </span>
      </div>
      {plan && (
        <p className="mt-1 text-right text-xs text-ecom-ink/50">
          {oneTime
            ? plan.duration[lang]
            : `${t.packagesFlow.summaryPlanTotal} ${formatUSD(packageTotal)} · ${plan.duration[lang]}`}
        </p>
      )}
    </div>
  );
}

function SummaryStep({
  plan,
  addons,
  monthlyTotal,
  packageTotal,
  creditNote,
  lang,
  region,
}: {
  plan: Plan | null;
  addons: PackageAddon[];
  monthlyTotal: number;
  packageTotal: number;
  creditNote: string | null;
  lang: Lang;
  region: Region;
}) {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="font-display text-2xl font-medium tracking-tight text-ecom-ink sm:text-3xl">
        {t.packagesFlow.summaryTitle}
      </h2>

      {plan && (
        <div className="mt-8 rounded-2xl border border-ecom-orange/40 bg-ecom-orange/[0.06] p-6">
          <p className="text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
            {t.packagesFlow.summaryBasePlan}
          </p>
          <div className="mt-3 flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl font-medium text-ecom-ink">{plan.name[lang]}</h3>
            <p className="font-display text-xl font-medium text-ecom-ink">
              {formatUSD(plan.priceValue[region])}
              {!plan.oneTime && (
                <span className="ml-1 text-sm font-normal text-ecom-ink/50">
                  {t.pricingPage.perMonth}
                </span>
              )}
            </p>
          </div>
          {plan.oneTime && (
            <p className="mt-1 text-right text-xs text-ecom-ink/50">{plan.duration[lang]}</p>
          )}
        </div>
      )}

      <div className="mt-6">
        <p className="text-sm font-medium tracking-[0.2em] text-ecom-ink/50 uppercase">
          {t.packagesFlow.summaryExtras}
        </p>
        {plan?.oneTime ? (
          <p className="mt-3 text-ecom-ink/60">{t.packagesFlow.expressAloneNotice}</p>
        ) : addons.length === 0 ? (
          <p className="mt-3 text-ecom-ink/60">{t.packagesFlow.summaryNoExtras}</p>
        ) : (
          <ul className="mt-3 flex flex-col divide-y divide-ecom-ink/10 rounded-2xl border border-ecom-ink/10">
            {addons.map((addon) => (
              <li key={addon.id} className="flex items-center justify-between gap-4 p-4">
                <span className="text-sm text-ecom-ink">{addon.name[lang]}</span>
                <span className="shrink-0 text-sm font-medium text-ecom-ink">
                  {addonPriceLabel(addon, region, t)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 border-t border-ecom-ink/10 pt-6">
        <TotalBlock
          plan={plan}
          monthlyTotal={monthlyTotal}
          packageTotal={packageTotal}
          size="lg"
          lang={lang}
        />
      </div>

      {creditNote && <p className="mt-4 text-sm leading-relaxed text-ecom-ink/60">{creditNote}</p>}
    </div>
  );
}

function OrderSummary({
  plan,
  addons,
  addonsMonthly,
  monthlyTotal,
  packageTotal,
  creditNote,
  lang,
  region,
}: {
  plan: Plan | null;
  addons: PackageAddon[];
  addonsMonthly: number;
  monthlyTotal: number;
  packageTotal: number;
  creditNote: string | null;
  lang: Lang;
  region: Region;
}) {
  const { t } = useLanguage();

  return (
    <aside className="rounded-2xl border border-ecom-ink/10 bg-ecom-ink/[0.02] p-6 lg:sticky lg:top-28">
      <p className="text-sm font-medium tracking-[0.2em] text-ecom-ink/50 uppercase">
        {t.packagesFlow.orderSummaryLabel}
      </p>

      {plan ? (
        <div className="mt-4 flex items-center justify-between gap-3 border-b border-ecom-ink/10 pb-4">
          <span className="font-display text-base font-medium text-ecom-ink">{plan.name[lang]}</span>
          <span className="text-sm font-medium text-ecom-ink/70">
            {formatUSD(plan.priceValue[region])}
            {!plan.oneTime && t.pricingPage.perMonth}
          </span>
        </div>
      ) : (
        <p className="mt-4 border-b border-ecom-ink/10 pb-4 text-sm text-ecom-ink/50">
          {t.packagesFlow.requirePlanNotice}
        </p>
      )}

      {addons.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2.5 border-b border-ecom-ink/10 pb-4 text-sm">
          {addons.map((addon) => (
            <li key={addon.id} className="flex items-center justify-between gap-3 text-ecom-ink/70">
              <span className="truncate">{addon.name[lang]}</span>
              <span className="shrink-0">{addonPriceLabel(addon, region, t)}</span>
            </li>
          ))}
        </ul>
      )}

      {addonsMonthly > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-ecom-ink/60">
          <span>{t.packagesFlow.summaryExtras}</span>
          <span>
            +{formatUSD(addonsMonthly)}
            {t.pricingPage.perMonth}
          </span>
        </div>
      )}

      <div className="mt-4">
        <TotalBlock
          plan={plan}
          monthlyTotal={monthlyTotal}
          packageTotal={packageTotal}
          size="md"
          lang={lang}
        />
      </div>

      {creditNote && <p className="mt-4 text-xs leading-relaxed text-ecom-ink/55">{creditNote}</p>}
    </aside>
  );
}
