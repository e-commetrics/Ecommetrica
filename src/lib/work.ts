import type { Lang, Localized } from "@/lib/i18n/types";

export type CaseStudyDetails = {
  client?: string;
  year?: string;
  services?: string[];
  summary?: Localized;
  results?: Localized[];
  gallery?: string[];
};

/**
 * A filmed client testimonial. Lives at the top level rather than inside
 * `details` because it drives three things at once: the player on the project
 * page, the "con testimonial" filter on /work, and — when the project has no
 * `video` of its own — the hover preview on the home page.
 *
 * `quote` is optional and is a *pull quote for the video*, not a substitute for
 * it: leave it unset rather than paraphrasing what the client said on camera.
 */
export type Testimonial = {
  /** Lives in public/videos, which is gitignored (see .gitignore). */
  video: string;
  /**
   * Display width / height. Declared rather than measured so the frame is the
   * right shape on the first paint — waiting for the file's own metadata means
   * a portrait interview renders pillarboxed inside a 16:9 box until it lands.
   */
  aspect?: number;
  /** Frame shown before playback. Also gitignored if it sits next to the video. */
  poster?: string;
  author: string;
  role?: Localized;
  quote?: Localized;
};

export type CaseStudy = {
  slug: string;
  name: string;
  category: CategoryId;
  description: Localized;
  image?: string;
  /** Shown on hover on the homepage card, and inline on the project's own page. */
  video?: string;
  /** CSS `object-position` for the homepage hover crop (aspect-4/3). Defaults to "center". */
  videoPosition?: string;
  featured?: boolean;
  testimonial?: Testimonial;
  details?: CaseStudyDetails;
  /** Live client site. Rendered as the "Ver sitio" button on /work/[slug]. */
  webpage: string;
} & (
  | { external?: false }
  | { external: true; url: string }
);

export type CategoryId =
  | "Medical"
  | "Dental"
  | "Industrial"
  | "Consulting"
  | "Commerce"
  | "Other";

export const CATEGORY_LABELS: Record<CategoryId, Localized> = {
  Medical: { es: "Médico", en: "Medical" },
  Dental: { es: "Dental", en: "Dental" },
  Industrial: { es: "Industrial", en: "Industrial" },
  Consulting: { es: "Consultoría", en: "Consulting" },
  Commerce: { es: "Comercio", en: "Commerce" },
  Other: { es: "Otro", en: "Other" },
};

export function categoryLabel(category: CategoryId, lang: Lang) {
  return CATEGORY_LABELS[category][lang];
}

