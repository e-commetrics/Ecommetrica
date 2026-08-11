"use client";

import { useState } from "react";
import { useTranslation } from "./i18n";

export const Information = (): React.JSX.Element => {
  const [playing, setPlaying] = useState(false);
  const playVideo = () => setPlaying(true);
  const closeModal = () => setPlaying(false);

  const { t } = useTranslation();

  return (
    <main className="mx-auto w-[80%]">
      <div className="rounded-b-[30px] bg-[#6BBAE9]">
        <h1 className="flex items-center justify-center px-8 py-4 text-center font-pompiere text-3xl text-white md:text-6xl">
          {t("nuestrotrabajo")}
        </h1>
      </div>
      <div className="grid grid-cols-1 px-8 py-8 md:gap-32 lg:grid-cols-2">
        <div>
          <img
            src="/bites/info-1.png"
            className="w-96 xl:translate-x-36"
            alt="En Bites Nos aseguramos de preparar todo lo necesario en nuestro espacio para que tu visita sea agradable. "
            title="En Bites Nos aseguramos de preparar todo lo necesario en nuestro espacio para que tu visita sea agradable. "
          />
          <img
            src="/bites/info-2.png"
            className="absolute hidden translate-x-[-60px] translate-y-[-170px] lg:block"
            alt="We follow rigorous protocols to provide you and your family the best dental services  "
            title="We follow rigorous protocols to provide you and your family the best dental services  "
          />
          <div className="absolute flex size-32 translate-x-24 translate-y-[-230px] items-center justify-center rounded-full bg-gradient-to-l from-pink-600 via-pink-400 to-blue-400 md:translate-x-[260px] md:translate-y-[-280px] lg:translate-x-40 lg:translate-y-[-200px]">
            <img
              onClick={playVideo}
              className="size-16 transform cursor-pointer transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
              src="/bites/icons/play.svg"
              alt="Play video"
            />
          </div>
          <div className="flex items-center justify-center gap-4 py-4 lg:translate-x-72 lg:translate-y-[100px] lg:justify-start lg:py-0">
            <a href="#">
              <img
                src="/bites/icons/diente2.svg"
                className="size-16 rounded-2xl bg-blue-400 px-4 hover:bg-blue-500"
                alt=""
              />
            </a>
            <button
              type="button"
              className="block rounded-xl bg-blue-400 p-4 font-poppins font-light text-white hover:bg-blue-500 md:block lg:hidden xl:block"
            >
              {t("contactanos")}
            </button>
          </div>
          {playing && (
            <div
              className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50"
              onClick={closeModal}
            >
              <iframe
                title="vimeo-player"
                src="https://player.vimeo.com/video/948822686?h=aebb1bba75"
                width="640"
                height="560"
              />
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <div className="py-1 text-justify">
            <h2 className="mb-4 text-center font-poppins text-lg font-normal text-pink-600 md:text-2xl lg:text-start">
              {t("labor")}
            </h2>

            <div className="mb-2 font-poppins text-4xl font-normal text-black">
              <h1 className="py-2 text-center font-pompiere text-3xl md:text-5xl lg:text-start">{t("bites")}</h1>
            </div>
            <div className="my-4 flex gap-8">
              <img src="/bites/icons/diente.svg" className="hidden size-16 rounded-2xl px-2 md:block" alt="" />
              <h4 className="mb-2 font-poppins font-normal text-black md:text-2xl">{t("bienvenido")}</h4>
            </div>
            <h4 className="mb-4 font-poppins font-normal text-black md:text-2xl">{t("bienvenido2")}</h4>
            <h4 className="mb-8 text-start font-poppins font-normal text-black md:text-2xl">{t("ofrecemos")}</h4>
            <div className="mt-2 mb-3 flex justify-center gap-6 lg:justify-start">
              <img src="/bites/icons/check.svg" alt="" />
              <h4>{t("obtensonrisa")}</h4>
            </div>
            <div className="mb-3 flex justify-center gap-6 lg:justify-start">
              <img src="/bites/icons/check.svg" alt="" />
              <h4>{t("equipodental")}</h4>
            </div>
            <div className="mb-3 flex justify-center gap-6 lg:justify-start">
              <img src="/bites/icons/check.svg" alt="" />
              <h4>{t("servicioexclusivo")}</h4>
            </div>
            <div className="mb-3 flex justify-center gap-6 lg:justify-start">
              <img src="/bites/icons/check.svg" alt="" />
              <h4>{t("desdecarillas")}</h4>
            </div>
            <div className="mb-3 flex justify-center gap-6 lg:justify-start">
              <img src="/bites/icons/check.svg" alt="" />
              <h4>{t("tratamientosavanzados")}</h4>
            </div>
            <div className="flex items-center justify-center lg:justify-start">
              <a
                href="#"
                className="my-8 rounded-xl bg-[#FF77B8] px-12 py-4 font-poppins text-lg font-bold text-white hover:bg-pink-500"
              >
                {t("vermas")}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-2 text-center font-pompiere text-7xl font-semibold text-pink-500">1868 </h2>
        <h2 className="mt-3 mb-8 text-center font-poppins text-lg font-light text-black md:text-3xl">
          {t("pacientessonrisa")}
        </h2>
        <h3 className="mb-4 text-center font-poppins text-xl font-normal text-pink-500">{t("contamos")}</h3>
        <h2 className="mt-3 mb-6 font-poorstory text-lg font-normal text-black md:text-5xl">
          {t("esteticapersonalizada")}
        </h2>
      </div>
    </main>
  );
};

export default Information;
