import Link from "next/link";
import { caseStudies } from "@/lib/work";
import Reveal from "@/components/Reveal";

export default function SelectWork() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <Reveal className="flex items-end justify-between gap-6">
        <h2 className="font-display text-4xl font-medium tracking-tight text-ecom-dark sm:text-6xl">
          Projects{" "}
          <span className="text-ecom-orange">Success</span>
        </h2>
        <Link
          href="/work"
          className="hidden text-sm font-medium tracking-wide text-ecom-orange uppercase hover:underline sm:inline"
        >
          All projects
        </Link>
      </Reveal>

      <div className="mt-16 flex flex-col gap-20 lg:mt-24 lg:gap-28">
        {caseStudies.slice(0, 2).map((project, i) => {
          const reverse = i % 2 === 1;
          return (
            <Reveal key={project.slug} delay={0.05}>
              <Link
                href={`/work/${project.slug}`}
                className={`group grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-ecom-dark to-ecom-black">
                  <div className="absolute inset-0 flex items-start justify-end p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ecom-cream text-ecom-dark transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      &#8599;
                    </span>
                  </div>
                  <div className="absolute inset-0 scale-100 bg-ecom-orange/0 transition-all duration-500 group-hover:scale-105 group-hover:bg-ecom-orange/5" />
                </div>

                <div>
                  <span className="text-xs font-medium tracking-widest text-ecom-dark/50 uppercase">
                    {String(i + 1).padStart(2, "0")} — {project.category}
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-medium text-ecom-dark transition-colors group-hover:text-ecom-orange sm:text-4xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-md text-ecom-dark/70">{project.blurb}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ecom-dark uppercase transition-colors group-hover:text-ecom-orange">
                    View project
                    <span aria-hidden>&rarr;</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-16 text-center sm:hidden">
        <Link
          href="/work"
          className="inline-flex text-sm font-medium tracking-wide text-ecom-orange uppercase hover:underline"
        >
          All projects
        </Link>
      </Reveal>
    </section>
  );
}
