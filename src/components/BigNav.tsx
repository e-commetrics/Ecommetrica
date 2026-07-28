import Link from "next/link";
import Reveal from "@/components/Reveal";

const items = [
  { label: "Work", href: "/work", arrow: "↗" },
  { label: "Services", href: "/#services", arrow: "→" },
  { label: "Lets talk", href: "/contact", arrow: "↘" },
];

export default function BigNav() {
  return (
    <section className="bg-ecom-gradient text-white">
      <div className="mx-auto max-w-7xl divide-y divide-white/20 px-6 lg:px-10">
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
