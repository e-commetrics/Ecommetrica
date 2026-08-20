import type { Lang, Localized } from "@/lib/i18n/types";

/** One long-form editorial block on the case-study page — "Briefing", "Antes y después",
 *  "Branding", etc. Optional per project: only projects with copy for it render it. */
export type CaseStudySection = {
  heading: Localized;
  paragraphs: Localized[];
  /** Large bolded pull quote, shown between the paragraphs and the images. */
  pullQuote?: Localized;
  /** Closes out the section. One image renders full-bleed; two or more render as a grid
   *  (before/after, brand elements, screens produced — same field, just more entries).
   *  `label` is a short hover badge (e.g. "Antes"/"Después"); grid images only.
   *  `hoverSrc` crossfades in on hover — e.g. scrolling further down one continuous page. */
  images?: { src: string; alt?: Localized; label?: Localized; hoverSrc?: string; hoverAlt?: Localized }[];
  /** Crop for `images` grid cells. Defaults to "4/3" — use "square" for photo/post
   *  galleries where a landscape crop would butcher portrait-oriented sources. */
  imagesAspect?: "4/3" | "square";
  /** Columns for the `images` grid at `sm:` and up. Defaults to 2. */
  imagesCols?: 2 | 3;
  /** Two-column before/after, each side stacking its own images at their natural
   *  aspect ratio (unlike `images`, nothing is cropped) — for mismatched-ratio assets
   *  like an old logo next to a full brand board. `width`/`height` are the PNG's own
   *  intrinsic pixels, so next/image can size it without distorting it. */
  beforeAfter?: {
    before: { src: string; width: number; height: number; alt?: Localized }[];
    after: { src: string; width: number; height: number; alt?: Localized }[];
  };
  /** Full-bleed autoplaying video closing out the section — content produced for the
   *  client (a reel, an explainer), not a testimonial. Takes priority over `images`. */
  video?: string;
};

export type CaseStudyDetails = {
  client?: string;
  year?: string;
  /** Shown as pills in the hero. */
  services?: Localized[];
  /** Short single-paragraph summary — also the meta description. Falls back to `description`. */
  summary?: Localized;
  /** Full briefing copy, one entry per paragraph. Falls back to `[summary]`. */
  briefingParagraphs?: Localized[];
  /** Big pitch headline in the hero (e.g. "TIAKI: creando una marca para..."). Falls back to `name`. */
  headline?: Localized;
  /** Hero background, the client's own brand color (e.g. "#f5d6d6"). Unset renders no tint. */
  accent?: string;
  /** Full-bleed cover photo shown after the briefing. Falls back to the card's `image`. */
  heroImage?: string;
  heroImageAlt?: Localized;
  /** Skips the cover photo entirely, ignoring both `heroImage` and the card's `image`. */
  hideCoverImage?: boolean;
  /** Long-form editorial sections, in display order. */
  sections?: CaseStudySection[];
  results?: Localized[];
  gallery?: string[];
  /** SEO `<title>` tag. Falls back to `name` when unset. */
  metaTitle?: Localized;
  /** SEO meta description. Falls back to `summary`/`description` when unset. */
  metaDescription?: Localized;
  /** SEO keywords, one list per language. Falls back to the generic work-page list when unset. */
  keywords?: { es: string[]; en: string[] };
};

/**
 * A filmed client testimonial. Top-level, not inside `details`, since it drives the
 * project-page player, the /work filter, and the home hover preview fallback. `quote`
 * is a pull quote for the video, not a substitute — leave unset rather than paraphrase.
 */
