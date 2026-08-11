export default function Booking() {
  return (
    <section className="container mx-auto my-20 px-4">
      <h2 className="mb-4 text-center font-sans text-4xl font-bold text-[#AC463F] md:text-8xl">
        Agenda tu cita
      </h2>
      <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.8119674595487!2d-117.11935808842692!3d32.531168596399496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d94b222bf089c3%3A0xf5db170685ab6a04!2sDoctor%20Arturo%20L%C3%B3pez%20%7C%20Antiedad%20y%20Bienestar!5e0!3m2!1ses!2smx!4v1756323608427!5m2!1ses!2smx"
            width="100%"
            height="450"
            className="max-w-full rounded-lg shadow-lg"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <form className="space-y-4">
              <h3 className="mb-6 text-center text-xl font-semibold text-gray-800">
                CREAR CITA
              </h3>

              <div className="mb-6 flex items-start space-x-2 text-sm text-gray-600">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Paseo Ensenada 721-1. Playas de Tijuana, Baja California, CP 22500
                </span>
              </div>

              <div>
                <input
                  type="datetime-local"
                  placeholder="Elige fecha y hora"
                  className="w-full rounded-md border border-gray-300 p-3 text-gray-500 focus:border-transparent focus:ring-2 focus:ring-[#AC463F] focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Nombre completo *"
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-[#AC463F] focus:outline-none"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico *"
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-[#AC463F] focus:outline-none"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Número de teléfono *"
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-[#AC463F] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-[#AC463F] px-4 py-3 font-medium text-white transition duration-200 hover:bg-[#8B3730]"
              >
                REALIZAR CITA
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
