import type { Metadata } from "next";
import FeatureExplainerPage from "@/components/FeatureExplainerPage";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: t.metaGraphApiPage.headline,
  description: t.metaGraphApiPage.metaDescription,
  keywords: t.metaGraphApiPage.keywords,
  alternates: seoAlternates(LANG, "/meta-graph-api"),
};

export default function MetaGraphApiPage() {
  return <FeatureExplainerPage content={t.metaGraphApiPage} lang={LANG} />;
}
