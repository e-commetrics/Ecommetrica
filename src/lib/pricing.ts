export type Plan = {
  name: string;
  price: string;
  duration: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Plan Inicial",
    price: "$675",
    duration: "3 meses",
    features: [
      "Sitio web (React/Astro o Shopify)",
      "SEO inicial",
      "Configuración de redes sociales",
      "Google Analytics & Facebook Pixel",
    ],
  },
  {
    name: "Plan Pro",
    price: "$995",
    duration: "4 meses",
    features: [
      "Todo en Plan Inicial",
      "Tienda Shopify",
      "SEO avanzado",
      "Desarrollo web avanzado",
      "Diseño de contenido para redes",
    ],
  },
  {
    name: "Empresa",
    price: "$1,185",
    duration: "6 meses",
    features: [
      "Todo en Plan Pro",
      "Desarrollo web a medida",
      "Estrategia de redes con planeación mensual",
      "Publicidad digital (Google/Facebook/Instagram)",
      "Branding y diseño gráfico",
    ],
    featured: true,
  },
  {
    name: "Personalizado",
    price: "$1,555",
    duration: "8 meses",
    features: [
      "Todo en Empresa",
      "Consultoría estratégica",
      "Automatización de marketing",
      "Producción audiovisual profesional",
      "Desarrollo de app a medida",
    ],
  },
];
