"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { getFeaturedCaseStudies, type CaseStudy } from "@/lib/work";

const PROJECTS = getFeaturedCaseStudies();

const TOTAL = PROJECTS.length;

// Fraction of the pinned scroll spent holding the title alone, with every
// project still parked off-screen below, before the first one is let in.
const HOLD = 0.18;

// Height of each project's slide, in vh. Kept below 100 so the tail of the
// previous card and the head of the next are both visible around the one
// centered in frame — keeps consecutive projects feeling close together
// instead of each hogging the full screen alone.
const SLIDE_VH = 50;

// Extra 100vh at the head (title-only hold) and tail (room for the last
// project to fully clear the top) beyond the slide track itself.
const SECTION_VH = TOTAL * SLIDE_VH + 200;

/**
 * className here is the ONLY thing controlling this card's size/position.
 * Each project below is authored individually (not looped) specifically so
 * its position can be hand-tuned independently of the others:
 * - width:   max-w-* (e.g. max-w-md / max-w-lg / max-w-xl / max-w-2xl)
 * - side:    mr-auto (left) / ml-auto (right) / mx-auto (center)
 * - nudge:   lg:translate-x-*, lg:-translate-x-*, lg:translate-y-*, lg:-translate-y-*
 */
function ProjectSlide({
  project,
  order,
  className = "",
}: {
  project: CaseStudy;
  order: number;
  className?: string;
}) {
  const href = project.external ? project.url : `/work/${project.slug}`;
  const external = project.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div
      className="flex w-full shrink-0 items-center px-6 sm:px-14 lg:px-24"
      style={{ height: `${SLIDE_VH}vh` }}
    >
      <motion.a
        href={href}
        {...external}
        initial="rest"
        whileHover="hover"
        className={`group w-full ${className}`}
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-linear-to-br from-ecom-dark to-ecom-black shadow-[0_30px_80px_-40px_rgba(18,18,19,0.65)] ring-1 ring-ecom-dark/10 transition-shadow duration-500 group-hover:shadow-[0_40px_90px_-35px_rgba(18,18,19,0.75)]">
          {project.image && (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          )}
          <div className="absolute inset-0 flex items-start justify-end p-4">
            {/* Sits on the artwork, so it stays a light pill in every theme */}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ecom-black shadow-sm transition-all duration-300 group-hover:bg-ecom-orange group-hover:text-white">
              &#8599;
            </span>
          </div>

          {/* Classification + description: hidden until hover */}
          <motion.div
            variants={{
              rest: { opacity: 0, y: 16 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-ecom-black/90 via-ecom-black/50 to-transparent p-6"
          >
            <span className="text-xs font-medium tracking-widest text-ecom-orange uppercase">
              {String(order).padStart(2, "0")} — {project.category}
            </span>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/80">
              {project.description}
            </p>
          </motion.div>
        </div>

        <h3 className="mt-5 font-display text-xl font-medium text-ecom-ink transition-colors duration-300 group-hover:text-ecom-orange sm:text-2xl">
          {project.name}
        </h3>
      </motion.a>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 0 -> HOLD: parked one viewport below (fully hidden), title stays alone.
  // HOLD -> 1: slides up continuously until the last project has completely
  // cleared the top edge, right as the section releases.
  const trackY = useTransform(
    scrollYProgress,
    [0, HOLD, 1],
    ["100vh", "100vh", `-${TOTAL * SLIDE_VH}vh`],
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-ecom-surface"
      style={{ height: `${SECTION_VH}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Title: bottom-most layer, stays put for the whole section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center text-center"
        >
          <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-ink/50 uppercase">
            Our
          </p>
          <h2 className="mt-3 font-display text-5xl leading-[0.9] font-medium tracking-[-0.03em] text-ecom-ink sm:text-7xl lg:text-[9rem]">
            Projects
            <br />
            <span className="text-ecom-orange">Success</span>
          </h2>
        </motion.div>

        {/* Projects: middle layer, opaque cards pass in front of the title.
            Which projects show up here is controlled by the `featured` flag
            in src/lib/work.ts, in the order it appears there — but each
            slide below is written out by hand (no .map()) so its size and
            scattered "bento" position can be tuned on its own. Add or
            remove a block here to match the featured list in that file. */}
        <motion.div
          style={{ y: trackY }}
          className="relative z-10 flex h-full flex-col"
        >
          {/* Rhythm: outer-left small -> outer-right large -> inner-left
              large -> inner-right small. Alternating sides keep it readable
              while the size/indent variation stops it feeling like a column. */}
          {PROJECTS[0] && (
            <ProjectSlide
              project={PROJECTS[0]}
              order={1}
              className="max-w-md mr-auto lg:translate-x-10 lg:-translate-y-8"
            />
          )}
          {PROJECTS[1] && (
            <ProjectSlide
              project={PROJECTS[1]}
              order={2}
              className="max-w-xl ml-auto lg:-translate-x-10 lg:translate-y-10"
            />
          )}
          {PROJECTS[2] && (
            <ProjectSlide
              project={PROJECTS[2]}
              order={3}
              className="max-w-xl mr-auto lg:translate-x-28 lg:-translate-y-6"
            />
          )}
          {PROJECTS[3] && (
            <ProjectSlide
              project={PROJECTS[3]}
              order={4}
              className="max-w-md ml-auto lg:-translate-x-28 lg:translate-y-12"
            />
          )}
        </motion.div>

        {/* CTA: top-most layer, pinned to the bottom only for this section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-4">
          <div className="h-px w-32 overflow-hidden rounded-full bg-ecom-ink/15">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full w-full origin-left bg-ecom-orange"
            />
          </div>
          <motion.a
            href="/work"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group pointer-events-auto inline-flex items-center gap-2.5 rounded-full bg-ecom-dark px-7 py-3.5 text-sm font-medium text-white uppercase tracking-wide shadow-lg shadow-ecom-dark/20 transition-colors duration-300 hover:bg-ecom-orange"
          >
            See all projects
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              &#8599;
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
