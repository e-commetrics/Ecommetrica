import type { Metadata } from "next";
import { serviceGroups } from "@/lib/services";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: "Services",
  description: t.servicesPage.metaDescription,
  keywords: t.servicesPage.keywords,
  alternates: seoAlternates(LANG, "/services"),
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="eyebrow-rule text-sm font-medium uppercase tracking-[0.2em] text-ecom-orange">
        {t.servicesPage.eyebrow}
      </p>
      <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-ecom-ink sm:text-5xl">
        {t.servicesPage.headline}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ecom-ink/70">{t.servicesPage.sub}</p>

      <div className="mt-16">
        {serviceGroups.map((group) => (
          // scroll-mt clears the sticky header for the /services#<id> deep
          // links the home page's service cards point at.
          <section
            key={group.id}
            id={group.id}
            className="scroll-mt-24 border-t border-ecom-ink/10 py-12 first:border-t-0 first:pt-0"
          >
            <h2 className="font-display text-2xl font-medium tracking-tight text-ecom-ink sm:text-3xl">
              {group.name[LANG]}
            </h2>
            {group.tagline && (
              <p className="mt-4 text-lg leading-relaxed text-ecom-ink/70">
                {group.tagline[LANG]}
              </p>
            )}
            {group.items && (
              <ul className="mt-5 flex flex-col gap-2.5 text-ecom-ink/70">
                {group.items.map((item) => (
                  <li key={item.en} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ecom-orange"
                    />
                    {item[LANG]}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
