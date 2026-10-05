import type { Lang, Localized, Region } from "@/lib/i18n/types";

export function formatUSD(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export type PlanFeature = {
  text: Localized;
  /** Sales-pitch subtext printed under the feature label on the pricing mockups. */
  description?: Localized;
  /** Only shown when region === "us" — inclusions the Mexico/LatAm tier doesn't carry. */
  usOnly?: boolean;
  /** Compact version for the headline tag row (PlanFeatures.tsx) — falls back to `text`
   *  when a feature's own name is already short enough to use as-is. */
  shortLabel?: Localized;
  /** Slug (no locale prefix) for a feature with its own explainer page, e.g. "vpat" ->
   *  /vpat or /en/vpat via localizedHref. Rendered as a "Learn more" link. */
  learnMoreSlug?: string;
};

export type Plan = {
  id: string;
  name: Localized;
  tagline: Localized;
  duration: Localized;
  /** Same across regions — the multiplier lives in price/serviceCount, not the term. */
  durationMonths: number;
  priceValue: Record<Region, number>;
  /** Printed directly on the /pricing mockups — total and per-service figures are derived from
   *  this and priceValue rather than duplicated as separate stored strings. */
  serviceCount: Record<Region, number>;
  features: PlanFeature[];
  featured?: boolean;
  /** Id of the plan this one fully includes — rendered as a single "Everything in X" line
   *  (PlanFeatures.tsx) instead of repeating X's features in this array. */
  inheritsFromPlanId?: string;
};

export const plans: Plan[] = [
  {
    id: "simple",
    name: { es: "Arranque", en: "Launch" },
    tagline: {
      es: "Inaugura tu presencia digital completa, bien hecha en 90 días sin plantillas y sin rehacerlo después.",
      en: "Launch your complete digital presence, done right in 90 days, no templates and no redoing it later.",
    },
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
        shortLabel: { es: "Sitio web", en: "Website" },
      },
      {
        text: { es: "Tienda Shopify — 15 productos", en: "Shopify store — 15 products" },
        shortLabel: { es: "Shopify · 15 productos", en: "Shopify · 15 products" },
      },
      {
        text: { es: "SEO y AEO", en: "SEO and AEO" },
        description: {
          es: "Incluye configuración de Search Console, para que en los motores de búsqueda y las IAs hablen de ti desde que inicias.",
          en: "Includes Search Console setup, so search engines and AI answers are already talking about you from day one.",
        },
      },
      {
        text: { es: "Contenido generado con IA", en: "AI-assisted content production" },
        shortLabel: { es: "Contenido IA", en: "AI content" },
      },
      {
        text: { es: "Google Analytics 4", en: "Google Analytics 4" },
        description: {
          es: "Más que estadísticas, una interpretación para tomar acción y aumentar el retorno de inversión.",
          en: "More than stats — an interpretation you can act on to increase return on investment.",
        },
        shortLabel: { es: "GA4", en: "GA4" },
        learnMoreSlug: "ga4",
      },
      {
        text: { es: "Meta Pixel", en: "Meta Pixel" },
      },
      {
        text: {
          es: "Banner de consentimiento y aviso de privacidad",
          en: "Consent banner and privacy notice",
        },
        shortLabel: { es: "Consentimiento", en: "Consent banner" },
      },
      {
        text: { es: "Soporte de hosting y dominios", en: "Hosting and domain support" },
        shortLabel: { es: "Hosting y dominios", en: "Hosting & domains" },
      },
      {
        text: {
          es: "Soporte en horario hábil de EUA",
          en: "US business-hours support",
        },
        shortLabel: { es: "Soporte EUA", en: "US support" },
        usOnly: true,
      },
      {
        text: {
          es: "Gestión de cuenta en inglés",
          en: "English-language account management",
        },
        shortLabel: { es: "Cuenta en inglés", en: "English account" },
        usOnly: true,
      },
    ],
  },
  {
    id: "advanced",
    name: { es: "Tracción", en: "Traction" },
    tagline: {
      es: "Empuja a tus leads a pagar su carrito con una experiencia elevada de un sitio web blindado y ágil.",
      en: "Push your leads to check out with an elevated experience — a website that's fast and locked down.",
    },
    duration: { es: "4 meses", en: "4 months" },
    durationMonths: 4,
    priceValue: { mx: 995, us: 2450 },
    serviceCount: { mx: 13, us: 16 },
    inheritsFromPlanId: "simple",
    features: [
      {
        text: { es: "Configuración de redes sociales", en: "Social profile setup" },
        description: {
          es: "Accesos en orden, todo listo para que pautes sin problema o tengas a tu equipo listo y tu información brindada.",
          en: "Access set up in order, everything ready for you to run ads without friction or to hand your team a fully briefed setup.",
        },
        shortLabel: { es: "Redes sociales", en: "Social setup" },
      },
      {
        text: { es: "Tienda Shopify — 50 productos", en: "Shopify store — 50 products" },
        shortLabel: { es: "Shopify · 50 productos", en: "Shopify · 50 products" },
        description: {
          es: "Pendiente datos de productos.",
          en: "Pending product data from you.",
        },
      },
      {
        text: { es: "SEO y AEO avanzado", en: "Advanced SEO and AEO" },
        description: {
          es: "Más palabras clave, backlinks, contenido más profundo con estructura que impulsa la visibilidad y citado en las últimas IAs.",
          en: "More keywords, backlinks, and deeper content with a structure that drives visibility and citation in the latest AI models.",
        },
        shortLabel: { es: "SEO avanzado", en: "Advanced SEO" },
      },
      {
        text: { es: "Branding", en: "Branding" },
        description: {
          es: "Identidad visual y personalidad de marca: logotipo, tipografía, colores y elementos gráficos, tono de comunicación, estilo, etc.",
          en: "Visual identity and brand personality: logo, typography, colors and graphic elements, tone of voice, style, and more.",
        },
      },
      {
        text: { es: "Diseño de contenido para redes", en: "Social content design" },
        description: {
          es: "Sincronizado con branding y página web.",
          en: "Synced with your branding and website.",
        },
        shortLabel: { es: "Contenido redes", en: "Social content" },
      },
      {
        text: { es: "Google Business Profile API", en: "Google Business Profile API" },
        shortLabel: { es: "Google Business", en: "Google Business" },
        learnMoreSlug: "google-business-profile",
      },
      {
        text: {
          es: "Sitio web accesible para las personas con discapacidad (Cumplimiento de ADA/WCAG 2.1 AA)",
          en: "Website accessible for people with disabilities (ADA/WCAG 2.1 AA conformance)",
        },
        shortLabel: { es: "Accesibilidad ADA", en: "ADA accessibility" },
      },
      {
        text: { es: "Auditoría y remediación", en: "Audit and remediation" },
        shortLabel: { es: "Auditoría", en: "Audit" },
      },
      {
        text: { es: "Declaración de accesibilidad", en: "Accessibility statement" },
        shortLabel: { es: "Declaración a11y", en: "A11y statement" },
      },
      {
        text: {
          es: "Configuración de consentimiento CCPA/CPRA",
          en: "CCPA/CPRA consent configuration",
        },
        shortLabel: { es: "CCPA/CPRA", en: "CCPA/CPRA" },
        usOnly: true,
      },
    ],
  },
  {
    id: "grower",
    name: { es: "Escala", en: "Scale" },
    tagline: {
      es: "Crecimiento mensual sostenido. Todo a la medida.",
      en: "Sustained monthly growth. Everything built to fit.",
    },
    duration: { es: "6 meses", en: "6 months" },
    durationMonths: 6,
    priceValue: { mx: 1185, us: 3200 },
    serviceCount: { mx: 22, us: 26 },
    featured: true,
    inheritsFromPlanId: "advanced",
    features: [
      {
        text: { es: "Tienda Shopify — 150 productos", en: "Shopify store — 150 products" },
        shortLabel: { es: "Shopify · 150 productos", en: "Shopify · 150 products" },
      },
      {
        text: { es: "Monitoreo y atención en vivo", en: "Live monitoring and support" },
        shortLabel: { es: "Monitoreo en vivo", en: "Live monitoring" },
      },
      {
        text: { es: "Desarrollo web a la medida", en: "Custom web development" },
        shortLabel: { es: "Desarrollo a medida", en: "Custom dev" },
      },
      {
        text: {
          es: "Estrategia de redes con planeación mensual",
          en: "Monthly social strategy and planning",
        },
        shortLabel: { es: "Estrategia mensual", en: "Monthly strategy" },
      },
      {
        text: { es: "Publicidad digital — Google", en: "Paid media — Google" },
        shortLabel: { es: "Publicidad Google", en: "Google ads" },
      },
      {
        text: { es: "Publicidad digital — Meta", en: "Paid media — Meta" },
        shortLabel: { es: "Publicidad Meta", en: "Meta ads" },
      },
      { text: { es: "Branding", en: "Branding" } },
      {
        text: { es: "Producción audiovisual completa", en: "Full video production" },
        description: {
          es: "Planeación, producción y postproducción.",
          en: "Planning, production, and post-production.",
        },
        shortLabel: { es: "Producción audiovisual", en: "Video production" },
      },
      {
        text: { es: "Integraciones de plataforma", en: "Platform integrations" },
        description: {
          es: "Gestión masiva de datos, cliente, reseñas, automatizaciones y métricas de rendimiento y rutas.",
          en: "Bulk management of data, clients, reviews, automations, and performance and routing metrics.",
        },
        shortLabel: { es: "Integraciones", en: "Integrations" },
      },
      {
        text: { es: "Meta Graph API", en: "Meta Graph API" },
        learnMoreSlug: "meta-graph-api",
      },
      {
        text: {
          es: "Sitio bilingüe — inglés y español",
          en: "Bilingual site — English and Spanish",
        },
        shortLabel: { es: "Sitio bilingüe", en: "Bilingual site" },
        usOnly: true,
      },
    ],
  },
  {
    id: "high-profile",
    name: { es: "Cúspide", en: "Peak" },
    tagline: {
      es: "Deja las tareas manuales y comienza a correr en software y automatización.",
      en: "Leave the manual tasks behind and start running on software and automation.",
    },
    duration: { es: "8 meses", en: "8 months" },
    durationMonths: 8,
    priceValue: { mx: 1555, us: 4500 },
    serviceCount: { mx: 28, us: 34 },
    inheritsFromPlanId: "grower",
    features: [
      {
        text: { es: "Tienda Shopify — 500 productos", en: "Shopify store — 500 products" },
        shortLabel: { es: "Shopify · 500 productos", en: "Shopify · 500 products" },
      },
      {
        text: {
          es: "Producción audiovisual cinematográfica (4K)",
          en: "Cinematic 4K video production",
        },
        shortLabel: { es: "Video 4K", en: "4K video" },
      },
      {
        text: { es: "Automatización de marketing", en: "Marketing automation" },
        description: {
          es: "Correos masivos, respuestas, calendarización sin esfuerzo manual.",
          en: "Bulk email, replies, and scheduling — no manual effort.",
        },
        shortLabel: { es: "Automatización", en: "Automation" },
      },
      {
        text: { es: "Dashboard y BI", en: "Dashboard and BI" },
        description: {
          es: "Tu propia web App con todos tus datos, gestión de calendarios, información con los accesos que desees.",
          en: "Your own web app with all your data, calendar management, and information with the access levels you want.",
        },
      },
      {
        text: {
          es: "Integraciones con tus sistemas (Hasta 2, API documentada)",
          en: "System integrations (up to 2, documented API)",
        },
        shortLabel: { es: "Integraciones API", en: "API integrations" },
      },
      {
        // Fixed from a prior "24 h hábiles" response-time framing, which read like a
        // round-the-clock SLA — this states actual coverage hours instead.
        text: {
          es: "Soporte prioritario en horario de oficina",
          en: "Priority support during office hours",
        },
        description: {
          es: "Lunes a viernes, 9 a.m. – 5 p.m.",
          en: "Monday to Friday, 9am–5pm.",
        },
        shortLabel: { es: "Soporte prioritario", en: "Priority support" },
      },
      {
        text: { es: "VPAT / Reporte de conformidad", en: "VPAT / Conformance report" },
        learnMoreSlug: "vpat",
      },
      {
        text: {
          es: "Entidad contratante en EUA y W-9",
          en: "US contracting entity and W-9",
        },
        shortLabel: { es: "Entidad EUA", en: "US entity" },
        usOnly: true,
      },
      {
        text: {
          es: "Sesión presencial trimestral en San Diego",
          en: "Quarterly on-site in San Diego",
        },
        shortLabel: { es: "Sesión presencial", en: "On-site visit" },
        usOnly: true,
      },
    ],
  },
];

