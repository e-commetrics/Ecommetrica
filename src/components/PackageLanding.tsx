"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { LANDING_VISUALS } from "@/components/landing/visuals";
import { smoothScrollTo } from "@/components/SmoothScroll";
import { useRegion } from "@/components/RegionProvider";
import {
  fillTokens,
  landingBuyHref,
  landingHref,
  landingPrice,
  type LandingContent,
  type LandingPlanId,
} from "@/lib/landings";
import { getDict } from "@/lib/i18n/dict";
import type { Lang, Region } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const orangeBtn =
  "group inline-flex items-center justify-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 btn-text tracking-wide text-ecom-on-accent uppercase transition-colors duration-300 hover:bg-ecom-accent-hover hover:text-ecom-on-accent-hover";

/** "$995/mes", "$370 USD", "Desde $2,500/mes": the price with its kind spelled out. */
function PriceFigure({ planId, region, lang, className, unitClassName }: {
  planId: LandingPlanId;
  region: Region;
  lang: Lang;
  className: string;
  unitClassName: string;
}) {
  const pp = getDict(lang).pricingPage;
  const money = landingPrice(planId, region);
  return (
    <span className={className}>
      {money.kind === "custom" && <span className={`mr-2 ${unitClassName}`}>{pp.customFromLabel}</span>}
      {money.price}
      <span className={`ml-1.5 ${unitClassName}`}>{money.kind === "one-time" ? "USD" : pp.perMonth}</span>
    </span>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 shrink-0 ${className}`}>
      <path d="M4.5 10.5l3.5 3.5 7.5-8" />
    </svg>
  );
}

/**
 * A package's marketing landing (/pricing/<slug>), driven entirely by its LandingContent
 * (src/lib/landings/<file>.ts), its hero visual (landing/visuals.ts) and the package's
 * live price for the visitor's region.
 * Sections follow the classic order: promise → cost of waiting → what you get → how →
 * vs. the alternatives → who it's (not) for → offer → FAQ → last call. Dark blocks are
 * dark in every theme; the rest sits on the themed surface.
 */
export default function PackageLanding({ content: c, lang }: { content: LandingContent; lang: Lang }) {
  const { region } = useRegion();
  const still = Boolean(useReducedMotion());
  const heroRef = useRef<HTMLElement>(null);
  const [pastHero, setPastHero] = useState(false);

  // The phone-only sticky bar shows once the hero (and its own button) has scrolled away.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const money = landingPrice(c.planId, region);
  const pp = getDict(lang).pricingPage;
  const t = (text: { es: string; en: string }) => fillTokens(text[lang], money);
  const buyHref = landingBuyHref(lang, c.planId);
  const nextHref = landingHref(lang, c.fit.noPlanId) ?? landingBuyHref(lang, c.fit.noPlanId);
  const ours = c.alternatives.columns.length - 1;
  const Visual = LANDING_VISUALS[c.slug];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-clip bg-ecom-black text-white">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-ecom-red/25 blur-[140px]" />
        <div className="relative shell grid min-h-hero items-center gap-14 pt-28 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-32">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow-dark uppercase"
            >
              {t(c.hero.eyebrow)}
            </motion.p>
            <h1 className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] font-medium tracking-[-0.04em]">
              {c.hero.lines.map((line, i) => (
                <Fragment key={i}>
                  <span className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className={`block ${i === 2 ? "text-ecom-orange" : ""}`}
                      initial={still ? false : { y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                    >
                      {t(line)}
                    </motion.span>
                  </span>{" "}
                </Fragment>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-white/70"
            >
              {t(c.hero.sub)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-6"
            >
              <div>
                <p>
                  <PriceFigure
                    planId={c.planId}
                    region={region}
                    lang={lang}
                    className="font-display text-5xl font-medium tracking-[-0.03em]"
                    unitClassName="align-middle text-sm font-normal tracking-normal text-white/55"
                  />
                </p>
                <p className="mt-1 text-xs tracking-wide text-white/55 uppercase">{t(c.hero.priceNote)}</p>
                {money.saving && (
                  <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-ecom-orange/15 px-3 py-1 text-xs font-medium text-white">
                    <Check className="h-3.5 w-3.5 text-ecom-orange" />
                    {pp.savingLine(money.saving)}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <Link href={buyHref} className={orangeBtn}>
                  {t(c.hero.ctaPrimary)}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>
                <a
                  href="#how"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo("#how");
                  }}
                  className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-white/65 uppercase transition-colors duration-300 hover:text-white"
                >
                  {t(c.hero.ctaSecondary)}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">&darr;</span>
                </a>
              </div>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
              className="mt-10 flex flex-wrap gap-2.5"
            >
              {c.hero.proof.map((item, i) => (
                <li key={i} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-white/75">
                  <Check className="h-3.5 w-3.5 text-ecom-orange" />
                  {t(item)}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
          >
            {Visual && <Visual lang={lang} />}
          </motion.div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-ecom-surface" />
      </section>

      {/* ── The cost of waiting ──────────────────────────────── */}
      <section className="shell py-24 lg:py-32">
        <Reveal>
          <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow uppercase">{t(c.problem.eyebrow)}</p>
          <h2 className="mt-6 max-w-4xl text-balance font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.03em] text-ecom-ink">
            {t(c.problem.title)}
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {c.problem.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.1} className="border-t border-ecom-ink/15 pt-6">
              <p className="font-display text-sm text-ecom-eyebrow">0{i + 1}</p>
              <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.01em] text-ecom-ink">{t(item.title)}</h3>
              <p className="mt-3 leading-relaxed text-ecom-meta">{t(item.body)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── What's included ──────────────────────────────────── */}
      <section className="relative overflow-clip bg-ecom-black py-24 text-white lg:py-32">
        <div aria-hidden className="pointer-events-none absolute bottom-24 left-[-12%] h-[30rem] w-[30rem] rounded-full bg-ecom-red/20 blur-[130px]" />
        <div className="relative shell">
          <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow-dark uppercase">{t(c.included.eyebrow)}</p>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.03em]">
                {t(c.included.title)}
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-white/65 lg:justify-self-end">{t(c.included.sub)}</p>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {c.included.items.map((item, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08} y={16} className="group bg-ecom-black p-7 transition-colors duration-500 hover:bg-white/[0.04]">
                <Check className="text-ecom-orange transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-5 font-display text-xl font-medium">{t(item.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{t(item.body)}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-ecom-surface" />
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section id="how" className="scroll-mt-24 shell py-24 lg:py-32">
        <Reveal>
          <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow uppercase">{t(c.steps.eyebrow)}</p>
          <h2 className="mt-6 max-w-3xl text-balance font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.03em] text-ecom-ink">
            {t(c.steps.title)}
          </h2>
          <p className="mt-4 text-lg text-ecom-meta">{t(c.steps.sub)}</p>
        </Reveal>
        <div className="relative mt-16">
          <div aria-hidden className="absolute top-7 right-[16%] left-[16%] hidden h-px bg-linear-to-r from-ecom-orange via-ecom-orange/40 to-ecom-orange md:block" />
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {c.steps.items.map((step, i) => (
              <li key={i} className="md:text-center">
                <Reveal delay={i * 0.15}>
                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-ecom-orange bg-ecom-surface font-display text-lg font-medium text-ecom-eyebrow">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-medium text-ecom-ink">{t(step.title)}</h3>
                  <p className="mt-3 leading-relaxed text-ecom-meta md:mx-auto md:max-w-xs">{t(step.body)}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <Reveal>
          <p className="mt-14 text-center text-sm text-ecom-meta">{t(c.steps.note)}</p>
        </Reveal>
      </section>

      {/* ── vs. the alternatives ─────────────────────────────── */}
      <section className="shell pb-24 lg:pb-32">
        <Reveal>
          <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow uppercase">{t(c.alternatives.eyebrow)}</p>
          <h2 className="mt-6 max-w-3xl text-balance font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.03em] text-ecom-ink">
            {t(c.alternatives.title)}
          </h2>
        </Reveal>
        <Reveal className="mt-12">
          <div role="table" className="overflow-hidden rounded-3xl border border-ecom-ink/12">
            <div role="row" className="hidden grid-cols-[1.2fr_1fr_1fr_1fr] md:grid">
              <span role="columnheader" className="p-5" />
              {c.alternatives.columns.map((col, i) => (
                <span
                  key={i}
                  role="columnheader"
                  className={`p-5 font-display text-lg font-medium ${i === ours ? "bg-ecom-orange text-ecom-on-accent" : "text-ecom-ink"}`}
                >
                  {t(col)}
                </span>
              ))}
            </div>
            {c.alternatives.rows.map((row, r) => (
              <div role="row" key={r} className="grid border-t border-ecom-ink/10 first:border-t-0 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:first:border-t">
                <span role="rowheader" className="px-5 pt-5 text-sm font-medium tracking-wide text-ecom-ink uppercase md:p-5 md:normal-case md:tracking-normal md:text-base">
                  {t(row.label)}
                </span>
                {row.values.map((value, i) => (
                  <span
                    key={i}
                    role="cell"
                    className={`flex items-baseline gap-2 px-5 py-1.5 md:block md:p-5 ${
                      i === ours ? "bg-ecom-orange/[0.08] font-medium text-ecom-ink md:bg-ecom-orange/[0.06]" : "text-ecom-meta"
                    } ${i === row.values.length - 1 ? "pb-5" : ""}`}
                  >
                    <span className="w-36 shrink-0 text-xs text-ecom-meta md:hidden">{t(c.alternatives.columns[i])}</span>
                    {i === ours && <Check className="mr-2 inline h-4 w-4 align-[-2px] text-ecom-eyebrow" />}
                    {t(value)}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-ecom-meta">{t(c.alternatives.footnote)}</p>
        </Reveal>
      </section>

      {/* ── Is it for you? ───────────────────────────────────── */}
      <section className="shell pb-24 lg:pb-32">
        <Reveal>
          <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow uppercase">{t(c.fit.eyebrow)}</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.03em] text-ecom-ink">
            {t(c.fit.title)}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-3xl border-2 border-ecom-orange bg-ecom-orange/[0.05] p-8 lg:p-10">
            <h3 className="font-display text-2xl font-medium text-ecom-ink">{t(c.fit.yesTitle)}</h3>
            <ul className="mt-6 space-y-4">
              {c.fit.yes.map((item, i) => (
                <li key={i} className="flex gap-3 text-ecom-ink">
                  <Check className="text-ecom-eyebrow" />
                  {t(item)}
                </li>
              ))}
            </ul>
            <Link href={buyHref} className={`${orangeBtn} mt-9`}>
              {t(c.hero.ctaPrimary)}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl border border-ecom-ink/12 p-8 lg:p-10">
            <h3 className="font-display text-2xl font-medium text-ecom-ink">{t(c.fit.noTitle)}</h3>
            <ul className="mt-6 space-y-4">
              {c.fit.no.map((item, i) => (
                <li key={i} className="flex gap-3 text-ecom-meta">
                  <span aria-hidden className="mt-0.5 text-ecom-ink/40">&rarr;</span>
                  {t(item)}
                </li>
              ))}
            </ul>
            <Link
              href={nextHref}
              className="group mt-9 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ecom-ink uppercase transition-colors duration-300 hover:text-ecom-eyebrow"
            >
              {t(c.fit.noCta)} ·{" "}
              <PriceFigure planId={c.fit.noPlanId} region={region} lang={lang} className="" unitClassName="ml-0" />
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── The offer ────────────────────────────────────────── */}
      <section className="relative overflow-clip bg-ecom-black py-24 text-white lg:py-32">
        <div aria-hidden className="pointer-events-none absolute top-24 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-ecom-red/25 blur-[140px]" />
        <div className="relative shell">
          <Reveal className="mx-auto max-w-3xl rounded-[2rem] border border-white/12 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-12">
            <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow-dark uppercase">{t(c.offer.eyebrow)}</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] font-medium tracking-[-0.03em]">{t(c.offer.title)}</h2>
            <div className="mt-8 flex flex-wrap items-end gap-x-4 gap-y-1 border-b border-white/10 pb-8">
              <PriceFigure
                planId={c.planId}
                region={region}
                lang={lang}
                className="font-display text-[clamp(3.5rem,8vw,5.5rem)] leading-none font-medium tracking-[-0.04em]"
                unitClassName="text-base font-normal tracking-normal text-white/55"
              />
              <p className="w-full text-sm text-white/55">{t(c.hero.priceNote)}</p>
            </div>
            <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
              {c.offer.bullets.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/80">
                  <Check className="h-4 w-4 translate-y-0.5 text-ecom-orange" />
                  {t(item)}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-2xl border border-ecom-orange/40 bg-ecom-orange/10 px-5 py-4 text-sm font-medium text-white">
              {t(c.offer.highlight)}
            </p>
            <p className="mt-5 text-xs leading-relaxed text-white/50">{t(c.offer.renewal)}</p>
            {money.saving && <p className="mt-2 text-xs leading-relaxed text-white/50">{pp.savingNote}</p>}
            <Link href={buyHref} className={`${orangeBtn} mt-9 w-full sm:w-auto`}>
              {t(c.offer.cta)}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </Reveal>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-ecom-surface" />
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="shell grid gap-12 py-24 lg:grid-cols-[1fr_1.4fr] lg:py-32">
        <Reveal>
          <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow uppercase">{t(c.faq.eyebrow)}</p>
          <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.02] font-medium tracking-[-0.03em] text-ecom-ink">
            {t(c.faq.title)}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="divide-y divide-ecom-ink/10 border-y border-ecom-ink/10">
          {c.faq.items.map((item, i) => (
            <details key={i} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-medium text-ecom-ink transition-colors duration-300 hover:text-ecom-eyebrow">
                {t(item.title)}
                <span aria-hidden className="text-2xl leading-none text-ecom-eyebrow transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-ecom-meta">{t(item.body)}</p>
            </details>
          ))}
        </Reveal>
      </section>

      {/* ── Last call ────────────────────────────────────────── */}
      <section className="relative overflow-clip bg-ecom-black py-24 text-center text-white lg:py-32">
        <div aria-hidden className="pointer-events-none absolute top-16 left-1/2 h-[24rem] w-[40rem] -translate-x-1/2 rounded-full bg-ecom-orange/20 blur-[140px]" />
        <Reveal className="relative shell">
          <h2 className="mx-auto max-w-4xl text-balance font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.98] font-medium tracking-[-0.035em]">
            {t(c.final.title)}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/65">{t(c.final.sub)}</p>
          <Link href={buyHref} className={`${orangeBtn} mt-10`}>
            {t(c.final.cta)}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </Reveal>
      </section>

      {/* ── Phone sticky bar ─────────────────────────────────── */}
      <AnimatePresence>
        {pastHero && (
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ecom-black/95 p-3 pl-5 text-white shadow-2xl backdrop-blur md:hidden"
          >
            <span className="min-w-0">
              <span className="block truncate text-xs text-white/60">{t(c.stickyLabel)}</span>
              <PriceFigure planId={c.planId} region={region} lang={lang} className="font-display text-lg font-medium" unitClassName="text-xs font-normal text-white/60" />
            </span>
            <Link href={buyHref} className="shrink-0 rounded-full bg-ecom-orange px-5 py-2.5 text-sm font-semibold text-ecom-on-accent">
              {t(c.hero.ctaPrimary)}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
