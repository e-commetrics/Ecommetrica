"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/Reveal";
import { getFeaturedCaseStudies, categoryLabel, type CaseStudy } from "@/lib/work";
import { useLanguage } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n/types";
import { localizedHref } from "@/lib/i18n/localizedHref";
import { useVideoAvailable } from "@/lib/useVideoAvailable";

const PROJECTS = getFeaturedCaseStudies();

const TOTAL = PROJECTS.length;

// Fraction of the pinned scroll spent holding the title alone, with every
// project still parked off-screen below, before the first one is let in.
const HOLD = 0.18;

// Height of each project's slide, in vh. Deliberately smaller than a card is
// tall (a 2:1 card at these widths runs ~32-42vh) so consecutive cards overlap
// vertically instead of queueing up one per screen — two or three are in frame
// at once, which is what makes the track read as a scatter rather than a list.
const SLIDE_VH = 40;

// Extra 100vh at the head (title-only hold) and tail (room for the last
// project to fully clear the top) beyond the slide track itself.
const SECTION_VH = TOTAL * SLIDE_VH + 200;

// Cards are wide (2:1) and run up to max-w-2xl, so on a 1500px screen the
// largest is ~670px — 40vw would under-serve it.
const IMAGE_SIZES = "(max-width: 1023px) 100vw, 50vw";

/**
 * Per-slide size and position on desktop, applied in order — index 0 is the
 * first featured project. This is the ONLY thing controlling where a card
 * lands, and each entry is meant to be hand-tuned on its own:
 * - width:  max-w-lg (small) / max-w-xl (medium) / max-w-2xl (large)
 * - side:   mr-auto (left) / ml-auto (right)
 * - nudge:  lg:translate-x-*, lg:-translate-x-*, lg:translate-y-*, lg:-translate-y-*
 *
 * The rhythm alternates sides while varying width and indent, so no two
 * neighbours share an edge and the column never straightens out. Widths stay
 * at or under max-w-2xl on purpose: anything larger blankets the pinned title
 * behind it instead of passing across it. If there are more featured projects
 * than entries here the list simply repeats.
 */
const SLIDE_LAYOUT = [
  "max-w-xl mr-auto lg:translate-x-4 lg:-translate-y-6",
  "max-w-2xl ml-auto lg:-translate-x-6 lg:translate-y-8",
  "max-w-lg mr-auto lg:translate-x-36 lg:-translate-y-4",
  "max-w-2xl ml-auto lg:-translate-x-28 lg:translate-y-10",
  "max-w-lg mr-auto lg:translate-x-8 lg:-translate-y-8",
  "max-w-xl ml-auto lg:-translate-x-40 lg:translate-y-6",
  "max-w-2xl mr-auto lg:translate-x-20 lg:-translate-y-4",
  "max-w-lg ml-auto lg:-translate-x-10 lg:translate-y-8",
];

