import type { Localized } from "@/lib/i18n/types";

export type PackageAddon = {
  id: string;
  name: Localized;
  description: Localized;
  price: number;
  /**
   * Plan ids (see `Plan.id` in pricing.ts) whose feature list already covers this
   * service. The configurator marks the addon "included" for those plans instead
   * of letting it be added twice — this is what keeps each plan's extras unique.
   */
  includedInPlanIds: string[];
};

export type PackagePhase = {
  id: string;
  title: Localized;
  description: Localized;
  addons: PackageAddon[];
};

export const packagePhases: PackagePhase[] = [
  {
    id: "marketing",
    title: { es: "Servicios adicionales de marketing", en: "Additional marketing services" },
    description: {
      es: "Agrega herramientas extra para potenciar tu estrategia.",
      en: "Add extra tools to power up your strategy.",
    },
    addons: [
      {
        id: "seo-pro",
        name: { es: "SEO Avanzado", en: "Advanced SEO" },
        description: {
          es: "Optimización técnica, contenido estratégico y Google My Business.",
          en: "Technical optimization, strategic content, and Google My Business.",
        },
        price: 500,
        includedInPlanIds: ["pro", "empresa", "personalizado"],
      },
      {
        id: "social-media",
        name: { es: "Gestión de Redes Sociales", en: "Social Media Management" },
        description: {
          es: "Creación de contenido, posts y reels para redes sociales.",
          en: "Content creation, posts, and reels for social media.",
        },
        price: 800,
        includedInPlanIds: ["empresa", "personalizado"],
      },
      {
        id: "email-marketing",
        name: { es: "Email Marketing", en: "Email Marketing" },
        description: {
          es: "Automatización con campañas estratégicas y segmentación avanzada.",
          en: "Automation with strategic campaigns and advanced segmentation.",
        },
        price: 400,
        includedInPlanIds: [],
      },
      {
        id: "ads",
        name: { es: "Publicidad Digital", en: "Digital Advertising" },
        description: {
          es: "Gestión de campañas en Google Ads y Facebook Ads.",
          en: "Campaign management on Google Ads and Facebook Ads.",
        },
        price: 1000,
        includedInPlanIds: ["empresa", "personalizado"],
      },
    ],
  },
  {
    id: "integrations",
    title: { es: "Integraciones especiales", en: "Special integrations" },
    description: {
      es: "Conecta con otras plataformas y servicios.",
      en: "Connect with other platforms and services.",
    },
    addons: [
      {
        id: "crm",
        name: { es: "Integración CRM", en: "CRM Integration" },
        description: {
          es: "Conexión con HubSpot, Salesforce o CRM personalizado.",
          en: "Connection with HubSpot, Salesforce, or a custom CRM.",
        },
        price: 300,
        includedInPlanIds: [],
      },
      {
        id: "payment",
        name: { es: "Pasarelas de Pago", en: "Payment Gateways" },
        description: {
          es: "Configuración de Stripe, PayPal o MercadoPago.",
          en: "Setup of Stripe, PayPal, or MercadoPago.",
        },
        price: 200,
        includedInPlanIds: [],
      },
      {
        id: "analytics",
        name: { es: "Google Analytics & Tag Manager", en: "Google Analytics & Tag Manager" },
        description: {
          es: "Implementación avanzada con seguimiento de eventos.",
          en: "Advanced implementation with event tracking.",
        },
        price: 350,
        includedInPlanIds: [],
      },
      {
        id: "automation",
        name: { es: "Automatización de Procesos", en: "Process Automation" },
        description: {
          es: "Flujos de trabajo con IA para remarketing y gestión de clientes.",
          en: "AI-driven workflows for remarketing and client management.",
        },
        price: 700,
        includedInPlanIds: ["personalizado"],
      },
    ],
  },
  {
    id: "customization",
    title: { es: "Personalización final", en: "Final customization" },
    description: {
      es: "Toques finales para tu proyecto perfecto.",
      en: "Finishing touches for your perfect project.",
    },
    addons: [
      {
        id: "design",
        name: { es: "Diseño Gráfico y Branding", en: "Graphic Design & Branding" },
        description: {
          es: "Diseño de identidad visual en Figma, Photoshop e Illustrator.",
          en: "Visual identity design in Figma, Photoshop, and Illustrator.",
        },
        price: 1000,
        includedInPlanIds: ["empresa", "personalizado"],
      },
      {
        id: "support",
        name: { es: "Soporte Priority 24/7", en: "24/7 Priority Support" },
        description: {
          es: "Atención técnica prioritaria y resolución de problemas.",
          en: "Priority technical support and issue resolution.",
        },
        price: 1500,
        includedInPlanIds: [],
      },
      {
        id: "branding",
        name: { es: "Estrategia de Branding", en: "Branding Strategy" },
        description: {
          es: "Desarrollo de imagen de marca y posicionamiento.",
          en: "Brand image development and positioning.",
        },
        price: 900,
        includedInPlanIds: ["empresa", "personalizado"],
      },
      {
        id: "ux-ui",
        name: { es: "Optimización UX/UI", en: "UX/UI Optimization" },
        description: {
          es: "Mejoras en navegación, experiencia de usuario y conversiones.",
          en: "Improvements to navigation, user experience, and conversions.",
        },
        price: 1100,
        includedInPlanIds: ["personalizado"],
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
