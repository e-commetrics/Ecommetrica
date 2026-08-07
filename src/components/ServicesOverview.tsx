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
    // No background class: this inherits the body surface the same way
    // AboutStudio does, so the two adjacent light sections share one continuous
    // paint and no boundary line can appear between them under `noir`.
    // scroll-mt clears the sticky header when /#services jumps here.
    // overflow-clip because the coil below deliberately runs past the right
    // edge. Unlike the dark blocks, this section is the shell itself and had no
    // clipping of its own, so the overflow would reach the document and add a
    // horizontal scrollbar. `clip` crops it without becoming a scroll container.
    <section
      id="services"
      className="shell scroll-mt-24 overflow-clip py-24 lg:py-32"
    >
      {/* Headline, intro and image are one row so the image can run the full
          height of the text beside it rather than just the intro's. The two
          text blocks stay in a column of their own for that reason — with the
          headline above the grid, as it was, the row was only ever as tall as
          the intro and the image had nothing to measure up to. */}
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

        {/* Runs wider than its column on purpose, so it carries on past the
            right edge of the screen and only ever shows as a fragment. The
            section's overflow-clip does the cropping — see the note there;
            without it this would hand the whole document a sideways scrollbar.
            Only from lg: up: stacked, the column is the full width and an
            overflow this big would leave barely a sliver of the shape. */}
        <Reveal delay={0.2}>
          <Highlight
            shape="rings"
            className="w-full lg:w-[160%] lg:max-w-none"
            opacity={0.4}
          />
        </Reveal>
      </div>

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
