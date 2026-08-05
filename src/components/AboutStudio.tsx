"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { team } from "@/lib/team";
import { useLanguage } from "@/components/LanguageProvider";

const TOTAL = team.length;
const AUTOPLAY_MS = 5500;

const imageVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    scale: 1.04,
    x: direction >= 0 ? 28 : -28,
  }),
  center: { opacity: 1, scale: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 0.97,
    x: direction >= 0 ? -28 : 28,
  }),
};

const badgeVariants: Variants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.35 } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
};

// The big background numeral moves a shorter distance than the foreground
// content on the same beat, so it reads as further back (parallax).
const numeralVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction >= 0 ? 10 : -10 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction >= 0 ? -10 : 10 }),
};

const textGroupVariants: Variants = {
  enter: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  center: { transition: { staggerChildren: 0.07 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const textItemVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: 14,
    x: direction >= 0 ? 16 : -16,
  }),
  center: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

export default function AboutStudio() {
  const { t, lang } = useLanguage();
  const [[index, direction], setIndex] = useState<[number, number]>([0, 1]);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const member = team[index];

  const goTo = (nextIndex: number) => {
    const wrapped = (nextIndex + TOTAL) % TOTAL;
    setIndex([wrapped, nextIndex > index ? 1 : -1]);
  };

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndex(([current]) => [(current + 1) % TOTAL, 1]);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, isPaused, prefersReducedMotion]);

  return (
    <section className="shell py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-right"
      >
        <p className="text-sm font-medium tracking-[0.2em] text-ecom-ink/50 uppercase">
          {t.aboutStudio.eyebrow}
        </p>
        <h2 className="mt-2 font-display text-5xl font-medium tracking-[-0.02em] text-ecom-ink sm:text-6xl lg:text-7xl">
          {t.aboutStudio.studioWord} <span className="text-ecom-orange">&#10038;</span>
        </h2>
      </motion.div>

      {/* `[&>*]:min-w-0` on the grid is load-bearing: grid items default to
          `min-width: auto`, so the roster rail's nowrap names below forced the
          copy column to its min-content width (500px inside a 327px grid on a
          375px phone) and dragged the whole document 149px wide.

          The photo column is bounded in rem rather than a fraction for a
          related reason: on the wider shell a `1fr` column grew to ~800px while
          the card stayed capped at 350px, marooning the portrait in empty
          space. */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        className="mt-12 grid gap-14 border-t border-ecom-ink/10 pt-20 [&>*]:min-w-0 lg:grid-cols-[minmax(20rem,30rem)_1fr] lg:items-center lg:gap-20 lg:pt-28"
      >
        {/* Photo stage: background numeral + stacked "next" card (tints orange on hover) + active card */}
        <div className="group relative mx-auto w-full max-w-[350px] lg:mx-0 lg:max-w-none">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-14 -left-6 select-none lg:-top-20 lg:-left-12"
          >
            <AnimatePresence mode="sync" custom={direction} initial={false}>
              <motion.span
                key={index}
                custom={direction}
                variants={numeralVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute top-0 left-0 font-display text-[7rem] leading-none font-medium text-ecom-orange/10 sm:text-[9rem] lg:text-[11rem]"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>

          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-4 scale-95 rounded-3xl bg-ecom-ink/5 transition-colors duration-300 group-hover:bg-ecom-orange"
          />

          <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-[0_30px_70px_-30px_rgba(18,18,19,0.45)] ring-1 ring-ecom-dark/5">
            <AnimatePresence mode="sync" custom={direction} initial={false}>
              <motion.div
                key={index}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className="absolute inset-0 rounded-3xl bg-linear-to-br from-ecom-dark to-ecom-orange hover:from-ecom-orange hover:to-ecom-dark"
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="320px"
                  priority={index === 0}
                  className="rounded-3xl object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                <Image
                  src={member.imgHover}
                  alt={member.name}
                  fill
                  sizes="320px"
                  className="rounded-3xl object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-3xl bg-linear-to-t from-ecom-black/70 via-transparent to-transparent"
                />
                <motion.span
                  variants={badgeVariants}
                  className="absolute bottom-4 left-4 rounded-full bg-ecom-black/70 px-4 py-1.5 text-xs font-medium tracking-widest text-white uppercase backdrop-blur"
                >
                  {member.role[lang]}
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Copy */}
        <div>
          <div className="relative min-h-48 overflow-hidden sm:min-h-40 lg:min-h-36">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={index}
                custom={direction}
                variants={textGroupVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.span
                  variants={textItemVariants}
                  className="block text-xs font-medium tracking-widest text-ecom-ink/50 uppercase"
                >
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(TOTAL).padStart(2, "0")}
                </motion.span>
                <motion.h3
                  variants={textItemVariants}
                  className="mt-3 font-display text-3xl font-medium text-ecom-orange sm:text-4xl"
                >
                  {member.name}
                </motion.h3>
                <motion.p
                  variants={textItemVariants}
                  className="mt-1 text-sm font-medium tracking-wide text-ecom-ink/50 uppercase"
                >
                  {member.role[lang]}
                </motion.p>
                <motion.p
                  variants={textItemVariants}
                  className="mt-4 max-w-md text-ecom-ink/70"
                >
                  {member.description[lang]}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Roster: prev/next + full name rail, doubles as navigation */}
          <div className="mt-8 flex items-center gap-5">
            <div className="flex shrink-0 items-center gap-3">
              <motion.button
                type="button"
                onClick={() => goTo(index - 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t.aboutStudio.prevAria}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ecom-ink/15 text-ecom-ink transition-colors hover:border-ecom-orange hover:text-ecom-orange"
              >
                &#8592;
              </motion.button>
              <motion.button
                type="button"
                onClick={() => goTo(index + 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t.aboutStudio.nextAria}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ecom-ink/15 text-ecom-ink transition-colors hover:border-ecom-orange hover:text-ecom-orange"
              >
                &#8594;
              </motion.button>
            </div>

            {/* Fades at the trailing edge so the names read as "scrolls on"
                rather than as text cut off by the viewport. */}
            <div className="scrollbar-none flex flex-1 items-center gap-5 overflow-x-auto [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:gap-6 sm:[mask-image:none]">
              {team.map((person, i) => (
                <button
                  key={person.name + i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={t.aboutStudio.viewAria(person.name)}
                  aria-current={i === index}
                  className={`shrink-0 whitespace-nowrap font-display transition-all duration-300 ${
                    i === index
                      ? "text-base text-ecom-orange sm:text-lg"
                      : "text-sm text-ecom-ink/35 hover:text-ecom-ink/60"
                  }`}
                >
                  {person.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 h-px w-full overflow-hidden bg-ecom-ink/10">
            <motion.div
              key={isPaused || prefersReducedMotion ? "paused" : index}
              initial={{ scaleX: 0 }}
              animate={
                isPaused || prefersReducedMotion ? { scaleX: 0 } : { scaleX: 1 }
              }
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
              className="h-full w-full origin-left bg-ecom-orange/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