function projectLink(project: CaseStudy, lang: Lang) {
  return {
    href: project.external ? project.url : localizedHref(lang, `/work/${project.slug}`),
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
  /** Hands the same artwork back on leave, so the parent can tell a genuine
   *  exit from a stale one — see the note on the handler in Projects. */
  onPreviewEnd: (image: string | null) => void;
  /** True while *any* card is hovered, not just this one — the headline is
   *  dimmed section-wide, so every caption drops its slab together. */
  previewing: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoAvailable = useVideoAvailable(project.video);

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
        {/* 2:1 is roughly the native ratio of the screenshots in /projects and
            /Works (1.9–2.1), so object-cover trims a few percent rather than
            slicing the sides off a full-width web page. */}
        <div className="relative aspect-2/1 overflow-hidden rounded-3xl bg-linear-to-br from-ecom-dark to-ecom-black shadow-[0_30px_80px_-40px_rgba(18,18,19,0.65)] ring-1 ring-ecom-dark/10 transition-shadow duration-500 group-hover:shadow-[0_40px_90px_-35px_rgba(18,18,19,0.75)]">
          {project.image && (
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes={IMAGE_SIZES}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          )}
          {project.video && videoAvailable && (
            <motion.video
              ref={videoRef}
              src={project.video}
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
            <span className="text-xs font-medium tracking-widest text-ecom-orange uppercase">
              {String(order).padStart(2, "0")} — {categoryLabel(project.category, lang)}
            </span>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/80">
              {project.description[lang]}
            </p>
          </motion.div>
        </div>

        {/* The pinned headline scrolls behind this in the very same ink color
            and swallows the name wherever the two cross.

            This used to carry a solid slab of surface colour to punch through
            it, but a filled box has a visible edge: it reads as a rectangle cut
            out of the headline, and the moment the wash tints the section that
            rectangle stays the old colour. A soft halo does the same job with
            no edge to notice — it only registers where dark letterforms sit
            directly behind the name, and is invisible against bare surface.

            Dropped entirely while previewing: the headline is dimmed then (see
            the title layer), so there is nothing left to separate from. */}
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

/**
 * Touch layout. Deliberately not the pinned one: category and description live
 * under the artwork as real text instead of inside a hover-only overlay, which
 * a finger can never trigger.
 */
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
            alt={project.name}
            fill
            sizes={IMAGE_SIZES}
            className="object-cover"
          />
        )}
        <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ecom-black shadow-sm">
          &#8599;
        </span>
      </div>

      <span className="mt-4 block text-xs font-medium tracking-widest text-ecom-orange uppercase">
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
  const seeAllHref = localizedHref(lang, "/work");
  // Artwork of the card currently under the pointer, or null. Desktop only —
  // the touch layout has no hover to drive it.
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const previewing = hoveredImage !== null;
  const containerRef = useRef<HTMLDivElement>(null);

  // Cards overlap and the track is in constant motion under the pointer, so
  // leave events routinely land *after* the enter event of the card taking
  // over. Clearing unconditionally would wipe the incoming card's artwork and
  // leave the wash off while a card is plainly hovered. Only the card still
  // showing gets to retract it.
  const endPreview = (image: string | null) =>
    setHoveredImage((current) => (current === image ? null : current));
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
    <>
      {/* ---------------------------------------------------------------
          Touch / small screens. The pinned version below is desktop-only
          on purpose: at this width the cards span the full column, so they
          completely cover the title behind them, and the pin turns four
          cards into ~4 screens of scrolling that barely moves the page —
          which reads as the scroll being stuck.
          --------------------------------------------------------------- */}
      <section className="bg-ecom-surface px-6 py-20 sm:px-10 lg:hidden">
        <Reveal className="text-center">
          <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-ink/50 uppercase">
            {t.selectWork.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-5xl leading-[0.9] font-medium tracking-[-0.03em] text-ecom-ink sm:text-6xl">
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

      {/* ---------------------------------------------------------------
          Desktop: pinned title with the projects scrolling across it.
          --------------------------------------------------------------- */}
      <section
        ref={containerRef}
        className="relative hidden bg-ecom-surface lg:block"
        style={{ height: `${SECTION_VH}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Ambient wash: a hugely blurred copy of the hovered card's artwork,
              so the pinned frame takes on that project's palette.

              The downward fade is the blur itself, not a gradient — filter:
              blur() blurs the alpha channel too, so this box's own bottom edge
              dissolves over roughly the blur radius. That is why it stops at
              70% height: the soft edge lands mid-screen where it is visible,
              while the other three sit on the viewport edges once the section
              is pinned, so `overflow-hidden` cropping them never shows.

              First in the DOM and unpositioned in z, so the title and cards
              below paint over it without needing a stacking order.

              PERFORMANCE, and it is not optional here. A blur this wide over a
              full-width box is expensive enough that animating opacity on it
              re-ran the filter every frame and locked the compositor — it froze
              the page solid in testing. `translateZ(0)` + `will-change:opacity`
              promote it to its own layer, so the blurred result rasterises once
              and the transition only animates that layer's alpha. The radius is
              also well below the 110px first tried: past a point a wider blur
              costs more without looking any more diffuse. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-cover bg-center transition-opacity duration-500 ease-out"
            style={{
              backgroundImage: hoveredImage ? `url("${hoveredImage}")` : undefined,
              opacity: hoveredImage ? 0.55 : 0,
              // saturate() because these are web-page screenshots, not the
              // saturated photography this effect is usually built on: most of
              // them are largely white UI, which averages out to a grey haze
              // once blurred. The boost is what makes a project's palette
              // actually read. Drop it to 1 for a flatter, more neutral wash.
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
            {/* Recedes while a card is previewed. Two reasons: at full strength
                it competes with the wash carrying that project's colour, and it
                is what swallows the card captions crossing it — dimming it is
                what lets those captions drop their surface slab, which would
                otherwise sit on the tinted background as a pale rectangle.
                Nested rather than animated on the parent so the whileInView
                reveal above keeps ownership of opacity on first sight. */}
            <div
              className={`transition-opacity duration-500 ease-out ${
                previewing ? "opacity-20" : "opacity-100"
              }`}
            >
              <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-ink/50 uppercase">
                {t.selectWork.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-5xl leading-[0.9] font-medium tracking-[-0.03em] text-ecom-ink sm:text-7xl lg:text-[9rem]">
                {t.selectWork.headline}
                <br />
                <span className="text-ecom-orange">{t.selectWork.headlineAccent}</span>
              </h2>
            </div>
          </motion.div>

          {/* Projects: middle layer, opaque cards pass in front of the title.
              Which projects appear is the `featured` flag in src/lib/work.ts,
              in the order they sit in that array; where each one lands is the
              matching entry in SLIDE_LAYOUT above. Adding a featured project
              needs no change here — add a layout entry if you want its slot
              tuned rather than recycled from the top of the list. */}
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
