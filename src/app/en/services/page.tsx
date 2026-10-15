import type { Metadata } from "next";
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
    <div className="shell py-20 lg:py-28">
      <p className="eyebrow-rule text-sm font-medium uppercase tracking-[0.2em] text-ecom-orange">
        {t.servicesPage.eyebrow}
      </p>
      <h1 className="mt-6 max-w-5xl text-balance font-display text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
        {t.servicesPage.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ecom-ink/70">{t.servicesPage.sub}</p>

      <ServicesExplorer lang={LANG} />
    </div>
  );
}
