import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { seoAlternates } from "@/lib/i18n/seo";
import { getDict } from "@/lib/i18n/dict";
import { LANDING_CONTENT } from "@/lib/landings/all";
import { landingPath } from "@/lib/landings";
import { breadcrumbSchema, homeCrumb, packageLandingSchema } from "@/lib/schema";
import PackageLanding from "@/components/PackageLanding";
import JsonLd from "@/components/JsonLd";

const LANG = "es" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(LANDING_CONTENT).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = LANDING_CONTENT[slug];
  if (!content) return { title: { absolute: "Ecommetrica" } };
  return {
    title: content.meta.title[LANG],
    description: content.meta.description[LANG],
    keywords: content.meta.keywords[LANG],
    alternates: seoAlternates(LANG, landingPath(slug)),
  };
}

export default async function PackageLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = LANDING_CONTENT[slug];
  if (!content) notFound();
  const t = getDict(LANG);
  return (
    <>
      <JsonLd data={packageLandingSchema(content, LANG)} />
      <JsonLd
        data={breadcrumbSchema(LANG, [
          homeCrumb(LANG),
          { name: t.nav.pricing, path: "/pricing" },
          { name: content.meta.title[LANG], path: landingPath(slug) },
        ])}
      />
      <PackageLanding content={content} lang={LANG} />
    </>
  );
}
