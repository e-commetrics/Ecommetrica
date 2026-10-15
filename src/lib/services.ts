import type { Localized } from "@/lib/i18n/types";
import { plans, type PlanId } from "@/lib/pricing";

/**
 * Service taxonomy for the home ServicesOverview and /services. The business is told as
 * five layers (one per brand ring); each service sits in one layer, and each goal on
 * /services spans one or more layers. Services are sold through the plans only — every
 * entry points at the first plan that includes it, never at a standalone price.
 */

export type ServiceLayerId = "marca" | "sitio" | "visibilidad" | "contenido" | "operacion";

export type ServiceLayer = {
  id: ServiceLayerId;
  name: Localized;
  /** Short "what it's about" line under the layer name. */
  line: Localized;
};

export type Service = {
  id: string;
  layer: ServiceLayerId;
  name: Localized;
  description: Localized;
  items: Localized[];
  /** First plan (in PLAN_ORDER) that includes it — keep in sync with `matrix` in pricing.ts. */
  includedFrom: PlanId;
};

export type ServiceGoal = {
  id: string;
  /** Completes "Quiero …" / "I want to …" on the goal button. */
  name: Localized;
  layers: ServiceLayerId[];
  /** The plan that bundles what this goal needs. */
  planId: PlanId;
  pitch: Localized;
};

/** Order matters: it's the ring order, top to bottom. */
export const serviceLayers: ServiceLayer[] = [
  { id: "marca", name: { es: "Marca", en: "Brand" }, line: { es: "Cómo te ven", en: "How you're seen" } },
  { id: "sitio", name: { es: "Sitio", en: "Site" }, line: { es: "Dónde te compran", en: "Where you sell" } },
  {
    id: "visibilidad",
    name: { es: "Visibilidad", en: "Visibility" },
    line: { es: "Cómo te encuentran", en: "How you're found" },
  },
  {
    id: "contenido",
    name: { es: "Contenido", en: "Content" },
    line: { es: "Qué cuentas", en: "What you say" },
  },
  {
    id: "operacion",
    name: { es: "Operación", en: "Operations" },
    line: { es: "Cómo trabajas", en: "How you work" },
  },
];

