"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/Reveal";
import { getFeaturedCaseStudies, categoryLabel, getProjectVideo, type CaseStudy } from "@/lib/work";
import { useLanguage } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n/types";
import { localizedHref, withTrailingSlash } from "@/lib/i18n/localizedHref";
import { useVideoAvailable } from "@/lib/useVideoAvailable";

const PROJECTS = getFeaturedCaseStudies();

const TOTAL = PROJECTS.length;

// Smaller than a card is tall, so consecutive cards overlap vertically and
// 2-3 sit in frame at once — reads as a scatter, not a list.
const SLIDE_VH = 36;

// Scroll budget beyond the slide track itself: head hold for the title, tail
// room for the last card to clear the top.
const SECTION_VH = TOTAL * SLIDE_VH + 150;

// Cards are wide (2:1) and run up to max-w-3xl (768px), which 50vw only covers
// past a 1536px viewport — hence 55vw rather than something narrower.
const IMAGE_SIZES = "(max-width: 1023px) 100vw, 55vw";

/**
 * Per-slide size/position on desktop (index 0 = first featured project, repeats
 * if more projects than entries) — the only thing controlling card placement; hand-tune each entry.
 */
const SLIDE_LAYOUT = [
  "max-w-3xl mr-auto lg:translate-x-6 lg:-translate-y-4",
  "max-w-2xl ml-auto lg:-translate-x-8 lg:translate-y-10",
  "max-w-3xl mr-auto lg:translate-x-28 lg:-translate-y-8",
  "max-w-xl ml-auto lg:-translate-x-32 lg:translate-y-6",
  "max-w-2xl mr-auto lg:translate-x-12 lg:-translate-y-10",
  "max-w-3xl ml-auto lg:-translate-x-10 lg:translate-y-4",
  "max-w-2xl mr-auto lg:translate-x-36 lg:-translate-y-6",
  "max-w-3xl ml-auto lg:-translate-x-20 lg:translate-y-8",
];

function projectLink(project: CaseStudy, lang: Lang) {
  return {
    href: project.external ? project.url : withTrailingSlash(localizedHref(lang, `/work/${project.slug}`)),
    ...(project.external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}),
  };
}

