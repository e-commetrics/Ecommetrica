"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";
import { smoothScrollTo } from "@/components/SmoothScroll";
import type { Lang } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;
const CYCLE_MS = 3200;
const VISIBLE = 4;

export type BlogHeroPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
};

function Counter({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion) { el.textContent = String(value); return; }
    const controls = animate(0, value, { duration: 1.4, delay, ease: EASE, onUpdate: (v) => (el.textContent = String(Math.round(v))) });
    return () => controls.stop();
  }, [value, delay, reducedMotion]);
  return <span ref={ref} className="tabular-nums">0</span>;
}

/**
 * Blog hero — "abanico de artículos": the latest posts as a 3D stack of cards; every few
 * seconds the top one flies off and the next comes up. The stack tilts toward the cursor
 * and the top card links to its post. Dark in every theme.
 */
export default function BlogHero({ lang, posts, topics }: { lang: Lang; posts: BlogHeroPost[]; topics: number }) {
  const t = getDict(lang);
  const h = t.blogHero;
  const reducedMotion = Boolean(useReducedMotion());
  const stageRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState(() => posts.map((_, i) => i));
  const [leaving, setLeaving] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const words = [h.line1, h.line2].join(" ").split(" ");

  // Latest order for the interval callback (kept in sync after each render, not during it).
  const orderRef = useRef(order);
  useEffect(() => {
    orderRef.current = order;
  }, [order]);
  useEffect(() => {
    if (reducedMotion || posts.length < 2) return;
    let settle = 0;
    const id = window.setInterval(() => {
      // The top card flies off, then rejoins at the back of the stack.
      setLeaving(orderRef.current[0]);
      settle = window.setTimeout(() => {
        setOrder((o) => [...o.slice(1), o[0]]);
        setLeaving(null);
      }, 650);
    }, CYCLE_MS);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(settle);
    };
  }, [posts.length, reducedMotion]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(t.blogPage.dateLocale, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

  return (
    <section
      className="relative overflow-clip text-white"
      style={{ background: "linear-gradient(160deg, var(--color-ecom-black) 0%, var(--color-ecom-dark) 60%, color-mix(in srgb, var(--color-ecom-red) 35%, var(--color-ecom-black)) 100%)" }}
      onPointerMove={(e) => {
        if (reducedMotion) return;
        const r = stageRef.current?.getBoundingClientRect();
        if (!r) return;
        setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="shell grid min-h-hero items-center gap-12 pt-32 pb-16 lg:grid-cols-2 lg:gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow-dark uppercase"
          >
            Blog
          </motion.p>
          <h1 className="mt-6 font-display text-[clamp(3rem,6.6vw,7.6rem)] leading-[0.93] font-medium tracking-[-0.04em]">
            {/* The space sits between the masks: inside an inline-block it would collapse. */}
            {words.map((word, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.05em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={reducedMotion ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>{" "}
              </Fragment>
            ))}
            <span className="inline-block overflow-hidden pb-[0.05em] align-bottom">
              <motion.span
                className="inline-block text-ecom-orange"
                initial={reducedMotion ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.15 + words.length * 0.12, ease: EASE }}
              >
                {h.accent}
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/65"
          >
            {h.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
            className="mt-9"
          >
            <a
              href="#articles"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("#articles"); }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 btn-text text-ecom-on-accent uppercase tracking-wide transition-colors duration-300 hover:bg-white hover:text-ecom-black"
            >
              {t.blogPage.latestTitle}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">&darr;</span>
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="mt-10 flex flex-wrap gap-10 border-t border-white/10 pt-6"
          >
            <div>
              <b className="block font-display text-[clamp(2rem,3vw,2.75rem)] font-medium text-ecom-orange">
                <Counter value={posts.length} delay={1.1} />
              </b>
              <span className="text-sm tracking-wide text-white/55">{h.articlesLabel}</span>
            </div>
            <div>
              <b className="block font-display text-[clamp(2rem,3vw,2.75rem)] font-medium text-ecom-orange">
                <Counter value={topics} delay={1.2} />
              </b>
              <span className="text-sm tracking-wide text-white/55">{h.topicsLabel}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={stageRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
          className="relative h-[min(62vh,600px)] [perspective:1600px]"
        >
          <div
            className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]"
            style={{ transform: `rotateY(${tilt.x * 14}deg) rotateX(${-tilt.y * 10}deg)` }}
          >
            {order.map((postIndex, pos) => {
              const post = posts[postIndex];
              const isTop = pos === 0;
              const flying = leaving === postIndex;
              const hidden = pos >= VISIBLE;
              const transform = flying
                ? "translate(-50%, -50%) translateX(-130%) translateY(10%) rotate(-24deg)"
                : `translate(-50%, -50%) translateX(${pos * 22 - 30}px) translateY(${pos * -16}px) rotate(${pos * 4}deg) translateZ(${-pos * 60}px)`;
              return (
                <Link
                  key={post.slug}
                  href={localizedHref(lang, `/blog/${post.slug}`)}
                  tabIndex={isTop ? 0 : -1}
                  aria-hidden={isTop ? undefined : true}
                  className="absolute top-1/2 left-1/2 block aspect-[4/5] w-[min(86%,480px)] origin-[50%_120%] overflow-hidden rounded-[22px] bg-[#1b1b1d] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-[transform,opacity,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform,
                    zIndex: 10 - pos,
                    opacity: flying || hidden ? 0 : 1,
                    filter: `brightness(${1 - pos * 0.18})`,
                    pointerEvents: isTop ? "auto" : "none",
                  }}
                >
                  {post.coverImage && (
                    <Image src={post.coverImage} alt={post.coverImageAlt ?? ""} fill sizes="(min-width: 1024px) 480px, 86vw" className="object-cover" priority={pos === 0} />
                  )}
                  <span className="absolute top-4 left-4 rounded-full bg-black/55 px-3 py-1.5 text-xs tracking-wide backdrop-blur-sm">
                    {formatDate(post.date)}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/95 via-black/70 to-transparent p-5 pt-12 sm:p-6 sm:pt-16">
                    <span className="block font-display text-lg leading-tight font-medium sm:text-[1.35rem]">{post.title}</span>
                    <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">{post.excerpt}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.14em] text-ecom-orange uppercase">
                      {h.readCta} <span aria-hidden>&rarr;</span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-ecom-surface" />
    </section>
  );
}
