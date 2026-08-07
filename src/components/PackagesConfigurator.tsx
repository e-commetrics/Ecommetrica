"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { plans, type Plan } from "@/lib/pricing";
import { packagePhases, type PackageAddon } from "@/lib/packages";
import { useLanguage } from "@/components/LanguageProvider";
import { useContactPrefill } from "@/components/ContactPrefillProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";
import type { Lang } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;
const TOTAL_STEPS = 5; // 0: plan, 1-3: addon phases, 4: summary

function formatUSD(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export default function PackagesConfigurator() {
  const { t, lang } = useLanguage();
  const { setPackageSummary } = useContactPrefill();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedAddonIds, setSelectedAddonIds] = useState<Set<string>>(new Set());
  const [showPlanNotice, setShowPlanNotice] = useState(false);

  // A plan card on the home page can deep-link here with ?plan=<id> — land the
  // visitor straight on the extras step with that plan already selected.
  useEffect(() => {
    const requestedPlan = searchParams.get("plan");
    if (requestedPlan && plans.some((plan) => plan.id === requestedPlan)) {
      setSelectedPlanId(requestedPlan);
      setStep(1);
      setMaxStepReached(1);
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

  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const total = (selectedPlan?.priceValue ?? 0) + addonsTotal;

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
    if (index <= maxStepReached) setStep(index);
  }

  function handleContinue() {
    if (step === 0 && !selectedPlanId) {
      setShowPlanNotice(true);
      return;
    }
    const next = Math.min(step + 1, TOTAL_STEPS - 1);
    setStep(next);
    setMaxStepReached((m) => Math.max(m, next));
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function buildSummaryMessage() {
    const lines: string[] = [];
    if (selectedPlan) {
      lines.push(
        `${t.packagesFlow.messagePlanLabel}: ${selectedPlan.name[lang]} (${selectedPlan.price} / ${selectedPlan.duration[lang]})`,
      );
    }
    if (selectedAddons.length > 0) {
      lines.push("");
      lines.push(`${t.packagesFlow.messageExtrasLabel}:`);
      for (const addon of selectedAddons) {
        lines.push(`- ${addon.name[lang]} (+${formatUSD(addon.price)})`);
      }
    }
    lines.push("");
    lines.push(`${t.packagesFlow.messageTotalLabel}: ${formatUSD(total)}`);
    return lines.join("\n");
  }

  const currentPhase = step >= 1 && step <= 3 ? packagePhases[step - 1] : null;

  return (
    <div className="mt-16">
      <Stepper
        step={step}
        maxStepReached={maxStepReached}
        labels={t.packagesFlow.stepLabels}
        stepOfLabel={t.packagesFlow.stepOf(step + 1, TOTAL_STEPS)}
        onStepClick={goToStep}
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
              />
            )}

            {step === 4 && (
              <SummaryStep
                plan={selectedPlan}
                addons={selectedAddons}
                total={total}
                lang={lang}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {step > 0 && (
          <OrderSummary
            plan={selectedPlan}
            addons={selectedAddons}
            addonsTotal={addonsTotal}
            total={total}
            lang={lang}
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

        {step < TOTAL_STEPS - 1 ? (
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
}: {
  step: number;
  maxStepReached: number;
  labels: readonly string[];
  stepOfLabel: string;
  onStepClick: (index: number) => void;
}) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.2em] text-ecom-ink/50 uppercase lg:hidden">
        {stepOfLabel}
      </p>
      <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-3 lg:mt-0">
        {labels.map((label, index) => {
          const isActive = index === step;
          const isDone = index < step;
          const reachable = index <= maxStepReached;
          return (
            <li key={label} className="flex items-center">
              {index > 0 && (
                <span
                  aria-hidden
                  className={`mx-2 h-px w-6 sm:w-10 ${
                    index <= maxStepReached ? "bg-ecom-orange/50" : "bg-ecom-ink/10"
                  }`}
                />
              )}
              <button
                type="button"
                onClick={() => onStepClick(index)}
                disabled={!reachable}
                aria-current={isActive ? "step" : undefined}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium tracking-wide transition-colors duration-300 sm:px-4 sm:text-sm ${
                  isActive
                    ? "border-ecom-orange bg-ecom-orange text-white"
                    : isDone
                      ? "border-ecom-orange/40 text-ecom-ink hover:border-ecom-orange"
                      : "border-ecom-ink/15 text-ecom-ink/40"
                } ${reachable ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.65rem] ${
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
}: {
  selectedPlanId: string | null;
  onSelect: (id: string) => void;
  selectLabel: string;
  selectedLabel: string;
  lang: Lang;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {plans.map((plan: Plan) => {
        const isSelected = plan.id === selectedPlanId;
        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onSelect(plan.id)}
            aria-pressed={isSelected}
            className={`relative flex h-full flex-col rounded-3xl border p-7 text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
              isSelected
                ? "border-ecom-orange bg-ecom-orange/[0.06] shadow-[0_20px_50px_-30px_var(--color-ecom-orange)]"
                : "border-ecom-ink/12 hover:border-ecom-orange/40"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-ecom-orange px-3 py-1 text-[0.65rem] font-medium tracking-widest text-white uppercase">
                Popular
              </span>
            )}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-medium tracking-wide text-ecom-ink">
                {plan.name[lang]}
              </h3>
              <span
                aria-hidden
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition-colors duration-300 ${
                  isSelected
                    ? "border-ecom-orange bg-ecom-orange text-white"
                    : "border-ecom-ink/20 text-transparent"
                }`}
              >
                ✓
              </span>
            </div>
            <p className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-ecom-ink">
              {plan.price}
              <span className="ml-1.5 text-sm font-normal tracking-normal text-ecom-ink/50">
                / {plan.duration[lang]}
              </span>
            </p>
            <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-ecom-ink/10 pt-5 text-sm leading-relaxed text-ecom-ink/70">
              {plan.features.map((feature) => (
                <li key={feature.en} className="flex items-start gap-2.5">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ecom-orange" />
                  {feature[lang]}
                </li>
              ))}
            </ul>
            <span
              className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide uppercase ${
                isSelected ? "bg-ecom-orange text-white" : "bg-ecom-ink/5 text-ecom-ink/70"
              }`}
            >
              {isSelected ? selectedLabel : selectLabel}
            </span>
          </button>
        );
      })}
    </div>
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
}: {
  phase: (typeof packagePhases)[number];
  selectedAddonIds: Set<string>;
  isIncluded: (addon: PackageAddon) => boolean;
  onToggle: (addon: PackageAddon) => void;
  addLabel: string;
  addedLabel: string;
  includedLabel: string;
  lang: Lang;
}) {
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
                  +{formatUSD(addon.price)}
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
                className={`mt-5 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors duration-300 ${
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

function SummaryStep({
  plan,
  addons,
  total,
  lang,
}: {
  plan: Plan | null;
  addons: PackageAddon[];
  total: number;
  lang: Lang;
}) {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="font-display text-2xl font-medium tracking-tight text-ecom-ink sm:text-3xl">
        {t.packagesFlow.summaryTitle}
      </h2>

      {plan && (
        <div className="mt-8 rounded-2xl border border-ecom-orange/40 bg-ecom-orange/[0.06] p-6">
          <p className="text-xs font-medium tracking-[0.2em] text-ecom-orange uppercase">
            {t.packagesFlow.summaryBasePlan}
          </p>
          <div className="mt-3 flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl font-medium text-ecom-ink">{plan.name[lang]}</h3>
            <p className="font-display text-xl font-medium text-ecom-ink">
              {plan.price}
              <span className="ml-1 text-sm font-normal text-ecom-ink/50">/ {plan.duration[lang]}</span>
            </p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <p className="text-xs font-medium tracking-[0.2em] text-ecom-ink/50 uppercase">
          {t.packagesFlow.summaryExtras}
        </p>
        {addons.length === 0 ? (
          <p className="mt-3 text-ecom-ink/60">{t.packagesFlow.summaryNoExtras}</p>
        ) : (
          <ul className="mt-3 flex flex-col divide-y divide-ecom-ink/10 rounded-2xl border border-ecom-ink/10">
            {addons.map((addon) => (
              <li key={addon.id} className="flex items-center justify-between gap-4 p-4">
                <span className="text-sm text-ecom-ink">{addon.name[lang]}</span>
                <span className="shrink-0 text-sm font-medium text-ecom-ink">
                  +{formatUSD(addon.price)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-ecom-ink/10 pt-6">
        <span className="font-display text-lg font-medium text-ecom-ink">
          {t.packagesFlow.summaryTotal}
        </span>
        <span className="font-display text-3xl font-medium tracking-[-0.02em] text-ecom-orange">
          {formatUSD(total)}
        </span>
      </div>
    </div>
  );
}

function OrderSummary({
  plan,
  addons,
  addonsTotal,
  total,
  lang,
}: {
  plan: Plan | null;
  addons: PackageAddon[];
  addonsTotal: number;
  total: number;
  lang: Lang;
}) {
  const { t } = useLanguage();

  return (
    <aside className="rounded-2xl border border-ecom-ink/10 bg-ecom-ink/[0.02] p-6 lg:sticky lg:top-28">
      <p className="text-xs font-medium tracking-[0.2em] text-ecom-ink/50 uppercase">
        {t.packagesFlow.orderSummaryLabel}
      </p>

      {plan ? (
        <div className="mt-4 flex items-center justify-between gap-3 border-b border-ecom-ink/10 pb-4">
          <span className="font-display text-base font-medium text-ecom-ink">{plan.name[lang]}</span>
          <span className="text-sm font-medium text-ecom-ink/70">{plan.price}</span>
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
              <span className="shrink-0">+{formatUSD(addon.price)}</span>
            </li>
          ))}
        </ul>
      )}

      {addonsTotal > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-ecom-ink/60">
          <span>{t.packagesFlow.summaryExtras}</span>
          <span>+{formatUSD(addonsTotal)}</span>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-ecom-ink">{t.packagesFlow.summaryTotal}</span>
        <span className="font-display text-2xl font-medium tracking-[-0.02em] text-ecom-orange">
          {formatUSD(total)}
        </span>
      </div>
    </aside>
  );
}
