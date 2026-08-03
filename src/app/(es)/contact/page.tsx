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
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
        {t.contactPage.eyebrow}
      </p>
      <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-ecom-ink sm:text-5xl">
        {t.contactPage.headline}
      </h1>
      <p className="mt-6 max-w-xl text-ecom-ink/70">{t.contactPage.sub}</p>
    </div>
  );
}
