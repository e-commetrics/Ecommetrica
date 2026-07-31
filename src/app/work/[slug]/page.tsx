import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getInternalCaseStudies, getCaseStudy } from "@/lib/work";

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
  return { title: project ? `${project.name} | Ecommetrica` : "Ecommetrica" };
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
      <p className="mt-8 text-lg text-ecom-dark/70">
        {details?.summary || project.description}
      </p>

      {(details?.client || details?.year || details?.services) && (
        <dl className="mt-10 grid grid-cols-2 gap-8 border-y border-ecom-dark/10 py-8 sm:grid-cols-3">
          {details?.client && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-widest text-ecom-dark/50">
                Client
              </dt>
              <dd className="mt-1 text-ecom-dark">{details.client}</dd>
            </div>
          )}
          {details?.year && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-widest text-ecom-dark/50">
                Year
              </dt>
              <dd className="mt-1 text-ecom-dark">{details.year}</dd>
            </div>
          )}
          {details?.services && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-widest text-ecom-dark/50">
                Services
              </dt>
              <dd className="mt-1 text-ecom-dark">{details.services.join(", ")}</dd>
            </div>
          )}
        </dl>
      )}

      <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl bg-ecom-dark/10">
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
              key={result}
              className="rounded-xl border border-ecom-dark/10 p-5 text-ecom-dark/80"
            >
              {result}
            </li>
          ))}
        </ul>
      )}

      {details?.gallery && details.gallery.length > 0 && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {details.gallery.map((src) => (
            <div
              key={src}
              className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-ecom-dark/10"
            >
              <Image src={src} alt={project.name} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {details?.testimonial && (
        <blockquote className="mt-12 border-l-2 border-ecom-orange pl-6">
          <p className="font-display text-xl text-ecom-dark">
            “{details.testimonial.quote}”
          </p>
          <footer className="mt-3 text-sm text-ecom-dark/60">
            {details.testimonial.author}
            {details.testimonial.role && `, ${details.testimonial.role}`}
          </footer>
        </blockquote>
      )}
    </div>
  );
}
