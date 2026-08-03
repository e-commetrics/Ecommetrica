import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getInternalCaseStudies, getCaseStudy, categoryLabel } from "@/lib/work";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "es" as const;
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
    title: project.name,
    description: (project.details?.summary ?? project.description)[LANG],
    keywords: [project.name, categoryLabel(project.category, LANG), ...t.workPage.keywords],
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

  const details = project.details;

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-28">
      <Link
        href={localizedHref(LANG, "/work")}
        className="text-sm font-medium text-ecom-ink/60 hover:text-ecom-orange"
      >
        &larr; {t.workDetail.back}
      </Link>

      <p className="mt-8 text-xs font-medium uppercase tracking-widest text-ecom-ink/50">
        {categoryLabel(project.category, LANG)}
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ecom-ink sm:text-5xl">
        {project.name}
      </h1>
      <p className="mt-8 text-lg text-ecom-ink/70">
        {(details?.summary ?? project.description)[LANG]}
      </p>

      {project.webpage && (
        <a
          href={project.webpage}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 text-sm font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-ecom-red"
        >
          {t.workDetail.visitSite}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            &#8599;
          </span>
        </a>
      )}

      {(details?.client || details?.year || details?.services) && (
        <dl className="mt-10 grid grid-cols-2 gap-8 border-y border-ecom-ink/10 py-8 sm:grid-cols-3">
          {details?.client && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-widest text-ecom-ink/50">
                {t.workDetail.client}
              </dt>
              <dd className="mt-1 text-ecom-ink">{details.client}</dd>
            </div>
          )}
          {details?.year && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-widest text-ecom-ink/50">
                {t.workDetail.year}
              </dt>
              <dd className="mt-1 text-ecom-ink">{details.year}</dd>
            </div>
          )}
          {details?.services && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-widest text-ecom-ink/50">
                {t.workDetail.services}
              </dt>
              <dd className="mt-1 text-ecom-ink">{details.services.join(", ")}</dd>
            </div>
          )}
        </dl>
      )}

      <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl bg-ecom-ink/10">
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
          />
        )}
      </div>

      {details?.results && (
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {details.results.map((result) => (
            <li
              key={result.en}
              className="rounded-xl border border-ecom-ink/10 p-5 text-ecom-ink/80"
            >
              {result[LANG]}
            </li>
          ))}
        </ul>
      )}

      {details?.gallery && details.gallery.length > 0 && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {details.gallery.map((src) => (
            <div
              key={src}
              className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-ecom-ink/10"
            >
              <Image src={src} alt={project.name} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {details?.testimonial && (
        <blockquote className="mt-12 border-l-2 border-ecom-orange pl-6">
          <p className="font-display text-xl text-ecom-ink">
            “{details.testimonial.quote[LANG]}”
          </p>
          <footer className="mt-3 text-sm text-ecom-ink/60">
            {details.testimonial.author}
            {details.testimonial.role && `, ${details.testimonial.role[LANG]}`}
          </footer>
        </blockquote>
      )}
    </div>
  );
}