/**
 * Copy, categories, images and live URLs for everything below the first four
 * entries were pulled from the portfolio section of ecommetrica.com (its
 * Portfolio island + the Spanish half of the i18n dictionary). Names and slugs
 * are readable versions of the domains that source uses as titles.
 *
 * `featured: true` is what puts an entry on the home page, in the order it
 * appears in this array. Eight are flagged, picked to cover all five main
 * categories rather than to be the eight best — the home section reads as a
 * cross-section of the studio, and /work is where the full list lives.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "dr-lumban",
    name: "Dr. Lumbán",
    category: "Medical",
    description: {
      es: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit.",
      en: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit.",
    },
    image: "/Works/dr-lumban.png",
    featured: true,
    webpage: "https://drlumban.com/",
    details: {
      summary: {
        es: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit.",
        en: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit.",
      },
    },
  },
  {
    slug: "monge-ortopedia",
    name: "Monge Ortopedia",
    category: "Medical",
    description: {
      es: "Un traumatólogo ortopedista que buscaba un sitio web moderno y minimalista para diferenciarse de los sitios convencionales en el ámbito de la traumatología. Logramos un diseño profesional y sencillo.",
      en: "An orthopedic traumatologist who wanted a modern, minimalist website to stand out from conventional sites in the field of traumatology. We achieved a professional, straightforward design.",
    },
    image: "/Works/dr-monge.png",
    videoPosition: "center 15%",
    featured: true,
    webpage: "https://mongeortopedia.com/",
    testimonial: {
      video: "/videos/monge-ortopedia-testimonial.webm",
      aspect: 9 / 16,
      author: "Dr. Ricardo Monge",
      role: { es: "Traumatólogo ortopedista", en: "Orthopedic traumatologist" },
    },
    details: {
      summary: {
        es: "Un traumatólogo ortopedista que buscaba un sitio web moderno y minimalista para diferenciarse de los sitios convencionales en el ámbito de la traumatología. Logramos un diseño profesional y sencillo.",
        en: "An orthopedic traumatologist who wanted a modern, minimalist website to stand out from conventional sites in the field of traumatology. We achieved a professional, straightforward design.",
      },
    },
  },
  {
    slug: "dra-cesia-borjon",
    name: "Dra. Cesia Borjon",
    category: "Medical",
    description: {
      es: "Una ginecóloga-obstetra feminista con más de 15 años de experiencia que quería crear un sitio web inclusivo y dinámico. Diseñamos una experiencia atractiva y reactiva que refleja su esencia y valores, permitiendo a sus pacientes una navegación agradable.",
      en: "A feminist OB/GYN with more than 15 years of experience who wanted an inclusive, dynamic website. We designed an engaging, responsive experience that reflects her essence and values, giving her patients a pleasant navigation experience.",
    },
    image: "/Works/dra-cesia-borjon.png",
    featured: true,
    webpage: "https://cesiaborjon.com/",
    testimonial: {
      video: "/videos/cesia-borjon-testimonial.webm",
      aspect: 9 / 16,
      author: "Dra. Cesia Borjon",
      role: { es: "Ginecóloga-obstetra", en: "OB/GYN" },
    },
    details: {
      summary: {
        es: "Una ginecóloga-obstetra feminista con más de 15 años de experiencia que quería crear un sitio web inclusivo y dinámico. Diseñamos una experiencia atractiva y reactiva que refleja su esencia y valores, permitiendo a sus pacientes una navegación agradable.",
        en: "A feminist OB/GYN with more than 15 years of experience who wanted an inclusive, dynamic website. We designed an engaging, responsive experience that reflects her essence and values, giving her patients a pleasant navigation experience.",
      },
    },
  },
  {
    slug: "dr-arturo-lopez",
    name: "Dr. Arturo López",
    category: "Medical",
    description: {
      es: "Un cirujano plástico que requería una landing page efectiva para destacar sus servicios de rejuvenecimiento facial, como rellenos y otros tratamientos antienvejecimiento. El diseño se enfocó en ser breve pero impactante, equilibrando simplicidad y elegancia con un video y un mensaje conciso con sus datos de contacto.",
      en: "A plastic surgeon who needed an effective landing page to highlight his facial rejuvenation services, such as fillers and other anti-aging treatments. The design focused on being brief yet impactful, balancing simplicity and elegance with a video and a concise message with his contact details.",
    },
    image: "/Works/dr-arturo-lopez.png",
    featured: true,
    webpage: "https://ecommetrica.com/arturo/",
    details: {
      summary: {
        es: "Un cirujano plástico que requería una landing page efectiva para destacar sus servicios de rejuvenecimiento facial, como rellenos y otros tratamientos antienvejecimiento. El diseño se enfocó en ser breve pero impactante, equilibrando simplicidad y elegancia con un video y un mensaje conciso con sus datos de contacto.",
        en: "A plastic surgeon who needed an effective landing page to highlight his facial rejuvenation services, such as fillers and other anti-aging treatments. The design focused on being brief yet impactful, balancing simplicity and elegance with a video and a concise message with his contact details.",
      },
    },
  },

  // --- Dental ---------------------------------------------------------------
  {
    slug: "bites",
    name: "Bites — Creadores de Sonrisas",
    category: "Dental",
    description: {
      es: "Es un centro de alta estética dental que necesitaba renovar su página web y optimizar su UX/UI con una imagen que reflejara el estilo distintivo de Bites. Incorporamos un calendario que permite agendar citas y realizar pagos directamente desde la página, brindando una experiencia fluida y eficiente en la que los usuarios pueden tener el control mediante una web app.",
      en: "A high-end dental aesthetics center that needed to renew its website and optimize its UX/UI with an image reflecting Bites' distinctive style. We built in a calendar that lets patients book appointments and pay directly from the page, giving users a smooth, efficient, self-service experience through a web app.",
    },
    image: "/projects/bitespage.webp",
    featured: true,
    webpage: "https://ecommetrica.com/bites",
  },
  {
    slug: "reforma-dental",
    name: "Reforma Dental",
    category: "Dental",
    description: {
      es: "Un consultorio dental familiar que buscaba posicionarse como una alternativa con servicios completos a precios competitivos en la zona céntrica. Diseñamos y desarrollamos un sitio web funcional para facilitar la programación de citas, con un diseño moderno que resalta su competitividad y variedad de servicios.",
      en: "A family dental practice looking to position itself as a full-service, competitively priced alternative downtown. We designed and built a functional website that makes booking appointments easy, with a modern design that highlights its competitiveness and range of services.",
    },
    image: "/projects/reformapage.webp",
    webpage: "https://reformadental.com",
  },
  {
    slug: "dental-reforma",
    name: "Dental Reforma",
    category: "Dental",
    description: {
      es: "Un consultorio dental familiar con más de 35 años en Tijuana que busca seguir siendo relevante y tener presencia en los motores de búsqueda. Diseñamos un sitio web para destacar sus valores, experiencia y servicios.",
      en: "A family dental practice with more than 35 years in Tijuana looking to stay relevant and gain search-engine presence. We designed a website to highlight its values, experience, and services.",
    },
    image: "/projects/dentalpage.webp",
    webpage: "https://dentalreforma.com",
  },

  // --- Medical --------------------------------------------------------------
  {
    slug: "dra-pamela-perez",
    name: "Dra. Pamela Pérez",
    category: "Medical",
    description: {
      es: "Una otorrinolaringóloga especializada en cirugía plástica nasal que buscaba un sitio web enfocado en destacar los resultados de sus pacientes y explicar cada procedimiento mediante video blogs. Desarrollamos una página de inicio reactiva y una sección de procedimientos con videos, priorizando formatos breves y fotos de su trabajo.",
      en: "An ENT specialist in nasal plastic surgery who wanted a website focused on showcasing patient results and explaining each procedure through video blogs. We built a responsive homepage and a procedures section with videos, prioritizing short formats and photos of her work.",
    },
    image: "/projects/pamelapage.webp",
    webpage: "https://doctorapamelaperez.com",
  },

  // --- Industrial -----------------------------------------------------------
  {
    slug: "carbonetics",
    name: "Carbonetics Inc.",
    category: "Industrial",
    description: {
      es: "Una tienda de accesorios y partes de fibra de carbono para autos de carrera que necesitaba optimizar su sistema de compras, disposición de productos e interfaz general. Implementamos un nuevo sistema de inventario y logística para mejorar el flujo de productos, selección y compra, además de optimizar la apariencia UI/UX de la tienda.",
      en: "A carbon-fiber accessories and parts store for race cars that needed to optimize its checkout flow, product layout, and overall interface. We implemented a new inventory and logistics system to improve product flow, selection, and checkout, alongside a UI/UX overhaul of the store.",
    },
    image: "/projects/carboneticspage.webp",
    featured: true,
    webpage: "https://carboneticsinc.com",
  },
  {
    slug: "la-cocina",
    name: "La Cocina",
    category: "Industrial",
    // TODO: ecommetrica.com has no real copy for this one — its description key
    // points at the category string, so the site literally renders "Industrias".
    // Replace with the actual case-study text.
    description: {
      es: "Proyecto de desarrollo web para La Cocina.",
      en: "Web development project for La Cocina.",
    },
    image: "/projects/cocinamxpage.webp",
    webpage: "https://lacocina.mx",
  },
  {
    slug: "wislin-farm",
    name: "Wislin Farm",
    category: "Industrial",
    description: {
      es: "Un negocio familiar que comercializa y distribuye productos lácteos y embutidos a nivel local, con la meta de llegar a diversos mercados. Desarrollamos una página de inicio que refleja la esencia y el producto de la marca, combinando imágenes de productos con una narrativa atractiva.",
      en: "A family business that markets and distributes dairy and deli products locally, aiming to reach new markets. We built a homepage that reflects the brand's essence and product, combining product photography with an engaging narrative.",
    },
    image: "/projects/wislinpage.webp",
    webpage: "https://wislinfarm.com",
  },
  {
    slug: "syl-industrial",
    name: "SYL Industrial",
    category: "Industrial",
    description: {
      es: "Un distribuidor de productos para la industria maquiladora que necesitaba una landing page para mostrar sus servicios y datos de contacto. Nos enfocamos en diseñar una página sencilla pero efectiva que presentara claramente sus servicios e información clave, integrando múltiples métodos de contacto accesibles.",
      en: "A distributor of products for the maquiladora industry that needed a landing page to showcase its services and contact information. We focused on designing a simple but effective page that clearly presents its services and key information, with multiple accessible contact methods.",
    },
    image: "/projects/sylindustrialpage.webp",
    webpage: "https://sylindustrial.com/",
  },
  {
    slug: "kamili",
    name: "Kamili",
    category: "Industrial",
    description: {
      es: "Un salón de uñas y spa que buscaba un sitio web donde los clientes pudieran agendar citas en cualquiera de sus dos sucursales y elegir servicios. Implementamos una interfaz intuitiva que permite explorar el catálogo de servicios, seleccionar tratamientos, reservar y pagar, asegurando una experiencia eficiente y fluida.",
      en: "A nail salon and spa that wanted a website where clients could book appointments at either of its two locations and choose services. We implemented an intuitive interface to browse the service catalog, select treatments, book, and pay, ensuring an efficient, smooth experience.",
    },
    image: "/projects/kamilipage.webp",
    webpage: "https://kamili.com",
  },
  {
    slug: "condor-vision",
    name: "The Condor Vision",
    category: "Industrial",
    description: {
      es: "Una agencia de viajes inmersivos en drones que buscaba un sitio web que resaltara la experiencia de vuelo. Diseñamos una página en la que la landing page está dominada por un video inmersivo en alta calidad, transportando al usuario. Además, integramos secciones con más videos y fotos inmersivas que refuerzan la narrativa visual de la marca.",
      en: "An immersive drone-travel agency that wanted a website highlighting the flight experience. We designed a page dominated by a high-quality immersive video that transports the visitor, plus additional sections of immersive videos and photos that reinforce the brand's visual narrative.",
    },
    image: "/projects/condorpage.webp",
    webpage: "https://ecommetrica.com/condor/",
  },

  // --- Consulting -----------------------------------------------------------
  {
    slug: "gpe-consultores",
    name: "GPE Consultores",
    category: "Consulting",
    description: {
      es: "Una firma de consultoría legal y contable que buscaba posicionarse y diferenciarse del sector con un sitio web moderno, además de mejorar la gestión de correos corporativos. Desarrollamos un sitio innovador y funcional optimizado para el posicionamiento, además de una web app que centraliza la gestión y cantidad de correos e información, mejorando la eficiencia general.",
      en: "A legal and accounting consultancy that wanted to stand out from the sector with a modern website, plus improved corporate email management. We built an innovative, functional, SEO-optimized site along with a web app that centralizes email and information management, improving overall efficiency.",
    },
    image: "/projects/gpepage.webp",
    featured: true,
    webpage: "https://gpeconsultores.com.mx",
  },
  {
    slug: "syl-talento",
    name: "SYL Talento",
    category: "Consulting",
    description: {
      es: "Una agencia de reclutamiento que necesitaba un sitio web para informar sobre sus servicios, contar con su propia bolsa de trabajo y una web app para empleados. Creamos un sitio optimizado para una experiencia de navegación intuitiva, permitiendo explorar valores, servicios y blogs de la agencia. Además, implementamos una bolsa de trabajo funcional donde los candidatos pueden aplicar directamente a vacantes y desarrollamos una web app para la gestión interna de correos y administración de datos relacionados con vacantes.",
      en: "A recruitment agency that needed a website to communicate its services, run its own job board, and give employees a web app. We built a site optimized for intuitive navigation, letting visitors explore the agency's values, services, and blog. We also implemented a functional job board where candidates can apply directly to openings, and a web app for internal email management and job-related data administration.",
    },
    image: "/projects/sylpage.webp",
    webpage: "https://syltalento.com",
  },
  {
    slug: "e-commetrics",
    name: "e-commetrics",
    category: "Consulting",
    description: {
      es: "Plataforma de análisis y métricas para e-commerce que buscaba un sitio web optimizado y profesional para destacar sus servicios y capacidades.",
      en: "An e-commerce analytics and metrics platform that wanted an optimized, professional website to showcase its services and capabilities.",
    },
    image: "/projects/eommetrica.webp",
    webpage: "https://e-commetrics.com",
  },

  // --- Commerce -------------------------------------------------------------
  {
    slug: "border-grower",
    name: "Border Grower",
    category: "Commerce",
    description: {
      es: "Un distribuidor comercial en el sector agrícola que necesitaba un sitio web optimizado para ampliar su alcance y mejorar la oferta de servicios.",
      en: "A commercial distributor in the agricultural sector that needed an optimized website to expand its reach and improve its service offering.",
    },
    image: "/projects/borderpage.webp",
    webpage: "https://bordergrower.com",
  },
  {
    slug: "chik",
    name: "Chik",
    category: "Commerce",
    description: {
      es: "Un distribuidor de productos de belleza que quería modernizar y fortalecer su tienda en Shopify. Realizamos un rebranding, reestructuramos la tienda, optimizamos la distribución y presentación de productos, asegurando una navegación intuitiva y coherente. Enfocarnos en la cohesión del mensaje visual y verbal nos permitió crear una tienda atractiva.",
      en: "A beauty-products distributor that wanted to modernize and strengthen its Shopify store. We ran a rebrand, restructured the store, and optimized product layout and presentation for intuitive, coherent navigation. Focusing on visual and verbal message cohesion let us build an appealing store.",
    },
    image: "/projects/chikpage.webp",
    featured: true,
    webpage: "https://chik.mx",
  },
  {
    slug: "la-bodega-solar",
    name: "La Bodega Solar",
    category: "Commerce",
    description: {
      es: "Un distribuidor de productos solares que necesitaba un sitio web para mejorar su alcance en el mercado y la relación con los clientes.",
      en: "A solar-products distributor that needed a website to improve its market reach and customer relationships.",
    },
    image: "/projects/bodegapage.webp",
    webpage: "https://labodegasolar.com",
  },
  {
    slug: "ziggiz",
    name: "Ziggiz",
    category: "Commerce",
    description: {
      es: "Una marca de papel para fumar que buscaba una tienda en línea simple y directa para los compradores. Desarrollamos una tienda en Shopify con un diseño limpio y navegación intuitiva, permitiendo que los clientes comprendan el mensaje y asegurando una experiencia de compra rápida y eficiente.",
      en: "A rolling-paper brand that wanted a simple, straightforward online store for shoppers. We built a Shopify store with a clean design and intuitive navigation, making the brand message clear and ensuring a fast, efficient shopping experience.",
    },
    image: "/projects/ziggizpage.webp",
    webpage: "https://ziggiz.world",
  },

  // --- Other ----------------------------------------------------------------
  {
    slug: "central-toreo",
    name: "Central Toreo",
    category: "Other",
    description: {
      es: "Oficinas del sector administrativo y médico que querían mejorar su landing page con un diseño más moderno y navegación fluida. La nueva página se enfocó en mejorar la experiencia del usuario con una navegación más fluida, un diseño más atractivo y una estructura optimizada para resaltar la oferta y mensaje. Además, integramos herramientas para facilitar el contacto y centralizar la gestión de correos.",
      en: "Administrative and medical-sector offices that wanted a more modern landing page with smoother navigation. The new page focused on improving the user experience with smoother navigation, a more appealing design, and a structure optimized to highlight the offering and message. We also integrated tools to make contact easier and centralize email management.",
    },
    image: "/projects/centraltoreopage.webp",
    webpage: "https://centraltoreo.com",
  },
  {
    slug: "proyecto-tijuana",
    name: "Proyecto Tijuana",
    category: "Other",
    description: {
      es: "Un proyecto comunitario que busca promover iniciativas sociales y el desarrollo cultural en Tijuana, requiriendo una presencia en línea funcional y atractiva.",
      en: "A community project promoting social initiatives and cultural development in Tijuana, requiring a functional, appealing online presence.",
    },
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

/**
 * The video for a project: its own showcase clip if it has one, otherwise the
 * client testimonial. Single source of truth for the hover preview on the home
 * page and the "Ver video" button on /work/[slug] — both fall back to the
 * testimonial so adding a `video` to a project upgrades both in one place.
 */
export function getProjectVideo(project: CaseStudy): string | undefined {
  return project.video ?? project.testimonial?.video;
}

export function hasTestimonial(
  project: CaseStudy,
): project is CaseStudy & { testimonial: Testimonial } {
  return Boolean(project.testimonial);
}

export function getTestimonialCaseStudies() {
  return caseStudies.filter(hasTestimonial);
}
