"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useRegion } from "@/components/RegionProvider";
import { serviceGoals, serviceLayers, services, type Service } from "@/lib/services";
import { formatUSD, getPlan } from "@/lib/pricing";
import type { Lang } from "@/lib/i18n/types";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * /services body: pick a goal ("Quiero vender en línea") to see the services that solve
 * it next to the plan that bundles them, then the full catalogue grouped by layer.
 * Services are only sold inside plans, so every card points at a plan, never a quote.
 */
export default function ServicesExplorer({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const p = t.servicesPage;
  const { region } = useRegion();
  const [goalId, setGoalId] = useState(serviceGoals[0].id);
  const goal = serviceGoals.find((g) => g.id === goalId)!;
  const plan = getPlan(goal.planId);
  const goalServices = services.filter((service) => goal.layers.includes(service.layer));

  return (
    <>
      <section className="mt-16">
        <h2 className="font-display text-2xl font-medium tracking-tight text-ecom-ink sm:text-3xl">
          {p.goalsTitle}
        </h2>
        <div role="group" aria-label={p.goalsTitle} className="mt-6 flex flex-wrap gap-2">
          {serviceGoals.map((g) => {
            const isActive = g.id === goalId;
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setGoalId(g.id)}
                className={`rounded-full border px-5 py-3 text-[0.95rem] transition-colors duration-300 ${
                  isActive
                    ? "border-ecom-ink bg-ecom-ink text-ecom-surface"
                    : "border-ecom-ink/15 text-ecom-ink hover:border-ecom-orange"
                }`}
              >
                {p.goalPrefix} {g.name[lang]}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={goalId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start"
          >
            <div className="grid gap-5 sm:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
              {goalServices.map((service) => (
                <ServiceCard key={service.id} service={service} lang={lang} />
              ))}
            </div>

            {plan && (
              // Always dark: hardcoded white text, like the other bundle surfaces.
              <aside className="rounded-3xl bg-ecom-black p-7 text-white lg:sticky lg:top-28">
                <p className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">
                  {p.bundleKicker}
                </p>
                <h3 className="mt-3 font-display text-3xl font-medium">{plan.name[lang]}</h3>
                <p className="mt-3 leading-relaxed text-white/65">{goal.pitch[lang]}</p>
                <p className="mt-5 text-sm text-white/55">
                  {p.bundleFrom}{" "}
                  <span className="font-display text-2xl font-medium text-white">
                    {formatUSD(plan.priceValue[region])}
                  </span>
                  {!plan.oneTime && t.pricingPage.perMonth}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href={`${localizedHref(lang, "/packages")}?plan=${plan.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ecom-orange px-6 py-3 text-base font-semibold tracking-wide text-ecom-black uppercase transition-colors duration-300 hover:bg-ecom-ink hover:text-ecom-surface"
                  >
                    {p.bundleCta(plan.name[lang])}
                    <span aria-hidden>&rarr;</span>
                  </Link>
                  <Link
                    href={localizedHref(lang, "/pricing")}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-semibold tracking-wide text-white uppercase transition-colors duration-300 hover:border-white/50"
                  >
                    {p.compareCta}
                  </Link>
                </div>
              </aside>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="mt-28">
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ecom-ink">
            {p.allTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ecom-ink/70">{p.allSub}</p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-14">
          {serviceLayers.map((layer) => (
            // id: anchor for deep links, e.g. /services#visibilidad.
            <section key={layer.id} id={layer.id} className="scroll-mt-24 border-t border-ecom-ink/10 pt-8">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display text-2xl font-medium tracking-tight text-ecom-ink sm:text-3xl">
                  {layer.name[lang]}
                </h3>
                <p className="text-ecom-ink/55">{layer.line[lang]}</p>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {services
                  .filter((service) => service.layer === layer.id)
                  .map((service) => (
                    <ServiceCard key={service.id} service={service} lang={lang} showIncluded />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

function ServiceCard({
  service,
  lang,
  showIncluded = false,
}: {
  service: Service;
  lang: Lang;
  showIncluded?: boolean;
}) {
  const t = getDict(lang);
  const layer = serviceLayers.find((l) => l.id === service.layer);
  const plan = getPlan(service.includedFrom);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-ecom-ink/12 p-7 transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-ecom-orange/45">
      {!showIncluded && layer && (
        <p className="text-xs font-medium tracking-[0.14em] text-ecom-ink/45 uppercase">
          {layer.name[lang]}
        </p>
      )}
      <h4 className={`font-display text-2xl font-medium tracking-tight text-ecom-ink ${showIncluded ? "" : "mt-2.5"}`}>
        {service.name[lang]}
      </h4>
      <p className="mt-2.5 leading-relaxed text-ecom-ink/65">{service.description[lang]}</p>
      <ul className="mt-4 flex flex-col gap-2 text-[0.95rem] text-ecom-ink/75">
        {service.items.map((item) => (
          <li key={item.en} className="flex items-start gap-2.5">
            <span aria-hidden className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ecom-orange" />
            {item[lang]}
          </li>
        ))}
      </ul>
      {showIncluded && plan && (
        <p className="mt-auto pt-6">
          <span className="inline-flex rounded-full bg-ecom-orange/10 px-3 py-1 text-xs font-medium tracking-wide text-ecom-eyebrow">
            {t.servicesPage.includedFrom(plan.name[lang])}
          </span>
        </p>
      )}
    </article>
  );
}