export function getPlan(id: string) {
  return plans.find((plan) => plan.id === id);
}

export type CustomPlanModule = { title: Localized; description: Localized };

export type CustomPlan = {
  id: "custom";
  name: Localized;
  tagline: Localized;
  minDuration: Localized;
  priceFromValue: Record<Region, number>;
  totalFromValue: Record<Region, number>;
  modules: CustomPlanModule[];
};

export const customPlan: CustomPlan = {
  id: "custom",
  name: { es: "Aliado", en: "Partner" },
  tagline: {
    es: "Para quien necesita un área de especialidad, no un proveedor.",
    en: "For whoever needs a full area of specialty, not just another vendor.",
  },
  minDuration: { es: "Mínimo 8 meses", en: "Minimum 8 months" },
  priceFromValue: { mx: 2500, us: 6500 },
  totalFromValue: { mx: 20000, us: 52000 },
  modules: [
    {
      title: { es: "Tienda Shopify", en: "Shopify store" },
      description: {
        es: "Más de 500 productos.",
        en: "500+ products.",
      },
    },
    {
      title: { es: "Equipo embebido", en: "Embedded team" },
      description: {
        es: "Capital humano asignado a tu área con operación mensual fija.",
        en: "Dedicated people assigned to your area with fixed monthly capacity.",
      },
    },
    {
      title: { es: "Roadmap y sprints continuas", en: "Continuous roadmap and sprints" },
      description: {
        es: "Desarrollo fluido del proyecto: Entregables quincenales contra roadmap.",
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
        es: "Dirección digital: Arquitectura, presupuesto y prioridades.",
        en: "Digital direction at decision level: architecture, budget, and priorities.",
      },
    },
    {
      title: { es: "App a la medida", en: "Custom application" },
      description: {
        es: "Desarrollo de software propio.",
        en: "Development of your own custom software.",
      },
    },
  ],
};

/** Mirrors PackagesConfigurator.buildSummaryMessage()'s style, but for the Aliado/custom
 *  plan, which has no addon steps — just the plan name, starting price, and minimum term. */
export function customPlanSummaryMessage(
  lang: Lang,
  region: Region,
  messagePlanLabel: string,
  perMonthLabel: string,
) {
  return `${messagePlanLabel}: ${customPlan.name[lang]} (${formatUSD(customPlan.priceFromValue[region])}${perMonthLabel} · ${customPlan.minDuration[lang]})`;
}

export function planTotal(plan: Plan, region: Region) {
  return plan.priceValue[region] * plan.durationMonths;
}

export function planPerService(plan: Plan, region: Region) {
  return Math.round(plan.priceValue[region] / plan.serviceCount[region]);
}
