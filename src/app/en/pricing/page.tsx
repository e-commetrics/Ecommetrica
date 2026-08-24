import type { Metadata } from "next";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";
import PricingGrid from "@/components/PricingGrid";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: t.pricingPage.headline,
  description: t.pricingPage.metaDescription,
  keywords: t.pricingPage.keywords,
  alternates: seoAlternates(LANG, "/pricing"),
};

export default function PricingPage() {
  return <PricingGrid />;
}