export type Testimonial = {
  /** Lives in public/videos, which is gitignored (see .gitignore). */
  video: string;
  /** Display width/height, declared not measured, so the frame is right-shaped on first paint. */
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
  /** alt/title for `image` on the homepage card. Falls back to `name` when unset. */
  imageAlt?: Localized;
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
 * Entries below the first four were pulled from ecommetrica.com's portfolio section.
 * `featured: true` puts an entry on the home page (in array order) — the eight flagged cover all five categories rather than being the eight "best".
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "dr-lumban",
    name: "Dr. Lumbán",
    category: "Medical",
    description: {
      es: "El otorrinolaringólogo Jaime Lumbán, con más de 33 años de trayectoria en Tijuana, buscaba actualizar su página web a una plataforma moderna, ágil y segura, diseñada para reafirmar su posición como un referente de vanguardia en la región.",
      en: "ENT specialist Jaime Lumbán, with more than 33 years of experience in Tijuana, wanted to update his website to a modern, agile, and secure platform designed to reaffirm his position as a leading reference in the region.",
    },
    image:
      "/Works/Ecommetrica%20modernizo%20y%20optimizo%20la%20pagina%20web%20y%20branding%20del%20dr%20Jaime%20Lumban.png",
    imageAlt: {
      es: "Ecommetrica optimizo toda la estructura del sitio web del dr lumban por algo mas eficiente y moderno",
      en: "Ecommetrica optimized Dr. Lumbán's entire website structure into something more efficient and modern",
    },
    featured: true,
    webpage: "https://drlumban.com/",
    details: {
      hideCoverImage: true,
      metaTitle: {
        es: "Rebranding y diseño web para Dr. Lumbán por ecommetrica",
        en: "Rebranding and Web Design for Dr. Lumbán by Ecommetrica",
      },
      metaDescription: {
        es: "Compartimos el proceso de rebranding, diseño web y redes para un reconocido otorrinolaringólogo en Tijuana con más de 33 años de experiencia.",
        en: "We share the rebranding, web design, and social media process for a well-known ENT specialist in Tijuana with more than 33 years of experience.",
      },
      keywords: {
        es: ["Rebranding y diseño web", "Página web", "Diseño y producción para redes sociales"],
        en: ["Rebranding and web design", "Website", "Social media design and production"],
      },
      headline: {
        es: "Dr. Jaime Lumbán: Otorrinolaringólogo con más de 33 años de experiencia buscaba renovar su presencia digital.",
        en: "Dr. Jaime Lumbán: an ENT specialist with more than 33 years of experience looking to renew his digital presence.",
      },
      services: [
        { es: "Rebranding", en: "Rebranding" },
        { es: "Diseño web", en: "Web design" },
        { es: "Diseño y producción para redes sociales", en: "Social media design & production" },
      ],
      summary: {
        es: "Especialista en rinoplastia y otorrinolaringología, el Dr. Jaime Lumbán destaca por sus más de 33 años de trayectoria y la preferencia de sus pacientes.",
        en: "A specialist in rhinoplasty and otolaryngology, Dr. Jaime Lumbán stands out for his more than 33 years of experience and his patients' loyalty.",
      },
      briefingParagraphs: [
        {
          es: "Especialista en rinoplastia y otorrinolaringología, el Dr. Jaime Lumbán destaca por sus más de 33 años de trayectoria y la preferencia de sus pacientes.",
          en: "A specialist in rhinoplasty and otolaryngology, Dr. Jaime Lumbán stands out for his more than 33 years of experience and his patients' loyalty.",
        },
        {
          es: "Buscaba ser la mejor versión de sí mismo para competir y posicionarse con otros otorrinolaringólogos.",
          en: "He wanted to become the best version of himself to compete and position himself among other ENT specialists.",
        },
        {
          es: "Proyectar una imagen de vanguardia y trayectoria.",
          en: "Project an image of innovation and experience.",
        },
        {
          es: "Unificar su imagen, consultorio, sitio web y redes sociales para lograr armonía y situarse como un mayor referente.",
          en: "Unify his image, practice, website, and social media to achieve harmony and position himself as a leading reference.",
        },
      ],
      sections: [
        {
          heading: { es: "Antes y después", en: "Before and after" },
          paragraphs: [],
          images: [
            {
              src: "/projects/lumban/Captura%20del%20homepage%20de%20la%20antigua%20pagina%20del%20dr%20lumban%20antes%20de%20cambios%20de%20ecommetrica.webp",
              alt: {
                es: "Captura del homepage anterior del Dr. Jaime Lumbán antes del diseño web y rebranding",
                en: "Screenshot of Dr. Jaime Lumbán's previous homepage before the web design and rebranding",
              },
              label: { es: "Antes", en: "Before" },
            },
            {
              src: "/projects/lumban/after.webp",
              alt: {
                es: "Después: nuevo sitio web del Dr. Jaime Lumbán",
                en: "After: Dr. Jaime Lumbán's new website",
              },
              label: { es: "Después", en: "After" },
            },
          ],
        },
        {
          heading: {
            es: "Antes y después: página de perfil",
            en: "Before and after: profile page",
          },
          paragraphs: [],
          images: [
            {
              src: "/projects/lumban/Captura%20de%20pagina%20acerca%20del%20dr%20lumban%20antes%20de%20diseno%20web%20de%20ecommetrica.webp",
              alt: {
                es: "Captura de página acerca de del Dr. Jaime Lumbán previo al branding y diseño web elaborado por ecommetrica",
                en: "Screenshot of Dr. Jaime Lumbán's about page before the branding and web design work by Ecommetrica",
              },
              label: { es: "Antes", en: "Before" },
            },
            {
              src: "/projects/lumban/after-profile1.webp",
              hoverSrc: "/projects/lumban/after-profile2.webp",
              alt: {
                es: "Después: nueva página de perfil del Dr. Jaime Lumbán",
                en: "After: Dr. Jaime Lumbán's new profile page",
              },
              hoverAlt: {
                es: "La nueva página de perfil continúa con más contenido al hacer scroll",
                en: "The new profile page continues with more content further down",
              },
              label: { es: "Después", en: "After" },
            },
          ],
        },
        {
          heading: {
            es: "Antes y después: branding",
            en: "Before and after: branding",
          },
          paragraphs: [],
          beforeAfter: {
            before: [
              {
                src: "/projects/lumban/before-branding.webp",
                width: 583,
                height: 446,
                alt: {
                  es: "Antes: logotipo anterior del Dr. Jaime Lumbán",
                  en: "Before: Dr. Jaime Lumbán's previous logo",
                },
              },
              {
                src: "/projects/lumban/before-branding2.webp",
                width: 1225,
                height: 913,
                alt: {
                  es: "Antes: paleta de colores anterior",
                  en: "Before: previous color palette",
                },
              },
            ],
            after: [
              {
                src: "/projects/lumban/after-branding.webp",
                width: 489,
                height: 906,
                alt: {
                  es: "Después: brand board completo del Dr. Jaime Lumbán — logotipo, logo secundario, tipografías y paleta de colores",
                  en: "After: Dr. Jaime Lumbán's full brand board — logo, secondary logo, typefaces, and color palette",
                },
              },
            ],
          },
        },
        {
          heading: { es: "Sesión de fotos", en: "Photo session" },
          paragraphs: [],
          imagesAspect: "square",
          imagesCols: 3,
          images: [
            {
              src: "/projects/lumban/sesion-fotos/Retrato%20del%20dr%20lumb%C3%A1n%20en%20su%20oficina%20por%20el%20equipo%20ecommetrica.webp",
              alt: {
                es: "Retrato del Dr. Lumbán en su oficina en Rio Medica por el equipo de ecommetrica",
                en: "Portrait of Dr. Lumbán in his office at Rio Medica by the Ecommetrica team",
              },
            },
            {
              src: "/projects/lumban/sesion-fotos/Foto%20a%20detalle%20de%20endoscopio%20de%20oido%20maniobrado%20por%20el%20dr%20lumban%20por%20ecommetrica.webp",
              alt: {
                es: "Fotografia a detalle por Ecommetrica del otorrinolaringólogo Jaime Lumbán maniobrando un endoscopio de oído",
                en: "Detail photo by Ecommetrica of ENT specialist Jaime Lumbán operating an ear endoscope",
              },
            },
            {
              src: "/projects/lumban/sesion-fotos/Foto%20detalle%20de%20asiento%20de%20consultorio%20del%20dr%20lumban%20por%20ecommetrica.webp",
              alt: {
                es: "Fotografia a detalle tomada por el equipo ecommetrica en el consultorio del Dr. Jaime Lumbán",
                en: "Detail photo taken by the Ecommetrica team in Dr. Jaime Lumbán's practice",
              },
            },
          ],
        },
        {
          heading: { es: "Posts", en: "Posts" },
          paragraphs: [],
          imagesAspect: "square",
          imagesCols: 3,
          images: [
            {
              src: "/projects/lumban/POSTS/Diseno%20de%20post%20para%20redes%20sociales%20por%20ecommetrica%20para%20el%20dr%20lumban.webp",
              alt: {
                es: "Diseno de post para redes sociales por ecommetrica para el dr lumban con rebranding",
                en: "Social media post design by Ecommetrica for Dr. Lumbán, featuring the rebrand",
              },
            },
            {
              src: "/projects/lumban/POSTS/Diseno%20de%20contenido%20para%20redes%20sociales%20desarrollado%20por%20Ecommetrica%20para%20el%20dr%20lumban.webp",
              alt: {
                es: "Diseño carrusel de contenido para redes sociales desarrollado por Ecommetrica para el Dr. Lumbán.",
                en: "Social media carousel content design developed by Ecommetrica for Dr. Lumbán.",
              },
            },
            {
              src: "/projects/lumban/POSTS/Publicacion%20para%20redes%20sociales%20creada%20por%20ecommetrica%20para%20el%20Dr%20Lumb%C3%A1n.webp",
              alt: {
                es: "Diseño de publicación para redes sociales creada por Ecommetrica para el Dr. Lumbán.",
                en: "Social media post design created by Ecommetrica for Dr. Lumbán.",
              },
            },
            {
              src: "/projects/lumban/POSTS/propuesta%20grafica%20para%20las%20redes%20sociales%20del%20Dr.%20lumban%2C%20por%20ecommetrica.webp",
              alt: {
                es: "Propuesta gráfica acerca de rinoplastias para las redes sociales del Dr. Lumbán, por Ecommetrica.",
                en: "Graphic proposal about rhinoplasty for Dr. Lumbán's social media, by Ecommetrica.",
              },
            },
            {
              src: "/projects/lumban/POSTS/Diseno%20de%20post%20acerca%20de%20rinoplastia%20de%20revision%20para%20redes%20sociales%20del%20dr%20lumban.webp",
              alt: {
                es: "Propuesta de post acerca de rioplastia de revision para redes sociales del Dr. Jaime Lumbán",
                en: "Proposed social media post about revision rhinoplasty for Dr. Jaime Lumbán",
              },
            },
            {
              src: "/projects/lumban/POSTS/Publicacion%20para%20redes%20sociales%20del%20dr%20lumban%20con%20nuevo%20rebranding.webp",
              alt: {
                es: "Publicacion para redes sociales diseñada por ecommetrica para el otorrinolaringólogo Jaime Lumbán",
                en: "Social media post designed by Ecommetrica for ENT specialist Jaime Lumbán",
              },
            },
          ],
        },
      ],
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
    image:
      "/Works/Ecommetrica%20realizo%20la%20pagina%20del%20dr%20ricardo%20monge%20asi%20como%20calendario%20de%20citas.png",
    imageAlt: {
      es: "Ecommetrica creo una pagina web robusta con calendario interno para el dr ricardo monge",
      en: "Ecommetrica built a robust website with an internal booking calendar for Dr. Ricardo Monge",
    },
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
      hideCoverImage: true,
      metaTitle: {
        es: "Diseño y desarrollo web + calendario de citas | Dr. Ricardo Monge",
        en: "Web Design & Development + Appointment Calendar | Dr. Ricardo Monge",
      },
      metaDescription: {
        es: "Te compartimos el proceso de optimización de la página web del traumatólogo Ricardo Monge y el desarrollo de una web app de citas para pacientes.",
        en: "We share the optimization process for orthopedic traumatologist Ricardo Monge's website and the development of a patient appointment-booking web app.",
      },
      keywords: {
        es: ["diseño web", "Página web", "Web App", "Redes sociales"],
        en: ["web design", "Website", "Web App", "Social media"],
      },
      services: [
        { es: "Web webapp", en: "Web webapp" },
        { es: "Redes sociales", en: "Social media" },
        { es: "Posicionamiento", en: "SEO positioning" },
      ],
      summary: {
        es: "Dr Ricardo Monge: Traumatólogo en Tijuana que buscaba elevar su marca personal y posicionamiento enfocada en la experiencia del paciente. Una página web intuitiva y accesible que facilitara la reserva directa de citas y centralizara recursos educativos como guías descargables, artículos y contenido educativo para sus redes sociales.",
        en: "Dr. Ricardo Monge: an orthopedic traumatologist in Tijuana looking to elevate his personal brand and positioning with a focus on patient experience. An intuitive, accessible website that made booking appointments directly easy and centralized educational resources — downloadable guides, articles, and educational content for his social media.",
      },
      sections: [
        {
          heading: { es: "Antes y después", en: "Before and after" },
          paragraphs: [],
          images: [
            {
              src: "/projects/monge/Homepage%20antigua%20del%20dr%20ricardo%20monge.webp",
              alt: {
                es: "Antigua homepage sencilla del Dr. Ricardo Monge",
                en: "Dr. Ricardo Monge's previous, simple homepage",
              },
              label: { es: "Antes", en: "Before" },
            },
            {
              src: "/projects/monge/Nueva%20pagina%20de%20ricardo%20monge%20traumatologo%20en%20tijuana%20por%20ecommetrica.webp",
              alt: {
                es: "Nueva homepage optimizada por Ecommetrica para el Dr. Ricardo Monge traumatólogo en Tijuana",
                en: "New homepage optimized by Ecommetrica for Dr. Ricardo Monge, orthopedic traumatologist in Tijuana",
              },
              label: { es: "Después", en: "After" },
            },
          ],
        },
        {
          heading: { es: "Guías para pacientes", en: "Patient guides" },
          paragraphs: [
            {
              es: "El Dr. Monge nos compartió 5 guías descargables, con las que sus pacientes pueden prepararse antes de una consulta:",
              en: "Dr. Monge shared 5 downloadable guides so his patients can prepare before a consultation:",
            },
            {
              es: "Guía postoperatoria de Reemplazo total de rodilla",
              en: "Total knee replacement post-op guide",
            },
            {
              es: "Guía postoperatoria de artroscopia de rodilla",
              en: "Knee arthroscopy post-op guide",
            },
            {
              es: "Preparación para tu intervención quirúrgica",
              en: "Preparing for your surgery",
            },
            {
              es: "Guía postoperatoria de Reemplazo total de cadera",
              en: "Total hip replacement post-op guide",
            },
            {
              es: "Recomendaciones para una columna sana",
              en: "Recommendations for a healthy spine",
            },
          ],
          images: [
            {
              src: "/projects/monge/guias/page.webp",
              alt: {
                es: "Sección de guías para descargar en el sitio del Dr. Ricardo Monge",
                en: "Downloadable guides section on Dr. Ricardo Monge's website",
              },
            },
            {
              src: "/projects/monge/guias/Recomendaciones%20para%20columna%20sana%20guia%20descargable%20acessible%20a%20la%20pagina%20web%20de%20ricardo%20monge.webp",
              alt: {
                es: "Documento desgargable elaborado por Ecommetrica sobre recomendaciones para una columna sana de fácil acceso y descarga en la página web del Dr. Ricardo Monge",
                en: "Downloadable document by Ecommetrica with recommendations for a healthy spine, easy to access and download from Dr. Ricardo Monge's website",
              },
            },
          ],
        },
        {
          heading: { es: "Contenido educativo", en: "Educational content" },
          paragraphs: [
            {
              es: "Video educativo para redes sociales: dormir mal afecta huesos y músculos.",
              en: "Educational social media video: sleeping poorly affects your bones and muscles.",
            },
          ],
          video: "/videos/dormir%20mal%20afecta%20huesos%20y%20musculos_1.webm",
        },
        {
          heading: { es: "Agenda tu cita", en: "Book your appointment" },
          paragraphs: [
            {
              es: "Desarrollamos una webapp interna para que los pacientes agenden citas directamente en el consultorio del Dr. Monge.",
              en: "We built an internal webapp so patients can book appointments directly at Dr. Monge's practice.",
            },
          ],
          images: [
            {
              src: "/projects/monge/cita/Vista%20de%20calendario%20interno%20del%20dr%20ricardo%20monge%20por%20ecommetrica.webp",
              alt: {
                es: "Vista de llenado de formulario para agendar cita con el Dr. Ricardo Monge elaborado por Ecommetrica",
                en: "Appointment-booking form view for Dr. Ricardo Monge, built by Ecommetrica",
              },
            },
            {
              src: "/projects/monge/cita/Seleccion%20de%20horario%20y%20fecha%20en%20calendario%20para%20reservas%20con%20el%20dr%20ricardo%20monge%20por%20ecommetrica.webp",
              alt: {
                es: "Vista de selección de fecha y hora para pacientes desde la Página web de Ricardo Monge, creado por Ecommetrica",
                en: "Date and time selection view for patients on Ricardo Monge's website, built by Ecommetrica",
              },
            },
          ],
        },
      ],
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
    image:
      "/Works/Ecommetrica%20realizo%20la%20pagina%20y%20branding%20de%20la%20ginecologa%20Cesia%20Borjon.png",
    imageAlt: {
      es: "ecommetrica creo una pagina web extensa y branding unico para la dra. Cesia ginecóloga en Tijuana",
      en: "Ecommetrica built an extensive website and unique branding for Dr. Cesia, an OB/GYN in Tijuana",
    },
    featured: true,
    webpage: "https://cesiaborjon.com/",
    testimonial: {
      video: "/videos/cesia-borjon-testimonial.webm",
      aspect: 9 / 16,
      author: "Dra. Cesia Borjon",
      role: { es: "Ginecóloga-obstetra", en: "OB/GYN" },
    },
    details: {
      hideCoverImage: true,
      metaTitle: {
        es: "Branding y diseño web único para Cesia Borjón por Ecommetrica",
        en: "Unique Branding & Web Design for Cesia Borjón by Ecommetrica",
      },
      metaDescription: {
        es: "Conoce el proceso de crear una nueva identidad visual y página web para una especialista en Tijuana como lo es Cesia Borjón ginecóloga obstetra.",
        en: "Discover the process behind creating a new visual identity and website for a Tijuana specialist: OB/GYN Cesia Borjón.",
      },
      keywords: {
        es: ["Branding y diseño web", "Página web", "Logotipo"],
        en: ["Branding and web design", "Website", "Logo"],
      },
      headline: {
        es: "Dra. Cesia Borjón: Ginecóloga obstetra buscaba crear su marca personal en Tijuana.",
        en: "Dr. Cesia Borjón: an OB/GYN looking to build her personal brand in Tijuana.",
      },
      services: [
        { es: "Branding", en: "Branding" },
        { es: "Branding y diseño web", en: "Branding & web design" },
        { es: "Logotipo", en: "Logo" },
      ],
      summary: {
        es: "Originaria de Hermosillo Sonora, la Dra. Cesia Borjón buscaba dar el siguiente paso a consolidar su marca personal en Tijuana. El proyecto consistió en construir su identidad visual desde cero diseñando un logotipo único y distintivo y desarrollar una página web robusta, informativa y atractiva, pensada para ofrecer la mejor experiencia a sus pacientes.",
        en: "Originally from Hermosillo, Sonora, Dr. Cesia Borjón wanted to take the next step in consolidating her personal brand in Tijuana. The project involved building her visual identity from scratch — designing a unique, distinctive logo — and developing a robust, informative, and appealing website designed to give her patients the best possible experience.",
      },
      sections: [
        {
          heading: { es: "Assets de marca", en: "Brand assets" },
          paragraphs: [],
          imagesCols: 3,
          images: [
            {
              src: "/projects/cesia/assets/Recetario%20disenado%20para%20la%20dra%20Cesia%20Borjon%20por%20ecommetrica.webp",
              alt: {
                es: "Recetario con nuevo branding de la Dra. Cesia Borjón elaborado por Ecommetrica",
                en: "Prescription pad with Dr. Cesia Borjón's new branding, designed by Ecommetrica",
              },
            },
            {
              src: "/projects/cesia/assets/Tarjeta%20de%20presentacion%20para%20la%20dra%20cesia%20borjon%20por%20ecommetrica.webp",
              alt: {
                es: "Diseño de tarjeta de presentación para la ginecóloga Cesia Borjón elaborado por Ecommetrica",
                en: "Business card design for OB/GYN Cesia Borjón, made by Ecommetrica",
              },
            },
            {
              src: "/projects/cesia/assets/Logo%20en%20blanco%20de%20cesia%20brojon%20ginecologa%20en%20tijuana%20por%20ecommetrica.webp",
              alt: {
                es: "Logo principal en color blanco para Cesia Borjón ginecóloga en Tijuana, elaborado por ecommetrica",
                en: "Main logo in white for OB/GYN Cesia Borjón in Tijuana, designed by Ecommetrica",
              },
            },
          ],
        },
        {
          heading: { es: "Branding", en: "Branding" },
          paragraphs: [],
          imagesCols: 2,
          images: [
            {
              src: "/projects/cesia/branding/Paleta%20de%20colores%20del%20nuevo%20branding%20de%20la%20dra%20cesia%20borjon.webp",
              alt: {
                es: "Paleta primaria y secundaria de colores del nuevo branding de la Dra. Cesia Borjón por Ecommetrica",
                en: "Primary and secondary color palette for Dr. Cesia Borjón's new branding by Ecommetrica",
              },
            },
            {
              src: "/projects/cesia/branding/tipografia.webp",
              alt: {
                es: "Tipografías de marca de la Dra. Cesia Borjón",
                en: "Dr. Cesia Borjón's brand typefaces",
              },
            },
            {
              src: "/projects/cesia/branding/feed.webp",
              alt: {
                es: "Plantillas de feed para redes sociales de la Dra. Cesia Borjón",
                en: "Social media feed templates for Dr. Cesia Borjón",
              },
            },
            {
              src: "/projects/cesia/branding/propuesta%20de%20diseno%20para%20redes%20sociales%20de%20la%20dra%20cesia%20por%20ecommetrica.webp",
              alt: {
                es: "Propuesta de diseño para stories en redes sociales para la Dra. Cesia Borjón por Ecommetrica",
                en: "Social media story design proposal for Dr. Cesia Borjón by Ecommetrica",
              },
            },
          ],
        },
        {
          heading: { es: "Consultorio", en: "Practice" },
          paragraphs: [
            {
              es: "Sesión de fotos realizada desde cero en el consultorio de la Dra. Cesia Borjón.",
              en: "A photo session shot from scratch at Dr. Cesia Borjón's practice.",
            },
          ],
          imagesCols: 3,
          images: [
            {
              src: "/projects/cesia/consultorio/52.webp",
              alt: {
                es: "Consultorio de la Dra. Cesia Borjón — pared con arte enmarcado",
                en: "Dr. Cesia Borjón's practice — wall with framed art",
              },
            },
            {
              src: "/projects/cesia/consultorio/53.webp",
              alt: {
                es: "Consultorio de la Dra. Cesia Borjón",
                en: "Dr. Cesia Borjón's practice",
              },
            },
            {
              src: "/projects/cesia/consultorio/fotografia%20de%20consultorio%20ginecologico%20de%20la%20dra%20cesia%20borjon%20por%20ecommetrica.webp",
              alt: {
                es: "Fotografia de consultorio ginecológico en tijuana tomada por Ecommetrica",
                en: "Photo of the OB/GYN practice in Tijuana, taken by Ecommetrica",
              },
            },
            {
              src: "/projects/cesia/consultorio/58.webp",
              alt: {
                es: "Consultorio de la Dra. Cesia Borjón",
                en: "Dr. Cesia Borjón's practice",
              },
            },
            {
              src: "/projects/cesia/consultorio/Retrato%20de%20la%20dra%20cesia%20borjon%20junto%20con%20una%20vacuna%20gardasil%20por%20ecommetrica.webp",
              alt: {
                es: "Retrato en consultorio con la Dra. Cesia Borjón sujetando vacuna Gardasil contra vph foto por Ecommetrica",
                en: "In-practice portrait of Dr. Cesia Borjón holding the Gardasil HPV vaccine, photo by Ecommetrica",
              },
            },
            {
              src: "/projects/cesia/consultorio/60.webp",
              alt: {
                es: "Consultorio de la Dra. Cesia Borjón",
                en: "Dr. Cesia Borjón's practice",
              },
            },
          ],
        },
      ],
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
    image: "/Works/Ecommetrica%20realizo%20el%20landing%20page%20del%20dr%20arturo%20lopez.png",
    imageAlt: {
      es: "ecommetrica creo un landing page breve y atemporal para el dr arturo lopez",
      en: "Ecommetrica created a brief, timeless landing page for Dr. Arturo López",
    },
    webpage: "/arturo",
    details: {
      summary: {
        es: "Un cirujano plástico que requería una landing page efectiva para destacar sus servicios de rejuvenecimiento facial, como rellenos y otros tratamientos antienvejecimiento. El diseño se enfocó en ser breve pero impactante, equilibrando simplicidad y elegancia con un video y un mensaje conciso con sus datos de contacto.",
        en: "A plastic surgeon who needed an effective landing page to highlight his facial rejuvenation services, such as fillers and other anti-aging treatments. The design focused on being brief yet impactful, balancing simplicity and elegance with a video and a concise message with his contact details.",
      },
    },
  },

  {
    slug: "enrique-ciapara",
    name: "Enrique Ciapara",
    category: "Other",
    description: {
      es: "Enrique Ciapara es un pintor tijuanense (n. 1972) con más de tres décadas de trayectoria, exhibido en el Centro Cultural Tijuana y el Museum of Contemporary Art San Diego. Buscaba un sitio que reuniera las distintas etapas de su obra —de sus archivos más antiguos a sus series recientes— en un solo espacio navegable, disponible en cuatro idiomas.",
      en: "Enrique Ciapara is a Tijuana-based painter (b. 1972) with more than three decades of work, exhibited at the Centro Cultural Tijuana and the Museum of Contemporary Art San Diego. He wanted a site that brought the different chapters of his work — from his earliest archives to his most recent series — into one browsable space, available in four languages.",
    },
    image: "/projects/enrique-ciapara.webp",
    imageAlt: {
      es: "Ecommetrica diseñó y desarrolló el sitio web multilingüe del pintor Enrique Ciapara en Tijuana",
      en: "Ecommetrica designed and built painter Enrique Ciapara's multilingual website in Tijuana",
    },
    featured: true,
    webpage: "https://enriqueciapara.com",
    details: {
      hideCoverImage: true,
      metaTitle: {
        es: "Portafolio web para Enrique Ciapara por Ecommetrica",
        en: "Web Portfolio for Enrique Ciapara by Ecommetrica",
      },
      metaDescription: {
        es: "Descubre el proceso de crear una página web y portafolio único. Conoce su biografía, exposiciones y las obras más destacadas de su carrera.",
        en: "Discover the process behind a unique website and portfolio. Learn about his biography, exhibitions, and the most notable works of his career.",
      },
      keywords: {
        es: ["Branding y diseño web", "Página web", "Portafolio", "Artista plástico Tijuana", "Portafolio web"],
        en: ["Branding and web design", "Website", "Portfolio", "Visual artist Tijuana", "Web portfolio"],
      },
      headline: {
        es: "Enrique Ciapara: Página web y portafolio artístico",
        en: "Enrique Ciapara: Website and Artist Portfolio",
      },
      services: [
        { es: "Branding", en: "Branding" },
        { es: "Logotipo", en: "Logo" },
        { es: "Diseño web", en: "Web design" },
        { es: "Portafolio", en: "Portfolio" },
      ],
      summary: {
        es: "Enrique Ciapara es un artista plástico basado en Tijuana. Creamos una experiencia web tipo galería. El proyecto consistió en crear un branding de línea minimalista y sobria. La plataforma permite apreciar la totalidad de su obra en alta resolución, además de presentar su trayectoria, CV y colaboraciones destacadas.",
        en: "Enrique Ciapara is a visual artist based in Tijuana. We created a gallery-style web experience. The project involved developing a minimalist, understated brand identity. The platform lets visitors appreciate the full body of his work in high resolution, alongside his career trajectory, CV, and notable collaborations.",
      },
      sections: [
        {
          heading: { es: "Branding", en: "Branding" },
          paragraphs: [],
          imagesCols: 2,
          images: [
            {
              src: "/projects/ciapara/branding.png",
              alt: {
                es: "Logotipo de Enrique Ciapara en positivo y negativo",
                en: "Enrique Ciapara's logo in reversed and standard color",
              },
            },
            {
              src: "/projects/ciapara/branding2.png",
              alt: {
                es: "Tipografías (Montserrat, Raleway, Helvetica) y paleta de colores de la marca de Enrique Ciapara",
                en: "Typefaces (Montserrat, Raleway, Helvetica) and color palette for Enrique Ciapara's brand",
              },
            },
          ],
        },
        {
          heading: { es: "Retratos", en: "Portraits" },
          paragraphs: [],
          imagesAspect: "square",
          imagesCols: 3,
          images: [
            {
              src: "/projects/ciapara/retratos/enrique_ciapara_03aa.jpg",
              alt: {
                es: "Enrique Ciapara maniobrando un sillón en su estudio en Tijuana",
                en: "Enrique Ciapara arranging a chair in his studio in Tijuana",
              },
            },
            {
              src: "/projects/ciapara/retratos/d8d0169e-d3e2-41b3-bf33-fb0acbf26d57.JPG",
              alt: {
                es: "Retrato de Enrique Ciapara junto a una de sus obras",
                en: "Portrait of Enrique Ciapara next to one of his paintings",
              },
            },
            {
              src: "/projects/ciapara/retratos/d8d0169e-d3e2-41b3-bf33-fb0acbf26d57-bw.jpg",
              alt: {
                es: "Retrato de Enrique Ciapara junto a una de sus obras, en blanco y negro",
                en: "Portrait of Enrique Ciapara next to one of his paintings, in black and white",
              },
            },
            {
              src: "/projects/ciapara/retratos/P9260255.JPG",
              alt: {
                es: "Enrique Ciapara observando una serie de piezas terminadas en su estudio",
                en: "Enrique Ciapara looking at a series of finished pieces in his studio",
              },
            },
            {
              src: "/projects/ciapara/retratos/IMG_0013.jpg",
              alt: {
                es: "Enrique Ciapara en su estudio, junto a su perro",
                en: "Enrique Ciapara in his studio, with his dog",
              },
            },
            {
              src: "/projects/ciapara/retratos/DSC_1043.JPG",
              alt: {
                es: "Enrique Ciapara en su estudio de Tijuana, 2010",
                en: "Enrique Ciapara in his Tijuana studio, 2010",
              },
            },
            {
              src: "/projects/ciapara/retratos/DSC_1044.JPG",
              alt: {
                es: "Enrique Ciapara hablando por teléfono en su estudio de Tijuana, 2010",
                en: "Enrique Ciapara on the phone in his Tijuana studio, 2010",
              },
            },
          ],
        },
        {
          heading: { es: "Fotografía", en: "Photography" },
          paragraphs: [],
          imagesCols: 3,
          images: [
            {
              src: "/projects/ciapara/fotografia/poster.jpg",
              alt: {
                es: "Cartel de la exposición 'Trompe l'oeil', obra reciente de Enrique Ciapara — Centro Cultural Tijuana, El Cubo, junio 2013",
                en: "Poster for the 'Trompe l'oeil' exhibition, recent work by Enrique Ciapara — Centro Cultural Tijuana, El Cubo, June 2013",
              },
            },
            {
              src: "/projects/ciapara/fotografia/sala.jpg",
              alt: {
                es: "Vista de sala de la exposición 'Trompe l'oeil' en El Cubo, Sala 3, CECUT",
                en: "Gallery view of the 'Trompe l'oeil' exhibition at El Cubo, Sala 3, CECUT",
              },
            },
            {
              src: "/projects/ciapara/fotografia/detalle.jpg",
              alt: {
                es: "Detalle de la exposición 'Trompe l'oeil' — pintura y collage sobre papel",
                en: "Detail from the 'Trompe l'oeil' exhibition — painting and paper collage",
              },
            },
            {
              src: "/projects/ciapara/fotografia/texto-sala.jpg",
              alt: {
                es: "Texto de agradecimientos de la exposición 'Trompe l'oeil', El Cubo, Sala 3",
                en: "Acknowledgments text from the 'Trompe l'oeil' exhibition, El Cubo, Sala 3",
              },
            },
            {
              src: "/projects/ciapara/fotografia/mural.jpg",
              alt: {
                es: "Pieza mural de la exposición 'Trompe l'oeil'",
                en: "Mural piece from the 'Trompe l'oeil' exhibition",
              },
            },
            {
              src: "/projects/ciapara/fotografia/DORMIDO.jpg",
              alt: {
                es: "Dormido, pieza de la exposición 'Trompe l'oeil'",
                en: "Dormido, piece from the 'Trompe l'oeil' exhibition",
              },
            },
            {
              src: "/projects/ciapara/fotografia/edited-photo.jpg",
              alt: {
                es: "Estudio del artista",
                en: "The artist's studio",
              },
            },
          ],
        },
      ],
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
    image:
      "/projects/Ecommetrica%20mejoro%20la%20pagina%20web%20de%20bites%20dentistas%20en%20tijuana.webp",
    imageAlt: {
      es: "Ecommetrica implemento mejoras en la pagina web de bites para hacerla más atractiva y facil de navegar",
      en: "Ecommetrica implemented improvements to the Bites website to make it more appealing and easier to navigate",
    },
    webpage: "/bites",
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
  {
    slug: "palmas-recovery",
    name: "Palmas Recovery",
    category: "Medical",
    description: {
      es: "Palmas Recovery es una casa de recuperación post-operatoria en Tijuana, elegida por cirujanos plásticos para el cuidado de sus pacientes. Necesitaban un sitio bilingüe con reservación de habitaciones integrada, pensado para pacientes que viajan a Tijuana a recuperarse después de una cirugía.",
      en: "Palmas Recovery is a post-operative recovery house in Tijuana, chosen by plastic surgeons for their patients' care. They needed a bilingual site with built-in room booking, designed for patients traveling to Tijuana to recover after surgery.",
    },
    image: "/projects/palmas.webp",
    imageAlt: {
      es: "Ecommetrica diseñó el sitio bilingüe con reservaciones de Palmas Recovery, casa de recuperación post-operatoria en Tijuana",
      en: "Ecommetrica designed the bilingual booking site for Palmas Recovery, a post-operative recovery house in Tijuana",
    },
    featured: true,
    webpage: "https://palmasrecovery.com",
    details: {
      hideCoverImage: true,
      metaTitle: {
        es: "Página web y Web app para reservas | Recovery House en Tijuana",
        en: "Website and Booking Web App | Recovery House in Tijuana",
      },
      metaDescription: {
        es: "Descubre el proceso de rebranding de Palmas Recovery House, de una página web con tour 360, reservas directas y un branding elegante.",
        en: "Discover the rebranding process for Palmas Recovery House: a website with a 360 tour, direct bookings, and an elegant new brand.",
      },
      keywords: {
        es: [
          "Branding y diseño web",
          "Página web",
          "Rebranding",
          "Diseño web",
          "redes sociales",
          "Palmas recovery",
          "casa de recuperación",
          "Cuidados postoperatorios",
        ],
        en: [
          "Branding and web design",
          "Website",
          "Rebranding",
          "Web design",
          "Social media",
          "Palmas recovery",
          "Recovery house",
          "Post-operative care",
        ],
      },
      headline: {
        es: "Palmas Recovery: Rebranding y página web elegante y web app de reservas directas",
        en: "Palmas Recovery: Rebranding, an Elegant Website, and a Direct Booking Web App",
      },
      services: [
        { es: "Rebranding", en: "Rebranding" },
        { es: "Web app", en: "Web app" },
        { es: "Diseño web", en: "Web design" },
        { es: "Logotipo", en: "Logo" },
        { es: "Redes sociales", en: "Social media" },
      ],
      summary: {
        es: "Transformamos la presencia digital de Palmas Recovery, referente en cuidados postoperatorios en Tijuana. Para reflejar el nivel de cuidado y confort de sus instalaciones, renovamos su imagen hacia un concepto más sofisticado y desarrollamos una plataforma web interactiva. Ahora, los pacientes pueden explorar la clínica mediante tours 360° y reservar su estancia directamente. En cuanto a las redes sociales, se realizó una línea editorial educativa enfocada en orientar al paciente durante su recuperación y atraer alianzas estratégicas con cirujanos y clínicas.",
        en: "We transformed Palmas Recovery's digital presence, a leading name in post-operative care in Tijuana. To reflect the level of care and comfort of its facilities, we renewed its image toward a more sophisticated concept and developed an interactive web platform. Patients can now explore the clinic through 360° tours and book their stay directly. For social media, we built an educational editorial line focused on guiding patients through their recovery and attracting strategic partnerships with surgeons and clinics.",
      },
      sections: [
        {
          heading: { es: "Antes y después", en: "Before and after" },
          paragraphs: [],
          images: [
            {
              src: "/projects/palmas/Pagina%20de%20inicio%20antigua%20de%20palmas%20recovery.png",
              alt: {
                es: "Antigua página web de Palmas recovery previo a Rebranding de Ecommetrica",
                en: "Palmas Recovery's previous website, before Ecommetrica's rebrand",
              },
              label: { es: "Antes", en: "Before" },
            },
            {
              src: "/projects/palmas/Inicio%20de%20pagina%20actual%20de%20Palmas%20recovery.png",
              alt: {
                es: "Inicio de página actual de Palmas Recovery elaborado por Ecommetrica",
                en: "Homepage of Palmas Recovery's current site, built by Ecommetrica",
              },
              label: { es: "Después", en: "After" },
            },
          ],
        },
        {
          heading: { es: "Assets de marca", en: "Brand assets" },
          paragraphs: [],
          imagesCols: 3,
          images: [
            {
              src: "/projects/palmas/branding/Logo%20principal%20con%20fondo%20verde%20disenado%20por%20ecommetrica%20para%20palmas%20recovery%20house.jpg",
              alt: {
                es: "Logo pricipal con fonde verde y letras blancas en el nuevo rebranding de Palmas por Ecommetrica",
                en: "Main logo on a green background with white lettering, part of Palmas' new rebrand by Ecommetrica",
              },
            },
            {
              src: "/projects/palmas/branding/Logo%20secundario%20de%20palmas%20recovery%20elaborado%20por%20ecommetrica.jpg",
              alt: {
                es: "Logo secundario en color crema con fondo guinda para Palmas Recovery por Ecommetrica",
                en: "Secondary logo in cream on a maroon background for Palmas Recovery, by Ecommetrica",
              },
            },
            {
              src: "/projects/palmas/branding/Logo%20secundario%20de%20silueta%20por%20ecommetrica%20elaborado%20para%20palmas%20recovery.jpg",
              alt: {
                es: "Logo secundario de silueta de mujer para Palmas recovery con fondo verde claro por Ecommetrica",
                en: "Secondary logo of a woman's silhouette for Palmas Recovery on a light green background, by Ecommetrica",
              },
            },
          ],
        },
        {
          heading: { es: "Branding", en: "Branding" },
          paragraphs: [],
          imagesCols: 2,
          images: [
            {
              src: "/projects/palmas/branding/Nueva%20paleta%20de%20colores%20para%20palmas%20recovery%20por%20ecommetrica.webp",
              alt: {
                es: "Nueva propuesta de colores para Rebranding de Palmas Recovery por Ecommetrica",
                en: "New color proposal for Palmas Recovery's rebrand by Ecommetrica",
              },
            },
            {
              src: "/projects/palmas/branding/tipografia.webp",
              alt: {
                es: "Tipografías de marca de Palmas Recovery",
                en: "Palmas Recovery's brand typefaces",
              },
            },
            {
              src: "/projects/palmas/branding/uso-de-colores.webp",
              alt: {
                es: "Uso de colores del logotipo de Palmas Recovery",
                en: "Color usage for Palmas Recovery's logo",
              },
            },
            {
              src: "/projects/palmas/branding/feed.webp",
              alt: {
                es: "Plantillas de feed para redes sociales de Palmas Recovery",
                en: "Social media feed templates for Palmas Recovery",
              },
            },
            {
              src: "/projects/palmas/branding/historia.webp",
              alt: {
                es: "Plantillas de historias para redes sociales de Palmas Recovery",
                en: "Social media story templates for Palmas Recovery",
              },
            },
          ],
        },
        {
          heading: { es: "Contenido educativo", en: "Educational content" },
          paragraphs: [
            {
              es: "Carrusel para redes sociales: qué esperar semana a semana en la recuperación de un mommy makeover.",
              en: "Social media carousel: what to expect week by week during mommy makeover recovery.",
            },
          ],
          imagesAspect: "square",
          imagesCols: 3,
          images: [
            {
              src: "/projects/palmas/mommy-makeover/cover.jpg",
              alt: {
                es: "Portada del carrusel: ¿Cómo es el proceso de recuperación de un mommy makeover?",
                en: "Carousel cover: What does a mommy makeover recovery process look like?",
              },
            },
            {
              src: "/projects/palmas/mommy-makeover/week-1.jpg",
              alt: {
                es: "Semana 1: la prioridad es sanar",
                en: "Week 1: priority #1 is healing",
              },
            },
            {
              src: "/projects/palmas/mommy-makeover/week-2.jpg",
              alt: {
                es: "Semana 2: encontrando tu ritmo",
                en: "Week 2: finding your rhythm",
              },
            },
            {
              src: "/projects/palmas/mommy-makeover/week-3.jpg",
              alt: {
                es: "Semana 3: el cambio de energía",
                en: "Week 3: the energy shift",
              },
            },
            {
              src: "/projects/palmas/mommy-makeover/week-4.jpg",
              alt: {
                es: "Semana 4: de vuelta a la (casi) normalidad",
                en: "Week 4: back to (almost) normal",
              },
            },
            {
              src: "/projects/palmas/mommy-makeover/final.jpg",
              alt: {
                es: "Cierre del carrusel: guarda este post y reserva tu estancia",
                en: "Carousel closing slide: save this post and book your stay",
              },
            },
          ],
        },
      ],
    },
  },

  // --- Industrial -----------------------------------------------------------
  {
    slug: "diaz-construction",
    name: "Diaz Construction",
    category: "Industrial",
    description: {
      es: "Diaz Construction es una constructora familiar del área de la Bahía de San Francisco, con licencia CSLB y más de 15 años de experiencia en remodelaciones, ADUs y ampliaciones. Buscaban un sitio que transmitiera la misma promesa de marca — proyectos hasta 60% más rápidos sin sacrificar calidad — con un catálogo de proyectos y una forma directa de pedir cotización.",
      en: "Diaz Construction is a family-owned contractor in the San Francisco Bay Area, CSLB-licensed with more than 15 years of experience in remodeling, ADUs, and additions. They wanted a site carrying the same brand promise — projects completed up to 60% faster without sacrificing quality — with a project showcase and a direct way to request a quote.",
    },
    image: "/projects/diaz.webp",
    imageAlt: {
      es: "Ecommetrica creó el sitio web de Diaz Construction, contratista general en el área de la Bahía de San Francisco",
      en: "Ecommetrica built the website for Diaz Construction, a general contractor in the San Francisco Bay Area",
    },
    featured: true,
    webpage: "https://diazconstructions.com",
    details: {
      hideCoverImage: true,
      metaTitle: {
        es: "Rebranding y diseño web para Diaz Construction por ecommetrica",
        en: "Rebranding and Web Design for Diaz Construction by Ecommetrica",
      },
      metaDescription: {
        es: "Proyecto enfocado en renovar su identidad visual y presencia digital de Diaz Construction empresa de contratista generales en San Francisco y la Bahía.",
        en: "A project focused on renewing the visual identity and digital presence of Diaz Construction, a general contracting company in San Francisco and the Bay Area.",
      },
      keywords: {
        es: [
          "Rebranding y diseño web",
          "Página web",
          "Diseño y producción para redes sociales",
          "Contratista",
          "Contratista general San Francisco",
        ],
        en: [
          "Rebranding and web design",
          "Website",
          "Social media design and production",
          "Contractor",
          "General contractor San Francisco",
        ],
      },
      headline: {
        es: "Diaz Construction: Contratistas generales en San Francisco buscaban renovación de identidad visual y página web.",
        en: "Diaz Construction: general contractors in San Francisco looking to renew their visual identity and website.",
      },
      services: [
        { es: "Diseño web", en: "Web design" },
        { es: "Rebranding", en: "Rebranding" },
        { es: "Logotipo", en: "Logo" },
      ],
      summary: {
        es: "Reconocido en San Francisco y el Área de la Bahía por optimizar tiempos de entrega en un 60% sin comprometer calidad ni innovación, Díaz Construction buscaba renovar su imagen integral. Transformamos su identidad visual mediante un logotipo moderno y corporativo, acompañado de un sitio web diseñado para exhibir la excelencia de su trabajo.",
        en: "Recognized across San Francisco and the Bay Area for cutting delivery times by 60% without compromising quality or innovation, Diaz Construction wanted to renew its overall image. We transformed its visual identity with a modern, corporate logo, paired with a website designed to showcase the excellence of its work.",
      },
      sections: [
        {
          heading: { es: "Antes y después: logotipo", en: "Before and after: logo" },
          paragraphs: [],
          beforeAfter: {
            before: [
              {
                src: "/projects/diaz/branding/Anterior%20logo%20de%20diaz%20construction%20antes%20de%20rebranding.png",
                width: 355,
                height: 171,
                alt: {
                  es: "Primer logo de Diaz construction antes del rebranding hecho por Ecommetrica",
                  en: "Diaz Construction's first logo, before the rebrand by Ecommetrica",
                },
              },
            ],
            after: [
              {
                src: "/projects/diaz/branding/Actual%20y%20mejorado%20logo%20de%20Diaz%20Construction%20por%20ecommetrica.png",
                width: 2698,
                height: 847,
                alt: {
                  es: "Nuevo logo de Diaz construction mas moderno y simple elaborado por Ecommetrica",
                  en: "Diaz Construction's new, more modern and simple logo, made by Ecommetrica",
                },
              },
            ],
          },
        },
        {
          heading: { es: "Antes y después", en: "Before and after" },
          paragraphs: [],
          images: [
            {
              src: "/projects/diaz/page/Anterior%20pagina%20de%20inicio%20de%20diaz%20construction.png",
              alt: {
                es: "Antigua vista de pagina de Diaz Construction antes de nuevo diseño web de Ecommetrica",
                en: "Old view of Diaz Construction's page before Ecommetrica's new web design",
              },
              label: { es: "Antes", en: "Before" },
            },
            {
              src: "/projects/diaz/page/Nueva%20pagina%20acerca%20de%20diaz%20construction%20elaborada%20por%20ecommetrica.jpg",
              alt: {
                es: "Nueva página acerca de Diaz Construction con breve historia, videos de proyectos, fotos del equipo y metodología de trabajo elaborada por Ecommetrica",
                en: "Diaz Construction's new about page with a brief history, project videos, team photos, and work methodology, built by Ecommetrica",
              },
              label: { es: "Después", en: "After" },
            },
          ],
        },
        {
          heading: { es: "Antes y después: proyectos", en: "Before and after: projects" },
          paragraphs: [],
          images: [
            {
              src: "/projects/diaz/page/Seccion%20antigua%20acerca%20de%20trabajos%20de%20diaz%20construction.png",
              alt: {
                es: "Sección antigua acerda de trabajamos de Diaz Construction antes del Rebranding de Ecommetrica",
                en: "Old \"our work\" section on Diaz Construction's site before Ecommetrica's rebrand",
              },
              label: { es: "Antes", en: "Before" },
            },
            {
              src: "/projects/diaz/page/Pagina%20nueva%20de%20proyectos%20para%20diaz%20construction%20por%20ecommetrica.png",
              alt: {
                es: "Página nueva de proyectos cib galería antes y despés costo y tiempo de realización para Ecommetrica",
                en: "New projects page with a gallery, before-and-after shots, cost, and turnaround time, by Ecommetrica",
              },
              label: { es: "Después", en: "After" },
            },
          ],
        },
        {
          heading: { es: "Antes y después: acerca de", en: "Before and after: about" },
          paragraphs: [],
          images: [
            {
              src: "/projects/diaz/page/Seccion%20de%20Homepage%20antiguo%20de%20diaz%20construction.png",
              alt: {
                es: "Seccion de homepage antiguo de Diaz Construction antes de la intervención de Ecommetrica",
                en: "Old homepage section of Diaz Construction before Ecommetrica's redesign",
              },
              label: { es: "Antes", en: "Before" },
            },
            {
              src: "/projects/diaz/page/Seccion%20acerca%20de%20para%20diaz%20construction%20por%20ecommetrica.jpg",
              alt: {
                es: "Seccion acerca como inicio Diaz Construction por Ecommetrica",
                en: "\"About\" section as it opens on Diaz Construction's site, by Ecommetrica",
              },
              label: { es: "Después", en: "After" },
            },
          ],
        },
      ],
    },
  },
  {
    slug: "carbonetics",
    name: "Carbonetics Inc.",
    category: "Industrial",
    description: {
      es: "Una tienda de accesorios y partes de fibra de carbono para autos de carrera que necesitaba optimizar su sistema de compras, disposición de productos e interfaz general. Implementamos un nuevo sistema de inventario y logística para mejorar el flujo de productos, selección y compra, además de optimizar la apariencia UI/UX de la tienda.",
      en: "A carbon-fiber accessories and parts store for race cars that needed to optimize its checkout flow, product layout, and overall interface. We implemented a new inventory and logistics system to improve product flow, selection, and checkout, alongside a UI/UX overhaul of the store.",
    },
    image: "/projects/Ecommetrica%20mejoro%20la%20tienda%20en%20linea%20de%20carbonetics.webp",
    imageAlt: {
      es: "Ecommetrica mejoro la estructura de la tienda en linea de carbonetics además de implementaciones en automatización",
      en: "Ecommetrica improved the structure of Carbonetics' online store, along with automation implementations",
    },
    webpage: "https://carboneticsinc.com",
  },
  {
    slug: "la-cocina",
    name: "La Cocina",
    category: "Industrial",
    // TODO: no real copy for this one on ecommetrica.com — replace with actual case-study text.
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
    image: "/projects/ecommetrica%20creo%20la%20pagina%20de%20GPE%20asi%20como%20un%20rebranding.webp",
    imageAlt: {
      es: "Ecommetrica realizo una pagina web unica para un despacho de abogados ademas que refresco su imagen institucional",
      en: "Ecommetrica built a unique website for a law firm and refreshed its institutional image",
    },
    featured: true,
    webpage: "https://gpeconsultores.com.mx",
    details: {
      hideCoverImage: true,
      metaTitle: {
        es: "Branding y diseño web para GPE por ecommetrica",
        en: "Branding and Web Design for GPE by Ecommetrica",
      },
      metaDescription: {
        es: "Compartimos el proceso de crear el branding, diseño web para un reconocido despacho de abogados especialistas en negocios y contabilidad en Tijuana.",
        en: "We share the process of creating the branding and web design for a well-known law firm specializing in business and accounting in Tijuana.",
      },
      keywords: {
        es: ["Branding", "Diseño web", "Logotipo", "Página web"],
        en: ["Branding", "Web design", "Logo", "Website"],
      },
      headline: {
        es: "GPE: Despacho de abogados buscaba crear una imagen institucional y comenzar su presencia digital.",
        en: "GPE: a law firm wanted to build an institutional image and begin its digital presence.",
      },
      services: [
        { es: "Branding", en: "Branding" },
        { es: "Diseño web", en: "Web design" },
        { es: "Logotipo", en: "Logo" },
        { es: "Página web", en: "Website" },
      ],
      summary: {
        es: "Grupo de Planeación Empresarial buscaba crear una identidad visual que reflejara su trayectoria, experiencia y profesionalismo con un logotipo moderno y branding minimalista. Como parte del proyecto, también se creó una página web enfocada en comunicar de manera clara y estratégica las principales áreas de especialización del despacho, incluyendo desarrollo de negocios, asuntos legales y contabilidad.",
        en: "Grupo de Planeación Empresarial wanted to build a visual identity that reflected its track record, experience, and professionalism through a modern logo and minimalist branding. As part of the project, we also built a website focused on clearly and strategically communicating the firm's main areas of specialization, including business development, legal affairs, and accounting.",
      },
      briefingParagraphs: [
        {
          es: "Grupo de Planeación Empresarial buscaba crear una identidad visual que reflejara su trayectoria, experiencia y profesionalismo con un logotipo moderno y branding minimalista. Como parte del proyecto, también se creó una página web enfocada en comunicar de manera clara y estratégica las principales áreas de especialización del despacho, incluyendo desarrollo de negocios, asuntos legales y contabilidad.",
          en: "Grupo de Planeación Empresarial wanted to build a visual identity that reflected its track record, experience, and professionalism through a modern logo and minimalist branding. As part of the project, we also built a website focused on clearly and strategically communicating the firm's main areas of specialization, including business development, legal affairs, and accounting.",
        },
      ],
      sections: [
        {
          heading: { es: "Logotipo", en: "Logo" },
          paragraphs: [],
          imagesCols: 3,
          images: [
            {
              src: "/projects/gpe/branding/logo%20en%20negro%20de%20gpe%20elaborado%20por%20ecommetrica.jpg",
              alt: {
                es: "Logo en negativo par GPE elaborado por Ecommetrica",
                en: "GPE's negative (black) logo, made by Ecommetrica",
              },
            },
            {
              src: "/projects/gpe/branding/Logo%20principal%20de%20gpe%20disenado%20por%20ecommetrica.jpg",
              alt: {
                es: "Logo principal de Grupo de Planeación Empresarial elaborado por Ecommetrica",
                en: "Main logo for Grupo de Planeación Empresarial, made by Ecommetrica",
              },
            },
            {
              src: "/projects/gpe/branding/Logo%20en%20color%20blanco%20de%20gpe%20elaborado%20por%20ecommetrica.jpg",
              alt: {
                es: "Logo en color blanco elaborado por Ecommetrica para Grupo de Planeación Empresarial",
                en: "White logo made by Ecommetrica for Grupo de Planeación Empresarial",
              },
            },
          ],
        },
        {
          heading: { es: "Manual de marca", en: "Brand manual" },
          paragraphs: [],
          images: [
            {
              src: "/projects/gpe/branding/manual-1.png",
              alt: {
                es: "Manual de marca de GPE — logotipo original vs. editado, retícula de isotipo y descripción de ajustes",
                en: "GPE's brand manual — original vs. edited logo, icon grid, and adjustment notes",
              },
            },
          ],
        },
        {
          heading: { es: "Manual de marca: paleta de color", en: "Brand manual: color palette" },
          paragraphs: [],
          images: [
            {
              src: "/projects/gpe/branding/manual-2.webp",
              alt: {
                es: "Manual de marca de GPE — slogan, paleta de color y colorimetría básica",
                en: "GPE's brand manual — slogan, color palette, and basic color usage",
              },
            },
          ],
        },
        {
          heading: { es: "Portada para redes sociales", en: "Social media cover" },
          paragraphs: [],
          images: [
            {
              src: "/projects/gpe/branding/Portada%20para%20redes%20sociales%20para%20gpe%20por%20ecommetrica.png",
              alt: {
                es: "Portada elaborada para redes sociales para GPE elaborado por Ecommetrica",
                en: "Social media cover made for GPE by Ecommetrica",
              },
            },
          ],
        },
        {
          heading: { es: "Sitio web", en: "Website" },
          paragraphs: [],
          imagesCols: 3,
          images: [
            {
              src: "/projects/gpe/page/home.webp",
              alt: {
                es: "Página de inicio del sitio web de GPE",
                en: "Homepage of GPE's website",
              },
            },
            {
              src: "/projects/gpe/page/servicios.webp",
              alt: {
                es: "Sección de servicios del sitio web de GPE",
                en: "Services section on GPE's website",
              },
            },
            {
              src: "/projects/gpe/page/experiencia.webp",
              alt: {
                es: "Sección de experiencia del sitio web de GPE",
                en: "Experience section on GPE's website",
              },
            },
          ],
        },
      ],
    },
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
    image: "/projects/e-commetrics.webp",
    webpage: "https://e-commetrics.com",
  },

  // --- Commerce -------------------------------------------------------------
  {
    slug: "excellentia-foods",
    name: "Excellentia Foods",
    category: "Commerce",
    description: {
      es: "Excellentia Foods es un distribuidor mayorista de productos hispanos —quesos, embutidos y especialidades— para tiendas del sur de California, con servicio DSD (entrega directa a tienda) que incluye acomodo de anaquel y demostraciones en punto de venta. Necesitaban un sitio que comunicara ese servicio y permitiera a los minoristas solicitar catálogo y lista de precios.",
      en: "Excellentia Foods is a wholesale distributor of Hispanic products — cheeses, cold cuts, and specialty items — for retailers across Southern California, with DSD (direct store delivery) service that includes shelf stocking and in-store demos. They needed a site that communicated that service and let retailers request a catalog and price list.",
    },
    image: "/projects/excellentia.webp",
    imageAlt: {
      es: "Ecommetrica creó el sitio web de Excellentia Foods, distribuidor mayorista de productos hispanos en el sur de California",
      en: "Ecommetrica built the website for Excellentia Foods, a wholesale Hispanic food distributor in Southern California",
    },
    featured: true,
    webpage: "https://excellentiafoods.com",
    details: {
      hideCoverImage: true,
      metaTitle: {
        es: "Rebranding y Web App de Facturación: Excellentia Foods",
        en: "Rebranding and Invoicing Web App: Excellentia Foods",
      },
      metaDescription: {
        es: "Rediseño de marca y desarrollo de web app de facturación para Excellentia Foods, distribuidora de quesos y embutidos en San Diego.",
        en: "Brand redesign and invoicing web app development for Excellentia Foods, a distributor of cheeses and cold cuts in San Diego.",
      },
      keywords: {
        es: [
          "Rebranding y diseño web",
          "Página web",
          "Logotipo",
          "Distribuidora de quesos y embutidos",
          "Webapp invoice",
          "Inventario digital y cobranza",
        ],
        en: [
          "Rebranding and web design",
          "Website",
          "Logo",
          "Cheese and cold cuts distributor",
          "Invoicing web app",
          "Digital inventory and billing",
        ],
      },
      headline: {
        es: "Excellentia Foods: Distribuidora de quesos y embutidos hispanos en San Diego, California buscaba renovar su imagen y tener una webapp de facturación.",
        en: "Excellentia Foods: a distributor of Hispanic cheeses and cold cuts in San Diego, California wanted to renew its image and get an invoicing web app.",
      },
      services: [
        { es: "Rebranding y diseño web", en: "Rebranding & web design" },
        { es: "Logotipo", en: "Logo" },
        { es: "Webapp invoice", en: "Invoicing web app" },
      ],
      summary: {
        es: "Excellentia Foods es una distribuidora de quesos y embutidos hispanos en San Diego y el sur de California que buscaba renovar su identidad visual hacia un branding moderno y sofisticado, al tiempo que digitalizamos su operación interna con una aplicación propia encargada de integrar la facturación, la gestión de cartera de clientes y el control sistemático de inventarios.",
        en: "Excellentia Foods is a distributor of Hispanic cheeses and cold cuts in San Diego and Southern California that wanted to renew its visual identity toward a modern, sophisticated brand, while we digitized its internal operations with a custom app handling invoicing, customer account management, and systematic inventory control.",
      },
      briefingParagraphs: [
        {
          es: "Excellentia Foods es una distribuidora de quesos y embutidos hispanos en San Diego y el sur de California que buscaba renovar su identidad visual hacia un branding moderno y sofisticado, al tiempo que digitalizamos su operación interna con una aplicación propia encargada de integrar la facturación, la gestión de cartera de clientes y el control sistemático de inventarios.",
          en: "Excellentia Foods is a distributor of Hispanic cheeses and cold cuts in San Diego and Southern California that wanted to renew its visual identity toward a modern, sophisticated brand, while we digitized its internal operations with a custom app handling invoicing, customer account management, and systematic inventory control.",
        },
      ],
      sections: [
        {
          heading: { es: "Antes y después: logotipo", en: "Before and after: logo" },
          paragraphs: [],
          beforeAfter: {
            before: [
              {
                src: "/projects/excellentia/branding/Antiguo%20logo%20de%20excellentia%20foods.jpg",
                width: 461,
                height: 174,
                alt: {
                  es: "Antiguo logo de Excellentia Foods previo a nuevo rebranding de Ecommetrica",
                  en: "Excellentia Foods' old logo, before Ecommetrica's rebrand",
                },
              },
            ],
            after: [
              {
                src: "/projects/excellentia/branding/Nuevo%20logo%20principal%20de%20excellentia%20foods%20por%20ecommetrica.jpg",
                width: 3974,
                height: 2228,
                alt: {
                  es: "Nuevo logo con fondo azul más moderno para Excellentia Foods elaborado por Ecommetrica",
                  en: "New, more modern logo on a blue background for Excellentia Foods, by Ecommetrica",
                },
              },
            ],
          },
        },
        {
          heading: { es: "Logotipo secundario", en: "Secondary logo" },
          paragraphs: [],
          imagesAspect: "square",
          imagesCols: 3,
          images: [
            {
              src: "/projects/excellentia/branding/Logo%20secundario%20con%20fondo%20azul%20elaborado%20por%20ecommetrica%20para%20excellentia%20foods.jpg",
              alt: {
                es: "Logo secundario con fondo azul que representa espiga de trigo elemento clave para Excellentia Foods rediseñado por Ecommetrica",
                en: "Secondary logo on a blue background featuring a wheat-spike motif, a key element for Excellentia Foods, redesigned by Ecommetrica",
              },
            },
            {
              src: "/projects/excellentia/branding/Logo%20secundario%20con%20fondo%20guinda%20elaborado%20por%20ecommetrica%20para%20excellentia%20foods.jpg",
              alt: {
                es: "Logo secundario con fondo guinda que representa espiga de trigo elemento clave para Excellentia Foods rediseñado por Ecommetrica",
                en: "Secondary logo on a maroon background featuring a wheat-spike motif, a key element for Excellentia Foods, redesigned by Ecommetrica",
              },
            },
            {
              src: "/projects/excellentia/branding/Logo%20secundario%20con%20fondo%20verde%20elaborado%20por%20ecommetrica%20para%20excellentia%20foods.jpg",
              alt: {
                es: "Logo secundario con fondo verde que representa espiga de trigo elemento clave para Excellentia Foods rediseñado por Ecommetrica",
                en: "Secondary logo on a green background featuring a wheat-spike motif, a key element for Excellentia Foods, redesigned by Ecommetrica",
              },
            },
          ],
        },
        {
          heading: { es: "Brand board", en: "Brand board" },
          paragraphs: [],
          images: [
            {
              src: "/projects/excellentia/branding/Captura%20de%20brandboard%20nuevo%20disenada%20por%20ecommetrica.webp",
              alt: {
                es: "Captura de branboard con logos tipografia y paleta de colores de la distribuidora de alimentos hispanos Excellentia Foods por Ecommetrica",
                en: "Brand board screenshot with logos, typography, and color palette for Hispanic food distributor Excellentia Foods, by Ecommetrica",
              },
            },
          ],
        },
        {
          heading: { es: "Sitio web", en: "Website" },
          paragraphs: [],
          imagesCols: 2,
          images: [
            {
              src: "/projects/excellentia/page/Pagina%20de%20inicio%20de%20excellentia%20foods%20por%20ecommetrica.png",
              alt: {
                es: "Seccion de inicio de la página web de Excellentia Foods elaborado por Ecommetrica",
                en: "Homepage section of Excellentia Foods' website, built by Ecommetrica",
              },
            },
            {
              src: "/projects/excellentia/page/Nueva%20pagina%20de%20about%20de%20excellentia%20por%20ecommetrica.png",
              alt: {
                es: "Nueva página about de Excellentia con videos ilustrativos e historia acerca de la compañía elaborado por Ecommetrica",
                en: "Excellentia's new about page with illustrative videos and company history, built by Ecommetrica",
              },
            },
            {
              src: "/projects/excellentia/page/Seccion%20de%20mision%20y%20vision%20de%20excellencia%20por%20ecommetrica.png",
              alt: {
                es: "Apartado en About de misión, visión para Excellentia Foods diseñado por Ecommetrica",
                en: "Mission and vision section on the About page for Excellentia Foods, designed by Ecommetrica",
              },
            },
            {
              src: "/projects/excellentia/page/Seccion%20de%20productos%20que%20vende%20excellentia%20foods.png",
              alt: {
                es: "Sección con algunos productos del catálogo de Excellentia Foods Por Ecommetrica",
                en: "Section featuring some of Excellentia Foods' catalog products, by Ecommetrica",
              },
            },
          ],
        },
      ],
    },
  },
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
    image:
      "/projects/ecommetrica%20mejoro%20y%20creo%20el%20branding%20de%20chik%20distribuidora%20de%20productos%20de%20belleza%20en%20hidalgo.webp",
    imageAlt: {
      es: "Ecommetrica mejoro la estructura de la tienda en linea de chik ademas de crear un brandind llamativo",
      en: "Ecommetrica improved the structure of Chik's online store and created an eye-catching brand identity",
    },
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

/** A project's own showcase clip, or the client testimonial as fallback —
 *  single source for both the home hover preview and the "Ver video" button. */
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
