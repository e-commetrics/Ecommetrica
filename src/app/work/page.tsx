import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work | Ecommetrica",
  description: "Proyectos de branding y desarrollo web de Ecommetrica.",
};

// Grouped by category, in the order the categories first appear in
// `caseStudies` — so reordering that array reorders this page.
function groupByCategory(projects: CaseStudy[]) {
  const groups = new Map<string, CaseStudy[]>();
  for (const project of projects) {
    const group = groups.get(project.category);
    if (group) group.push(project);
    else groups.set(project.category, [project]);
  }
  return [...groups];
}

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
        Work
      </p>
      <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-medium tracking-[-0.02em] text-ecom-ink sm:text-5xl lg:text-6xl">
        Proyectos que construyen ecosistemas digitales sostenibles.
      </h1>

      {groupByCategory(caseStudies).map(([category, projects]) => (
        <section key={category} className="mt-20">
          <h2 className="flex items-baseline gap-4 border-b border-ecom-ink/10 pb-5 font-display text-sm font-medium tracking-[0.2em] text-ecom-ink/60 uppercase">
            {category}
            <span className="text-xs text-ecom-ink/35">
              {String(projects.length).padStart(2, "0")}
            </span>
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {projects.map((project) => {
              const href = project.external
                ? project.url
                : `/work/${project.slug}`;
              const external = project.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <Link
                  key={project.slug}
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
                      {project.description}
                    </p>
                  </div>
                  <span className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium tracking-wide text-ecom-ink uppercase transition-colors duration-300 group-hover:text-ecom-orange">
                    {project.external ? "Visit site" : "Ver proyecto"}
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
