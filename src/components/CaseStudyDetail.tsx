"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { categoryLabel, getProjectVideo, type CaseStudy } from "@/lib/work";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";
import { useVideoAvailable } from "@/lib/useVideoAvailable";
import type { Lang } from "@/lib/i18n/types";

export default function CaseStudyDetail({
  project,
  lang,
}: {
  project: CaseStudy;
  lang: Lang;
}) {
  const t = getDict(lang);
  const details = project.details;
  const coverImage = details?.hideCoverImage ? undefined : (details?.heroImage ?? project.image);
  const coverImageAlt = (details?.heroImage ? details.heroImageAlt?.[lang] : project.imageAlt?.[lang]) ?? project.name;
  const heroVideo = getProjectVideo(project);
  const heroVideoAvailable = useVideoAvailable(heroVideo);

  return (
    <div className="pb-20 lg:pb-28">
      <div className="shell pt-20 lg:pt-28">
        <Link
          href={localizedHref(lang, "/work")}
          className="text-sm font-medium text-ecom-ink/60 hover:text-ecom-orange"
        >
          &larr; {t.workDetail.back}
        </Link>
      </div>

      {/* Hero: tinted with the client's own brand color when we have one, so each
          case study reads as that brand rather than a generic Ecommetrica page. */}
      <div
        className="relative mt-8 overflow-clip py-16 lg:py-24"
        style={details?.accent ? { backgroundColor: details.accent } : undefined}
      >
        {/* Accent glow, same treatment as the homepage Hero — ties this template back
            to the site's visual language instead of reading as a bare content page. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 -left-32 h-[32rem] w-[32rem] rounded-full bg-ecom-orange/15 blur-[120px]"
        />
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow-rule text-sm font-medium uppercase tracking-widest text-ecom-ink/50">
              {categoryLabel(project.category, lang)}
            </p>
            <h1 className="mt-3 text-balance font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
              {details?.headline?.[lang] ?? project.name}
            </h1>
          </Reveal>
          {details?.services && details.services.length > 0 && (
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
              {details.services.map((service) => (
                <span
                  key={service.es}
                  className="rounded-full border border-ecom-ink/20 px-4 py-1.5 text-sm text-ecom-ink/70"
                >
                  {service[lang]}
                </span>
              ))}
            </Reveal>
          )}
          {heroVideo && heroVideoAvailable && (
            <Reveal
              delay={0.15}
              className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[0_30px_80px_-40px_rgba(18,18,19,0.65)] ring-1 ring-ecom-ink/10"
            >
              <video
                src={heroVideo}
                poster={project.testimonial?.poster}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="absolute inset-0 h-full w-full object-contain"
              />
            </Reveal>
          )}
        </div>
      </div>

      <div className="shell">
        {/* Briefing: summary copy, with the testimonial/CTA riding alongside it exactly
            as before — only the heading above it and the hero/tint above that are new. */}
        <Reveal>
          <span aria-hidden className="block h-0.5 w-10 rounded-full bg-ecom-orange" />
          <h2 className="mt-5 font-display text-3xl font-medium tracking-[-0.02em] text-ecom-ink sm:text-4xl">
            {t.workDetail.briefing}
          </h2>
        </Reveal>

        <div className="mt-8">
          <div className="flex flex-col gap-5 text-lg text-ecom-ink/70">
            {(details?.briefingParagraphs ?? [details?.summary ?? project.description]).map((paragraph, i) => (
              <p key={i}>{paragraph[lang]}</p>
            ))}
          </div>

          {project.webpage && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
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
            </div>
          )}
        </div>

        {(details?.client || details?.year) && (
          <dl className="mt-10 grid grid-cols-2 gap-8 border-y border-ecom-ink/10 py-8 sm:grid-cols-3">
            {details?.client && (
              <div>
                <dt className="text-sm font-medium uppercase tracking-widest text-ecom-ink/50">
                  {t.workDetail.client}
                </dt>
                <dd className="mt-1 text-ecom-ink">{details.client}</dd>
              </div>
            )}
            {details?.year && (
              <div>
                <dt className="text-sm font-medium uppercase tracking-widest text-ecom-ink/50">
                  {t.workDetail.year}
                </dt>
                <dd className="mt-1 text-ecom-ink">{details.year}</dd>
              </div>
            )}
          </dl>
        )}

        {coverImage && (
          <Reveal className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl bg-ecom-ink/10 shadow-[0_30px_80px_-40px_rgba(18,18,19,0.65)] ring-1 ring-ecom-ink/10">
            <Image src={coverImage} alt={coverImageAlt} title={coverImageAlt} fill className="object-contain" />
          </Reveal>
        )}

        {/* Long-form editorial sections — "El concepto de marca", "Una identidad
            expresiva"... — added per project as copy comes in. Purely additive:
            a project with no `sections` renders exactly as it did before. */}
        {details?.sections?.map((section) => {
          const heading = section.heading[lang];
          const images = section.images ?? [];
          return (
            <div key={heading} className="mt-16 border-t border-ecom-ink/10 pt-16">
              <Reveal>
                <span aria-hidden className="block h-0.5 w-10 rounded-full bg-ecom-orange" />
                <h2 className="mt-5 font-display text-3xl font-medium tracking-[-0.02em] text-ecom-ink sm:text-4xl">
                  {heading}
                </h2>
              </Reveal>
              <Reveal delay={0.1} className="mt-6 flex max-w-3xl flex-col gap-5 text-lg text-ecom-ink/70">
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph[lang]}</p>
                ))}
              </Reveal>
              {section.pullQuote && (
                <Reveal delay={0.15}>
                  <blockquote className="mt-8 max-w-2xl border-l-2 border-ecom-orange pl-6">
                    <p className="font-display text-2xl leading-snug text-ecom-ink sm:text-3xl">
                      “{section.pullQuote[lang]}”
                    </p>
                  </blockquote>
                </Reveal>
              )}
              {section.video && (
                <Reveal
                  delay={0.2}
                  className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[0_30px_80px_-40px_rgba(18,18,19,0.65)] ring-1 ring-ecom-ink/10"
                >
                  <video
                    src={section.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </Reveal>
              )}
              {!section.video && images.length === 1 && (
                <Reveal
                  delay={0.2}
                  className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl bg-ecom-ink/10 shadow-[0_30px_80px_-40px_rgba(18,18,19,0.65)] ring-1 ring-ecom-ink/10"
                >
                  <Image
                    src={images[0].src}
                    alt={images[0].alt?.[lang] ?? heading}
                    title={images[0].alt?.[lang] ?? heading}
                    fill
                    className="object-contain"
                  />
                </Reveal>
              )}
              {!section.video && images.length > 1 && (
                <Reveal
                  delay={0.2}
                  className={
                    section.imagesCols === 3
                      ? "mt-10 grid gap-6 sm:grid-cols-3"
                      : "mt-10 grid gap-6 sm:grid-cols-2"
                  }
                >
                  {images.map((image, i) => (
                    <div
                      key={image.src}
                      className={`group relative w-full overflow-hidden rounded-2xl bg-ecom-ink/10 shadow-[0_30px_70px_-30px_rgba(18,18,19,0.45)] ring-1 ring-ecom-ink/10 ${
                        section.imagesAspect === "square" ? "aspect-square" : "aspect-4/3"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt?.[lang] ?? `${heading} ${i + 1}`}
                        title={image.alt?.[lang] ?? `${heading} ${i + 1}`}
                        fill
                        className={`object-contain transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          image.hoverSrc
                            ? "group-hover:opacity-0"
                            : "group-hover:scale-105"
                        }`}
                      />
                      {image.hoverSrc && (
                        <Image
                          src={image.hoverSrc}
                          alt={image.hoverAlt?.[lang] ?? image.alt?.[lang] ?? `${heading} ${i + 1}`}
                          title={image.hoverAlt?.[lang] ?? image.alt?.[lang] ?? `${heading} ${i + 1}`}
                          fill
                          className="object-contain opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                        />
                      )}
                      {image.label && (
                        <div className="absolute inset-0 flex items-end bg-ecom-black/0 p-5 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-ecom-black/40 group-hover:opacity-100">
                          <span className="rounded-full bg-white/95 px-4 py-1.5 text-sm font-medium uppercase tracking-widest text-ecom-black">
                            {image.label[lang]}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </Reveal>
              )}
              {section.beforeAfter && (
                <Reveal delay={0.2} className="mt-10 grid gap-6 sm:grid-cols-2">
                  {([
                    ["before", section.beforeAfter.before],
                    ["after", section.beforeAfter.after],
                  ] as const).map(([side, sideImages]) => (
                    <div key={side} className="flex flex-col gap-6">
                      {sideImages.map((image) => (
                        <Image
                          key={image.src}
                          src={image.src}
                          alt={image.alt?.[lang] ?? heading}
                          title={image.alt?.[lang] ?? heading}
                          width={image.width}
                          height={image.height}
                          className="h-auto w-full rounded-2xl shadow-[0_30px_70px_-30px_rgba(18,18,19,0.45)] ring-1 ring-ecom-ink/10"
                        />
                      ))}
                    </div>
                  ))}
                </Reveal>
              )}
            </div>
          );
        })}

        {details?.results && (
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {details.results.map((result) => (
              <li key={result.en} className="rounded-xl border border-ecom-ink/10 p-5 text-ecom-ink/80">
                {result[lang]}
              </li>
            ))}
          </ul>
        )}

        {details?.gallery && details.gallery.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {details.gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-ecom-ink/10 shadow-[0_30px_70px_-30px_rgba(18,18,19,0.45)] ring-1 ring-ecom-ink/10"
              >
                <Image src={src} alt={project.name} fill className="object-contain" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
