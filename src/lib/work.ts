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
              src: "/projects/lumban/before.webp",
              alt: {
                es: "Antes: sitio web anterior del Dr. Jaime Lumbán",
                en: "Before: Dr. Jaime Lumbán's previous website",
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
              src: "/projects/lumban/before-profile.webp",
              alt: {
                es: "Antes: página de perfil anterior del Dr. Jaime Lumbán",
                en: "Before: Dr. Jaime Lumbán's previous profile page",
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
              src: "/projects/lumban/sesion-fotos/Lumb-0055.webp",
              alt: {
                es: "Sesión de fotos profesional del Dr. Jaime Lumbán, retrato en interiores",
                en: "Professional photo session for Dr. Jaime Lumbán, indoor portrait",
              },
            },
            {
              src: "/projects/lumban/sesion-fotos/Lumb-0134.webp",
              alt: {
                es: "Sesión de fotos profesional del Dr. Jaime Lumbán",
                en: "Professional photo session for Dr. Jaime Lumbán",
              },
            },
            {
              src: "/projects/lumban/sesion-fotos/Lumb-0202.webp",
              alt: {
                es: "Sesión de fotos profesional del Dr. Jaime Lumbán",
                en: "Professional photo session for Dr. Jaime Lumbán",
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
              src: "/projects/lumban/POSTS/dr%20lumban%201.webp",
              alt: {
                es: "Post para redes sociales del Dr. Jaime Lumbán",
                en: "Social media post for Dr. Jaime Lumbán",
              },
            },
            {
              src: "/projects/lumban/POSTS/lumban%202.webp",
              alt: {
                es: "Post para redes sociales del Dr. Jaime Lumbán",
                en: "Social media post for Dr. Jaime Lumbán",
              },
            },
            {
              src: "/projects/lumban/POSTS/lumban%203.webp",
              alt: {
                es: "Post para redes sociales del Dr. Jaime Lumbán",
                en: "Social media post for Dr. Jaime Lumbán",
              },
            },
            {
              src: "/projects/lumban/POSTS/lumban%204.webp",
              alt: {
                es: "Post para redes sociales del Dr. Jaime Lumbán",
                en: "Social media post for Dr. Jaime Lumbán",
              },
            },
            {
              src: "/projects/lumban/POSTS/lumban%205.webp",
              alt: {
                es: "Post para redes sociales del Dr. Jaime Lumbán",
                en: "Social media post for Dr. Jaime Lumbán",
              },
            },
            {
              src: "/projects/lumban/POSTS/lumban%206.webp",
              alt: {
                es: "Post para redes sociales del Dr. Jaime Lumbán",
                en: "Social media post for Dr. Jaime Lumbán",
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
              src: "/projects/monge/before.webp",
              alt: {
                es: "Antes: sitio web anterior del Dr. Ricardo Monge",
                en: "Before: Dr. Ricardo Monge's previous website",
              },
              label: { es: "Antes", en: "Before" },
            },
            {
              src: "/projects/monge/after.webp",
              alt: {
                es: "Después: nuevo sitio web del Dr. Ricardo Monge",
                en: "After: Dr. Ricardo Monge's new website",
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
              src: "/projects/monge/guias/guia1.webp",
              alt: {
                es: "Guía en PDF: Recomendaciones para una columna sana",
                en: "PDF guide: Recommendations for a healthy spine",
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
              src: "/projects/monge/cita/agendar1.webp",
              alt: {
                es: "Webapp de agendado de citas del Dr. Ricardo Monge — información personal y tipo de consulta",
                en: "Dr. Ricardo Monge's appointment-booking webapp — personal information and consultation type",
              },
            },
            {
              src: "/projects/monge/cita/agendar2.webp",
              alt: {
                es: "Webapp de agendado de citas del Dr. Ricardo Monge — selección de fecha",
                en: "Dr. Ricardo Monge's appointment-booking webapp — date selection",
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
              src: "/projects/cesia/assets/hoja%20membretada%202.webp",
              alt: {
                es: "Hoja membretada de la Dra. Cesia Borjón",
                en: "Letterhead for Dr. Cesia Borjón",
              },
            },
            {
              src: "/projects/cesia/assets/papeleria%202.webp",
              alt: {
                es: "Papelería de marca de la Dra. Cesia Borjón — tarjetas de presentación",
                en: "Dr. Cesia Borjón's brand stationery — business cards",
              },
            },
            {
              src: "/projects/cesia/assets/tarjeta%20de%20presentacion.webp",
              alt: {
                es: "Logotipo de la Dra. Cesia Borjón sobre fondo de marca",
                en: "Dr. Cesia Borjón's logo on a brand-color background",
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
              src: "/projects/cesia/branding/colores.webp",
              alt: {
                es: "Paleta de colores principal y secundaria de la Dra. Cesia Borjón",
                en: "Dr. Cesia Borjón's primary and secondary color palette",
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
              src: "/projects/cesia/branding/historia.webp",
              alt: {
                es: "Plantillas de historias para redes sociales de la Dra. Cesia Borjón",
                en: "Social media story templates for Dr. Cesia Borjón",
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
              src: "/projects/cesia/consultorio/57.webp",
              alt: {
                es: "Sala de exploración del consultorio de la Dra. Cesia Borjón",
                en: "Exam room at Dr. Cesia Borjón's practice",
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
              src: "/projects/cesia/consultorio/59.webp",
              alt: {
                es: "Consultorio de la Dra. Cesia Borjón",
                en: "Dr. Cesia Borjón's practice",
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
    featured: true,
    webpage: "/arturo",
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
    image:
      "/projects/Ecommetrica%20mejoro%20la%20pagina%20web%20de%20bites%20dentistas%20en%20tijuana.webp",
    imageAlt: {
      es: "Ecommetrica implemento mejoras en la pagina web de bites para hacerla más atractiva y facil de navegar",
      en: "Ecommetrica implemented improvements to the Bites website to make it more appealing and easier to navigate",
    },
    featured: true,
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

  // --- Industrial -----------------------------------------------------------
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
    featured: true,
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
    image:
      "/projects/ecommetrica%20mejoro%20y%20creo%20el%20branding%20de%20chik%20distribuidora%20de%20productos%20de%20belleza%20en%20hidalgo.webp",
    imageAlt: {
      es: "Ecommetrica mejoro la estructura de la tienda en linea de chik ademas de crear un brandind llamativo",
      en: "Ecommetrica improved the structure of Chik's online store and created an eye-catching brand identity",
    },
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
