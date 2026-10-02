import type { Metadata } from "next";
import FeatureExplainerPage from "@/components/FeatureExplainerPage";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: t.ga4Page.headline,
  description: t.ga4Page.metaDescription,
  keywords: t.ga4Page.keywords,
  alternates: seoAlternates(LANG, "/ga4"),
};

export default function Ga4Page() {
  return <FeatureExplainerPage content={t.ga4Page} lang={LANG} />;
}
