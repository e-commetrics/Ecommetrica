import type { Lang, Localized, Region } from "@/lib/i18n/types";

export function formatUSD(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

/** A plan's saving as the price list states it, always one decimal: "76.4%", "77.0%". */
export function formatSaving(value: number) {
  return `${value.toFixed(1)}%`;
}

export type PlanId = "express" | "simple" | "advanced" | "grower" | "high-profile";

const PLAN_ORDER: PlanId[] = ["express", "simple", "advanced", "grower", "high-profile"];

const fromPlan = (start: PlanId): PlanId[] => PLAN_ORDER.slice(PLAN_ORDER.indexOf(start));
const onlyPlan = (id: PlanId): PlanId[] => [id];
/** From `start` up to and including `end`: for a line a later plan replaces with a better one. */
const planRange = (start: PlanId, end: PlanId): PlanId[] =>
  PLAN_ORDER.slice(PLAN_ORDER.indexOf(start), PLAN_ORDER.indexOf(end) + 1);
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
   *  is a US-market inclusion and renders with a ★. Each plan's service count is the number
   *  of rows it carries, so a line a later plan upgrades (bilingual → multilingual) ends at
   *  the plan before the upgrade instead of being counted twice. */
  availability: Record<Region, PlanId[]>;
};

export type MatrixCategory = {
  id: string;
  title: Localized;
  rows: MatrixRow[];
};

export type PlanSpecs = {
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
  /** Saving against the value of every included service on its own (services are only sold
   *  alone as a rebuy, after a package). Null when the plan is only
   *  compared with the market (AI Express). */
  savingPercent: Record<Region, number | null>;
  note?: Localized;
  featured?: boolean;
  /** "Elígelo si" signals on /pricing: what a buyer would recognize in their own business.
   *  Each one must follow from the plan's specs and matrix rows. */
  chooseIf?: Localized[];
  /** Id of the plan this one fully includes — rendered as a single "Everything in X" line
   *  (PlanFeatures.tsx) instead of repeating X's features. */
  inheritsFromPlanId?: PlanId;
};

/**
 * Prices, savings, counts and lines follow the pricing master (5 Nov 2026; savings from
 * ladder v1.3, 12 Nov 2026). Market "mx" is the Tijuana offer, "us" the San Diego one.
 * Expected service counts (rows each plan carries): mx 11 / 22 / 29 / 46 / 54,
 * us 11 / 22 / 30 / 47 / 56.
 */
