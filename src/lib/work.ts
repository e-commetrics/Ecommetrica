export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  blurb: string;
  summary: string;
};

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
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
