import type { Localized } from "@/lib/i18n/types";

export type TeamMember = {
  name: string;
  role: Localized;
  description: Localized;
  /** Default portrait. */
  img: string;
  /** alt/title for `img`. Falls back to `name` when unset. */
  imgAlt?: Localized;
  /** Second portrait, swapped in on hover. */
  imgHover: string;
  /** alt/title for `imgHover`. Falls back to `name` when unset. */
  imgHoverAlt?: Localized;
};

export const team: TeamMember[] = [
  {
    name: "Kevin O. Okhuysen",
    role: { es: "Full-Stack Developer", en: "Full-Stack Developer" },
    description: {
      es: "Es versátil para facilitar y agilizar procesos de programación para que tu sitio web sea funcional y atractivo.",
      en: "Versatile at streamlining development processes so your website is both functional and appealing.",
    },
    img: "/images/Team_Members/Miembro%20de%20ecommetrica.webp",
    imgAlt: {
      es: "Full-stack developer miembro de ecommetrica",
      en: "Full-stack developer, Ecommetrica team member",
    },
    imgHover: "/images/Team_Members/Miembro%20de%20ecommetrica%20en%20tijuana.webp",
    imgHoverAlt: {
      es: "Full-stack developer miembro de ecommetrica en Tijuana",
      en: "Full-stack developer, Ecommetrica team member in Tijuana",
    },
  },
  {
    name: "Karen Valdez",
    role: { es: "Editora de video & Copywriter", en: "Video Editor & Copywriter" },
    description: {
      es: "Es una creativa que eleva la voz de tu proyecto para atraer clientes y maximizar su crecimiento.",
      en: "A creative who elevates your project's voice to attract clients and maximize its growth.",
    },
    img: "/images/Team_Members/Segundo%20miembro%20del%20ecommetrica.webp",
    imgAlt: {
      es: "Copywriter & video editor en ecommetrica",
      en: "Copywriter & video editor at Ecommetrica",
    },
    imgHover: "/images/Team_Members/Segundo%20miembro%20del%20ecommetrica%20en%20tijuana.webp",
    imgHoverAlt: {
      es: "Miembro copywriter ecommetrica en tijuana",
      en: "Ecommetrica copywriter team member in Tijuana",
    },
  },
  {
    name: "Juan M. González",
    role: { es: "Director y Consultor", en: "Director & Consultant" },
    description: {
      es: "Es un experto en optimizar el posicionamiento, ecosistema digital y la planeación estratégica para que tu negocio crezca.",
      en: "An expert in optimizing SEO positioning, digital ecosystems, and strategic planning to grow your business.",
    },
    img: "/images/Team_Members/miembro%20consultor%20en%20ecommetrica.webp",
    imgAlt: {
      es: "Miembro consultor en ecommetrica en Tijuana",
      en: "Ecommetrica consultant team member in Tijuana",
    },
    imgHover: "/images/Team_Members/Miembro%20director%20en%20ecommetrica.webp",
    imgHoverAlt: {
      es: "Miembro director en ecommetrica en Tijuana",
      en: "Ecommetrica director team member in Tijuana",
    },
  },
];
