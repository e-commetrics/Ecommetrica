import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: t.legal.privacyTitle,
  description: t.legal.privacyMetaDescription,
  keywords: t.legal.privacyKeywords,
  alternates: seoAlternates(LANG, "/legal/privacy-policy"),
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title={t.legal.privacyTitle}
      intro={t.legal.privacyIntro}
      sections={t.legal.privacySections}
    />
  );
}
