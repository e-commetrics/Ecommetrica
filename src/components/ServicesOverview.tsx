"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ServiceRings from "@/components/ServiceRings";
import {
  layerIncludedFrom,
  serviceLayers,
  services,
  type ServiceLayerId,
} from "@/lib/services";
import { getPlan } from "@/lib/pricing";
import type { Lang } from "@/lib/i18n/types";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Home services section: the business as five layers, one per brand ring. Picking a
 * layer (its button, or its ring) lights that ring and lists the layer's services.
 * Services are only sold inside the plans, so the panel points at the earliest plan
 * carrying the layer — never at a standalone quote.
 */
export default function ServicesOverview({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const [active, setActive] = useState<ServiceLayerId>(serviceLayers[0].id);
  const layer = serviceLayers.find((l) => l.id === active)!;
  const layerServices = services.filter((service) => service.layer === active);
  const fromPlan = getPlan(layerIncludedFrom(active));

  return (
    // No bg class: shares the body surface with adjacent sections so noir shows no seam.
    // scroll-mt clears the sticky header; overflow-clip crops the rings' sway.
    <section id="services" className="shell scroll-mt-24 overflow-clip py-24 lg:py-32">
      {/* DOM order is the phone order (headline, rings, layers, panel); from xl the
          headline and layer list share the left column, rings and panel the right. */}
      <div className="grid gap-10 xl:grid-cols-[1fr_minmax(0,36rem)] xl:gap-x-16 xl:gap-y-8">
        <Reveal className="xl:col-start-1 xl:row-start-1">
          <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-ink/50 uppercase">
            {t.servicesOverview.eyebrow}
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-ecom-ink">
            {t.servicesOverview.headline}{" "}
            <span className="text-ecom-orange">{t.servicesOverview.headlineAccent}</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ecom-ink/70">
            {t.servicesOverview.sub}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto w-full max-w-2xl xl:col-start-2 xl:row-start-1 xl:max-w-none xl:self-center">
          <ServiceRings layers={serviceLayers} active={active} onSelect={setActive} />
        </Reveal>

        <Reveal delay={0.1} className="xl:col-start-1 xl:row-start-2">
          <div
            role="group"
            aria-label={t.servicesOverview.layersAria}
            className="flex flex-wrap gap-2 xl:flex-col xl:gap-1"
          >
            {serviceLayers.map((item) => {
              const isActive = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(item.id)}
                  onMouseEnter={() => setActive(item.id)}
                  className={`rounded-full border px-4 py-2 text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] xl:rounded-none xl:border-0 xl:border-l-2 xl:px-0 xl:py-2.5 xl:pl-5 ${
                    isActive
                      ? "border-ecom-orange bg-ecom-orange text-white xl:bg-transparent xl:text-ecom-ink"
                      : "border-ecom-ink/15 text-ecom-ink/70 hover:border-ecom-orange/50 xl:border-ecom-ink/10"
                  }`}
                >
                  <span
                    className={`block font-display text-base font-medium xl:text-xl ${
                      isActive ? "xl:text-ecom-orange" : "xl:text-ecom-ink"
                    }`}
                  >
                    {item.name[lang]}
                  </span>
                  <span className="hidden text-sm text-ecom-ink/55 xl:block">{item.line[lang]}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Always dark, like Planes/Pillars: text on it is hardcoded white. */}
        <Reveal delay={0.2} className="xl:col-start-2 xl:row-start-2">
          <div className="min-h-[15rem] rounded-3xl bg-ecom-black p-6 text-white sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <p className="text-sm font-medium tracking-[0.2em] text-white/50 uppercase">
                  {layer.line[lang]}
                </p>
                <ul className="mt-5 flex flex-col gap-5">
                  {layerServices.map((service) => (
                    <li key={service.id}>
                      <h3 className="font-display text-xl font-medium">{service.name[lang]}</h3>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {service.items.map((item) => (
                          <span
                            key={item.en}
                            className="rounded-full bg-white/8 px-3 py-1 text-sm text-white/80"
                          >
                            {item[lang]}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
                {fromPlan && (
                  <p className="mt-6 text-sm text-white/55">
                    {t.servicesOverview.includedFrom(fromPlan.name[lang])}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-14 flex flex-wrap items-center gap-4">
        <Link
          href={localizedHref(lang, "/pricing")}
          className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 hover:bg-ecom-red"
        >
          {t.servicesOverview.ctaPlans}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
        <Link
          href={localizedHref(lang, "/services")}
          className="inline-flex items-center gap-2 rounded-full border border-ecom-ink/15 px-7 py-3.5 text-sm font-medium tracking-wide text-ecom-ink uppercase transition-colors duration-300 hover:border-ecom-orange hover:text-ecom-orange"
        >
          {t.servicesOverview.cta}
        </Link>
      </Reveal>
    </section>
  );
}
