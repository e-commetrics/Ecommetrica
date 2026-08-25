import type { Lang, Localized, Region } from "@/lib/i18n/types";

export function formatUSD(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export type PlanFeature = {
  text: Localized;
  /** Only shown when region === "us" — inclusions the Mexico/LatAm tier doesn't carry. */
  usOnly?: boolean;
};

export type Plan = {
  id: string;
  name: Localized;
  duration: Localized;
  /** Same across regions — the multiplier lives in price/serviceCount, not the term. */
  durationMonths: number;
  priceValue: Record<Region, number>;
  /** Printed directly on the /pricing mockups — total and per-service figures are derived from
   *  this and priceValue rather than duplicated as separate stored strings. */
  serviceCount: Record<Region, number>;
  features: PlanFeature[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "simple",
    name: { es: "Arranque", en: "Launch" },
    duration: { es: "3 meses", en: "3 months" },
    durationMonths: 3,
    priceValue: { mx: 675, us: 1450 },
    serviceCount: { mx: 7, us: 9 },
    features: [
      {
        text: {
          es: "Sitio web (React/Astro o Shopify)",
          en: "Custom website (React, Astro, or Shopify)",
        },
      },
      { text: { es: "SEO y AEO", en: "SEO and AEO" } },
      { text: { es: "Contenido generado con IA", en: "AI-assisted content production" } },
      { text: { es: "Configuración de redes sociales", en: "Social profile setup" } },
      {
        text: {
          es: "Google Analytics 4 y Meta Pixel",
          en: "Google Analytics 4 and Meta Pixel",
        },
      },
      {
        text: {
          es: "Banner de consentimiento y aviso de privacidad",
          en: "Consent banner and privacy notice",
        },
      },
      { text: { es: "Soporte de hosting y dominios", en: "Hosting and domain support" } },
      {
        text: {
          es: "Soporte en horario hábil de EUA",
          en: "US business-hours support",
        },
        usOnly: true,
      },
      {
        text: {
          es: "Gestión de cuenta en inglés",
          en: "English-language account management",
        },
        usOnly: true,
      },
    ],
  },
  {
    id: "advanced",
    name: { es: "Tracción", en: "Traction" },
    duration: { es: "4 meses", en: "4 months" },
    durationMonths: 4,
    priceValue: { mx: 995, us: 2450 },
    serviceCount: { mx: 13, us: 16 },
    features: [
      { text: { es: "Todo en Arranque", en: "Everything in Launch" } },
      { text: { es: "Tienda Shopify", en: "Shopify store" } },
      { text: { es: "SEO y AEO avanzado", en: "Advanced SEO and AEO" } },
      { text: { es: "Desarrollo web avanzado", en: "Advanced web development" } },
      { text: { es: "Diseño de contenido para redes", en: "Social content design" } },
      { text: { es: "Branding", en: "Branding" } },
      {
        text: {
          es: "Cumplimiento ADA / WCAG 2.1 AA",
          en: "ADA / WCAG 2.1 AA conformance",
        },
      },
      { text: { es: "Auditoría y remediación", en: "Audit and remediation" } },
      { text: { es: "Declaración de accesibilidad", en: "Accessibility statement" } },
      {
        text: {
          es: "Configuración de consentimiento CCPA/CPRA",
          en: "CCPA/CPRA consent configuration",
        },
        usOnly: true,
      },
    ],
  },
  {
    id: "grower",
    name: { es: "Escala", en: "Scale" },
    duration: { es: "6 meses", en: "6 months" },
    durationMonths: 6,
    priceValue: { mx: 1185, us: 3200 },
    serviceCount: { mx: 22, us: 26 },
    featured: true,
    features: [
      { text: { es: "Todo en Tracción", en: "Everything in Traction" } },
      { text: { es: "Desarrollo web a la medida", en: "Custom web development" } },
      {
        text: {
          es: "Estrategia de redes con planeación mensual",
          en: "Monthly social strategy and planning",
        },
      },
      { text: { es: "Publicidad digital (Google/Meta)", en: "Paid media (Google/Meta)" } },
      { text: { es: "Branding", en: "Branding" } },
      { text: { es: "Producción audiovisual completa", en: "Full video production" } },
      {
        text: {
          es: "Monitoreo y atención en vivo",
          en: "Live monitoring and support",
        },
      },
      { text: { es: "Integraciones de plataforma", en: "Platform integrations" } },
      { text: { es: "Meta Graph API", en: "Meta Graph API" } },
      { text: { es: "Google Business Profile API", en: "Google Business Profile API" } },
      { text: { es: "Search Console y GA4", en: "Search Console and GA4" } },
      {
        text: {
          es: "Sitio bilingüe — inglés y español",
          en: "Bilingual site — English and Spanish",
        },
        usOnly: true,
      },
    ],
  },
  {
    id: "high-profile",
    name: { es: "Cúspide", en: "Peak" },
    duration: { es: "8 meses", en: "8 months" },
    durationMonths: 8,
    priceValue: { mx: 1555, us: 4500 },
    serviceCount: { mx: 28, us: 34 },
    features: [
      { text: { es: "Todo en Escala", en: "Everything in Scale" } },
      {
        text: {
          es: "Producción audiovisual cinematográfica (4K)",
          en: "Cinematic 4K video production",
        },
      },
      { text: { es: "VPAT / reporte de conformidad", en: "VPAT / conformance report" } },
      { text: { es: "Automatización de marketing", en: "Marketing automation" } },
      {
        text: {
          es: "Integraciones con tus sistemas (hasta 2, API documentada)",
          en: "System integrations (up to 2, documented API)",
        },
      },
      { text: { es: "Dashboard y BI", en: "Dashboard and BI" } },
      {
        text: {
          es: "SLA de soporte prioritario (24 h hábiles)",
          en: "Priority support SLA (24 business hours)",
        },
      },
      {
        text: {
          es: "Entidad contratante en EUA y W-9",
          en: "US contracting entity and W-9",
        },
        usOnly: true,
      },
      {
        text: {
          es: "Sesión presencial trimestral en San Diego",
          en: "Quarterly on-site in San Diego",
        },
        usOnly: true,
      },
    ],
  },
];

export type CustomPlanModule = { title: Localized; description: Localized };

export type CustomPlan = {
  id: "custom";
  name: Localized;
  minDuration: Localized;
  priceFromValue: Record<Region, number>;
  totalFromValue: Record<Region, number>;
  modules: CustomPlanModule[];
};

export const customPlan: CustomPlan = {
  id: "custom",
  name: { es: "Aliado", en: "Partner" },
  minDuration: { es: "Mínimo 8 meses", en: "Minimum 8 months" },
  priceFromValue: { mx: 2500, us: 6500 },
  totalFromValue: { mx: 20000, us: 52000 },
  modules: [
    {
      title: { es: "Equipo embebido", en: "Embedded team" },
      description: {
        es: "Capital humano asignado a tu área con operación mensual fija.",
        en: "Dedicated people assigned to your area with fixed monthly capacity.",
      },
    },
    {
      title: { es: "Roadmap y sprints continuos", en: "Continuous roadmap and sprints" },
      description: {
        es: "Desarrollo fluido del proyecto: entregables quincenales contra roadmap.",
        en: "Smooth, ongoing development: biweekly deliverables against the roadmap.",
      },
    },
    {
      title: { es: "Motor de contenido AEO-first", en: "AEO-first content engine" },
      description: {
        es: "Contenido en volumen para ser referencia en las IAs y motores de búsqueda.",
        en: "Content at volume, built to become the reference cited by AI answers and search.",
      },
    },
    {
      title: { es: "Consultoría estratégica", en: "Strategic consulting" },
      description: {
        es: "Dirección digital: arquitectura, presupuesto y prioridades.",
        en: "Digital direction at decision level: architecture, budget, and priorities.",
      },
    },
    {
      title: { es: "App a la medida", en: "Custom application" },
      description: {
        es: "Software propio desde cero, más allá de los componentes empaquetados.",
        en: "Software built from scratch, beyond the packaged components.",
      },
    },
  ],
};

/** Mirrors PackagesConfigurator.buildSummaryMessage()'s style, but for the Aliado/custom
 *  plan, which has no addon steps — just the plan name, starting price, and minimum term. */
export function customPlanSummaryMessage(lang: Lang, region: Region, messagePlanLabel: string) {
  return `${messagePlanLabel}: ${customPlan.name[lang]} (${formatUSD(customPlan.priceFromValue[region])}/mo · ${customPlan.minDuration[lang]})`;
}

export function planTotal(plan: Plan, region: Region) {
  return plan.priceValue[region] * plan.durationMonths;
}

export function planPerService(plan: Plan, region: Region) {
  return Math.round(plan.priceValue[region] / plan.serviceCount[region]);
}
