import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";

const flow = ["Marca", "Experiencia", "Cultura"];

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

// Placeholder metrics — swap for Ecommetrica's real numbers.
const stats = [
  { value: "+40", label: "Proyectos entregados" },
  { value: "15", label: "Industrias atendidas" },
  { value: "98%", label: "Clientes que renuevan" },
];

export default function Pillars() {
  return (
    <section className="relative overflow-hidden bg-ecom-black text-white">
      {/* Accent wash so the flat black picks up the active theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-ecom-orange/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium tracking-[0.15em] text-white/50 uppercase">
          {flow.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="text-ecom-orange">
                  &rarr;
                </span>
              )}
              {item}
            </span>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-4xl text-balance font-display text-2xl leading-[1.25] font-medium tracking-[-0.01em] sm:text-4xl lg:text-5xl">
            We build{" "}
            <span className="text-white">search-first digital systems</span>{" "}
            <span className="text-white/40">to help</span> category leaders{" "}
            <span className="text-white/40">lead their industries.</span>
          </p>
        </Reveal>

        <div className="mt-20 grid border-t border-white/10 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className="border-b border-white/10 py-10 sm:border-b-0 sm:border-l sm:first:border-l-0 sm:px-8 sm:first:pl-0"
            >
              <p className="font-display text-5xl font-medium tracking-[-0.02em] text-ecom-orange sm:text-6xl">
                <Counter value={stat.value} />
              </p>
              <p className="mt-3 text-sm tracking-wide text-white/60">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-16 sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1} className="group">
              <span
                aria-hidden
                className="block h-px w-10 bg-ecom-orange transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-20"
              />
              <h3 className="mt-5 font-display text-lg font-medium tracking-wide text-ecom-orange uppercase">
                {pillar.title}
              </h3>
              <p className="mt-3 leading-relaxed text-white/60">{pillar.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
