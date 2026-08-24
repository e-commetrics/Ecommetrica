import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInternalCaseStudies, getCaseStudy, categoryLabel } from "@/lib/work";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, caseStudyArticleSchema, homeCrumb } from "@/lib/schema";

const LANG = "en" as const;
const t = getDict(LANG);

export function generateStaticParams() {
  return getInternalCaseStudies().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return { title: { absolute: "Ecommetrica" } };

  return {
    title: project.details?.metaTitle?.[LANG] ?? project.name,
    description:
      project.details?.metaDescription?.[LANG] ??
      (project.details?.summary ?? project.description)[LANG],
    keywords: project.details?.keywords?.[LANG] ?? [
      project.name,
      categoryLabel(project.category, LANG),
      ...t.workPage.keywords,
    ],
    alternates: seoAlternates(LANG, `/work/${slug}`),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project || project.external) {
    notFound();
  }

  return (
    <>
      <JsonLd data={caseStudyArticleSchema(project, LANG)} />
      <JsonLd
        data={breadcrumbSchema(LANG, [
          homeCrumb(LANG),
          { name: t.nav.work, path: "/work" },
          { name: project.name, path: `/work/${slug}` },
        ])}
      />
      <CaseStudyDetail project={project} lang={LANG} />
    </>
  );
}
