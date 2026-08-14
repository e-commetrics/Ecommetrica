"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { categoryLabel, hasTestimonial, type CaseStudy, type CategoryId } from "@/lib/work";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";
import type { Lang } from "@/lib/i18n/types";

const ALL = "__all__";

/** Category order follows first appearance in `caseStudies` — reordering that
 *  array reorders both the filter chips and the sections. */
function categoriesOf(projects: CaseStudy[]) {
  const counts = new Map<CategoryId, number>();
  for (const project of projects) {
    counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
  }
  return [...counts];
}

function groupByCategory(projects: CaseStudy[]) {
  const groups = new Map<CategoryId, CaseStudy[]>();
  for (const project of projects) {
    const group = groups.get(project.category);
    if (group) group.push(project);
    else groups.set(project.category, [project]);
  }
  return [...groups];
}

function ProjectCard({
  project,
  lang,
  viewProjectLabel,
  visitSiteLabel,
}: {
  project: CaseStudy;
  lang: Lang;
  viewProjectLabel: string;
  visitSiteLabel: string;
}) {
  const href = project.external ? project.url : localizedHref(lang, `/work/${project.slug}`);
  const external = project.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    // No card chrome: image sits straight on the page, title reads as a label under it.
    <Link
      href={href}
      {...external}
      aria-label={`${project.name} — ${project.external ? visitSiteLabel : viewProjectLabel}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ecom-ink/10">
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        )}
      </div>

      <h3 className="mt-6 flex items-center gap-2.5 font-display text-2xl font-medium tracking-[-0.01em] text-ecom-ink transition-colors duration-300 group-hover:text-ecom-orange sm:text-3xl">
        <span className="relative">
          {project.name}
          {/* Underline grows from the left on hover — the rule is drawn here
              rather than with `underline` so it can animate. */}
          <span
            aria-hidden
            className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-100 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-0"
          />
          <span
            aria-hidden
            className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-ecom-orange transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
          />
        </span>
        <span
          aria-hidden
          className="shrink-0 text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          {project.external ? "↗" : "→"}
        </span>
      </h3>

      <p className="mt-4 max-w-prose text-sm leading-relaxed text-ecom-ink/60">
        {project.description[lang]}
      </p>
    </Link>
  );
}

export default function WorkGallery({ projects }: { projects: CaseStudy[] }) {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState<string>(ALL);
  const [testimonialsOnly, setTestimonialsOnly] = useState(false);

  const testimonials = useMemo(() => projects.filter(hasTestimonial), [projects]);

  /* Toggle narrows the pool first, category chips count within it — otherwise a
     chip could advertise "Medical 06" and render two cards. */
  const pool = testimonialsOnly ? testimonials : projects;

  const categories = useMemo(() => categoriesOf(pool), [pool]);

  const groups = useMemo(() => {
    const visible =
      active === ALL ? pool : pool.filter((project) => project.category === active);
    return groupByCategory(visible);
  }, [pool, active]);

  function toggleTestimonials() {
    const next = !testimonialsOnly;
    // Narrowing to testimonials can empty the selected category, which would
    // leave a chip selected above nothing at all. Fall back to "all".
    if (next && !testimonials.some((project) => project.category === active)) {
      setActive(ALL);
    }
    setTestimonialsOnly(next);
  }

  const chips: [string, number, string][] = [
    [ALL, pool.length, t.workGallery.all],
    ...categories.map(([id, count]): [string, number, string] => [
      id,
      count,
      categoryLabel(id, lang),
    ]),
  ];

  return (
    <>
      <div className="mt-12 flex flex-wrap items-center gap-2.5">
        <div
          role="group"
          aria-label={t.workGallery.filterAriaLabel}
          className="flex flex-wrap gap-2.5"
        >
          {chips.map(([id, count, label]) => {
            const selected = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                aria-pressed={selected}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                  selected
                    ? "border-ecom-orange bg-ecom-orange text-white"
                    : "border-ecom-ink/15 text-ecom-ink/70 hover:border-ecom-orange/40 hover:text-ecom-ink"
                }`}
              >
                {label}
                <span className={selected ? "text-white/70" : "text-ecom-ink/40"}>
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        {/* Outlined "on" state, not solid fill, so it doesn't read as part of the category radio group. */}
        {testimonials.length > 0 && (
          <>
            <span aria-hidden className="mx-1 hidden h-6 w-px bg-ecom-ink/15 sm:block" />
            <button
              type="button"
              onClick={toggleTestimonials}
              aria-pressed={testimonialsOnly}
              aria-label={t.workGallery.withTestimonialAriaLabel}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                testimonialsOnly
                  ? "border-ecom-orange bg-ecom-orange/10 text-ecom-orange"
                  : "border-ecom-ink/15 text-ecom-ink/70 hover:border-ecom-orange/40 hover:text-ecom-ink"
              }`}
            >
              <PlayIcon className="h-2.5 w-2.5" />
              {t.workGallery.withTestimonial}
              <span className={testimonialsOnly ? "text-ecom-orange/60" : "text-ecom-ink/40"}>
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </button>
          </>
        )}
      </div>

      {/* Keyed on the active filter so the results fade in on each change
          rather than snapping to a different list in place. */}
      <motion.div
        key={`${active}-${testimonialsOnly}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {groups.map(([category, categoryProjects]) => (
          <section key={category} className="mt-16">
            <h2 className="flex items-baseline gap-4 border-b border-ecom-ink/10 pb-5 font-display text-sm font-medium tracking-[0.2em] text-ecom-ink/60 uppercase">
              {categoryLabel(category, lang)}
              <span className="text-sm text-ecom-ink/45">
                {String(categoryProjects.length).padStart(2, "0")}
              </span>
            </h2>

            <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:gap-x-10">
              {categoryProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  lang={lang}
                  viewProjectLabel={t.workGallery.viewProject}
                  visitSiteLabel={t.workGallery.visitSite}
                />
              ))}
            </div>
          </section>
        ))}
      </motion.div>
    </>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M4 2.5v11l10-5.5-10-5.5z" />
    </svg>
  );
}
