import type { Metadata } from "next";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "es" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: "Contact",
  description: t.contactPage.metaDescription,
  keywords: t.contactPage.keywords,
  alternates: seoAlternates(LANG, "/contact"),
};

export default function ContactPage() {
  return (
    <div className="shell py-20 lg:py-28">
      <p className="text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
        {t.contactPage.eyebrow}
      </p>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
        {t.contactPage.headline}
      </h1>
      <p className="mt-6 max-w-xl text-ecom-ink/70">{t.contactPage.sub}</p>
    </div>
  );
}
