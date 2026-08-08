import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: "FAQ",
  description: t.faqPage.metaDescription,
  keywords: t.faqPage.keywords,
  alternates: seoAlternates(LANG, "/faq"),
};

export default function FaqPage() {
  return (
    <div className="shell py-20 lg:py-28">
      {/* Intro and list side by side: the intro sticks while the answers
          expand, so the page keeps its context on a tall screen. */}
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
              {t.faqPage.eyebrow}
            </p>
            <h1 className="mt-6 text-balance font-display text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
              {t.faqPage.headline}
            </h1>
            <div className="mt-10 rounded-2xl border border-ecom-ink/10 p-6">
              <p className="font-display text-base font-medium text-ecom-ink">
                {t.faqPage.stillTitle}
              </p>
              <p className="mt-2 text-sm text-ecom-ink/70">{t.faqPage.stillCopy}</p>
              <Link
                href={localizedHref(LANG, "/contact")}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-ecom-orange px-6 py-3 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 hover:bg-ecom-red"
              >
                {t.faqPage.cta}
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <h2 className="sr-only">{t.faqPage.listHeading}</h2>
          <FaqAccordion lang={LANG} />
        </Reveal>
      </div>
    </div>
  );
}
