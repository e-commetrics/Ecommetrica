import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SelectWork from "@/components/SelectWork";
import Pillars from "@/components/Pillars";
import ServicesOverview from "@/components/ServicesOverview";
import AboutStudio from "@/components/AboutStudio";
import Planes from "@/components/Planes";
import BigNav from "@/components/BigNav";
import Marquee from "@/components/Marquee";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: { absolute: t.siteMeta.title },
  description: t.siteMeta.description,
  keywords: t.siteMeta.keywords,
  alternates: seoAlternates(LANG, "/"),
};

export default function Home() {
  return (
    <>
      <Hero />
      <SelectWork />
      <Pillars lang="en" />
      <ServicesOverview lang="en" />
      <AboutStudio />
      <Planes />
      <BigNav lang="en" />
      <Marquee text={t.nav.talk} />
    </>
  );
}
