import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getInternalCaseStudies, getCaseStudy, categoryLabel } from "@/lib/work";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";
import { seoAlternates } from "@/lib/i18n/seo";
import VideoLightbox from "@/components/VideoLightbox";
import TestimonialVideo from "@/components/TestimonialVideo";

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
    <div className="shell py-20 lg:py-28">
      <Link
        href={localizedHref(LANG, "/work")}
        className="text-sm font-medium text-ecom-ink/60 hover:text-ecom-orange"
      >
        &larr; {t.workDetail.back}
      </Link>

      {/* Three cells rather than a text column and a video column, because the
          two layouts want different orders. Stacked, the video has to land
          between the summary and the buttons — the whole point is that it's the
          first thing on the page — so the buttons can't be welded to the copy.
          From lg the video takes the right column across both rows instead. */}
      <div
        className={
          project.testimonial
            ? "mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:content-start lg:items-start lg:gap-x-16 lg:gap-y-8"
            : "mt-8"
        }
      >
        <div className={project.testimonial ? "lg:col-start-1 lg:row-start-1" : undefined}>
          <p className="text-xs font-medium uppercase tracking-widest text-ecom-ink/50">
            {categoryLabel(project.category, LANG)}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
            {project.name}
          </h1>
          <p className="mt-8 text-lg text-ecom-ink/70">
            {(details?.summary ?? project.description)[LANG]}
          </p>
        </div>

        {/* The frame is capped rather than fluid: these are 9:16, and a portrait
            frame given half the grid runs taller than the copy beside it, which
            is what pushed the buttons down into empty space. Stacked it stays
            narrow enough to read as one screen with the summary above it. */}
        {project.testimonial && (
          <figure className="mx-auto w-full max-w-[17rem] sm:max-w-[19rem] lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mx-0 lg:w-[19rem]">
            <p className="text-xs font-medium uppercase tracking-widest text-ecom-ink/50">
              {t.workDetail.testimonial}
            </p>
            <div className="mt-4">
              <TestimonialVideo
                src={project.testimonial.video}
                poster={project.testimonial.poster}
                aspect={project.testimonial.aspect}
                label={t.workDetail.testimonialAria(project.testimonial.author)}
                watchLabel={t.workDetail.watchVideo}
                closeLabel={t.workDetail.closeVideo}
              />
            </div>
            <figcaption className="mt-4 text-sm text-ecom-ink/60">
              {project.testimonial.author}
              {project.testimonial.role && `, ${project.testimonial.role[LANG]}`}
            </figcaption>
            {project.testimonial.quote && (
              <blockquote className="mt-6 border-l-2 border-ecom-orange pl-5">
                <p className="font-display text-lg text-ecom-ink">
                  “{project.testimonial.quote[LANG]}”
                </p>
              </blockquote>
            )}
          </figure>
        )}

        {(project.webpage || project.video) && (
          <div
            className={`flex flex-wrap items-center gap-4 ${
              project.testimonial ? "lg:col-start-1 lg:row-start-2" : "mt-8"
            }`}
          >
            {project.webpage && (
              <a
                href={project.webpage}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 text-sm font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-ecom-red"
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
            {project.video && (
              <VideoLightbox
                src={project.video}
                label={t.workDetail.watchVideo}
                closeLabel={t.workDetail.closeVideo}
                title={project.name}
              />
            )}
          </div>
        )}
      </div>

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

    </div>
  );
}
