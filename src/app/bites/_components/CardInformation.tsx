"use client";

import { useTranslation } from "./i18n";

export const useCardData = () => {
  const { t } = useTranslation();

  return [
    {
      image: "/bites/mision-1.png",
      title: t("altatecnologia"),
      alt: "At Bites we perform our procedures with high-end tools",
    },
    {
      image: "/bites/mision-2.png",
      title: t("agendadigital"),
      alt: "En bites puedes agendar facil tu decides el dia y hora para comenzar",
    },
    {
      image: "/bites/mision-3.png",
      title: t("materiales"),
      alt: "The top-quality materials on your teeth will last and perform for years",
    },
  ];
};
