import type { Metadata } from "next";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "es" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: t.legal.termsTitle,
  description: t.legal.termsMetaDescription,
  keywords: t.legal.termsKeywords,
  alternates: seoAlternates(LANG, "/legal/terms-of-service"),
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <h1 className="font-display text-4xl font-medium tracking-tight text-ecom-ink">
        {t.legal.termsTitle}
      </h1>
      <p className="mt-6 text-ecom-ink/70">{t.legal.termsBody}</p>
    </div>
  );
}
