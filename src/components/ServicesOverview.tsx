import Link from "next/link";
import Reveal from "@/components/Reveal";
import { serviceCategories } from "@/lib/services";
import type { Lang } from "@/lib/i18n/types";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";

export default function ServicesOverview({ lang }: { lang: Lang }) {
  const t = getDict(lang);

  return (
    // No background class: this inherits the body surface the same way
    // AboutStudio does, so the two adjacent light sections share one continuous
    // paint and no boundary line can appear between them under `noir`.
    // scroll-mt clears the sticky header when /#services jumps here.
    <section
      id="services"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 lg:px-10 lg:py-32"
    >
      <Reveal>
        <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-ink/50 uppercase">
          {t.servicesOverview.eyebrow}
        </p>
        <h2 className="mt-6 font-display text-4xl font-medium tracking-[-0.02em] text-ecom-ink sm:text-6xl lg:text-7xl">
          {t.servicesOverview.headline}
          <br />
          <span className="text-ecom-orange">{t.servicesOverview.headlineAccent}</span>
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ecom-ink/70">
          {t.servicesOverview.sub}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-10 border-t border-ecom-ink/10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCategories.map((category, i) => (
          <Reveal key={category.groupId} delay={i * 0.1}>
            <Link
              href={localizedHref(lang, `/services#${category.groupId}`)}
              aria-label={t.servicesOverview.viewAria(category.name[lang])}
              className="group flex h-full flex-col"
            >
              <span
                aria-hidden
                className="block h-px w-10 bg-ecom-orange transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-20"
              />
              <h3 className="mt-5 font-display text-lg font-medium tracking-wide text-ecom-ink uppercase transition-colors duration-300 group-hover:text-ecom-orange">
                {category.name[lang]}
              </h3>
              {category.body?.map((paragraph) => (
                <p key={paragraph.en} className="mt-3 leading-relaxed text-ecom-ink/70">
                  {paragraph[lang]}
                </p>
              ))}
              {category.highlights && (
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-ecom-ink/10 pt-5 text-sm text-ecom-ink/60">
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
