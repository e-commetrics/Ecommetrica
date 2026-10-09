import type { Lang, Localized, Region } from "@/lib/i18n/types";

export function formatUSD(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export type PlanId = "express" | "simple" | "advanced" | "grower" | "high-profile";

const PLAN_ORDER: PlanId[] = ["express", "simple", "advanced", "grower", "high-profile"];

const fromPlan = (start: PlanId): PlanId[] => PLAN_ORDER.slice(PLAN_ORDER.indexOf(start));
const onlyPlan = (id: PlanId): PlanId[] => [id];
const sameInBoth = (ids: PlanId[]): Record<Region, PlanId[]> => ({ mx: ids, us: ids });

export type MatrixRow = {
  id: string;
  text: Localized;
  /** Compact version for the headline tag row (PlanFeatures.tsx) — falls back to `text`
   *  when a feature's own name is already short enough to use as-is. */
  shortLabel?: Localized;
  /** Sales-pitch subtext printed under the feature label on the pricing mockups. */
  description?: Localized;
  /** Slug (no locale prefix) for a feature with its own explainer page, e.g. "vpat" ->
   *  /vpat or /en/vpat via localizedHref. Rendered as a "Learn more" link. */
  learnMoreSlug?: string;
  /** Plans that carry this row, per market. A plan present in `us` but absent from `mx`
   *  is a US-market inclusion and renders with a ★. */
  availability: Record<Region, PlanId[]>;
};

export type MatrixCategory = {
  id: string;
  title: Localized;
  rows: MatrixRow[];
};

export type PlanSpecs = {
  size: string;
  pages: Localized;
  products: Localized;
  blog: Localized;
  social: Localized;
};

export type Plan = {
  id: PlanId;
  name: Localized;
  tagline: Localized;
  duration: Localized;
  /** Same across regions — the multiplier lives in the price, not the term. */
  durationMonths: number;
  /** Single payment instead of a monthly fee: no "/mo", no contract total. */
  oneTime?: boolean;
  priceValue: Record<Region, number>;
  specs: PlanSpecs;
  stage: Localized;
  renewal: Localized;
  /** Saving against buying every included service separately. Null when the plan is only
   *  compared with the market (AI Express). */
  savingPercent: Record<Region, number | null>;
  note?: Localized;
  featured?: boolean;
  /** Id of the plan this one fully includes — rendered as a single "Everything in X" line
   *  (PlanFeatures.tsx) instead of repeating X's features. */
  inheritsFromPlanId?: PlanId;
};

export const plans: Plan[] = [
  {
    id: "express",
    name: { es: "IA Exprés", en: "AI Express" },
    tagline: {
      es: "Tu sitio terminado en 7 días a partir de tu contenido completo, generado con IA.",
      en: "Your finished site in 7 days from your complete content, generated with AI.",
    },
    duration: { es: "Pago único", en: "One-time" },
    durationMonths: 0,
    oneTime: true,
    priceValue: { mx: 370, us: 790 },
    specs: {
      size: "XS",
      pages: { es: "1 a 3", en: "1 to 3" },
      products: { es: "Hasta 5", en: "Up to 5" },
      blog: { es: "—", en: "—" },
      social: { es: "6 (una vez)", en: "6 (once)" },
    },
    stage: { es: "Quiere estar en línea ya", en: "Wants to be online now" },
    renewal: { es: "Cualquier servicio", en: "Any service" },
    savingPercent: { mx: null, us: null },
    note: {
      es: "Si pasas a Arranque en los primeros 30 días, se abona el pago de IA Exprés.",
      en: "Upgrade to Launch within 30 days and the AI Express payment is credited.",
    },
  },
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
    specs: {
      size: "S",
      pages: { es: "8 a 10", en: "8 to 10" },
      products: { es: "Hasta 25", en: "Up to 25" },
      blog: { es: "1", en: "1" },
      social: { es: "4 al mes", en: "4 a month" },
    },
    stage: { es: "Apenas abre", en: "Just opening" },
    renewal: { es: "Cualquier servicio", en: "Any service" },
    savingPercent: { mx: 56.1, us: 69.6 },
    inheritsFromPlanId: "express",
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
    specs: {
      size: "M",
      pages: { es: "10 a 18", en: "10 to 18" },
      products: { es: "Hasta 100", en: "Up to 100" },
      blog: { es: "2", en: "2" },
      social: { es: "8 al mes", en: "8 a month" },
    },
    stage: { es: "Ya tiene clientes", en: "Already has clients" },
    renewal: {
      es: "Todo excepto Branding + Identidad Visual",
      en: "Everything except Branding + Visual Identity",
    },
    savingPercent: { mx: 62.5, us: 66.6 },
    inheritsFromPlanId: "simple",
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
    specs: {
      size: "L",
      pages: { es: "19 a 50", en: "19 to 50" },
      products: { es: "Hasta 300", en: "Up to 300" },
      blog: { es: "4", en: "4" },
      social: { es: "12 al mes", en: "12 a month" },
    },
    stage: { es: "Opera y quiere crecer", en: "Operating and growing" },
    renewal: {
      es: "Todo excepto N0, Branding + Identidad Visual y Branding + Diseño Digital",
      en: "Everything except N0, Branding + Visual Identity and Branding + Digital Design",
    },
    savingPercent: { mx: 70.7, us: 72.1 },
    featured: true,
    inheritsFromPlanId: "advanced",
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
    specs: {
      size: "XL",
      pages: { es: "Más de 50", en: "More than 50" },
      products: { es: "Hasta 1,000", en: "Up to 1,000" },
      blog: { es: "6", en: "6" },
      social: { es: "16 al mes", en: "16 a month" },
    },
    stage: { es: "Opera con volumen", en: "Operating at volume" },
    renewal: {
      es: "Todo excepto N0, N1 y los 3 paquetes de Branding",
      en: "Everything except N0, N1 and the 3 Branding packages",
    },
    savingPercent: { mx: 68.4, us: 69.2 },
    inheritsFromPlanId: "grower",
  },
];

