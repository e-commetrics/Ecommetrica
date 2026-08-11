"use client";

import { useEffect, useState } from "react";

const LIST = [
  {
    name: "Sobre Nosotros",
    id: "sobre-nosotros",
    content: {
      title: "Sobre Nosotros",
      description: `
        Encuentra a un Médico Cirujano y Especialista en Medicina Estética y Antienvejecimiento en Playas de Tijuana.
        <br><br>
        Descubre la excelencia en medicina estética y antiedad con un experto comprometido en realzar la belleza natural de cada paciente.
        Con una atención personalizada y una amplia experiencia en el campo, nuestro especialista ofrece la mejor alternativa para lograr un equilibrio perfecto entre salud, bienestar y belleza.
        <br><br>
        <strong>Destacando la Belleza que Ya Posees</strong>
        <br><br>
        Nuestro equipo se dedica a ayudar a todas las personas a preservar y resaltar su belleza inherente.
        El enfoque se basa en el entendimiento de que cada individuo es único, y los tratamientos se adaptan a las necesidades específicas de cada paciente.
        <br><br>
        <strong>Un Balance Integral entre Salud, Bienestar y Belleza</strong>
        <br><br>
        Con este enfoque, puedes lograr un equilibrio completo entre salud, bienestar y belleza.
        La dedicación a la medicina estética y antienvejecimiento se traduce en resultados sobresalientes que te permiten sentirte seguro y radiante en tu propia piel.
        <br><br>
        Confía en nuestro especialista para alcanzar la mejor versión de ti mismo.
        Tu belleza es única, y estamos aquí para ayudarte a resaltarla de manera experta.
      `,
    },
  },
  {
    name: "Términos y Servicio",
    id: "terminos-servicio",
    content: {
      title: "Términos y Condiciones de Servicio",
      description: `
        Una vez que hayas seleccionado el servicio que deseas, deberás reservarlo durante los horarios disponibles en la plataforma.
        <br><br>
        Los servicios reservan el espacio en la oficina en los horarios seleccionados al momento de tu elección.
        Nuestro sistema solo permite realizar modificaciones dentro de la página.
        <br><br>
        Una vez completada la reserva, recibirás un correo electrónico en un plazo máximo de 2 horas con la información correspondiente.
        <br><br>
        Si realizas un depósito, una vez reflejado en nuestra cuenta, se realizará una llamada de confirmación hasta 24 horas antes de la cita, confirmando el pedido mediante correo electrónico.
        La confirmación del depósito de compra deberá ser verificada por el área administrativa.
        En ningún caso se podrá programar el espacio si no está liberado por el departamento correspondiente.
        <br><br>
        <strong>Política de reservas</strong>
        <br><br>
        Cualquier reserva realizada en la página va directamente a nuestra agenda en recepción.
        Las citas se confirman telefónicamente y deben ser atendidas por el paciente en el plazo de 48 a 24 horas antes de la cita.
        Las citas no confirmadas podrán ser consideradas canceladas.
        Se podrá realizar la cancelación con devolución siempre que la notificación sea 72 horas antes de la fecha prevista.
        Si es dentro del plazo de 72 horas, solo se podrá reprogramar la cita.
        <br><br>
        Cualquier situación que surja por cambio o devolución deberá ser notificada mediante correo electrónico enviando una descripción del problema o motivo de la cancelación.
      `,
    },
  },
  {
    name: "Política de Privacidad",
    id: "politica-privacidad",
    content: {
      title: "Política de Privacidad",
      description: `
        En nuestro sitio web, accesible desde este portal, una de nuestras principales prioridades es la privacidad de nuestros visitantes.
        Este documento contiene los tipos de información que recopilamos y registramos, y cómo la usamos.
        <br><br>
        <strong>Uso de la información</strong>
        <br><br>
        Podemos comunicarnos con usted directamente o a través de socios autorizados, incluyendo servicio de atención al cliente,
        para brindarle actualizaciones, información relacionada con el sitio, y fines promocionales y de marketing.
        También podemos enviar correos electrónicos e implementar medidas para prevenir fraude.
        <br><br>
        <strong>Archivos de registro</strong>
        <br><br>
        Seguimos un procedimiento estándar de uso de archivos de registro, que registran a los visitantes cuando acceden al sitio.
        La información recopilada incluye direcciones IP, tipo de navegador, proveedor de servicios de Internet (ISP), marca de fecha y hora,
        páginas de referencia/salida y número de clics.
        Estos datos no están vinculados a ninguna información personal identificable.
        El propósito es analizar tendencias, administrar el sitio y recopilar información demográfica.
        <br><br>
        <strong>Cookies y tecnologías similares</strong>
        <br><br>
        Como cualquier otro sitio web, utilizamos cookies para almacenar información, incluidas las preferencias de los visitantes
        y las páginas visitadas.
        La información se emplea para optimizar la experiencia de los usuarios, personalizando el contenido según el navegador y otra información.
        <br><br>
        <strong>Publicidad de terceros</strong>
        <br><br>
        Algunos anunciantes pueden utilizar cookies y tecnologías como JavaScript o Web Beacons para medir la efectividad de sus campañas
        y personalizar los anuncios que aparecen en nuestro sitio.
        Tenga en cuenta que no tenemos acceso ni control sobre estas cookies utilizadas por terceros.
        <br><br>
        Recomendamos consultar las políticas de privacidad de cada proveedor de servicios o anunciante externo para obtener información más detallada.
      `,
    },
  },
];

export default function Footer() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = LIST.find((item) => item.id === openId);

  useEffect(() => {
    if (!openId) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenId(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openId]);

  return (
    <footer className="bg-[#211316] text-white">
      <div className="flex flex-col items-center justify-between gap-6 p-6 md:flex-row md:gap-0 md:p-8">
        <figure className="shrink-0">
          <img
            src="/arturo/logo-footer.png"
            alt="Logo Dr. Arturo López"
            className="h-12 w-12 transition-transform duration-300 hover:scale-110 md:h-16 md:w-16"
          />
        </figure>

        <nav className="w-full md:w-auto">
          <ul className="flex flex-col space-y-2 text-center font-medium md:flex-row md:space-y-0 md:space-x-8 md:text-left">
            {LIST.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(item.id)}
                  className="cursor-pointer rounded px-2 py-1 text-sm transition-colors duration-300 hover:text-[#AC463F] hover:underline focus:ring-2 focus:ring-[#AC463F]/50 focus:outline-none md:text-base"
                  aria-label={`Abrir información sobre ${item.name}`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />

      <div className="p-4 text-center text-xs leading-relaxed text-gray-400 md:text-sm">
        <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
        <p className="mt-1">
          Desarrollado por{" "}
          <a
            href="https://e-commetrics.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 font-medium text-[#AC463F] transition-colors duration-300 hover:text-[#AC463F]"
          >
            e-commetrics.com
          </a>
        </p>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setOpenId(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
              <h2 className="text-2xl font-bold text-gray-800">{active.content.title}</h2>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                aria-label="Cerrar modal"
              >
                <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div
                className="text-lg leading-relaxed text-gray-700"
                dangerouslySetInnerHTML={{ __html: active.content.description }}
              />
            </div>

            <div className="flex justify-end border-t border-gray-200 bg-gray-50 p-6">
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="rounded-lg bg-[#AC463F] px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[#AC463F] focus:ring-2 focus:ring-[#AC463F]/50 focus:outline-none"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
