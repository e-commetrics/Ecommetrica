"use client";

import { useTranslation } from "./i18n";

export const Servicioshigienistas = () => {
  const { t } = useTranslation();
  return [
    {
      image: "/bites/1.png",
      alt: "Bites te ayuda a eliminar problemas de sarro y placa con limpiezas dentales.",
      title: t("limpieza"),
      paragraph: t("limpiezatext"),
      number: 1,
      link: "#",
    },
    {
      image: "/bites/2.png",
      title: t("resinas"),
      alt: "Our high quality of resign allows you to have a functional and beautiful smile",
      paragraph: t("resinastext"),
      number: 2,
      link: "#",
    },
    {
      image: "/bites/3.png",
      title: t("endodoncia"),
      alt: "Una endodoncia con bites preserva tu salud oral y la estética general de tus dientes",
      paragraph: t("endodonciatext"),
      number: 3,
      link: "#",
    },
    {
      image: "/bites/4.png",
      title: t("rehabilitacion"),
      alt: "Smile with our hygienist services",
      paragraph: t("rehabilitaciontext"),
      number: 4,
      link: "#",
    },
  ];
};
