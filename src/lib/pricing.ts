import type { Localized } from "@/lib/i18n/types";

export type Plan = {
  id: string;
  name: Localized;
  price: string;
  /** Numeric value of `price`, for arithmetic (e.g. the /packages configurator total). */
  priceValue: number;
  duration: Localized;
  features: Localized[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "inicial",
    name: { es: "Plan Inicial", en: "Starter Plan" },
    price: "$675",
    priceValue: 675,
    duration: { es: "3 meses", en: "3 months" },
    features: [
      { es: "Sitio web (React/Astro o Shopify)", en: "Website (React/Astro or Shopify)" },
      { es: "SEO inicial", en: "Initial SEO" },
      { es: "Configuración de redes sociales", en: "Social media setup" },
      { es: "Google Analytics & Facebook Pixel", en: "Google Analytics & Facebook Pixel" },
    ],
  },
  {
    id: "pro",
    name: { es: "Plan Pro", en: "Pro Plan" },
    price: "$995",
    priceValue: 995,
    duration: { es: "4 meses", en: "4 months" },
    features: [
      { es: "Todo en Plan Inicial", en: "Everything in the Starter Plan" },
      { es: "Tienda Shopify", en: "Shopify store" },
      { es: "SEO avanzado", en: "Advanced SEO" },
      { es: "Desarrollo web avanzado", en: "Advanced web development" },
      { es: "Diseño de contenido para redes", en: "Social media content design" },
    ],
  },
  {
    id: "empresa",
    name: { es: "Empresa", en: "Enterprise" },
    price: "$1,185",
    priceValue: 1185,
    duration: { es: "6 meses", en: "6 months" },
    features: [
      { es: "Todo en Plan Pro", en: "Everything in the Pro Plan" },
      { es: "Desarrollo web a medida", en: "Custom web development" },
      { es: "Estrategia de redes con planeación mensual", en: "Social media strategy with monthly planning" },
      { es: "Publicidad digital (Google/Facebook/Instagram)", en: "Digital advertising (Google/Facebook/Instagram)" },
      { es: "Branding y diseño gráfico", en: "Branding and graphic design" },
    ],
    featured: true,
  },
  {
    id: "personalizado",
    name: { es: "Personalizado", en: "Custom" },
    price: "$1,555",
    priceValue: 1555,
    duration: { es: "8 meses", en: "8 months" },
    features: [
      { es: "Todo en Empresa", en: "Everything in Enterprise" },
      { es: "Consultoría estratégica", en: "Strategic consulting" },
      { es: "Automatización de marketing", en: "Marketing automation" },
      { es: "Producción audiovisual profesional", en: "Professional audiovisual production" },
      { es: "Desarrollo de app a medida", en: "Custom app development" },
    ],
  },
];
