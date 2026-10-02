import type { Metadata } from "next";
import FeatureExplainerPage from "@/components/FeatureExplainerPage";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "es" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: t.vpatPage.headline,
  description: t.vpatPage.metaDescription,
  keywords: t.vpatPage.keywords,
  alternates: seoAlternates(LANG, "/vpat"),
};

export default function VpatPage() {
  return <FeatureExplainerPage content={t.vpatPage} lang={LANG} />;
}
