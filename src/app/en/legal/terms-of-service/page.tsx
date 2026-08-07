import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: t.legal.termsTitle,
  description: t.legal.termsMetaDescription,
  keywords: t.legal.termsKeywords,
  alternates: seoAlternates(LANG, "/legal/terms-of-service"),
};

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      title={t.legal.termsTitle}
      intro={t.legal.termsIntro}
      sections={t.legal.termsSections}
    />
  );
}
