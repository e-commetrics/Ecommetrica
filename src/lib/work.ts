export type CaseStudyDetails = {
  client?: string;
  year?: string;
  services?: string[];
  summary?: string;
  results?: string[];
  gallery?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
};

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  featured?: boolean;
  details?: CaseStudyDetails;
  /** Live client site. Rendered as the "Ver sitio" button on /work/[slug]. */
  webpage: string;
} & (
  | { external?: false }
  | { external: true; url: string }
);

/**
 * Copy, categories, images and live URLs for everything below the first four
 * entries were pulled from the portfolio section of ecommetrica.com (its
 * Portfolio island + the Spanish half of the i18n dictionary). Names and slugs
 * are readable versions of the domains that source uses as titles.
 *
 * Only the first four carry `featured: true`, which is what puts them on the
 * home page.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "dr-lumban",
    name: "Dr. Lumbán",
    category: "Medical",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit.",
    image: "/Works/dr-lumban.png",
    featured: true,
    webpage: "https://drlumban.com/",
    details: {
      summary:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit.",
    },
  },
  {
    slug: "monge-ortopedia",
    name: "Monge Ortopedia",
    category: "Medical",
    description:
      "Un traumatólogo ortopedista que buscaba un sitio web moderno y minimalista para diferenciarse de los sitios convencionales en el ámbito de la traumatología. Logramos un diseño profesional y sencillo.",
    image: "/Works/dr-monge.png",
    featured: true,
    webpage: "https://mongeortopedia.com/",
    details: {
      summary:
        "Un traumatólogo ortopedista que buscaba un sitio web moderno y minimalista para diferenciarse de los sitios convencionales en el ámbito de la traumatología. Logramos un diseño profesional y sencillo.",
    },
  },
  {
    slug: "dra-cesia-borjon",
    name: "Dra. Cesia Borjon",
    category: "Medical",
    description:
      "Una ginecóloga-obstetra feminista con más de 15 años de experiencia que quería crear un sitio web inclusivo y dinámico. Diseñamos una experiencia atractiva y reactiva que refleja su esencia y valores, permitiendo a sus pacientes una navegación agradable.",
    image: "/Works/dra-cesia-borjon.png",
    featured: true,
    webpage: "https://cesiaborjon.com/",
    details: {
      summary:
        "Una ginecóloga-obstetra feminista con más de 15 años de experiencia que quería crear un sitio web inclusivo y dinámico. Diseñamos una experiencia atractiva y reactiva que refleja su esencia y valores, permitiendo a sus pacientes una navegación agradable.",
    },
  },
  {
    slug: "dr-arturo-lopez",
    name: "Dr. Arturo López",
    category: "Medical",
    description:
      "Un cirujano plástico que requería una landing page efectiva para destacar sus servicios de rejuvenecimiento facial, como rellenos y otros tratamientos antienvejecimiento. El diseño se enfocó en ser breve pero impactante, equilibrando simplicidad y elegancia con un video y un mensaje conciso con sus datos de contacto.",
    image: "/Works/dr-arturo-lopez.png",
    featured: true,
    webpage: "https://ecommetrica.com/arturo/",
    details: {
      summary:
        "Un cirujano plástico que requería una landing page efectiva para destacar sus servicios de rejuvenecimiento facial, como rellenos y otros tratamientos antienvejecimiento. El diseño se enfocó en ser breve pero impactante, equilibrando simplicidad y elegancia con un video y un mensaje conciso con sus datos de contacto.",
    },
  },

  // --- Dental ---------------------------------------------------------------
  {
    slug: "bites",
    name: "Bites — Creadores de Sonrisas",
    category: "Dental",
    description:
      "Es un centro de alta estética dental que necesitaba renovar su página web y optimizar su UX/UI con una imagen que reflejara el estilo distintivo de Bites. Incorporamos un calendario que permite agendar citas y realizar pagos directamente desde la página, brindando una experiencia fluida y eficiente en la que los usuarios pueden tener el control mediante una web app.",
    image: "/projects/bitespage.webp",
    webpage: "https://ecommetrica.com/bites",
  },
  {
    slug: "reforma-dental",
    name: "Reforma Dental",
    category: "Dental",
    description:
      "Un consultorio dental familiar que buscaba posicionarse como una alternativa con servicios completos a precios competitivos en la zona céntrica. Diseñamos y desarrollamos un sitio web funcional para facilitar la programación de citas, con un diseño moderno que resalta su competitividad y variedad de servicios.",
    image: "/projects/reformapage.webp",
    webpage: "https://reformadental.com",
  },
  {
    slug: "dental-reforma",
    name: "Dental Reforma",
    category: "Dental",
    description:
      "Un consultorio dental familiar con más de 35 años en Tijuana que busca seguir siendo relevante y tener presencia en los motores de búsqueda. Diseñamos un sitio web para destacar sus valores, experiencia y servicios.",
    image: "/projects/dentalpage.webp",
    webpage: "https://dentalreforma.com",
  },

  // --- Medical --------------------------------------------------------------
  {
    slug: "dra-pamela-perez",
    name: "Dra. Pamela Pérez",
    category: "Medical",
    description:
      "Una otorrinolaringóloga especializada en cirugía plástica nasal que buscaba un sitio web enfocado en destacar los resultados de sus pacientes y explicar cada procedimiento mediante video blogs. Desarrollamos una página de inicio reactiva y una sección de procedimientos con videos, priorizando formatos breves y fotos de su trabajo.",
    image: "/projects/pamelapage.webp",
    webpage: "https://doctorapamelaperez.com",
  },

  // --- Industrial -----------------------------------------------------------
  {
    slug: "carbonetics",
    name: "Carbonetics Inc.",
    category: "Industrial",
    description:
      "Una tienda de accesorios y partes de fibra de carbono para autos de carrera que necesitaba optimizar su sistema de compras, disposición de productos e interfaz general. Implementamos un nuevo sistema de inventario y logística para mejorar el flujo de productos, selección y compra, además de optimizar la apariencia UI/UX de la tienda.",
    image: "/projects/carboneticspage.webp",
    webpage: "https://carboneticsinc.com",
  },
  {
    slug: "la-cocina",
    name: "La Cocina",
    category: "Industrial",
    // TODO: ecommetrica.com has no real copy for this one — its description key
    // points at the category string, so the site literally renders "Industrias".
    // Replace with the actual case-study text.
    description: "Proyecto de desarrollo web para La Cocina.",
    image: "/projects/cocinamxpage.webp",
    webpage: "https://lacocina.mx",
  },
  {
    slug: "wislin-farm",
    name: "Wislin Farm",
    category: "Industrial",
    description:
      "Un negocio familiar que comercializa y distribuye productos lácteos y embutidos a nivel local, con la meta de llegar a diversos mercados. Desarrollamos una página de inicio que refleja la esencia y el producto de la marca, combinando imágenes de productos con una narrativa atractiva.",
    image: "/projects/wislinpage.webp",
    webpage: "https://wislinfarm.com",
  },
  {
    slug: "syl-industrial",
    name: "SYL Industrial",
    category: "Industrial",
    description:
      "Un distribuidor de productos para la industria maquiladora que necesitaba una landing page para mostrar sus servicios y datos de contacto. Nos enfocamos en diseñar una página sencilla pero efectiva que presentara claramente sus servicios e información clave, integrando múltiples métodos de contacto accesibles.",
    image: "/projects/sylindustrialpage.webp",
    webpage: "https://sylindustrial.com/",
  },
  {
    slug: "kamili",
    name: "Kamili",
    category: "Industrial",
    description:
      "Un salón de uñas y spa que buscaba un sitio web donde los clientes pudieran agendar citas en cualquiera de sus dos sucursales y elegir servicios. Implementamos una interfaz intuitiva que permite explorar el catálogo de servicios, seleccionar tratamientos, reservar y pagar, asegurando una experiencia eficiente y fluida.",
    image: "/projects/kamilipage.webp",
    webpage: "https://kamili.com",
  },
  {
    slug: "condor-vision",
    name: "The Condor Vision",
    category: "Industrial",
    description:
      "Una agencia de viajes inmersivos en drones que buscaba un sitio web que resaltara la experiencia de vuelo. Diseñamos una página en la que la landing page está dominada por un video inmersivo en alta calidad, transportando al usuario. Además, integramos secciones con más videos y fotos inmersivas que refuerzan la narrativa visual de la marca.",
    image: "/projects/condorpage.webp",
    webpage: "https://ecommetrica.com/condor/",
  },

  // --- Consulting -----------------------------------------------------------
  {
    slug: "gpe-consultores",
    name: "GPE Consultores",
    category: "Consulting",
    description:
      "Una firma de consultoría legal y contable que buscaba posicionarse y diferenciarse del sector con un sitio web moderno, además de mejorar la gestión de correos corporativos. Desarrollamos un sitio innovador y funcional optimizado para el posicionamiento, además de una web app que centraliza la gestión y cantidad de correos e información, mejorando la eficiencia general.",
    image: "/projects/gpepage.webp",
    webpage: "https://gpeconsultores.com.mx",
  },
  {
    slug: "syl-talento",
    name: "SYL Talento",
    category: "Consulting",
    description:
      "Una agencia de reclutamiento que necesitaba un sitio web para informar sobre sus servicios, contar con su propia bolsa de trabajo y una web app para empleados. Creamos un sitio optimizado para una experiencia de navegación intuitiva, permitiendo explorar valores, servicios y blogs de la agencia. Además, implementamos una bolsa de trabajo funcional donde los candidatos pueden aplicar directamente a vacantes y desarrollamos una web app para la gestión interna de correos y administración de datos relacionados con vacantes.",
    image: "/projects/sylpage.webp",
    webpage: "https://syltalento.com",
  },
  {
    slug: "e-commetrics",
    name: "e-commetrics",
    category: "Consulting",
    description:
      "Plataforma de análisis y métricas para e-commerce que buscaba un sitio web optimizado y profesional para destacar sus servicios y capacidades.",
    image: "/projects/eommetrica.webp",
    webpage: "https://e-commetrics.com",
  },

  // --- Commerce -------------------------------------------------------------
  {
    slug: "border-grower",
    name: "Border Grower",
    category: "Commerce",
    description:
      "Un distribuidor comercial en el sector agrícola que necesitaba un sitio web optimizado para ampliar su alcance y mejorar la oferta de servicios.",
    image: "/projects/borderpage.webp",
    webpage: "https://bordergrower.com",
  },
  {
    slug: "chik",
    name: "Chik",
    category: "Commerce",
    description:
      "Un distribuidor de productos de belleza que quería modernizar y fortalecer su tienda en Shopify. Realizamos un rebranding, reestructuramos la tienda, optimizamos la distribución y presentación de productos, asegurando una navegación intuitiva y coherente. Enfocarnos en la cohesión del mensaje visual y verbal nos permitió crear una tienda atractiva.",
    image: "/projects/chikpage.webp",
    webpage: "https://chik.mx",
  },
  {
    slug: "la-bodega-solar",
    name: "La Bodega Solar",
    category: "Commerce",
    description:
      "Un distribuidor de productos solares que necesitaba un sitio web para mejorar su alcance en el mercado y la relación con los clientes.",
    image: "/projects/bodegapage.webp",
    webpage: "https://labodegasolar.com",
  },
  {
    slug: "ziggiz",
    name: "Ziggiz",
    category: "Commerce",
    description:
      "Una marca de papel para fumar que buscaba una tienda en línea simple y directa para los compradores. Desarrollamos una tienda en Shopify con un diseño limpio y navegación intuitiva, permitiendo que los clientes comprendan el mensaje y asegurando una experiencia de compra rápida y eficiente.",
    image: "/projects/ziggizpage.webp",
    webpage: "https://ziggiz.world",
  },

  // --- Other ----------------------------------------------------------------
  {
    slug: "central-toreo",
    name: "Central Toreo",
    category: "Other",
    description:
      "Oficinas del sector administrativo y médico que querían mejorar su landing page con un diseño más moderno y navegación fluida. La nueva página se enfocó en mejorar la experiencia del usuario con una navegación más fluida, un diseño más atractivo y una estructura optimizada para resaltar la oferta y mensaje. Además, integramos herramientas para facilitar el contacto y centralizar la gestión de correos.",
    image: "/projects/centraltoreopage.webp",
    webpage: "https://centraltoreo.com",
  },
  {
    slug: "proyecto-tijuana",
    name: "Proyecto Tijuana",
    category: "Other",
    description:
      "Un proyecto comunitario que busca promover iniciativas sociales y el desarrollo cultural en Tijuana, requiriendo una presencia en línea funcional y atractiva.",
    image: "/projects/proyectopage.webp",
    webpage: "https://proyectotijuana-claudionaranjo.com",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}

export function getInternalCaseStudies() {
  return caseStudies.filter((project) => !project.external);
}

export function getFeaturedCaseStudies() {
  return caseStudies.filter((project) => project.featured);
}
