"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { categoryLabel, type CaseStudy, type CategoryId } from "@/lib/work";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";
import type { Lang } from "@/lib/i18n/types";

const ALL = "__all__";

/**
 * Category order follows the order categories first appear in `caseStudies`,
 * so reordering that array reorders both the filter chips and the sections.
 */
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
    <Link
      href={href}
      {...external}
      className="group flex flex-col justify-between rounded-3xl border border-ecom-ink/10 bg-ecom-ink/[0.03] p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-ecom-orange/40 hover:bg-ecom-ink/[0.06] hover:shadow-[0_30px_70px_-45px_rgba(18,18,19,0.5)]"
    >
      <div>
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ecom-ink/10">
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
        <h3 className="mt-7 font-display text-2xl font-medium tracking-[-0.01em] text-ecom-ink transition-colors duration-300 group-hover:text-ecom-orange">
          {project.name}
        </h3>
        <p className="mt-4 leading-relaxed text-ecom-ink/70">
          {project.description[lang]}
        </p>
      </div>
      <span className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium tracking-wide text-ecom-ink uppercase transition-colors duration-300 group-hover:text-ecom-orange">
        {project.external ? visitSiteLabel : viewProjectLabel}
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}

export default function WorkGallery({ projects }: { projects: CaseStudy[] }) {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState<string>(ALL);

  const categories = useMemo(() => categoriesOf(projects), [projects]);

  const groups = useMemo(() => {
    const visible =
      active === ALL
        ? projects
        : projects.filter((project) => project.category === active);
    return groupByCategory(visible);
  }, [projects, active]);

  const chips: [string, number, string][] = [
    [ALL, projects.length, t.workGallery.all],
    ...categories.map(([id, count]): [string, number, string] => [
      id,
      count,
      categoryLabel(id, lang),
    ]),
  ];

  return (
    <>
      <div
        role="group"
        aria-label={t.workGallery.filterAriaLabel}
        className="mt-12 flex flex-wrap gap-2.5"
      >
        {chips.map(([id, count, label]) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              aria-pressed={selected}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${
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

      {/* Keyed on the active filter so the results fade in on each change
          rather than snapping to a different list in place. */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {groups.map(([category, categoryProjects]) => (
          <section key={category} className="mt-16">
            <h2 className="flex items-baseline gap-4 border-b border-ecom-ink/10 pb-5 font-display text-sm font-medium tracking-[0.2em] text-ecom-ink/60 uppercase">
              {categoryLabel(category, lang)}
              <span className="text-xs text-ecom-ink/35">
                {String(categoryProjects.length).padStart(2, "0")}
              </span>
            </h2>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
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
