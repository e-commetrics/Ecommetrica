import type { Metadata } from "next";
import LiveBuildHero from "@/components/LiveBuildHero";
import ServicesExplorer from "@/components/ServicesExplorer";
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
    <>
      <LiveBuildHero lang={LANG} />
      {/* The page h1 lives in LiveBuildHero; its "explore" link scrolls here. */}
      <div id="services-explorer" className="shell scroll-mt-24 py-20 lg:py-28">
        <h2 className="max-w-5xl text-balance font-display text-[clamp(2.25rem,4.5vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.03em] text-ecom-ink">
          {t.servicesPage.headline}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ecom-ink/70">{t.servicesPage.sub}</p>

        <ServicesExplorer lang={LANG} />
      </div>
    </>
  );
}