/** `className` comes from SLIDE_LAYOUT and is what sizes and places the card. */
function ProjectSlide({
  project,
  order,
  lang,
  className = "",
  onPreviewStart,
  onPreviewEnd,
  previewing,
}: {
  project: CaseStudy;
  order: number;
  lang: Lang;
  className?: string;
  /** Reports this card's artwork up so the ambient wash can pick it up. */
  onPreviewStart: (image: string | null) => void;
  /** Hands the same artwork back on leave so the parent can tell a genuine exit from a stale one. */
  onPreviewEnd: (image: string | null) => void;
  /** True while *any* card is hovered — headline dims section-wide. */
  previewing: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = getProjectVideo(project);
  const videoAvailable = useVideoAvailable(video);

  return (
    <div
      className="flex w-full shrink-0 items-center px-6 sm:px-14 lg:px-24"
      style={{ height: `${SLIDE_VH}vh` }}
    >
      <motion.a
        {...projectLink(project, lang)}
        initial="rest"
        whileHover="hover"
        onHoverStart={() => {
          onPreviewStart(project.image ?? null);
          // play() is async; if the pointer leaves before it resolves, the
          // resulting pause() rejects it with an AbortError — expected, not a bug.
          videoRef.current?.play().catch(() => {});
        }}
        onHoverEnd={() => {
          onPreviewEnd(project.image ?? null);
          videoRef.current?.pause();
          if (videoRef.current) videoRef.current.currentTime = 0;
        }}
        className={`group w-full ${className}`}
      >
        {/* 2:1 roughly matches the screenshots' native ratio, so object-cover trims a
            few percent instead of slicing off the sides. */}
        <div className="relative aspect-2/1 overflow-hidden rounded-3xl bg-linear-to-br from-ecom-dark to-ecom-black shadow-[0_30px_80px_-40px_rgba(18,18,19,0.65)] ring-1 ring-ecom-dark/10 transition-shadow duration-500 group-hover:shadow-[0_40px_90px_-35px_rgba(18,18,19,0.75)]">
          {project.image && (
            <Image
              src={project.image}
              alt={project.imageAlt?.[lang] ?? project.name}
              title={project.imageAlt?.[lang] ?? project.name}
              fill
              sizes={IMAGE_SIZES}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          )}
          {video && videoAvailable && (
            <motion.video
              ref={videoRef}
              src={video}
              muted
              loop
              playsInline
              preload="none"
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.3 }}
              style={{ objectPosition: project.videoPosition ?? "center" }}
              className="absolute inset-0 h-full w-full object-cover"
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
            <span className="text-sm font-medium tracking-widest text-ecom-orange uppercase">
              {String(order).padStart(2, "0")} — {categoryLabel(project.category, lang)}
            </span>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/80">
              {project.description[lang]}
            </p>
          </motion.div>
        </div>

        {/* Soft text-shadow halo separates the name from the pinned headline scrolling
            behind it, with no hard edge like a filled box would have. Dropped while
            previewing, since the headline is dimmed then. */}
        <h3
          className="mt-4 font-display text-xl font-medium text-ecom-ink transition-colors duration-300 group-hover:text-ecom-orange sm:text-2xl"
          style={{
            textShadow: previewing
              ? undefined
              : "0 0 8px var(--color-ecom-surface), 0 0 18px var(--color-ecom-surface), 0 0 28px var(--color-ecom-surface)",
          }}
        >
          {project.name}
        </h3>
      </motion.a>
    </div>
  );
}

/** Touch layout: category/description live under the artwork as real text
 *  instead of a hover-only overlay, which a finger can never trigger. */
function ProjectListItem({
  project,
  order,
  lang,
}: {
  project: CaseStudy;
  order: number;
  lang: Lang;
}) {
  return (
    <a {...projectLink(project, lang)} className="group block">
      <div className="relative aspect-2/1 overflow-hidden rounded-3xl bg-linear-to-br from-ecom-dark to-ecom-black shadow-[0_24px_60px_-40px_rgba(18,18,19,0.65)] ring-1 ring-ecom-dark/10">
        {project.image && (
          <Image
            src={project.image}
            alt={project.imageAlt?.[lang] ?? project.name}
            title={project.imageAlt?.[lang] ?? project.name}
            fill
            sizes={IMAGE_SIZES}
            className="object-cover"
          />
        )}
        <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ecom-black shadow-sm">
          &#8599;
        </span>
      </div>

      <span className="mt-4 block text-sm font-medium tracking-widest text-ecom-orange uppercase">
        {String(order).padStart(2, "0")} — {categoryLabel(project.category, lang)}
      </span>
      <h3 className="mt-1.5 font-display text-2xl font-medium tracking-[-0.01em] text-ecom-ink">
        {project.name}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ecom-ink/70">
        {project.description[lang]}
      </p>
    </a>
  );
}

function SeeAllProjects({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex items-center gap-2.5 rounded-full bg-ecom-dark px-7 py-3.5 text-sm font-medium text-white uppercase tracking-wide shadow-lg shadow-ecom-dark/20 transition-colors duration-300 hover:bg-ecom-orange ${className}`}
    >
      {label}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        &#8599;
      </span>
    </motion.a>
  );
}

export default function Projects() {
  const { t, lang } = useLanguage();
  const seeAllHref = withTrailingSlash(localizedHref(lang, "/work"));
  // Artwork of the card currently under the pointer, or null. Desktop only —
  // the touch layout has no hover to drive it.
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const previewing = hoveredImage !== null;
  const containerRef = useRef<HTMLDivElement>(null);

  // Leave events routinely land after the next card's enter event (cards overlap
  // and the track moves), so only the card still showing gets to retract its preview.
  const endPreview = (image: string | null) =>
    setHoveredImage((current) => (current === image ? null : current));
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // One straight line from "parked a viewport below" to "last project cleared the
  // top edge", reached as the section releases — every pixel of pinned scroll moves the track.
  const trackY = useTransform(
    scrollYProgress,
    [0, 1],
    ["100vh", `-${TOTAL * SLIDE_VH}vh`],
  );

  return (
    <>
      {/* Touch/small screens. The pinned version is desktop-only: at this width cards
          span the full column and cover the title, turning the pin into stuck-feeling scroll. */}
      <section className="bg-ecom-surface px-6 py-20 sm:px-10 lg:hidden">
        <Reveal className="text-center">
          <h2 className="font-display text-5xl leading-[0.9] font-medium tracking-[-0.03em] text-ecom-ink sm:text-6xl">
            {t.selectWork.headline}
            <br />
            <span className="text-ecom-orange">{t.selectWork.headlineAccent}</span>
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-14">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={0.05}>
              <ProjectListItem project={project} order={i + 1} lang={lang} />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <SeeAllProjects href={seeAllHref} label={t.selectWork.seeAll} />
        </div>
      </section>

      {/* Desktop: pinned title with the projects scrolling across it. */}
      <section
        ref={containerRef}
        className="relative hidden bg-ecom-surface lg:block"
        style={{ height: `${SECTION_VH}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Ambient wash: blurred copy of the hovered card's artwork, tinting the pinned
              frame with that project's palette. translateZ(0)/will-change promote it to
              its own layer — animating opacity without that re-ran the blur every frame and froze the page. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-cover bg-center transition-opacity duration-500 ease-out"
            style={{
              backgroundImage: hoveredImage ? `url("${hoveredImage}")` : undefined,
              opacity: hoveredImage ? 0.55 : 0,
              // saturate() boost: these are mostly white-UI screenshots, which blur into a
              // grey haze otherwise. Drop to 1 for a flatter, more neutral wash.
              filter: "blur(64px) saturate(1.4)",
              transform: "translateZ(0)",
              willChange: "opacity",
            }}
          />

          {/* Title: bottom-most layer, stays put for the whole section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center text-center"
          >
            {/* Dims while a card is previewed, so it doesn't compete with the wash's tint
                and lets card captions drop their surface slab. Nested, not on the parent,
                so whileInView above keeps ownership of first-sight opacity. */}
            <div
              className={`transition-opacity duration-500 ease-out ${
                previewing ? "opacity-20" : "opacity-100"
              }`}
            >
              <h2 className="font-display text-5xl leading-[0.9] font-medium tracking-[-0.03em] text-ecom-ink sm:text-7xl lg:text-[9rem]">
                {t.selectWork.headline}
                <br />
                <span className="text-ecom-orange">{t.selectWork.headlineAccent}</span>
              </h2>
            </div>
          </motion.div>

          {/* Projects: middle layer. Which ones appear is the `featured` flag in
              src/lib/work.ts; where each lands is SLIDE_LAYOUT above. */}
          <motion.div
            style={{ y: trackY }}
            className="relative z-10 flex h-full flex-col"
          >
            {PROJECTS.map((project, i) => (
              <ProjectSlide
                key={project.slug}
                project={project}
                order={i + 1}
                lang={lang}
                className={SLIDE_LAYOUT[i % SLIDE_LAYOUT.length]}
                onPreviewStart={setHoveredImage}
                onPreviewEnd={endPreview}
                previewing={previewing}
              />
            ))}
          </motion.div>

          {/* CTA: top-most layer, pinned to the bottom only for this section */}
          <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-4">
            <div className="h-px w-32 overflow-hidden rounded-full bg-ecom-ink/15">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full w-full origin-left bg-ecom-orange"
              />
            </div>
            <SeeAllProjects href={seeAllHref} label={t.selectWork.seeAll} className="pointer-events-auto" />
          </div>
        </div>
      </section>
    </>
  );
}
