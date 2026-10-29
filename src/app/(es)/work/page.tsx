import type { Metadata } from "next";
import WorkGallery from "@/components/WorkGallery";
import WorkHero from "@/components/WorkHero";
import { caseStudies } from "@/lib/work";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "es" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: "Work",
  description: t.workPage.metaDescription,
  keywords: t.workPage.keywords,
  alternates: seoAlternates(LANG, "/work"),
};

export default function WorkPage() {
  return (
    <>
    <WorkHero lang={LANG} />
    {/* id: target of the WorkHero "see the projects" link; the page h1 lives in WorkHero. */}
    <div id="projects" className="shell scroll-mt-24 py-24 lg:py-32">
      <h2 className="max-w-5xl text-balance font-display text-[clamp(2.25rem,5vw,5rem)] font-medium leading-[1.0] tracking-[-0.035em] text-ecom-ink">
        {t.workPage.headline}
      </h2>

      {/* Filtering is client-side, so the list lives in a client component
          while this page stays a server component and keeps its metadata. */}
      <WorkGallery projects={caseStudies} />
    </div>
    </>
  );
}
