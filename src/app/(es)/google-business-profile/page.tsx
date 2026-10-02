import type { Metadata } from "next";
import FeatureExplainerPage from "@/components/FeatureExplainerPage";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "es" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: t.googleBusinessProfilePage.headline,
  description: t.googleBusinessProfilePage.metaDescription,
  keywords: t.googleBusinessProfilePage.keywords,
  alternates: seoAlternates(LANG, "/google-business-profile"),
};

export default function GoogleBusinessProfilePage() {
  return <FeatureExplainerPage content={t.googleBusinessProfilePage} lang={LANG} />;
}
