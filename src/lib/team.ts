import type { Localized } from "@/lib/i18n/types";

export type TeamMember = {
  name: string;
  role: Localized;
  description: Localized;
  /** Default portrait. */
  img: string;
  /** Second portrait, swapped in on hover. */
  imgHover: string;
};

export const team: TeamMember[] = [
  {
    name: "Kevin O. Okhuysen",
    role: { es: "Full-Stack Developer", en: "Full-Stack Developer" },
    description: {
      es: "Es versátil para facilitar y agilizar procesos de programación para que tu sitio web sea funcional y atractivo.",
      en: "Versatile at streamlining development processes so your website is both functional and appealing.",
    },
    img: "/images/Team_Members/team1.webp",
    imgHover: "/images/Team_Members/team1-2.webp",
  },
  {
    name: "Karen Valdez",
    role: { es: "Editora de video & Copywriter", en: "Video Editor & Copywriter" },
    description: {
      es: "Es una creativa que eleva la voz de tu proyecto para atraer clientes y maximizar su crecimiento.",
      en: "A creative who elevates your project's voice to attract clients and maximize its growth.",
    },
    img: "/images/Team_Members/team2.webp",
    imgHover: "/images/Team_Members/team2-2.webp",
  },
  {
    name: "Juan M. Gonzáles",
    role: { es: "Director y Consultor", en: "Director & Consultant" },
    description: {
      es: "Es un experto en optimizar el posicionamiento, ecosistema digital y la planeación estratégica para que tu negocio crezca.",
      en: "An expert in optimizing SEO positioning, digital ecosystems, and strategic planning to grow your business.",
    },
    img: "/images/Team_Members/team3.webp",
    imgHover: "/images/Team_Members/team3-2.webp",
  },
];
