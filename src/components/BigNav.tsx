import Link from "next/link";

const items = [
  { label: "Work", href: "/work", arrow: "↗" },
  { label: "Services", href: "/#services", arrow: "→" },
  { label: "Lets talk", href: "/contact", arrow: "↘" },
];

export default function BigNav() {
  return (
    <section className="bg-ecom-gradient text-white">
      <div className="mx-auto max-w-7xl divide-y divide-white/20 px-6 lg:px-10">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex items-center justify-between py-8 sm:py-10"
          >
            <span className="font-display text-4xl font-medium tracking-tight uppercase sm:text-6xl">
              {item.label}
            </span>
            <span
              aria-hidden
              className="text-3xl transition-transform group-hover:translate-x-1 sm:text-5xl"
            >
              {item.arrow}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
