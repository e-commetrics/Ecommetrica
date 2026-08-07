import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Lang } from "@/lib/i18n/types";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";

export default function BigNav({ lang }: { lang: Lang }) {
  const t = getDict(lang);

  const items = [
    { label: t.bigNav.work, href: localizedHref(lang, "/work"), arrow: "↗" },
    { label: t.bigNav.services, href: localizedHref(lang, "/services"), arrow: "→" },
    { label: t.bigNav.talk, href: localizedHref(lang, "/contact"), arrow: "↘" },
  ];

  // overflow-clip: same reason as Hero/Pillars — the glow below overhangs the
  // right edge, and -hidden would leave this section sideways-scrollable.
  return (
    <section className="relative overflow-clip bg-ecom-surface text-ecom-ink py-28 lg:py-36">
      {/* Glows stay clear of the top/bottom edges: a blurred shape clipped by
          the section boundary draws a hard line there, which shows up the
          moment this section and its neighbour share a background colour. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 -left-24 h-96 w-96 rounded-full bg-ecom-orange/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-ecom-red/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-32 left-1/3 h-80 w-80 rounded-full bg-ecom-orange/25 blur-3xl"
      />

      <div className="relative shell divide-y divide-ecom-ink/15 border-y border-ecom-ink/15">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08} y={16}>
            <Link
              href={item.href}
              className="group flex items-center justify-between gap-6 py-10 sm:py-12"
            >
              <span className="font-display text-[clamp(2.5rem,6vw,7rem)] font-medium leading-[0.98] tracking-[-0.03em] uppercase transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 group-hover:text-ecom-orange ">
                {item.label}
              </span>
              <span
                aria-hidden
                className="shrink-0 text-3xl transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:text-ecom-orange sm:text-5xl"
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
