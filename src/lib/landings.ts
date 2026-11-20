import type { Lang, Localized, Region } from "@/lib/i18n/types";
import { customPlan, formatSaving, formatUSD, getPlan, hostingRenewalValue, planTotal, type PlanId } from "@/lib/pricing";
import { localizedHref } from "@/lib/i18n/localizedHref";

/**
 * Marketing landing pages, one per package, nested under /pricing (and under "Planes" in
 * the header). Adding a package's landing = its content file (src/lib/landings/<file>.ts),
 * an entry here, one line in src/lib/landings/all.ts, and its hero visual in
 * src/components/landing/visuals.ts. The route is the dynamic /pricing/[slug] page; the
 * header menu, the sitemap and llms.txt read this list. PackageLanding.tsx renders them.
 *
 * Each landing's hero should be a step up from the package below it, the way the packages
 * themselves are.
 */

/** A package that can have a landing: the five plans, plus the custom Aliado/Partner one. */
export type LandingPlanId = PlanId | "custom";

export type PackageLandingEntry = {
  planId: LandingPlanId;
  slug: string;
  /** Short line under the package name in the header's Planes menu. */
  menuLine: Localized;
};

/** In package order: this is also the order of the header's Planes menu. */
export const PACKAGE_LANDINGS: PackageLandingEntry[] = [
  {
    planId: "express",
    slug: "ai-express",
    menuLine: { es: "Tu sitio en 3 días, pago único", en: "Your site in 3 days, one-time payment" },
  },
  {
    planId: "simple",
    slug: "launch",
    menuLine: { es: "Marca, sitio y redes para abrir bien", en: "Brand, site and social to open right" },
  },
  {
    planId: "advanced",
    slug: "traction",
    menuLine: { es: "Vende en línea: reservas, pagos y pauta", en: "Sell online: booking, payments and ads" },
  },
  {
    planId: "grower",
    slug: "scale",
    menuLine: { es: "Crecimiento mensual con estrategia", en: "Monthly growth with strategy" },
  },
  {
    planId: "high-profile",
    slug: "peak",
    menuLine: { es: "Software y automatización para operar", en: "Software and automation to run on" },
  },
  {
    planId: "custom",
    slug: "partner",
    menuLine: { es: "Un equipo dedicado, no un proveedor", en: "A dedicated team, not a vendor" },
  },
];

/** A package's display name, wherever it lives (the plans array or the custom plan). */
export function landingPlanName(planId: LandingPlanId, lang: Lang) {
  return planId === "custom" ? customPlan.name[lang] : (getPlan(planId)?.name[lang] ?? planId);
}

/** A title + a line of body copy (problem cards, included items, steps, FAQ). */
export type LandingItem = { title: Localized; body: Localized };

/**
 * Everything a package landing says. Strings may carry these tokens, filled in by
 * `fillTokens` with the visitor's region, so no price is ever typed into copy:
 * `{price}` the package price (one-time, monthly, or the custom plan's starting monthly),
 * `{total}` the contract total, `{saving}` the saving vs. the value of each service on its own,
 * `{hosting}` the yearly hosting renewal.
 */
export type LandingContent = {
  planId: LandingPlanId;
  slug: string;
  meta: { title: Localized; description: Localized; keywords: { es: string[]; en: string[] } };
  hero: {
    eyebrow: Localized;
    /** Three headline lines; the last one is set in the accent color. */
    lines: [Localized, Localized, Localized];
    sub: Localized;
    ctaPrimary: Localized;
    ctaSecondary: Localized;
    /** Small line under the price, e.g. "Pago único · Hosting del primer año incluido". */
    priceNote: Localized;
    proof: Localized[];
  };
  problem: { eyebrow: Localized; title: Localized; items: LandingItem[] };
  included: { eyebrow: Localized; title: Localized; sub: Localized; items: LandingItem[] };
  steps: { eyebrow: Localized; title: Localized; sub: Localized; items: LandingItem[]; note: Localized };
  alternatives: {
    eyebrow: Localized;
    title: Localized;
    /** Column headers; the last column is this package and is highlighted. */
    columns: Localized[];
    rows: { label: Localized; values: Localized[] }[];
    footnote: Localized;
  };
  fit: {
    eyebrow: Localized;
    title: Localized;
    yesTitle: Localized;
    yes: Localized[];
    noTitle: Localized;
    no: Localized[];
    /** Where the "not for you" column sends people: usually the next package. */
    noPlanId: LandingPlanId;
    noCta: Localized;
  };
  offer: {
    eyebrow: Localized;
    title: Localized;
    bullets: Localized[];
    /** The one line that tips the decision (a credit, a saving, a guarantee). */
    highlight: Localized;
    /** Small print under it: renewals, what's paid separately. */
    renewal: Localized;
    cta: Localized;
  };
  faq: { eyebrow: Localized; title: Localized; items: LandingItem[] };
  final: { title: Localized; sub: Localized; cta: Localized };
  /** The sticky bar on phones once the hero has scrolled away. */
  stickyLabel: Localized;
};

export type LandingPrice = {
  kind: "one-time" | "monthly" | "custom";
  /** The headline figure: the one-time price, the monthly fee, or the custom "from" fee. */
  price: string;
  total: string;
  saving: string;
  hosting: string;
};

/** The figures a landing shows for its package in a region. */
export function landingPrice(planId: LandingPlanId, region: Region): LandingPrice {
  const hosting = formatUSD(hostingRenewalValue[region]);
  if (planId === "custom") {
    return {
      kind: "custom",
      price: formatUSD(customPlan.priceFromValue[region]),
      total: formatUSD(customPlan.totalFromValue[region]),
      saving: "",
      hosting,
    };
  }
  const plan = getPlan(planId);
  if (!plan) return { kind: "monthly", price: "", total: "", saving: "", hosting };
  const saving = plan.savingPercent[region];
  return {
    kind: plan.oneTime ? "one-time" : "monthly",
    price: formatUSD(plan.priceValue[region]),
    total: formatUSD(planTotal(plan, region)),
    saving: saving === null ? "" : formatSaving(saving),
    hosting,
  };
}

export function fillTokens(text: string, tokens: Partial<Omit<LandingPrice, "kind">>) {
  return text
    .replaceAll("{price}", tokens.price ?? "")
    .replaceAll("{total}", tokens.total ?? "")
    .replaceAll("{saving}", tokens.saving ?? "")
    .replaceAll("{hosting}", tokens.hosting ?? "");
}

export function landingPath(slug: string) {
  return `/pricing/${slug}`;
}

export function landingHref(lang: Lang, planId: LandingPlanId) {
  const entry = PACKAGE_LANDINGS.find((landing) => landing.planId === planId);
  return entry ? localizedHref(lang, landingPath(entry.slug)) : null;
}

/** Where a package is bought: the configurator for the plans, contact for Aliado. */
export function landingBuyHref(lang: Lang, planId: LandingPlanId) {
  return planId === "custom"
    ? localizedHref(lang, "/contact")
    : `${localizedHref(lang, "/packages")}?plan=${planId}`;
}
