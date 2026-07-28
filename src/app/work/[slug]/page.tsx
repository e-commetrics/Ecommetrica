import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies, getCaseStudy } from "@/lib/work";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  return { title: project ? `${project.name} | Ecommetrica` : "Ecommetrica" };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-28">
      <Link
        href="/work"
        className="text-sm font-medium text-ecom-dark/60 hover:text-ecom-red"
      >
        &larr; Back to work
      </Link>

      <p className="mt-8 text-xs font-medium uppercase tracking-widest text-ecom-dark/50">
        {project.category}
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ecom-dark sm:text-5xl">
        {project.name}
      </h1>
      <p className="mt-8 text-lg text-ecom-dark/70">{project.summary}</p>

      <div className="mt-12 aspect-video w-full rounded-2xl bg-ecom-dark/10" />
    </div>
  );
}
