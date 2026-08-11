"use client";

import { useState } from "react";
import CardService from "./CardService";
import { useTranslation } from "./i18n";

const Service: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const services = [
    {
      comments: t("card1"),
      hoverComments: t("card1text"),
      date: "11 Mar, 2024",
      image: "/bites/service-veneers.png",
      alt: "Composite veneers combine functionality and aesthetic",
      url: "#",
    },
    {
      comments: t("card2"),
      hoverComments: t("card2text"),
      date: "25 Mar, 2024",
      image: "/bites/service-confidence.png",
      alt: "Top rated dentist in Tijuana Bites helps you to achieve your dream smile",
      url: "#",
    },
    {
      comments: t("card3"),
      hoverComments: t("card3text"),
      date: "15 Abr, 2024",
      image: "/bites/service-implants.png",
      alt: "With Bites dental implants aren't intimidating anymore",
      url: "#",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? services.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === services.length - 1 ? 0 : prevIndex + 1));
  };

  const getVisibleServices = () => {
    const visibleServices = [];
    for (let i = 0; i < services.length; i++) {
      visibleServices.push(services[(currentIndex + i) % services.length]);
    }
    return visibleServices;
  };

  return (
    <main>
      <div className="mt-12 flex flex-col items-center justify-center px-8 md:px-0">
        <h1 className="mb-6 text-center font-poppins text-3xl font-normal text-pink-600">{t("obten")}</h1>
        <h2 className="px-2 text-center font-pompiere text-2xl font-normal text-black md:text-6xl">
          {t("encontrar")}
        </h2>
        <div className="relative flex w-full items-center justify-evenly px-4">
          <button onClick={handlePrev} className="z-10 hidden md:block">
            <svg
              className="text-[#E72381]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              width={64}
              height={64}
              strokeWidth={2}
            >
              <path d="M5 12l14 0"></path>
              <path d="M5 12l4 4"></path>
              <path d="M5 12l4 -4"></path>
            </svg>
          </button>
          <div className="hidden flex-col gap-0 md:flex md:flex-row md:gap-8">
            {getVisibleServices().map((service, index) => (
              <CardService
                key={index}
                comments={service.comments}
                hoverComments={service.hoverComments}
                date={service.date}
                image={service.image}
                alt={service.alt}
                url={service.url}
              />
            ))}
          </div>
          <div className="flex flex-col gap-0 md:mb-0 md:hidden md:flex-row md:gap-4">
            {getVisibleServices()
              .slice(0, 1)
              .map((service, index) => (
                <CardService
                  key={index}
                  comments={service.comments}
                  hoverComments={service.hoverComments}
                  date={service.date}
                  image={service.image}
                  alt={service.alt}
                  url={service.url}
                />
              ))}
          </div>

          <button onClick={handleNext} className="z-10 hidden md:block">
            <svg
              className="text-[#E72381]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              width={64}
              height={64}
              strokeWidth={2}
            >
              <path d="M5 12l14 0"></path>
              <path d="M15 16l4 -4"></path>
              <path d="M15 8l4 4"></path>
            </svg>
          </button>
        </div>
        <div className="block md:hidden">
          <div className="mt-4 flex justify-center">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`mx-1 flex h-8 w-8 items-center justify-center rounded-full ${
                  index === currentIndex ? "bg-pink-600 text-white" : "bg-gray-300 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <a
          href="#"
          className="mt-8 rounded-md bg-[#6BBAE9] px-4 py-2 font-poppins text-lg font-normal text-white hover:opacity-80"
        >
          Todos los blogs
        </a>
      </div>
    </main>
  );
};

export default Service;
