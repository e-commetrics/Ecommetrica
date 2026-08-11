import Link from "next/link";
import Reveal from "@/components/Reveal";
import Highlight from "@/components/Highlight";
import { serviceCategories } from "@/lib/services";
import type { Lang } from "@/lib/i18n/types";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";

export default function ServicesOverview({ lang }: { lang: Lang }) {
  const t = getDict(lang);

  return (
    // No bg class: shares the body surface with adjacent sections so noir shows no seam.
    // scroll-mt clears the sticky header; overflow-clip crops the coil past the right edge.
    <section
      id="services"
      className="shell scroll-mt-24 overflow-clip py-24 lg:py-32"
    >
      {/* One row so the image runs the full height of headline+intro together,
          not just the intro's. */}
      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-ink/50 uppercase">
              {t.servicesOverview.eyebrow}
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,7rem)] font-medium leading-[0.98] tracking-[-0.03em] text-ecom-ink ">
              {t.servicesOverview.headline}
              <br />
              <span className="text-ecom-orange">{t.servicesOverview.headlineAccent}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <p className="max-w-2xl text-lg leading-relaxed text-ecom-ink/70">
              {t.servicesOverview.sub}
            </p>
          </Reveal>
        </div>

        {/* 160% wide on purpose, bleeding past the right edge (section's overflow-clip
            crops it); full width below lg where there's no room to spare. */}
        <Reveal delay={0.2}>
          <Highlight
            shape="rings"
            className="w-full lg:w-[160%] lg:max-w-none"
            opacity={0.4}
          />
        </Reveal>
      </div>

      {/* gap-12: clears the 2.5rem hover bleed from the -m-5/p-5 pair below so
          neighbouring cards don't touch. */}
      <div className="mt-16 grid gap-12 border-t border-ecom-ink/10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCategories.map((category, i) => (
          <Reveal key={category.groupId} delay={i * 0.1}>
            {/* -m-5/p-5 grows the hover surface without indenting content from the
                section edge; h-[calc(100%+2.5rem)] adds that padding back so content doesn't clip. */}
            <Link
              href={localizedHref(lang, `/services#${category.groupId}`)}
              aria-label={t.servicesOverview.viewAria(category.name[lang])}
              className="group -m-5 flex h-[calc(100%+2.5rem)] flex-col rounded-2xl p-5 ring-1 ring-transparent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-ecom-ink/[0.04] hover:ring-ecom-ink/10"
            >
              {/* h-0.5 not h-px: at half these columns' offsets a 1px bar lands on a
                  fractional device pixel and antialiases away. */}
              <span
                aria-hidden
                className="block h-0.5 w-10 rounded-full bg-ecom-orange transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-1 group-hover:w-full"
              />
              <h3 className="mt-5 flex items-center gap-2 font-display text-lg font-medium tracking-wide text-ecom-ink uppercase transition-colors duration-300 group-hover:text-ecom-orange">
                {category.name[lang]}
                {/* Only appears on hover: the card is a link, and nothing else
                    in the resting state says so. */}
                <span
                  aria-hidden
                  className="-translate-x-1 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100"
                >
                  &rarr;
                </span>
              </h3>
              {category.body?.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="mt-3 leading-relaxed text-ecom-ink/70 transition-colors duration-300 group-hover:text-ecom-ink/90"
                >
                  {paragraph[lang]}
                </p>
              ))}
              {category.highlights && (
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-ecom-ink/10 pt-5 text-sm text-ecom-ink/60 transition-colors duration-300 group-hover:border-ecom-orange/25 group-hover:text-ecom-ink/80">
                  {category.highlights.map((highlight) => (
                    <li key={highlight.en} className="flex items-start gap-2.5">
                      <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ecom-orange" />
                      {highlight[lang]}
                    </li>
                  ))}
                </ul>
              )}
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-16">
        <Link
          href={localizedHref(lang, "/services")}
          className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 hover:bg-ecom-red"
        >
          {t.servicesOverview.cta}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
