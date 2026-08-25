import type { Metadata } from "next";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";
import ContactHero from "@/components/ContactHero";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: "Contact",
  description: t.contactPage.metaDescription,
  keywords: t.contactPage.keywords,
  alternates: seoAlternates(LANG, "/contact"),
};

export default function ContactPage() {
  return <ContactHero />;
}
