"use client";

import { useTranslation } from "./i18n";

export const Serviciosesteticos = () => {
  const { t } = useTranslation();
  return [
    {
      image: "/bites/5.png",
      title: t("blanqueamiento"),
      alt: "Dientes blancos sin sensibilidad solo se hacen en Bites",
      paragraph: t("blanqueamientotext"),
      number: 1,
      link: "#",
    },
    {
      image: "/bites/6.png",
      title: t("carillas"),
      alt: "Las carillas hechas por Bites siempre son esteticas y funcionales",
      paragraph: t("carillastext"),
      number: 2,
      link: "#",
    },
    {
      image: "/bites/7.png",
      title: t("coronas"),
      alt: "Enjoy your orthodontic treatmets with Bites Creadores de Sonrisas",
      paragraph: t("coronastext"),
      number: 3,
      link: "#",
    },
    {
      image: "/bites/8.png",
      title: t("implantesdentales"),
      paragraph: t("implantesdentalestext"),
      alt: "Dental implants at Bites Creadores de Sonrisas",
      number: 4,
      link: "#",
    },
  ];
};
