export type TeamMember = {
  name: string;
  role: string;
  description: string;
  /** Default portrait. */
  img: string;
  /** Second portrait, swapped in on hover. */
  imgHover: string;
};

export const team: TeamMember[] = [
  {
    name: "Kevin O. Okhuysen",
    role: "Full-Stack Developer",
    description:
      "Es versátil para facilitar y agilizar procesos de programación para que tu sitio web sea funcional y atractivo.",
    img: "/images/Team_Members/team1.webp",
    imgHover: "/images/Team_Members/team1-2.webp",
  },
  {
    name: "Karen Valdez",
    role: "Editora de video & Copywriter",
    description:
      "Es una creativa que eleva la voz de tu proyecto para atraer clientes y maximizar su crecimiento.",
    img: "/images/Team_Members/team2.webp",
    imgHover: "/images/Team_Members/team2-2.webp",
  },
  {
    name: "Juan M. Gonzáles",
    role: "Director y Consultor",
    description:
      "Es un experto en optimizar el posicionamiento, ecosistema digital y la planeación estratégica para que tu negocio crezca.",
    img: "/images/Team_Members/team3.webp",
    imgHover: "/images/Team_Members/team3-2.webp",
  },
];
