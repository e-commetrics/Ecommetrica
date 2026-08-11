"use client";

import { motion } from "framer-motion";
import { useTranslation } from "./i18n";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const locations = [
    {
      src: "/bites/icons/map-marker.svg",
      alt: "Nos ubicamos en Tijuana,22010 calle Frida Kahlo 10410-404",
      address: t("mapmarker"),
    },
    {
      src: "/bites/icons/footer-phone.png",
      alt: "Con gusto te atendemos Y creamos tu sonrisa",
      address: "663 324 9611",
    },
    {
      src: "/bites/icons/footer-clock.png",
      alt: "Get to know our office hours Monday to Friday 9 am to 6:30 pm Saturday 9 am to 4pm",
      address: t("clock"),
      optionalText: t("clock2"),
    },
  ];

  const footerLinks = [
    { label: "Inicio", href: "/bites" },
    { label: "Nosotros", href: "#" },
    { label: "Galeria", href: "#" },
    { label: "Contacto", href: "#" },
    { label: "Servicios", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Términos de Servicio", href: "#" },
    { label: "Política de Privacidad", href: "#" },
  ];

  const services = [
    "Limpieza-Dental",
    "Resinas",
    "Endodoncia",
    "Rehabilitacion-Oral",
    "Blanqueamiento",
    "Carillas",
    "Coronas",
    "Ortodoncia",
    "Implantes-Dentales",
  ];

  return (
    <main className="relative flex items-center justify-center">
      <footer
        style={{
          background: "linear-gradient(to top, #FE81BD 0%, #FE81BD 75%, white 75%, white 100%)",
        }}
        className="flex w-screen items-end justify-center shadow"
      >
        <div className="mx-auto my-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="h-[480px] w-80 rounded-tr-[100px] rounded-bl-[100px] bg-white shadow-xl shadow-black">
            <div className="flex items-center justify-center">
              <img
                src="/bites/footer-logo.png"
                alt="Bites Creadores de Sonrisa it's a place carefully design for your comfort "
                title="Bites Creadores de Sonrisa it's a place carefully design for your comfort "
              />
            </div>
            {locations.map((location, index) => (
              <div key={index} className="flex gap-4 px-12 py-4">
                <img
                  src={location.src}
                  className="flex size-8 items-center justify-center"
                  alt={location.alt}
                  title={location.src.includes("footer-phone") ? location.alt : undefined}
                />
                <div className="flex flex-col items-center justify-center gap-4 font-pompiere">
                  <span className="text-xl font-medium text-black">{location.address}</span>
                  {location.optionalText && (
                    <span className="text-xl font-medium text-black">{location.optionalText}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center md:pt-40">
            <a href="#Booking">
              <motion.button
                whileHover={{
                  borderTopRightRadius: "2.5rem",
                  borderBottomLeftRadius: "2.5rem",
                  borderBottomRightRadius: "0rem",
                  borderTopLeftRadius: "0rem",
                }}
                transition={{ duration: 0.7 }}
                style={{ borderRadius: "1.5rem" }}
                className="bg-[#5C9BC0] px-8 py-4 font-poppins font-normal text-white hover:bg-[#588faf]"
              >
                {t("agendacita")}
              </motion.button>
            </a>

            <div className="grid grid-cols-1 gap-12 py-4 md:grid-cols-2">
              <div className="gap-8">
                <h1 className="text-white py-8 text-2xl">{t("linksrapidos")}</h1>
                {footerLinks.map((link, index) => (
                  <a
                    href={link.href}
                    key={index}
                    className="flex flex-col items-start justify-start text-lg font-medium text-white hover:text-blue-400"
                  >
                    {t(link.label)}
                  </a>
                ))}
                <div className="my-4 flex items-start justify-start gap-8 md:my-12">
                  <a href="https://www.instagram.com/bitescreadoresdesonrisas/" target="_blank" rel="noreferrer">
                    <img
                      src="/bites/icons/footer-instagram.svg"
                      className="size-7"
                      alt="No te pierdas de contenido, procedimientos de alta estética dental en nuestro Instagram bitescreadoresdesonrisas "
                      title="No te pierdas de contenido, procedimientos de alta estética dental en nuestro Instagram bitescreadoresdesonrisas "
                    />
                  </a>
                  <a href="https://m.facebook.com/BitesCreadoresdeSonrisas" target="_blank" rel="noreferrer">
                    <img
                      src="/bites/icons/footer-facebook.svg"
                      className="size-7"
                      alt="Give us a like on our Facebook page, we are the best option for dental design  "
                      title="Give us a like on our Facebook page, we are the best option for dental design  "
                    />
                  </a>
                  <span>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                    </svg>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-white md:py-8 text-2xl">{t("servicios")}</h1>
                {services.map((service, index) => (
                  <a
                    href="#"
                    key={index}
                    className="flex flex-col items-start justify-start text-lg font-medium text-white hover:text-blue-400"
                  >
                    {t(service)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Footer;
