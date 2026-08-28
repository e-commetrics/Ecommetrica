import type { Localized, Region } from "@/lib/i18n/types";

export type PackageAddon = {
  id: string;
  name: Localized;
  description: Localized;
  price: Record<Region, number>;
  /** No fixed price in the source proposal — configurator shows "quote on request"
   *  instead of a dollar figure and excludes it from the running total. */
  priceTBD?: boolean;
  /** Plan ids (see `Plan.id` in pricing.ts) whose feature list already covers this —
   *  configurator marks the addon "included" instead of letting it be added twice. */
  includedInPlanIds: string[];
};

export type PackagePhase = {
  id: string;
  title: Localized;
  description: Localized;
  addons: PackageAddon[];
};

/** À la carte continuation services — for clients who finished a plan and want to keep
 *  specific pieces active, not a parallel plan. Priced per region like everything else. */
export const packagePhases: PackagePhase[] = [
  {
    id: "hourly",
    title: { es: "Trabajo por horas — bloques de 10 h", en: "Work by the hour — 10-hour blocks" },
    description: {
      es: "Para clientes que terminaron un plan y quieren continuar con piezas específicas.",
      en: "For clients who finished a plan and want to continue with specific pieces.",
    },
    addons: [
      {
        id: "coding",
        name: { es: "Coding / Ingeniería", en: "Coding / Engineering" },
        description: {
          es: "Actualización / desarrollo de webapps.",
          en: "Update / development of webapps.",
        },
        price: { mx: 620, us: 1100 },
        includedInPlanIds: [],
      },
      {
        id: "content-creation",
        name: { es: "Creación de contenido", en: "Content creation" },
        description: {
          es: "7 videos cortos para redes sociales + 5 piezas visuales con diseño.",
          en: "7 short videos for social media + 5 designed visual pieces.",
        },
        price: { mx: 480, us: 650 },
        includedInPlanIds: [],
      },
      {
        id: "webmaster",
        name: { es: "Webmaster / Mantenimiento", en: "Webmaster / Maintenance" },
        description: {
          es: "Mantenimiento de infraestructura y sitio.",
          en: "Infrastructure and site maintenance.",
        },
        price: { mx: 370, us: 550 },
        includedInPlanIds: [],
      },
    ],
  },
  {
    id: "content-production",
    title: { es: "Producción de contenido", en: "Content production" },
    description: {
      es: "Producción audiovisual como continuación, facturada aparte del honorario de gestión.",
      en: "Audiovisual production as continuation work, billed separately from the management fee.",
    },
    addons: [
      {
        id: "video-production",
        name: { es: "Producción redes sociales", en: "Social media production" },
        description: {
          es: "Contenido para 3 meses en 2 shootings con pre/post producción.",
          en: "3 months of content across 2 shoots, with pre- and post-production.",
        },
        price: { mx: 1200, us: 2400 },
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "video-production-1mo",
        name: { es: "Video producción", en: "Video production" },
        description: {
          es: "Contenido para 1 mes en 1 Shooting con pre y post producción.",
          en: "1 month of content in a single shoot, with pre- and post-production.",
        },
        price: { mx: 0, us: 0 },
        priceTBD: true,
        includedInPlanIds: [],
      },
      {
        id: "cinematic-production",
        name: { es: "Producción cinematográfica", en: "Cinematic production" },
        description: {
          es: "1 video formato 2K a 4K + 1 photoshoot profesional: Ambos incluyen pre y post producción compleja y distribución personalizada.",
          en: "1 video shot in 2K to 4K + 1 professional photoshoot: both include complex pre- and post-production and personalized distribution.",
        },
        price: { mx: 1200, us: 1200 },
        includedInPlanIds: [],
      },
    ],
  },
  {
    id: "ad-management",
    title: { es: "Gestión de anuncios — cuatro niveles", en: "Ad management — four tiers" },
    description: {
      es: "El honorario de gestión y el presupuesto de pauta se facturan siempre por separado; la pauta va a nombre del cliente.",
      en: "The management fee and the ad budget are always billed separately; ad spend is in the client's name.",
    },
    addons: [
      {
        id: "mgmt-pure-meta",
        name: { es: "Gestión pura — Meta", en: "Pure management — Meta" },
        description: {
          es: "Estrategia, configuración y gestión de pauta con piezas visuales del cliente. Ideal si cuentan con diseñador y solo buscan optimizar la estrategia y ejecución técnica.",
          en: "Strategy, setup, and ad management using the client's own visuals. Ideal if they already have a designer and just need the strategy and technical execution optimized.",
        },
        price: { mx: 450, us: 900 },
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "mgmt-pure-google",
        name: { es: "Gestión pura — Google", en: "Pure management — Google" },
        description: {
          es: "Gestión de pauta y optimización de keywords en actual sitio. Ideal si cuentan con diseñador y solo buscan optimizar la estrategia y ejecución técnica.",
          en: "Ad management and keyword optimization on the client's current site. Ideal if they already have a designer and just need the strategy and technical execution optimized.",
        },
        price: { mx: 550, us: 1100 },
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "mgmt-essential-meta",
        name: {
          es: "Gestión y producción esencial — Meta",
          en: "Essential management and production — Meta",
        },
        description: {
          es: "1 campaña + 4 piezas visuales. Ideal para campañas específicas para un servicio o rendimiento de una campaña de temporada alcance directo.",
          en: "1 campaign + 4 visual pieces. Ideal for a specific service launch or a direct-reach seasonal campaign.",
        },
        price: { mx: 0, us: 0 },
        priceTBD: true,
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "mgmt-essential-google",
        name: {
          es: "Gestión y producción esencial — Google",
          en: "Essential management and production — Google",
        },
        description: {
          es: "1 campaña + 3 keywords + 2 blogs con SEO. Ideal para campañas específicas para un servicio o rendimiento de una campaña de temporada alcance directo.",
          en: "1 campaign + 3 keywords + 2 SEO blog posts. Ideal for a specific service launch or a direct-reach seasonal campaign.",
        },
        price: { mx: 0, us: 0 },
        priceTBD: true,
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "mgmt-creatives-meta",
        name: { es: "Gestión + dirección creativa — Meta", en: "Management + creative direction — Meta" },
        description: {
          es: "3 campañas + 8 piezas visuales. Ideal para escalar, posicionar y mantener tu sitio y redes sociales unificadas.",
          en: "3 campaigns + 8 visual pieces. Ideal to scale, position, and keep your site and social channels unified.",
        },
        price: { mx: 680, us: 1350 },
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "mgmt-creatives-google",
        name: { es: "Gestión + dirección creativa — Google", en: "Management + creative direction — Google" },
        description: {
          es: "3 campañas + 6 keywords + 5 blogs con SEO. Ideal para escalar, posicionar y mantener tu sitio y redes sociales unificadas.",
          en: "3 campaigns + 6 keywords + 5 SEO blog posts. Ideal to scale, position, and keep your site and social channels unified.",
        },
        price: { mx: 780, us: 1550 },
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "mgmt-content-engine-meta",
        name: { es: "Motor de contenido — Meta", en: "Content engine — Meta" },
        description: {
          es: "4 campañas + 12 piezas visuales + 1 video publicitario. Ideal para quienes buscan ampliar su alcance con volumen constante de contenido curado y pauta agresiva.",
          en: "4 campaigns + 12 visual pieces + 1 ad video. Ideal for expanding reach with a steady volume of curated content and aggressive ad spend.",
        },
        price: { mx: 1150, us: 2300 },
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "mgmt-content-engine-google",
        name: { es: "Motor de contenido — Google", en: "Content engine — Google" },
        description: {
          es: "4 campañas + 9 keywords + 9 blogs con SEO. Ideal para quienes buscan ampliar su alcance con volumen constante de contenido curado y pauta agresiva.",
          en: "4 campaigns + 9 keywords + 9 SEO blog posts. Ideal for expanding reach with a steady volume of curated content and aggressive ad spend.",
        },
        price: { mx: 1290, us: 2550 },
        includedInPlanIds: ["grower", "high-profile"],
      },
    ],
  },
  {
    id: "branding",
    title: { es: "Branding", en: "Branding" },
    description: {
      es: "Identidad de marca como continuación, para clientes que ya tienen sitio y necesitan renovar su imagen.",
      en: "Brand identity as continuation work, for clients who already have a site and need to refresh their image.",
    },
    addons: [
      {
        id: "branding-identity",
        name: { es: "Branding + identidad visual", en: "Branding + visual identity" },
        description: {
          es: "ADN de marca, moodboard, logos, manual de marca.",
          en: "Brand DNA, moodboard, logos, brand manual.",
        },
        price: { mx: 350, us: 350 },
        includedInPlanIds: [],
      },
      {
        id: "branding-digital-design",
        name: { es: "Branding + diseño digital", en: "Branding + digital design" },
        description: {
          es: "Identidad visual y manual de marca + diseño aplicado en redes y papelería offline. Se entrega con editables.",
          en: "Visual identity and brand manual + design applied to social media and offline stationery. Delivered with editable files.",
        },
        price: { mx: 490, us: 490 },
        includedInPlanIds: [],
      },
      {
        id: "rebranding-kickstart",
        name: { es: "Re-branding + kickstart", en: "Re-branding + kickstart" },
        description: {
          es: "Brand refresh o rebranding + diseño digital y papelería. Se entrega con editables.",
          en: "Brand refresh or rebranding + digital design and stationery. Delivered with editable files.",
        },
        price: { mx: 860, us: 860 },
        includedInPlanIds: [],
      },
    ],
  },
];

export function findAddon(addonId: string): PackageAddon | undefined {
  for (const phase of packagePhases) {
    const addon = phase.addons.find((item) => item.id === addonId);
    if (addon) return addon;
  }
  return undefined;
}
