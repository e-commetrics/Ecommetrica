import type { Localized } from "@/lib/i18n/types";

/**
 * Service taxonomy: seven groups feed /services, four categories (each mapped
 * via `groupId`) feed the home ServicesOverview. Optional fields render nothing when absent — don't add placeholder copy to close a gap.
 */

/** Anchor id on /services. Home cards deep-link to `/services#<id>`. */
export type ServiceGroupId =
  | "mantenimiento-web"
  | "desarrollo-web"
  | "seo-aeo"
  | "campanas-google"
  | "video"
  | "social-ads"
  | "diseno";

export type ServiceGroup = {
  id: ServiceGroupId;
  name: Localized;
  /** One-line summary. Some groups came with a tagline, others with `items`. */
  tagline?: Localized;
  /** Bullet sub-services. Length varies by group on purpose. */
  items?: Localized[];
};

export type ServiceCategory = {
  /** Primary group this card summarizes — also its `/services#<id>` target. */
  groupId: ServiceGroupId;
  name: Localized;
  /** One array entry renders as one paragraph. */
  body?: Localized[];
  /** Three reads best in the card grid, but the count is not enforced. */
  highlights?: Localized[];
};

/** The full catalogue, in the order it appears on /services. */
export const serviceGroups: ServiceGroup[] = [
  {
    id: "desarrollo-web",
    name: { es: "Desarrollo web", en: "Web development" },
    tagline: {
      es: "Páginas web a la medida, rápidas, que no solo atraen sino que venden.",
      en: "Custom websites, fast, that don't just attract — they sell.",
    },
  },
  {
    id: "mantenimiento-web",
    name: { es: "Mantenimiento web", en: "Web maintenance" },
    items: [
      { es: "Cambios a tu tienda o página web", en: "Changes to your store or website" },
      { es: "Nuevas modalidades", en: "New features" },
      { es: "Correos", en: "Email accounts" },
      { es: "Certificados SSL", en: "SSL certificates" },
    ],
  },
  {
    id: "seo-aeo",
    name: { es: "Posicionamiento SEO y AEO", en: "SEO & AEO positioning" },
    tagline: {
      es: "Que te referencien las principales IAs en sus respuestas y los motores de búsqueda en sus resultados.",
      en: "Get referenced by the leading AI assistants in their answers and by search engines in their results.",
    },
  },
  {
    id: "campanas-google",
    name: { es: "Campañas Google", en: "Google campaigns" },
    tagline: {
      es: "Estratégicamente ejecutadas para generar el mejor rendimiento.",
      en: "Strategically executed to generate the best return.",
    },
  },
  {
    id: "social-ads",
    name: { es: "Anuncios para redes sociales", en: "Social media ads" },
    tagline: {
      es: "Atrae a los clientes que quieres e incrementa tus seguidores.",
      en: "Attract the clients you want and grow your following.",
    },
  },
  {
    id: "video",
    name: { es: "Video producción", en: "Video production" },
    items: [
      {
        es: "Planeación y grabación mensual para redes",
        en: "Monthly planning and filming for social media",
      },
      { es: "Videos corporativos", en: "Corporate videos" },
    ],
  },
  {
    id: "diseno",
    name: { es: "Diseño", en: "Design" },
    items: [
      { es: "Identidad de marca", en: "Brand identity" },
      { es: "Rebranding", en: "Rebranding" },
      {
        es: "Diseño web para profesionales y empresas",
        en: "Web design for professionals and companies",
      },
      { es: "Diseño offline", en: "Offline design" },
      { es: "Diseño para redes", en: "Social media design" },
    ],
  },
];

/** The four-card summary on the home page. */
export const serviceCategories: ServiceCategory[] = [
  {
    groupId: "diseno",
    name: { es: "Diseño", en: "Design" },
    body: [
      {
        es: "Diseñamos y ejecutamos todos los procesos clave para transformar la visión de nuestros clientes en realidad, adaptándonos al formato que se requiera.",
        en: "We design and run every key process that turns our clients' vision into reality, adapting to whatever format the work calls for.",
      },
      {
        es: "Más allá de un logo, unificamos nombre, colores y estrategia de marketing para lograr una coherencia visual poderosa que tenga presencia para los consumidores.",
        en: "Beyond a logo, we unify name, color, and marketing strategy into a visual coherence strong enough to hold presence with consumers.",
      },
    ],
    highlights: [
      { es: "Dirección de arte", en: "Art direction" },
      { es: "Identidad visual", en: "Visual identity" },
      { es: "Diseño web", en: "Web design" },
    ],
  },
  {
    groupId: "desarrollo-web",
    name: { es: "Desarrollo", en: "Development" },
    body: [
      {
        es: "Desarrollamos páginas y tiendas en línea impactantes y adaptables que crecen contigo. Hechas a tu gusto, necesidad y flujo de trabajo.",
        en: "We build striking, adaptable websites and online stores that grow with you — made to your taste, your needs, and your workflow.",
      },
      {
        es: "Además, cada cliente obtiene una aplicación web personalizada que simplifica la gestión de su negocio: toda su información, calendarios de citas, reseñas, envíos de correos masivos y mucho más en un clic.",
        en: "Every client also gets a custom web app that simplifies running the business: all their information, appointment calendars, reviews, bulk email campaigns, and much more in one click.",
      },
    ],
    // TODO(copy): needs `highlights` — three bullets, same shape as the "diseno" entry above.
  },
  {
    groupId: "seo-aeo",
    name: { es: "SEO y AEO", en: "SEO & AEO" },
    body: [
      {
        es: "Impulsamos tu negocio en motores de búsqueda. Diseñamos estrategias integrales que maximizan la retención de leads y la conversión.",
        en: "We drive your business up the search engines. We design end-to-end strategies that maximize lead retention and conversion.",
      },
      {
        es: "Creamos ecosistemas digitales conectando tu página web con redes sociales, producimos y distribuimos contenido de alto valor, y ejecutamos campañas de email marketing altamente efectivas.",
        en: "We build digital ecosystems connecting your website to social media, we produce and distribute high-value content, and we run highly effective email marketing campaigns.",
      },
    ],
    // TODO(copy): source copy opened with a brand-storytelling paragraph (content/copywriting,
    // not search) — parked; decide if it becomes its own category or gets dropped.
    highlights: [
      { es: "Posicionamiento SEO y AEO", en: "SEO & AEO positioning" },
      { es: "Campañas Google", en: "Google campaigns" },
      { es: "Anuncios para redes sociales", en: "Social media ads" },
    ],
  },
  {
    groupId: "video",
    name: { es: "Video", en: "Video" },
    // TODO(copy): needs `body` paragraph(s), like the other three categories — source copy only had this bullet list.
    highlights: [
      { es: "Publicidad", en: "Advertising" },
      { es: "Videos para empresas", en: "Corporate videos" },
      { es: "Videos de producto", en: "Product videos" },
      { es: "Testimoniales", en: "Testimonials" },
      { es: "Videos para eventos", en: "Event videos" },
      { es: "Videos para páginas web", en: "Website videos" },
    ],
  },
];
