import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "es" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: t.legal.accessibilityTitle,
  description: t.legal.accessibilityMetaDescription,
  keywords: t.legal.accessibilityKeywords,
  alternates: seoAlternates(LANG, "/accessibility"),
};

export default function AccessibilityPage() {
  return (
    <LegalDocument
      title={t.legal.accessibilityTitle}
      meta={t.legal.accessibilityMeta}
      intro={t.legal.accessibilityIntro}
      sections={t.legal.accessibilitySections}
    />
  );
}
