import Link from "next/link";
import Reveal from "@/components/Reveal";

const items = [
  { label: "Work", href: "/work", arrow: "↗" },
  { label: "Services", href: "/#services", arrow: "→" },
  { label: "Lets talk", href: "/contact", arrow: "↘" },
];

export default function BigNav() {
  return (
    <section className="relative overflow-hidden bg-ecom-cream text-ecom-dark py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-ecom-orange/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-ecom-red/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-ecom-orange/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl divide-y divide-ecom-dark/15 px-6 lg:px-10">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08} y={16}>
            <Link
              href={item.href}
              className="group flex items-center justify-between py-8 sm:py-10"
            >
              <span className="font-display text-4xl font-medium tracking-tight uppercase transition-transform duration-300 group-hover:translate-x-2 sm:text-6xl">
                {item.label}
              </span>
              <span
                aria-hidden
                className="text-3xl transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1 sm:text-5xl"
              >
                {item.arrow}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
