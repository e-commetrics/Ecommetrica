"use client";

import { useState } from "react";
import { useTranslation } from "./i18n";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const closeMenu = () => {
    setIsAsideOpen(false);
  };

  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language: "es" | "en") => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        <a href="/bites" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/bites/logo.png"
            className="h-[150px] w-[250px]"
            alt="En Bites Creadores de Sonrisas brindamos servicios de estética dental con veneers de porcelana o composite "
            title="En Bites Creadores de Sonrisas brindamos servicios de estética dental con veneers de porcelana o composite "
          />
        </a>
        <div className="hidden w-screen font-poppins text-2xl font-medium md:block md:w-auto">
          <ul className="flex flex-col items-center rounded-lg border border-gray-100 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:border-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                {t("Nosotros")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:border-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                {t("Galeria")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:border-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                {t("Servicios")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:border-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                {t("Contacto")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:border-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                {t("Blog")}
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/BitesCreadoresdeSonrisas" target="_blank" rel="noreferrer">
                <img
                  src="/bites/icons/facebook.svg"
                  alt="Give us a like on our Facebook page, we are the best option for dental design  "
                  title="Give us a like on our Facebook page, we are the best option for dental design  "
                />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/bitescreadoresdesonrisas/" target="_blank" rel="noreferrer">
                <img
                  src="/bites/icons/instagram.svg"
                  alt="No te pierdas de contenido, procedimientos de alta estética dental en nuestro Instagram bitescreadoresdesonrisas "
                  title="No te pierdas de contenido, procedimientos de alta estética dental en nuestro Instagram bitescreadoresdesonrisas "
                />
              </a>
            </li>
            <li className="hidden gap-4 lg:block">
              <div className="flex gap-4">
                <span className="block rounded px-3 py-2 text-white md:p-0">
                  <img
                    src="/bites/icons/phone.svg"
                    alt="Call 663 324 9611 to transform your smile  "
                    title="Call 663 324 9611 to transform your smile  "
                  />
                </span>
              </div>
            </li>
            <li>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-white shadow-sm"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {i18n.language === "en" ? (
                      <>
                        <img src="/bites/icons/usa.svg" alt="USA" className="mr-2 inline-block h-5 w-5" />
                        English
                      </>
                    ) : (
                      <>
                        <img src="/bites/icons/mx.svg" alt="Mexico" className="mr-2 inline-block h-5 w-5" />
                        Español
                      </>
                    )}
                    <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isOpen && (
                  <div className="ring-opacity-5 absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button
                        onClick={() => handleLanguageChange("es")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        <img src="/bites/icons/mx.svg" alt="Mexico" className="mr-4 inline-block h-5 w-5" />
                        Español
                      </button>
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        <img src="/bites/icons/usa.svg" alt="USA" className="mr-4 inline-block h-5 w-5" />
                        English
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="block md:hidden">
          <button onClick={() => setIsAsideOpen(!isAsideOpen)} className="rounded-md p-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {isAsideOpen && (
            <aside className="fixed inset-y-0 right-0 z-50 flex transform transition-transform duration-300 ease-in-out">
              <div className="w-64 rounded-l-lg bg-white p-4 shadow-lg">
                <div className="flex justify-end">
                  <svg
                    onClick={closeMenu}
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <ul className="space-y-4 py-8">
                  <li>
                    <a href="/bites" className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100">
                      {t("Nosotros")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100">
                      {t("Galeria")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100">
                      {t("Servicios")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100">
                      {t("Contacto")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100">
                      {t("Blog")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100">
                      {t("Llamar")}
                    </a>
                  </li>
                  <li className="flex items-center justify-start gap-4">
                    <a href="https://www.facebook.com/BitesCreadoresdeSonrisas" target="_blank" rel="noreferrer">
                      <svg width="32" height="32" viewBox="0 0 512 512">
                        <path
                          fill="#FE81BD"
                          d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                        />
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/bitescreadoresdesonrisas/" target="_blank" rel="noreferrer">
                      <svg width="32" height="32" viewBox="0 0 512 512">
                        <path
                          fill="#FE81BD"
                          d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                        />
                      </svg>
                    </a>
                    <span>
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FE81BD"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                        <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                      </svg>
                    </span>
                  </li>
                </ul>
                <div className="py-8">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium shadow-sm"
                    id="options-menu-mobile"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {i18n.language === "en" ? (
                      <>
                        <img src="/bites/icons/usa.svg" alt="USA" className="mr-2 inline-block h-5 w-5 text-black" />
                        English
                      </>
                    ) : (
                      <>
                        <img
                          src="/bites/icons/mx.svg"
                          alt="Mexico"
                          className="mr-2 inline-block h-5 w-5 text-black"
                        />
                        Español
                      </>
                    )}
                    <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-5 px-2 text-center">
                  All rights reserved by Bites Creadores de Sonrisas 2024 ©. Bitescreadoresdesonrisas.com is powered
                  by &nbsp;
                  <a
                    href="https://ecommetrica.com/"
                    className="font-bold hover:text-[#FE81BD] hover:underline"
                  >
                    ecommetrica.com
                  </a>
                </div>
              </div>

              <div className="flex-1 bg-black/50" onClick={closeMenu} />
            </aside>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
