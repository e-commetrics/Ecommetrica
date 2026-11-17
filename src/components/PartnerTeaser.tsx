"use client";

import Link from "next/link";
import { customPlan, formatUSD } from "@/lib/pricing";
import { landingHref } from "@/lib/landings";
import { useLanguage } from "@/components/LanguageProvider";
import { useRegion } from "@/components/RegionProvider";

/**
 * /pricing's pointer to Aliado (Partner), the custom package above the four monthly plans:
 * one line and a link to its landing, where the full pitch lives.
 */
export default function PartnerTeaser() {
  const { t, lang } = useLanguage();
  const { region } = useRegion();
  const href = landingHref(lang, "custom");
  if (!href) return null;
  const x = t.pricingPage.partnerTeaser;

  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl bg-ecom-black p-7 text-white transition-shadow duration-500 hover:shadow-[0_30px_70px_-35px_var(--color-ecom-orange)] sm:flex-row sm:items-center sm:justify-between sm:p-9"
    >
      <span aria-hidden className="pointer-events-none absolute -top-24 right-10 h-64 w-64 rounded-full bg-ecom-red/30 blur-[90px]" />
      <span className="relative">
        <span className="block text-xs font-medium tracking-[0.15em] text-ecom-eyebrow-dark uppercase">{x.eyebrow}</span>
        <span className="mt-2 block font-display text-[clamp(1.6rem,3vw,2.25rem)] leading-tight font-medium">{x.title}</span>
        <span className="mt-2 block max-w-2xl text-sm text-white/65">{x.body(formatUSD(customPlan.priceFromValue[region]), formatUSD(customPlan.totalFromValue[region]))}</span>
      </span>
      <span className="relative inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 py-3 btn-text tracking-wide text-ecom-black uppercase transition-colors duration-300 group-hover:bg-ecom-orange group-hover:text-ecom-on-accent sm:self-auto">
        {x.cta}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
      </span>
    </Link>
  );
}
