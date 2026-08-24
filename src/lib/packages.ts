import type { Localized, Region } from "@/lib/i18n/types";

export type PackageAddon = {
  id: string;
  name: Localized;
  description: Localized;
  price: Record<Region, number>;
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
        name: { es: "Coding / ingeniería", en: "Coding / engineering" },
        description: {
          es: "Actualización o desarrollo de webapps.",
          en: "Webapp updates or development. Senior nearshore engineering on Pacific time.",
        },
        price: { mx: 620, us: 1100 },
        includedInPlanIds: [],
      },
      {
        id: "content-creation",
        name: { es: "Creación de contenido", en: "Content creation" },
        description: {
          es: "~7 videos cortos con portada + 5 posts de diseño.",
          en: "~7 short videos with covers + 5 design posts.",
        },
        price: { mx: 480, us: 650 },
        includedInPlanIds: [],
      },
      {
        id: "webmaster",
        name: { es: "Webmaster / mantenimiento", en: "Webmaster / maintenance" },
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
        name: { es: "Producción audiovisual", en: "Video production" },
        description: {
          es: "2 shootings profesionales, contenido distribuido a lo largo de 3 meses.",
          en: "2 professional shoots, content distributed across 3 months.",
        },
        price: { mx: 1200, us: 2400 },
        includedInPlanIds: ["grower", "high-profile"],
      },
    ],
  },
  {
    id: "ad-management",
    title: { es: "Gestión de anuncios — tres niveles", en: "Ad management — three tiers" },
    description: {
      es: "El honorario de gestión y el presupuesto de pauta se facturan siempre por separado; la pauta va a nombre del cliente.",
      en: "The management fee and the ad budget are always billed separately; ad spend is in the client's name.",
    },
    addons: [
      {
        id: "mgmt-only-meta",
        name: { es: "Solo gestión — Meta", en: "Management only — Meta" },
        description: {
          es: "3 campañas · sin creativos. El honorario limpio: para el cliente que ya trae su contenido.",
          en: "3 campaigns · no creatives. The clean fee: for the client who already has content.",
        },
        price: { mx: 450, us: 900 },
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "mgmt-only-google",
        name: { es: "Solo gestión — Google", en: "Management only — Google" },
        description: {
          es: "3 campañas + keywords · sin blogs. Solo estrategia, configuración y optimización.",
          en: "3 campaigns + keywords · no blogs. Strategy, setup, and optimization only.",
        },
        price: { mx: 550, us: 1100 },
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "mgmt-creatives-meta",
        name: { es: "Gestión + creativos — Meta", en: "Management + creatives — Meta" },
        description: {
          es: "3 campañas + creativos. Lo más cercano a lo que ya conocen; incluye el diseño de los anuncios.",
          en: "3 campaigns + creatives. Closest to what they already know; includes ad creatives.",
        },
        price: { mx: 680, us: 1350 },
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "mgmt-creatives-google",
        name: { es: "Gestión + creativos — Google", en: "Management + creatives — Google" },
        description: {
          es: "3 campañas + 6 keywords + 3 blogs. El motor de contenido completo (7 blogs) vive en el nivel siguiente.",
          en: "3 campaigns + 6 keywords + 3 blogs. The full content engine (7 blogs) lives in the next tier.",
        },
        price: { mx: 780, us: 1550 },
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "mgmt-content-engine-meta",
        name: { es: "Gestión + motor de contenido — Meta", en: "Management + content engine — Meta" },
        description: {
          es: "3 campañas + creativos + 8 piezas. Mayor ticket: aquí vive la producción de contenido completa.",
          en: "3 campaigns + creatives + 8 pieces. Higher ticket: the full content production lives here.",
        },
        price: { mx: 1150, us: 2300 },
        includedInPlanIds: ["grower", "high-profile"],
      },
      {
        id: "mgmt-content-engine-google",
        name: { es: "Gestión + motor de contenido — Google", en: "Management + content engine — Google" },
        description: {
          es: "3 campañas + 9 keywords + 7 blogs. 7 blogs es trabajo de redacción, se cobra como tal.",
          en: "3 campaigns + 9 keywords + 7 blogs. 7 blogs is real writing work, priced as such.",
        },
        price: { mx: 1290, us: 2550 },
        includedInPlanIds: ["grower", "high-profile"],
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