export const matrix: MatrixCategory[] = [
  {
    id: "site",
    title: { es: "Sitio y desarrollo", en: "Website and development" },
    rows: [
      {
        id: "shopify",
        text: {
          es: "Sitio o tienda Shopify (talla según plan)",
          en: "Website or Shopify store (size by plan)",
        },
        shortLabel: { es: "Sitio o tienda Shopify", en: "Website or Shopify store" },
        availability: sameInBoth(fromPlan("express")),
      },
      {
        id: "ai-site",
        text: { es: "Sitio generado con IA", en: "AI-generated site" },
        availability: sameInBoth(onlyPlan("express")),
      },
      {
        id: "people-site",
        text: {
          es: "Sitio hecho por personas, asistido con IA",
          en: "Site made by people, AI-assisted",
        },
        shortLabel: { es: "Sitio hecho por personas", en: "Site made by people" },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "bilingual",
        text: { es: "Sitio bilingüe EN/ES", en: "Bilingual EN/ES site" },
        shortLabel: { es: "Sitio bilingüe", en: "Bilingual site" },
        availability: sameInBoth(fromPlan("express")),
      },
      {
        id: "hosting",
        text: {
          es: "Hosting y mantenimiento (primeros 12 meses)",
          en: "Hosting and maintenance (first 12 months)",
        },
        shortLabel: { es: "Hosting y mantenimiento", en: "Hosting & maintenance" },
        availability: sameInBoth(fromPlan("express")),
      },
      {
        id: "whatsapp-contact",
        text: {
          es: "Botón de WhatsApp y formulario de contacto",
          en: "WhatsApp button and contact form",
        },
        shortLabel: { es: "WhatsApp y contacto", en: "WhatsApp & contact" },
        availability: sameInBoth(fromPlan("express")),
      },
      {
        id: "booking",
        text: { es: "Reservas y pagos en línea", en: "Online booking and payments" },
        shortLabel: { es: "Reservas y pagos", en: "Booking & payments" },
        availability: sameInBoth(fromPlan("advanced")),
      },
      {
        id: "landing-pages",
        text: { es: "Landing pages para campañas (2)", en: "Campaign landing pages (2)" },
        shortLabel: { es: "Landing pages", en: "Landing pages" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "ai-assistant",
        text: { es: "Asistente IA en el sitio", en: "AI assistant on the site" },
        shortLabel: { es: "Asistente IA", en: "AI assistant" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "custom-dev",
        text: {
          es: "Diseño y desarrollo web a la medida (hasta 12 h de código)",
          en: "Custom web design and development (up to 12 h of code)",
        },
        shortLabel: { es: "Desarrollo a medida", en: "Custom dev" },
        availability: sameInBoth(onlyPlan("high-profile")),
      },
    ],
  },
  {
    id: "seo",
    title: { es: "SEO, AEO y contenido", en: "SEO, AEO and content" },
    rows: [
      {
        id: "ai-copy",
        text: { es: "Textos del sitio generados con IA", en: "AI-generated website copy" },
        availability: sameInBoth(onlyPlan("express")),
      },
      {
        id: "people-copy",
        text: {
          es: "Textos del sitio escritos por personas, asistidos con IA",
          en: "Website copy written by people, AI-assisted",
        },
        shortLabel: { es: "Textos por personas", en: "Copy by people" },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "seo-aeo",
        text: { es: "SEO y AEO (incluye Search Console)", en: "SEO & AEO (incl. Search Console)" },
        shortLabel: { es: "SEO y AEO", en: "SEO & AEO" },
        description: {
          es: "Incluye configuración de Search Console, para que en los motores de búsqueda y las IAs hablen de ti desde que inicias.",
          en: "Includes Search Console setup, so search engines and AI answers are already talking about you from day one.",
        },
        availability: sameInBoth(fromPlan("express")),
      },
      {
        id: "blog",
        text: {
          es: "Blog SEO/AEO (posts al mes según plan)",
          en: "SEO/AEO blog (posts a month by plan)",
        },
        shortLabel: { es: "Blog SEO/AEO", en: "SEO/AEO blog" },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "advanced-seo",
        text: { es: "SEO y AEO avanzado", en: "Advanced SEO & AEO" },
        shortLabel: { es: "SEO avanzado", en: "Advanced SEO" },
        description: {
          es: "Más palabras clave, backlinks, contenido más profundo con estructura que impulsa la visibilidad y citado en las últimas IAs.",
          en: "More keywords, backlinks, and deeper content with a structure that drives visibility and citation in the latest AI models.",
        },
        availability: sameInBoth(fromPlan("advanced")),
      },
      {
        id: "original-content",
        text: {
          es: "Contenido original (creado desde cero por personas)",
          en: "Original content (created from scratch by people)",
        },
        shortLabel: { es: "Contenido original", en: "Original content" },
        availability: sameInBoth(fromPlan("grower")),
      },
    ],
  },
  {
    id: "brand",
    title: { es: "Marca y diseño", en: "Brand and design" },
    rows: [
      {
        id: "visual-identity",
        text: { es: "Identidad Visual", en: "Visual identity" },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "branding",
        text: { es: "Branding", en: "Branding" },
        description: {
          es: "Identidad visual y personalidad de marca: logotipo, tipografía, colores y elementos gráficos, tono de comunicación, estilo, etc.",
          en: "Visual identity and brand personality: logo, typography, colors and graphic elements, tone of voice, style, and more.",
        },
        availability: sameInBoth(fromPlan("advanced")),
      },
      {
        id: "digital-design",
        text: { es: "Diseño Digital", en: "Digital design" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "advanced-branding",
        text: {
          es: "Branding avanzado (Re-Branding + Kickstart)",
          en: "Advanced branding (Re-Branding + Kickstart)",
        },
        shortLabel: { es: "Branding avanzado", en: "Advanced branding" },
        availability: sameInBoth(onlyPlan("high-profile")),
      },
      {
        id: "video-production",
        text: { es: "Producción de video completa", en: "Full video production" },
        shortLabel: { es: "Producción de video", en: "Video production" },
        description: {
          es: "Planeación, producción y postproducción.",
          en: "Planning, production, and post-production.",
        },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "video-4k",
        text: { es: "Video cinematográfico 4K", en: "Cinematic 4K video" },
        shortLabel: { es: "Video 4K", en: "4K video" },
        availability: sameInBoth(onlyPlan("high-profile")),
      },
    ],
  },
  {
    id: "social",
    title: { es: "Redes y publicidad", en: "Social and advertising" },
    rows: [
      {
        id: "ai-social",
        text: {
          es: "Contenido para redes generado con IA (6 piezas, una vez)",
          en: "AI-generated social content (6 pieces, once)",
        },
        availability: sameInBoth(onlyPlan("express")),
      },
      {
        id: "people-social",
        text: {
          es: "Contenido para redes hecho por personas, asistido con IA",
          en: "Social content made by people, AI-assisted",
        },
        shortLabel: { es: "Contenido para redes", en: "Social content" },
        description: {
          es: "Sincronizado con branding y página web.",
          en: "Synced with your branding and website.",
        },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "original-social",
        text: {
          es: "Contenido original para redes (creado desde cero por personas)",
          en: "Original social content (created from scratch by people)",
        },
        shortLabel: { es: "Contenido original redes", en: "Original social content" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "social-setup",
        text: { es: "Configuración de perfiles sociales", en: "Social profile setup" },
        shortLabel: { es: "Perfiles sociales", en: "Social setup" },
        description: {
          es: "Accesos en orden, todo listo para que pautes sin problema o tengas a tu equipo listo y tu información brindada.",
          en: "Access set up in order, everything ready for you to run ads without friction or to hand your team a fully briefed setup.",
        },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "whatsapp-business",
        text: {
          es: "WhatsApp Business: catálogo y respuestas rápidas",
          en: "WhatsApp Business: catalog and quick replies",
        },
        shortLabel: { es: "WhatsApp Business", en: "WhatsApp Business" },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "reviews",
        text: { es: "Reseñas y reputación", en: "Reviews and reputation" },
        availability: sameInBoth(fromPlan("advanced")),
      },
      {
        id: "meta-ads",
        text: {
          es: "Pauta en Meta (1 campaña en Tracción, completa desde Escala)",
          en: "Meta ads (1 campaign in Traction, full from Scale)",
        },
        shortLabel: { es: "Pauta en Meta", en: "Meta ads" },
        availability: sameInBoth(fromPlan("advanced")),
      },
      {
        id: "google-ads",
        text: { es: "Pauta en Google (gestión)", en: "Google ads (management)" },
        shortLabel: { es: "Pauta en Google", en: "Google ads" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "social-strategy",
        text: { es: "Estrategia mensual de redes", en: "Monthly social strategy" },
        shortLabel: { es: "Estrategia mensual", en: "Monthly strategy" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "basic-automation",
        text: {
          es: "Automatización básica (correo y WhatsApp)",
          en: "Basic automation (email and WhatsApp)",
        },
        shortLabel: { es: "Automatización básica", en: "Basic automation" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "marketing-automation",
        text: { es: "Automatización de marketing", en: "Marketing automation" },
        shortLabel: { es: "Automatización", en: "Automation" },
        description: {
          es: "Correos masivos, respuestas, calendarización sin esfuerzo manual.",
          en: "Bulk email, replies, and scheduling — no manual effort.",
        },
        availability: sameInBoth(onlyPlan("high-profile")),
      },
    ],
  },
  {
    id: "measurement",
    title: { es: "Medición e integraciones", en: "Measurement and integrations" },
    rows: [
      {
        id: "ga4",
        text: { es: "Google Analytics 4", en: "Google Analytics 4" },
        shortLabel: { es: "GA4", en: "GA4" },
        description: {
          es: "Más que estadísticas, una interpretación para tomar acción y aumentar el retorno de inversión.",
          en: "More than stats — an interpretation you can act on to increase return on investment.",
        },
        learnMoreSlug: "ga4",
        availability: sameInBoth(fromPlan("express")),
      },
      {
        id: "meta-pixel",
        text: { es: "Meta Pixel (con consentimiento)", en: "Meta Pixel (paired with consent)" },
        shortLabel: { es: "Meta Pixel", en: "Meta Pixel" },
        availability: sameInBoth(fromPlan("express")),
      },
      {
        id: "google-business",
        text: { es: "Google Business Profile", en: "Google Business Profile" },
        shortLabel: { es: "Google Business", en: "Google Business" },
        learnMoreSlug: "google-business-profile",
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "dashboard",
        text: { es: "Dashboard E-commetrics", en: "E-commetrics dashboard" },
        availability: sameInBoth(fromPlan("advanced")),
      },
      {
        id: "dashboard-crm",
        text: { es: "Dashboard con calendario o CRM", en: "Dashboard with calendar or CRM" },
        shortLabel: { es: "Dashboard con CRM", en: "Dashboard with CRM" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "platform-integrations",
        text: {
          es: "Integraciones de plataforma, incluye Meta Graph API (hasta 8 h)",
          en: "Platform integrations, incl. Meta Graph API (up to 8 h)",
        },
        shortLabel: { es: "Integraciones", en: "Integrations" },
        description: {
          es: "Gestión masiva de datos, cliente, reseñas, automatizaciones y métricas de rendimiento y rutas.",
          en: "Bulk management of data, clients, reviews, automations, and performance and routing metrics.",
        },
        learnMoreSlug: "meta-graph-api",
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "system-integrations",
        text: {
          es: "Integraciones con tus sistemas (máx. 2, hasta 16 h)",
          en: "Integrations with your systems (max. 2, up to 16 h)",
        },
        shortLabel: { es: "Integraciones API", en: "API integrations" },
        availability: sameInBoth(onlyPlan("high-profile")),
      },
      {
        id: "bi-dashboard",
        text: {
          es: "App de dashboard personalizado con BI",
          en: "Custom dashboard app with BI",
        },
        shortLabel: { es: "Dashboard y BI", en: "Dashboard and BI" },
        description: {
          es: "Tu propia web App con todos tus datos, gestión de calendarios, información con los accesos que desees.",
          en: "Your own web app with all your data, calendar management, and information with the access levels you want.",
        },
        availability: sameInBoth(onlyPlan("high-profile")),
      },
    ],
  },
  {
    id: "compliance",
    title: { es: "Cumplimiento", en: "Compliance" },
    rows: [
      {
        id: "consent",
        text: {
          es: "Banner de consentimiento y aviso de privacidad",
          en: "Consent banner and privacy notice",
        },
        shortLabel: { es: "Consentimiento", en: "Consent banner" },
        availability: sameInBoth(fromPlan("express")),
      },
      {
        id: "ada",
        text: { es: "Sitio accesible ADA / WCAG 2.1 AA", en: "ADA / WCAG 2.1 AA accessible site" },
        shortLabel: { es: "Accesibilidad ADA", en: "ADA accessibility" },
        availability: { mx: fromPlan("advanced"), us: fromPlan("simple") },
      },
      {
        id: "accessibility-audit",
        text: {
          es: "Auditoría y remediación de accesibilidad",
          en: "Accessibility audit and remediation",
        },
        shortLabel: { es: "Auditoría", en: "Audit" },
        availability: sameInBoth(fromPlan("advanced")),
      },
      {
        id: "accessibility-statement",
        text: { es: "Declaración de accesibilidad", en: "Accessibility statement" },
        shortLabel: { es: "Declaración a11y", en: "A11y statement" },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "cookies",
        text: {
          es: "Gestión de cookies de los servicios integrados",
          en: "Cookie management for integrated services",
        },
        shortLabel: { es: "Gestión de cookies", en: "Cookie management" },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "ccpa",
        text: {
          es: "Configuración de consentimiento CCPA/CPRA",
          en: "CCPA/CPRA consent configuration",
        },
        shortLabel: { es: "CCPA/CPRA", en: "CCPA/CPRA" },
        availability: { mx: [], us: fromPlan("advanced") },
      },
      {
        id: "vpat",
        text: { es: "VPAT / reporte de conformidad", en: "VPAT / conformance report" },
        shortLabel: { es: "VPAT", en: "VPAT" },
        learnMoreSlug: "vpat",
        availability: sameInBoth(onlyPlan("high-profile")),
      },
    ],
  },
  {
    id: "support",
    title: { es: "Soporte y cuenta", en: "Support and account" },
    rows: [
      {
        id: "support-chat",
        text: { es: "Soporte por WhatsApp y correo", en: "Support by WhatsApp and email" },
        shortLabel: { es: "Soporte WhatsApp y correo", en: "WhatsApp & email support" },
        availability: sameInBoth(fromPlan("express")),
      },
      {
        id: "office-hours",
        text: {
          es: "Soporte en horario de oficina, L–V 9am–5pm (hora del Pacífico)",
          en: "Office-hours support, Mon–Fri 9am–5pm (Pacific Time)",
        },
        shortLabel: { es: "Soporte en horario de oficina", en: "Office-hours support" },
        availability: sameInBoth(fromPlan("advanced")),
      },
      {
        id: "priority-support",
        text: { es: "Soporte prioritario (priority pass)", en: "Priority support (priority pass)" },
        shortLabel: { es: "Soporte prioritario", en: "Priority support" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "monitoring",
        text: {
          es: "Monitoreo del sitio en vivo (uptime y alertas)",
          en: "Live site monitoring (uptime and alerts)",
        },
        shortLabel: { es: "Monitoreo en vivo", en: "Live monitoring" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "roadmap",
        text: { es: "Estrategia y roadmap trimestrales", en: "Quarterly strategy and roadmap" },
        shortLabel: { es: "Roadmap trimestral", en: "Quarterly roadmap" },
        availability: sameInBoth(onlyPlan("high-profile")),
      },
      {
        id: "english-account",
        text: { es: "Gestión de cuenta en inglés", en: "English account management" },
        shortLabel: { es: "Cuenta en inglés", en: "English account" },
        availability: { mx: [], us: fromPlan("grower") },
      },
      {
        id: "on-site",
        text: {
          es: "Sesión presencial trimestral en San Diego",
          en: "Quarterly on-site visit in San Diego",
        },
        shortLabel: { es: "Sesión presencial", en: "On-site visit" },
        availability: { mx: [], us: onlyPlan("high-profile") },
      },
    ],
  },
];

export function getPlan(id: string) {
  return plans.find((plan) => plan.id === id);
}

export function planHasRow(row: MatrixRow, planId: PlanId, region: Region) {
  return row.availability[region].includes(planId);
}

export function isUsOnlyCell(row: MatrixRow, planId: PlanId, region: Region) {
  return region === "us" && !row.availability.mx.includes(planId) && row.availability.us.includes(planId);
}

export function planServiceCount(plan: Plan, region: Region) {
  return matrix.reduce(
    (sum, category) =>
      sum + category.rows.filter((row) => planHasRow(row, plan.id, region)).length,
    0,
  );
}

export function planNewRows(plan: Plan, region: Region): MatrixRow[] {
  const previousId = plan.inheritsFromPlanId;
  return matrix.flatMap((category) =>
    category.rows.filter(
      (row) =>
        planHasRow(row, plan.id, region) && (!previousId || !planHasRow(row, previousId, region)),
    ),
  );
}

export const hostingRenewalValue: Record<Region, number> = { mx: 370, us: 790 };

export const codingHourRate: Partial<Record<Region, number>> = { mx: 62 };

export type CustomPlanModule = { title: Localized; description: Localized };

export type CustomPlanHighlight = { text: Localized; usOnly?: boolean };

export type CustomPlan = {
  id: "custom";
  name: Localized;
  tagline: Localized;
  minDuration: Localized;
  priceFromValue: Record<Region, number>;
  totalFromValue: Record<Region, number>;
  highlights: CustomPlanHighlight[];
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
  highlights: [
    {
      text: {
        es: "Relación a la medida para sitios de más de 100 páginas, fuera de la matriz",
        en: "Custom relationship for sites of more than 100 pages, outside the matrix",
      },
    },
    {
      text: { es: "Único plan con soporte 24/7", en: "The only plan with 24/7 support" },
    },
    {
      text: {
        es: "Entidad contratante en EUA y W-9",
        en: "US contracting entity and W-9",
      },
      usOnly: true,
    },
  ],
  modules: [
    {
      title: { es: "Tienda Shopify", en: "Shopify store" },
      description: {
        es: "1,000+ productos.",
        en: "1,000+ products.",
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
  return plan.oneTime ? plan.priceValue[region] : plan.priceValue[region] * plan.durationMonths;
}

export function planPerService(plan: Plan, region: Region) {
  return Math.round(plan.priceValue[region] / planServiceCount(plan, region));
}
