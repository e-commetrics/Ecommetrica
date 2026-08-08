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

      {/* gap-12, not gap-10: each card's hover surface bleeds 1.25rem past its
          content on every side (the -m-5/p-5 pair below), so the gap has to
          clear 2.5rem of bleed before neighbouring cards start touching. */}
      <div className="mt-16 grid gap-12 border-t border-ecom-ink/10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCategories.map((category, i) => (
          <Reveal key={category.groupId} delay={i * 0.1}>
            {/* The -m-5/p-5 pair is what lets the card have a hover surface at
                all: padding alone would indent the rule and the heading away
                from the section's left edge, where they currently line up with
                the headline above. Cancelling it with the same negative margin
                leaves every glyph exactly where it was and grows only the box
                that gets painted.

                The height has to add that padding back. Grid stretch sizes this
                link to the tallest card's *content*, so at a plain `h-full` the
                tallest card has exactly its own content height to fit content
                plus 2.5rem of padding — and the last line or two spill out the
                bottom of the painted box. Adding the pair back keeps all four
                boxes identical and gives every one of them room for the longest
                card's copy. */}
            <Link
              href={localizedHref(lang, `/services#${category.groupId}`)}
              aria-label={t.servicesOverview.viewAria(category.name[lang])}
              className="group -m-5 flex h-[calc(100%+2.5rem)] flex-col rounded-2xl p-5 ring-1 ring-transparent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-ecom-ink/[0.04] hover:ring-ecom-ink/10"
            >
              {/* 2px at rest, not 1: an `h-px` bar lands on a fractional device
                  pixel at half these columns' offsets and antialiases itself
                  away entirely, so only two of the four ever showed a rule.
                  Sweeps the full width of the card and doubles on hover, rather
                  than nudging from 2.5rem to 5rem — at a glance the old growth
                  read as nothing moving at all. */}
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
