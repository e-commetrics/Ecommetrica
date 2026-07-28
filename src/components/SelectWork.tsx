import Link from "next/link";
import { caseStudies } from "@/lib/work";

export default function SelectWork() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-display text-sm font-medium uppercase tracking-[0.2em] text-ecom-dark/60">
          Select work
        </h2>
        <Link
          href="/work"
          className="text-sm font-medium text-ecom-red hover:underline"
        >
          View all work
        </Link>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {caseStudies.map((project) => (
          <article
            key={project.slug}
            className="group flex flex-col justify-between rounded-2xl border border-ecom-dark/10 bg-white/40 p-8 transition-colors hover:border-ecom-red/40"
          >
            <div>
              <h3 className="font-display text-2xl font-medium text-ecom-dark">
                {project.name}
              </h3>
              <p className="mt-4 text-ecom-dark/70">{project.blurb}</p>
            </div>
            <Link
              href={`/work/${project.slug}`}
              className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-wide text-ecom-dark transition-colors group-hover:text-ecom-red"
            >
              View full branding
              <span aria-hidden>&rarr;</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
