"use client";

import { useTranslation } from "./i18n";

const Booking: React.FC = () => {
  const { t } = useTranslation();
  return (
    <main id="Booking">
      <div className="mt-12 flex flex-col items-center justify-center px-8 pb-16">
        <h1 className="mb-8 font-poppins text-4xl font-bold text-black">{t("agenda")}</h1>
        <h2 className="font-pompiere text-4xl font-normal text-pink-600">{t("seleccionaDia")}</h2>
        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <img
              src="/bites/booking-portrait.webp"
              alt="Anyi Manchola Is a colombian dentist Providing a high end service in Tijuana, Founder of Bites Creadores de Sonrisas, "
              title="Anyi Manchola Is a colombian dentist Providing a high end service in Tijuana, Founder of Bites Creadores de Sonrisas, "
              className="h-[550px] w-auto rounded-xl"
            />
          </div>
          <div className="w-[320px]">
            <h1 className="font-poppins text-xl font-medium text-black">{t("crearCita")}</h1>
            <div className="mt-2 flex gap-4">
              <img
                src="/bites/icons/map-marker.svg"
                className="relative h-9 w-9"
                alt="Nos ubicamos en Tijuana,22010 calle Frida Kahlo 10410-404"
                title="Nos ubicamos en Tijuana,22010 calle Frida Kahlo 10410-404"
              />
              <h1 className="font-poppins text-xl font-light text-black">Calle frida kahlo 10410, Tijuana, Mexico </h1>
            </div>
            <h1 className="mt-4 font-poppins text-xs font-light text-pink-600">
              Event time zone: America/Tijuana GMT-07:00
            </h1>
            <button
              type="button"
              className="mt-6 inline-block rounded-xl bg-[#5C9BC0] px-8 py-4 font-poppins font-medium text-white hover:bg-[#588faf]"
            >
              {t("agendacita")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Booking;
