const pillars = [
  {
    title: "Marca",
    copy: "Estrategia de marca construida desde el negocio, no desde la forma.",
  },
  {
    title: "Experiencia",
    copy: "Sistemas digitales seguros y funcionales que sostienen el crecimiento.",
  },
  {
    title: "Cultura",
    copy: "Acompañamiento como socios estratégicos, con visión de largo plazo.",
  },
];

export default function Pillars() {
  return (
    <section className="border-y border-ecom-dark/10 bg-white/40">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <p className="max-w-3xl font-display text-2xl leading-snug font-medium text-ecom-dark sm:text-3xl">
          We build search-first digital systems to help category leaders lead
          their industries.
        </p>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title}>
              <h3 className="font-display text-lg font-medium uppercase tracking-wide text-ecom-red">
                {pillar.title}
              </h3>
              <p className="mt-3 text-ecom-dark/70">{pillar.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
