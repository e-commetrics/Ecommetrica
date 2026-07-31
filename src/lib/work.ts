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
  webpage: string;
} & (
  | { external?: false }
  | { external: true; url: string }
);

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
        "Un traumatólogo ortopedista que buscaba un sitio web moderno y minimalista para diferenciarse de los sitios convencionales en el ámbito de la traumatología. Logramos un diseño profesional y sencillo.",
    },
  },
  {
    slug: "dr-arturo-lopez",
    name: "Dr. Arturo López",
    category: "Medical",
    description: "Un cirujano plástico que requería una landing page efectiva para destacar sus servicios de rejuvenecimiento facial, como rellenos y otros tratamientos antienvejecimiento. El diseño se enfocó en ser breve pero impactante, equilibrando simplicidad y elegancia con un video y un mensaje conciso con sus datos de contacto.",
    image: "/Works/dr-arturo-lopez.png",
    featured: true,
    webpage: "https://ecommetrica.com/arturo/",
    details: {
      summary:
        "Un traumatólogo ortopedista que buscaba un sitio web moderno y minimalista para diferenciarse de los sitios convencionales en el ámbito de la traumatología. Logramos un diseño profesional y sencillo.",
    },
  },
  {
    slug: "dr-arturo-lopez",
    name: "Dr. Arturo López",
    category: "Medical",
    description: "Sitio web para consulta médica, enfocado en confianza y claridad.",
    image: "",
    webpage: "",
    external: true,
    url: "https://doctorarturolopez.com",
  },
  {
    slug: "dr-arturo-lopez",
    name: "Dr. Arturo López",
    category: "Medical",
    description: "Sitio web para consulta médica, enfocado en confianza y claridad.",
    image: "",
    webpage: "",
    external: true,
    url: "https://doctorarturolopez.com",
  },
  {
    slug: "carbonetics",
    name: "Carbonetics Inc.",
    category: "Industrial",
    description:
      "Presencia digital para una empresa industrial, comunicando escala y capacidad técnica.",
    image: "",
    webpage: "",
    external: true,
    url: "https://carboneticsinc.com",
  },
  {
    slug: "gpe-consultores",
    name: "GPE Consultores",
    category: "Consulting",
    description: "Sitio web para una firma de consultoría empresarial.",
    image: "",
    webpage: "",
    external: true,
    url: "https://gpeconsultores.com.mx",
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
