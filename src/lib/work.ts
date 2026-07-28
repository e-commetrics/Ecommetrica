export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  blurb: string;
  summary: string;
} & (
  | { external?: false; }
  | { external: true; url: string }
);

export const caseStudies: CaseStudy[] = [
  {
    slug: "dr-ricardo-monge",
    name: "Dr. Ricardo Monge",
    category: "Branding & Web",
    blurb:
      "Dr. especializado en lesiones articulares, con más de 15 años de experiencia atendiendo pacientes en toda la región.",
    summary:
      "Construimos una identidad de marca y un sitio web que transmiten la autoridad y calidez del Dr. Monge, facilitando que nuevos pacientes agenden su primera consulta con confianza.",
  },
  {
    slug: "ziggiz",
    name: "Ziggiz",
    category: "Branding & Web",
    blurb:
      "Marca emergente que buscaba una identidad digital sólida para escalar su operación y conectar con nuevos clientes.",
    summary:
      "Desarrollamos un sistema de marca flexible y un sitio orientado a conversión, sentando las bases tecnológicas para el siguiente ciclo de crecimiento de Ziggiz.",
  },
  {
    slug: "monge-ortopedia",
    name: "Monge Ortopedia",
    category: "Medical",
    blurb:
      "Sitio web y presencia digital para la práctica de ortopedia del Dr. Monge, enfocado en captación de pacientes.",
    summary: "",
    external: true,
    url: "https://mongeortopedia.com",
  },
  {
    slug: "bites",
    name: "Bites — Creadores de Sonrisas",
    category: "Dental",
    blurb:
      "Identidad y sitio web para una clínica dental orientada a experiencia de paciente y conversión de citas.",
    summary: "",
    external: true,
    url: "https://bitescreadoresdesonrisas.com",
  },
  {
    slug: "cesia-borjon",
    name: "Dra. Cesia Borjón",
    category: "Medical",
    blurb: "Presencia digital para consulta médica especializada.",
    summary: "",
    external: true,
    url: "https://cesiaborjon.com",
  },
  {
    slug: "dr-arturo-lopez",
    name: "Dr. Arturo López",
    category: "Medical",
    blurb: "Sitio web para consulta médica, enfocado en confianza y claridad.",
    summary: "",
    external: true,
    url: "https://doctorarturolopez.com",
  },
  {
    slug: "carbonetics",
    name: "Carbonetics Inc.",
    category: "Industrial",
    blurb:
      "Presencia digital para una empresa industrial, comunicando escala y capacidad técnica.",
    summary: "",
    external: true,
    url: "https://carboneticsinc.com",
  },
  {
    slug: "gpe-consultores",
    name: "GPE Consultores",
    category: "Consulting",
    blurb: "Sitio web para una firma de consultoría empresarial.",
    summary: "",
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