export const services: Service[] = [
  {
    id: "diseno",
    layer: "marca",
    name: { es: "Diseño y marca", en: "Design and brand" },
    description: {
      es: "Identidad visual, branding, rebranding y diseño para web, redes y papelería.",
      en: "Visual identity, branding, rebranding, and design for web, social, and print.",
    },
    items: [
      { es: "Identidad visual y manual de marca", en: "Visual identity and brand manual" },
      { es: "Branding y rebranding", en: "Branding and rebranding" },
      { es: "Diseño digital, para redes y offline", en: "Digital, social, and offline design" },
    ],
    includedFrom: "simple",
  },
  {
    id: "web",
    layer: "sitio",
    name: { es: "Desarrollo web", en: "Web development" },
    description: {
      es: "Sitios y tiendas Shopify a la medida: rápidos, bilingües y accesibles.",
      en: "Custom websites and Shopify stores: fast, bilingual, and accessible.",
    },
    items: [
      { es: "Sitio o tienda Shopify", en: "Website or Shopify store" },
      { es: "Reservas y pagos en línea", en: "Online booking and payments" },
      { es: "Landing pages y asistente IA", en: "Landing pages and AI assistant" },
    ],
    includedFrom: "express",
  },
  {
    id: "mantenimiento",
    layer: "sitio",
    name: { es: "Hosting y mantenimiento", en: "Hosting and maintenance" },
    description: {
      es: "Tu sitio en línea, seguro y al día: cambios, certificados SSL y monitoreo.",
      en: "Your site online, secure, and up to date: changes, SSL certificates, and monitoring.",
    },
    items: [
      { es: "Hosting y mantenimiento", en: "Hosting and maintenance" },
      { es: "Accesibilidad ADA / WCAG", en: "ADA / WCAG accessibility" },
      { es: "Monitoreo en vivo", en: "Live monitoring" },
    ],
    includedFrom: "express",
  },
  {
    id: "seo",
    layer: "visibilidad",
    name: { es: "SEO y AEO", en: "SEO & AEO" },
    description: {
      es: "Que te encuentren en Google y que las IAs te citen en sus respuestas.",
      en: "Get found on Google and cited by AI assistants in their answers.",
    },
    items: [
      { es: "SEO y AEO con Search Console", en: "SEO & AEO with Search Console" },
      { es: "Blog SEO/AEO", en: "SEO/AEO blog" },
      { es: "Google Business Profile", en: "Google Business Profile" },
    ],
    includedFrom: "express",
  },
  {
    id: "publicidad",
    layer: "visibilidad",
    name: { es: "Publicidad digital", en: "Digital advertising" },
    description: {
      es: "Campañas en Meta y Google con estrategia, piezas y optimización mensual.",
      en: "Meta and Google campaigns with strategy, creatives, and monthly optimization.",
    },
    items: [
      { es: "Pauta en Meta", en: "Meta ads" },
      { es: "Pauta en Google", en: "Google ads" },
      { es: "Reseñas y reputación", en: "Reviews and reputation" },
    ],
    includedFrom: "advanced",
  },
  {
    id: "video",
    layer: "contenido",
    name: { es: "Video y contenido", en: "Video and content" },
    description: {
      es: "Contenido para redes, producción de video y piezas originales hechas por personas.",
      en: "Social content, video production, and original pieces made by people.",
    },
    items: [
      { es: "Contenido para redes", en: "Social media content" },
      { es: "Producción de video", en: "Video production" },
      { es: "Video cinematográfico 4K", en: "Cinematic 4K video" },
    ],
    includedFrom: "simple",
  },
  {
    id: "automatizacion",
    layer: "operacion",
    name: { es: "Automatización e integraciones", en: "Automation and integrations" },
    description: {
      es: "Menos tareas manuales: correos, WhatsApp, CRM, dashboards y tus sistemas conectados.",
      en: "Fewer manual tasks: email, WhatsApp, CRM, dashboards, and your systems connected.",
    },
    items: [
      { es: "Automatización de correo y WhatsApp", en: "Email and WhatsApp automation" },
      { es: "Dashboard con CRM y BI", en: "Dashboard with CRM and BI" },
      { es: "Integraciones con tus sistemas", en: "Integrations with your systems" },
    ],
    includedFrom: "grower",
  },
  {
    id: "consultoria",
    layer: "operacion",
    name: { es: "Consultoría y estrategia digital", en: "Digital consulting and strategy" },
    description: {
      es: "Dirección digital: estrategia mensual, roadmap trimestral y decisiones de arquitectura y presupuesto.",
      en: "Digital direction: monthly strategy, a quarterly roadmap, and architecture and budget decisions.",
    },
    items: [
      { es: "Estrategia mensual de redes", en: "Monthly social strategy" },
      { es: "Estrategia y roadmap trimestrales", en: "Quarterly strategy and roadmap" },
      { es: "Consultoría estratégica (Aliado)", en: "Strategic consulting (Partner)" },
    ],
    includedFrom: "grower",
  },
];

export const serviceGoals: ServiceGoal[] = [
  {
    id: "empezar",
    name: { es: "empezar en línea", en: "get online" },
    layers: ["marca", "sitio"],
    planId: "simple",
    pitch: {
      es: "Sitio, marca, SEO básico y redes, listos en 90 días.",
      en: "Site, brand, basic SEO, and social, ready in 90 days.",
    },
  },
  {
    id: "vender",
    name: { es: "vender en línea", en: "sell online" },
    layers: ["sitio", "visibilidad"],
    planId: "advanced",
    pitch: {
      es: "Tienda, reservas y pagos, SEO avanzado y tu primera campaña en Meta.",
      en: "Store, booking and payments, advanced SEO, and your first Meta campaign.",
    },
  },
  {
    id: "encontrar",
    name: { es: "que me encuentren", en: "be found" },
    layers: ["visibilidad"],
    planId: "advanced",
    pitch: {
      es: "SEO y AEO avanzados, reseñas, Google Business y pauta en Meta.",
      en: "Advanced SEO and AEO, reviews, Google Business, and Meta ads.",
    },
  },
  {
    id: "contenido",
    name: { es: "contenido constante", en: "post consistently" },
    layers: ["contenido", "marca"],
    planId: "grower",
    pitch: {
      es: "Contenido original, producción de video y estrategia mensual de redes.",
      en: "Original content, video production, and a monthly social strategy.",
    },
  },
  {
    id: "automatizar",
    name: { es: "automatizar", en: "automate" },
    layers: ["operacion"],
    planId: "high-profile",
    pitch: {
      es: "Automatización de marketing, dashboard con BI e integraciones con tus sistemas.",
      en: "Marketing automation, a BI dashboard, and integrations with your systems.",
    },
  },
];

const planRank = (id: PlanId) => plans.findIndex((plan) => plan.id === id);

/** The earliest plan carrying any service of the layer — "in plans from X". */
export function layerIncludedFrom(layerId: ServiceLayerId): PlanId {
  return services
    .filter((service) => service.layer === layerId)
    .map((service) => service.includedFrom)
    .sort((a, b) => planRank(a) - planRank(b))[0];
}
