export default function About() {
  return (
    <section className="text-white">
      <div className="grid h-full grid-cols-1 bg-[#AC463F] md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 p-10">
          <h2 className="text-3xl font-bold md:text-5xl">
            Conoce a tu especialista en Playas de Tijuana
          </h2>
          <p className="text-lg">
            Contamos con un médico cirujano especialista en medicina estética,
            antiedad y antienvejecimiento en &quot;Playas de Tijuana&quot;.
          </p>
          <p className="text-lg">
            Nuestro especialista ofrece alternativas para resaltar la naturaleza de
            cada paciente, creando un balance entre salud, bienestar y belleza.
          </p>
          <p className="text-lg">
            Aquí encontrarás un enfoque dedicado a cuidar la salud y preservar la
            belleza que ya existe en cada persona.
          </p>
          <p className="text-lg">
            &quot;Permítenos acompañarte en ese pequeño empuje para lograr un balance
            completo entre salud, bienestar y belleza.&quot;
          </p>
          <p className="text-end text-lg font-semibold underline">Tu Especialista</p>
        </div>
        <div className="flex flex-col items-center justify-center p-10">
          <figure>
            <img src="/arturo/about.webp" className="rounded-3xl" alt="About Image" />
          </figure>
          <div className="mt-8 flex gap-6">
            <figure className="group mt-6 cursor-pointer">
              <a href="#">
                <img
                  alt="Instagram icon"
                  className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                  src="https://cdn.simpleicons.org/instagram/white"
                />
              </a>
            </figure>
            <figure className="group mt-6 cursor-pointer">
              <a href="#">
                <img
                  alt="Facebook icon"
                  className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                  src="https://cdn.simpleicons.org/facebook/white"
                />
              </a>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
