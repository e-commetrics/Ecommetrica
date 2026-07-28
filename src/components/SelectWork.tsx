import Link from "next/link";
import { caseStudies } from "@/lib/work";
import Reveal from "@/components/Reveal";

export default function SelectWork() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="flex items-end justify-between gap-6">
        <h2 className="flex items-center gap-2 font-display text-sm font-medium tracking-[0.2em] text-ecom-dark/60 uppercase">
          Select work
          <span aria-hidden className="text-lg text-ecom-orange">
            &#10038;
          </span>
        </h2>
        <Link
          href="/work"
          className="text-sm font-medium text-ecom-orange hover:underline"
        >
          View all work
        </Link>
      </div>

      <div className="mt-10 grid items-start gap-8 md:grid-cols-2">
        {caseStudies.slice(0, 2).map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.12}>
            <article className="group flex flex-col">
              <Link
                href={`/work/${project.slug}`}
                className="relative flex aspect-[4/3] items-start justify-end overflow-hidden rounded-2xl bg-gradient-to-br from-ecom-dark to-ecom-black p-4 transition-transform duration-500 group-hover:scale-[1.01]"
              >
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ecom-cream text-ecom-dark transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  &#8599;
                </span>
              </Link>
              <h3 className="mt-5 font-display text-2xl font-medium text-ecom-dark">
                {project.name}
              </h3>
              <p className="mt-3 text-ecom-dark/70">{project.blurb}</p>
              <Link
                href={`/work/${project.slug}`}
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-ecom-dark/20 px-4 py-2 text-xs font-medium tracking-wide text-ecom-dark uppercase transition-colors group-hover:border-ecom-orange group-hover:text-ecom-orange"
              >
                View full branding
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
