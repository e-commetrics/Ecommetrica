const highlights = [
  {
    copy: "Bold strategies that shape identities",
    variant: "dark",
  },
  {
    copy: "",
    variant: "gradient",
  },
  {
    copy: "Creative processes with rapid delivery",
    variant: "dark",
  },
  {
    copy: "A dedicated team behind success",
    variant: "light",
  },
] as const;

export default function Planes() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-ecom-black py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center">
        <span
          aria-hidden
          className="text-stroke font-display text-[18vw] leading-none font-medium text-white/15"
        >
          PLANES
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-sm font-medium tracking-[0.2em] text-white/50 uppercase">
          Nuestros
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <div
              key={i}
              className={`flex aspect-[3/4] flex-col justify-end rounded-2xl p-6 ${
                item.variant === "dark"
                  ? "bg-ecom-dark text-white"
                  : item.variant === "gradient"
                    ? "bg-gradient-to-br from-ecom-orange via-ecom-red to-ecom-black"
                    : "bg-ecom-cream text-ecom-dark"
              }`}
            >
              {item.copy && (
                <p className="font-display text-lg font-medium">{item.copy}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
