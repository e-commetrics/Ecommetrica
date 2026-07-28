import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work | Ecommetrica",
  description: "Proyectos de branding y desarrollo web de Ecommetrica.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
        Work
      </p>
      <h1 className="mt-6 max-w-2xl font-display text-4xl font-medium tracking-tight text-ecom-dark sm:text-5xl">
        Proyectos que construyen ecosistemas digitales sostenibles.
      </h1>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {caseStudies.map((project) => {
          const href = project.external ? project.url : `/work/${project.slug}`;
          const external = project.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <Link
              key={project.slug}
              href={href}
              {...external}
              className="group flex flex-col justify-between rounded-2xl border border-ecom-dark/10 bg-white/40 p-8 transition-colors hover:border-ecom-orange/40"
            >
              <div>
                <p className="text-xs font-medium tracking-widest text-ecom-dark/50 uppercase">
                  {project.category}
                </p>
                <h2 className="mt-3 font-display text-2xl font-medium text-ecom-dark">
                  {project.name}
                </h2>
                <p className="mt-4 text-ecom-dark/70">{project.blurb}</p>
              </div>
              <span className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium tracking-wide text-ecom-dark uppercase transition-colors group-hover:text-ecom-orange">
                {project.external ? "Visit site" : "View full branding"}
                <span aria-hidden>&rarr;</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