export const plans: Plan[] = [
  {
    id: "express",
    name: { es: "IA Exprés", en: "AI Express" },
    tagline: {
      es: "Tu sitio terminado en 3 días a partir de tu contenido completo, generado con IA.",
      en: "Your finished site in 3 days from your complete content, AI-generated.",
    },
    duration: { es: "Pago único", en: "One-time" },
    durationMonths: 0,
    oneTime: true,
    priceValue: { mx: 370, us: 790 },
    specs: {
      pages: { es: "1 a 3", en: "1 to 3" },
      products: { es: "Hasta 5", en: "Up to 5" },
      blog: { es: "—", en: "—" },
      social: { es: "3 (una vez)", en: "3 (once)" },
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
    priceValue: { mx: 675, us: 1650 },
    specs: {
      pages: { es: "8 a 10", en: "8 to 10" },
      products: { es: "Hasta 25", en: "Up to 25" },
      blog: { es: "1", en: "1" },
      social: { es: "4 al mes", en: "4 a month" },
    },
    stage: { es: "Apenas abre", en: "Just opening" },
    chooseIf: [
      { es: "Apenas abres, o tu sitio actual ya no te representa", en: "You're just opening, or your current site no longer fits you" },
      { es: "Quieres marca, sitio y redes en orden desde el inicio", en: "You want your brand, site and social in order from the start" },
      { es: "Te bastan hasta 10 páginas y 25 productos", en: "Up to 10 pages and 25 products is enough" },
    ],
    renewal: { es: "Cualquier servicio", en: "Any service" },
    savingPercent: { mx: 65.4, us: 68.3 },
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
      pages: { es: "10 a 18", en: "10 to 18" },
      products: { es: "Hasta 100", en: "Up to 100" },
      blog: { es: "3", en: "3" },
      social: { es: "8 al mes", en: "8 a month" },
    },
    stage: { es: "Ya tiene clientes", en: "Already has clients" },
    chooseIf: [
      { es: "Ya vendes y quieres reservas y pagos en línea", en: "You already sell and want online booking and payments" },
      { es: "Quieres empezar a anunciarte en Meta", en: "You want to start advertising on Meta" },
      { es: "Tu catálogo llega a 100 productos", en: "Your catalog reaches 100 products" },
    ],
    renewal: {
      es: "Todo excepto Branding + identidad visual",
      en: "Everything except Branding + visual identity",
    },
    savingPercent: { mx: 64.2, us: 66.1 },
    inheritsFromPlanId: "simple",
  },
  {
    id: "grower",
    name: { es: "Escala", en: "Scale" },
    tagline: {
      es: "Crecimiento mensual sostenido. Todo conectado.",
      en: "Sustained monthly growth. Everything connected.",
    },
    duration: { es: "6 meses", en: "6 months" },
    durationMonths: 6,
    priceValue: { mx: 1185, us: 3200 },
    specs: {
      pages: { es: "19 a 50", en: "19 to 50" },
      products: { es: "Hasta 300", en: "Up to 300" },
      blog: { es: "4", en: "4" },
      social: { es: "12 al mes", en: "12 a month" },
    },
    stage: { es: "Opera y quiere crecer", en: "Operating and growing" },
    chooseIf: [
      { es: "Quieres crecer cada mes con estrategia y pauta en Meta y Google", en: "You want to grow every month with strategy and Meta and Google ads" },
      { es: "Necesitas landing pages, asistente IA y automatización", en: "You need landing pages, an AI assistant and automation" },
      { es: "Manejas hasta 300 productos y 12 piezas para redes al mes", en: "You handle up to 300 products and 12 social posts a month" },
    ],
    renewal: {
      es: "Todo excepto Gestión pura, Branding + identidad visual y Branding + diseño digital",
      en: "Everything except Pure management, Branding + visual identity and Branding + digital design",
    },
    savingPercent: { mx: 76.4, us: 77.0 },
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
    priceValue: { mx: 1950, us: 5000 },
    specs: {
      pages: { es: "51 a 999", en: "51 to 999" },
      products: { es: "Hasta 1,000", en: "Up to 1,000" },
      blog: { es: "6", en: "6" },
      social: { es: "16 al mes", en: "16 a month" },
    },
    stage: { es: "Opera con volumen", en: "Operating at volume" },
    chooseIf: [
      { es: "Operas con volumen y quieres dejar las tareas manuales", en: "You operate at volume and want to drop the manual work" },
      { es: "Necesitas integraciones con tus sistemas y una app de BI", en: "You need integrations with your systems and a BI app" },
      { es: "Tu sitio pasa de 50 páginas y hasta 1,000 productos", en: "Your site goes past 50 pages and up to 1,000 products" },
    ],
    renewal: {
      es: "Todo excepto Gestión pura, Gestión y producción esencial y los 3 paquetes de branding",
      en: "Everything except Pure management, Essential management and production and the 3 branding packages",
    },
    savingPercent: { mx: 68.6, us: 71.1 },
    inheritsFromPlanId: "grower",
  },
];

export const matrix: MatrixCategory[] = [
  {
    id: "site",
    title: { es: "Sitio y desarrollo", en: "Website and development" },
    rows: [
      {
        id: "ai-site",
        text: { es: "Sitio generado con IA", en: "AI-generated site" },
        availability: sameInBoth(onlyPlan("express")),
      },
      {
        id: "shopify",
        text: {
          es: "Sitio web o tienda Shopify, con capacitación para administrar tu sitio, migración de tu sitio actual sin perder posicionamiento y, en tienda, catálogo conectado a Google Shopping y a Meta",
          en: "Website or Shopify store, with training to manage your site, migration of your current site without losing rankings and, for stores, a catalog connected to Google Shopping and Meta",
        },
        shortLabel: { es: "Sitio o tienda Shopify", en: "Website or Shopify store" },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "ai-powered",
        text: { es: "Potenciado con IA", en: "AI-powered" },
        availability: sameInBoth(planRange("simple", "grower")),
      },
      {
        id: "ai-partnered",
        text: { es: "Sitio aliado de la IA", en: "AI-partnered site" },
        availability: sameInBoth(onlyPlan("high-profile")),
      },
      {
        id: "no-templates",
        text: { es: "Sin plantillas genéricas", en: "No generic templates" },
        availability: sameInBoth(fromPlan("advanced")),
      },
      {
        id: "bilingual",
        text: { es: "Sitio bilingüe EN/ES", en: "Bilingual EN/ES site" },
        shortLabel: { es: "Sitio bilingüe", en: "Bilingual site" },
        availability: sameInBoth(planRange("express", "advanced")),
      },
      {
        id: "multilingual",
        text: { es: "Sitio multilingüe", en: "Multilingual site" },
        description: {
          es: "Más allá de español e inglés: tu sitio en los idiomas que tu mercado necesite.",
          en: "Beyond English and Spanish: your site in the languages your market needs.",
        },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "hosting",
        text: {
          es: "Hosting y mantenimiento con respaldos y seguridad (primeros 12 meses)",
          en: "Hosting and maintenance with backups and security (first 12 months)",
        },
        shortLabel: { es: "Hosting y mantenimiento", en: "Hosting & maintenance" },
        availability: sameInBoth(fromPlan("express")),
      },
      {
        id: "social-button-form",
        text: { es: "Botón de redes sociales y formulario", en: "Social media button and form" },
        shortLabel: { es: "Redes y formulario", en: "Social & form" },
        availability: sameInBoth(fromPlan("express")),
      },
      {
        id: "business-email",
        text: {
          es: "Correo de negocio con tu dominio y entregabilidad (SPF, DKIM y DMARC; licencias aparte)",
          en: "Business email on your domain + deliverability (SPF, DKIM and DMARC; licenses separate)",
        },
        shortLabel: { es: "Correo de negocio", en: "Business email" },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "booking",
        text: {
          es: "Reservas y pagos en línea, con facturación electrónica CFDI",
          en: "Online booking and payments",
        },
        shortLabel: { es: "Reservas y pagos", en: "Booking & payments" },
        availability: sameInBoth(fromPlan("advanced")),
      },
      {
        id: "landing-pages",
        text: { es: "Landing pages para campañas (3)", en: "Campaign landing pages (3)" },
        shortLabel: { es: "Landing pages", en: "Landing pages" },
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
        id: "ai-assistant",
        text: { es: "Asistente IA en el sitio y en WhatsApp", en: "AI assistant on the site and on WhatsApp" },
        shortLabel: { es: "Asistente IA", en: "AI assistant" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "custom-dev",
        text: {
          es: "Diseño y desarrollo web a la medida (hasta 12 h de código)",
          en: "Custom web design and development (up to 12 h of code)",
        },
        shortLabel: { es: "Desarrollo a la medida", en: "Custom dev" },
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
        id: "original-copy",
        text: { es: "Textos: contenido original", en: "Website copy: original content" },
        shortLabel: { es: "Textos originales", en: "Original copy" },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "aeo",
        text: {
          es: "AEO: que las IAs te encuentren y te citen",
          en: "AEO: get found and cited by AI answers",
        },
        shortLabel: { es: "AEO", en: "AEO" },
        availability: sameInBoth(onlyPlan("express")),
      },
      {
        id: "seo-aeo",
        text: { es: "SEO y AEO (incluye Search Console)", en: "SEO & AEO (incl. Search Console)" },
        shortLabel: { es: "SEO y AEO", en: "SEO & AEO" },
        description: {
          es: "Incluye configuración de Search Console, para que en los motores de búsqueda y las IAs hablen de ti desde que inicias.",
          en: "Includes Search Console setup, so search engines and AI answers are already talking about you from day one.",
        },
        availability: sameInBoth(onlyPlan("simple")),
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
        id: "blog",
        text: {
          es: "Blog SEO/AEO (posts al mes según plan)",
          en: "SEO/AEO blog (posts a month by plan)",
        },
        shortLabel: { es: "Blog SEO/AEO", en: "SEO/AEO blog" },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "original-blog",
        text: { es: "Contenido original para blog y SEO", en: "Original content for blog and SEO" },
        shortLabel: { es: "Contenido original", en: "Original content" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "ai-visibility-report",
        text: {
          es: "Reporte de visibilidad en buscadores con IA (ChatGPT, Gemini, Perplexity)",
          en: "AI search visibility report (ChatGPT, Gemini, Perplexity)",
        },
        shortLabel: { es: "Visibilidad en IAs", en: "AI visibility" },
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
        id: "core-branding",
        text: { es: "Branding base", en: "Core branding" },
        description: {
          es: "Identidad visual y personalidad de marca: logotipo, tipografía, colores y elementos gráficos, tono de comunicación, estilo, etc.",
          en: "Visual identity and brand personality: logo, typography, colors and graphic elements, tone of voice, style, and more.",
        },
        availability: sameInBoth(fromPlan("advanced")),
      },
      {
        id: "digital-design",
        text: {
          es: "Diseño Digital: cobertura de diseño (12 horas en el plan)",
          en: "Digital design: design coverage (12 hours in the plan)",
        },
        shortLabel: { es: "Diseño Digital", en: "Digital design" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "hd-video",
        text: {
          es: "4 a 5 videos HD al mes (producción y grabación de video profesional en HD)",
          en: "4 to 5 HD videos a month (professional HD video production and filming)",
        },
        shortLabel: { es: "Videos HD", en: "HD videos" },
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
        id: "video-4k",
        text: { es: "Tu marca con imagen de cine: 2 a 3 videos en 4K", en: "Your brand with a cinematic look: 2 to 3 videos in 4K" },
        shortLabel: { es: "Videos 4K", en: "4K videos" },
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
          es: "Contenido para redes con IA: imágenes y miniclips (3 piezas, una vez)",
          en: "AI-generated social content: images and mini clips (3 pieces, once)",
        },
        shortLabel: { es: "Contenido para redes con IA", en: "AI social content" },
        availability: sameInBoth(onlyPlan("express")),
      },
      {
        id: "ai-powered-social",
        text: {
          es: "Contenido para redes potenciado con IA (piezas al mes según plan)",
          en: "AI-powered social content (pieces a month by plan)",
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
        text: { es: "Contenido original para redes", en: "Original social content" },
        shortLabel: { es: "Contenido original redes", en: "Original social content" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "social-setup",
        text: {
          es: "Configuración de perfiles sociales: Ecosistema Meta (Facebook, Instagram y WhatsApp) y TikTok",
          en: "Social profile setup: Meta ecosystem (Facebook, Instagram and WhatsApp) and TikTok",
        },
        shortLabel: { es: "Perfiles sociales", en: "Social setup" },
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
        text: {
          es: "Reseñas y reputación: testimonios en el sitio web conectados con tu reputación en Meta, Google y otras redes",
          en: "Reviews and reputation: website testimonials linked to your reputation on Meta, Google and other networks",
        },
        shortLabel: { es: "Reseñas y reputación", en: "Reviews and reputation" },
        availability: sameInBoth(fromPlan("advanced")),
      },
      {
        id: "meta-ads",
        text: {
          es: "Pauta en Meta: gestionamos 1 campaña al mes (Facebook e Instagram) en Tracción; gestión completa desde Escala. La inversión en anuncios la paga el cliente",
          en: "Meta ads: we manage 1 campaign a month (Facebook and Instagram) in Traction; full management from Scale. Ad spend is paid by the client",
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
        text: {
          es: "Estrategia mensual de redes sociales en Meta (otras redes, extra)",
          en: "Monthly social media strategy on Meta (other networks are extra)",
        },
        shortLabel: { es: "Estrategia mensual", en: "Monthly strategy" },
        availability: sameInBoth(onlyPlan("grower")),
      },
      {
        id: "multichannel-strategy",
        text: { es: "Estrategia multicanal mensual", en: "Monthly multichannel strategy" },
        shortLabel: { es: "Estrategia multicanal", en: "Multichannel strategy" },
        availability: sameInBoth(onlyPlan("high-profile")),
      },
      {
        id: "outbound-campaigns",
        text: { es: "Campañas salientes: 3 al mes (multicanal)", en: "Outgoing campaigns: 3 a month (multichannel)" },
        shortLabel: { es: "Campañas salientes", en: "Outgoing campaigns" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "automation",
        text: {
          es: "Automatización de emails y mensajes de WhatsApp desde el sitio web",
          en: "Email and WhatsApp message automation from the website",
        },
        shortLabel: { es: "Automatización", en: "Automation" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "marketing-automation",
        text: { es: "Automatización de marketing", en: "Marketing automation" },
        shortLabel: { es: "Automatización de marketing", en: "Marketing automation" },
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
        id: "google-ecosystem",
        text: {
          es: "Ecosistema Google (incluye Google Business Profile) y directorios locales (Apple Maps, Bing y Yelp)",
          en: "Google ecosystem (incl. Google Business Profile) and local directories (Apple Maps, Bing and Yelp)",
        },
        shortLabel: { es: "Google y directorios", en: "Google & directories" },
        learnMoreSlug: "google-business-profile",
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "dashboard",
        text: { es: "Dashboard E-commetrics con reporte mensual", en: "E-commetrics dashboard with monthly report" },
        shortLabel: { es: "Dashboard E-commetrics", en: "E-commetrics dashboard" },
        availability: sameInBoth(fromPlan("simple")),
      },
      {
        id: "server-side-tracking",
        text: {
          es: "Medición de conversiones avanzada del lado del servidor (Meta Conversions API, Google, llamadas y formularios)",
          en: "Advanced server-side conversion tracking (Meta Conversions API, Google, calls and forms)",
        },
        shortLabel: { es: "Medición avanzada", en: "Advanced tracking" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "calendar-crm",
        text: {
          es: "Calendario, CRM o dashboard personalizado integrado al sitio web",
          en: "Calendar, CRM or custom dashboard built into the website",
        },
        shortLabel: { es: "Calendario o CRM", en: "Calendar or CRM" },
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
        id: "bi-app",
        text: {
          es: "App de inteligencia de negocio (BI) a la medida",
          en: "Custom business intelligence (BI) app",
        },
        shortLabel: { es: "App de BI", en: "BI app" },
        description: {
          es: "Tu propia web App con todos tus datos, gestión de calendarios, información con los accesos que desees.",
          en: "Your own web app with all your data, calendar management, and information with the access levels you want.",
        },
        availability: sameInBoth(onlyPlan("high-profile")),
      },
      {
        id: "system-integrations",
        text: {
          es: "Integraciones con tus sistemas (máx. 3, hasta 16 h)",
          en: "Integrations with your systems (max. 3, up to 16 h)",
        },
        shortLabel: { es: "Integraciones API", en: "API integrations" },
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
        availability: sameInBoth(fromPlan("simple")),
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
        id: "english-account",
        text: { es: "Tu cuenta puede llevarse 100% en inglés", en: "English account management" },
        shortLabel: { es: "Cuenta en inglés", en: "English account" },
        availability: sameInBoth(fromPlan("grower")),
      },
      {
        id: "roadmap",
        text: { es: "Estrategia y roadmap trimestrales", en: "Quarterly strategy and roadmap" },
        shortLabel: { es: "Roadmap trimestral", en: "Quarterly roadmap" },
        availability: sameInBoth(onlyPlan("high-profile")),
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
  priceFromValue: { mx: 3200, us: 7500 },
  totalFromValue: { mx: 25600, us: 60000 },
  highlights: [
    {
      text: {
        es: "Para sitios de 1,000 páginas o más, o tiendas con más de 1,000 productos",
        en: "For sites of 1,000 pages or more, or stores with more than 1,000 products",
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
  // The client picks one module (pricing master, 5 Nov 2026).
  modules: [
    {
      title: { es: "Shopify y apps", en: "Shopify and apps" },
      description: {
        es: "Tiendas de más de 1,000 productos y las apps que las hacen operar.",
        en: "Stores with more than 1,000 products and the apps that run them.",
      },
    },
    {
      title: { es: "Equipo integrado", en: "Embedded team" },
      description: {
        es: "Capital humano asignado a tu área con operación mensual fija.",
        en: "Dedicated people assigned to your area with fixed monthly capacity.",
      },
    },
    {
      title: { es: "Motor de contenido con IA in-house", en: "In-house AI content engine" },
      description: {
        es: "Contenido en volumen para ser referencia en las IAs y motores de búsqueda.",
        en: "Content at volume, built to become the reference cited by AI answers and search.",
      },
    },
    {
      title: { es: "Desarrollo de IA agéntica", en: "Agentic AI development" },
      description: {
        es: "Agentes de IA que trabajan dentro de tu operación.",
        en: "AI agents that work inside your operation.",
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
      title: { es: "Desarrollo de apps a la medida", en: "Custom app development" },
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
