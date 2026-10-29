"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";
import type { Lang } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Real project captures the browser "builds", one per loop. Desktop shots: it's a desktop browser. */
const SITES = [
  { domain: "palmasrecovery.com", img: "/projects/palmas.webp" },
  {
    domain: "drlumban.com",
    img: `/Works/${encodeURIComponent("Ecommetrica modernizo y optimizo la pagina web y branding del dr Jaime Lumban.png")}`,
  },
  { domain: "excellentiafoods.com", img: "/projects/excellentia.webp" },
  {
    domain: "mongeortopedia.com",
    img: `/Works/${encodeURIComponent("Ecommetrica realizo la pagina del dr ricardo monge asi como calendario de citas.png")}`,
  },
];

/** Wireframe blocks (percent of the browser canvas). Index 1 is the hero that gets the capture. */
const BLOCKS = [
  { left: 4, top: 5, width: 92, height: 9 },
  { left: 4, top: 18, width: 56, height: 46 },
  { left: 63, top: 18, width: 33, height: 21 },
  { left: 63, top: 43, width: 33, height: 21 },
  { left: 4, top: 69, width: 28, height: 25 },
  { left: 36, top: 69, width: 28, height: 25 },
  { left: 68, top: 69, width: 28, height: 25 },
];

const CODE = [
  ["<section", ' class="hero"', ">"],
  ["  <h1>", "Tu marca, sin límites", "</h1>"],
  ["  <Button", ' cta="Agenda hoy" ', "/>"],
  ["</section>", "", ""],
  ["", "// SEO + AEO ✓  Analytics ✓", ""],
];

// Timeline of one loop, in ms from its start.
const T = { wire: 200, code: 400, fill: 2300, image: 3300, score: 4000, lead: 5600, loop: 9000 };

/** Types each phrase, holds it, erases it, then moves to the next. */
function Typed({ phrases, still }: { phrases: string[]; still: boolean }) {
  const [text, setText] = useState(still ? phrases[0] : "");
  useEffect(() => {
    if (still) return;
    let phrase = 0;
    let i = 0;
    let erasing = false;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      const target = phrases[phrase % phrases.length];
      if (!erasing) {
        i++;
        setText(target.slice(0, i));
        if (i >= target.length) {
          erasing = true;
          id = setTimeout(tick, 2400);
          return;
        }
        id = setTimeout(tick, 55);
      } else {
        i--;
        setText(target.slice(0, i));
        if (i <= 0) {
          erasing = false;
          phrase++;
          id = setTimeout(tick, 250);
          return;
        }
        id = setTimeout(tick, 30);
      }
    };
    id = setTimeout(tick, 700);
    return () => clearTimeout(id);
  }, [phrases, still]);

  return (
    <span className="text-ecom-orange after:ml-0.5 after:animate-pulse after:content-['▍']">
      {text}
    </span>
  );
}

function Gauge({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="relative grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full"
      style={{ background: `conic-gradient(#3ddc84 ${value}%, rgba(255,255,255,0.1) 0)` }}
    >
      <div className="absolute inset-1.5 rounded-full bg-[#141415]" />
      <span className="relative font-display text-xl font-semibold">{value}</span>
      <small className="absolute -bottom-5 text-[0.6rem] tracking-[0.1em] whitespace-nowrap text-white/55 uppercase">
        {label}
      </small>
    </div>
  );
}

/**
 * Studio hero — "construcción en vivo": a browser mock that wires up, codes, fills in a
 * real project capture, scores 98/100 and receives a lead, looping across projects.
 * Dark in every theme (bg-ecom-black, white text). Reduced motion shows the finished state.
 */
export default function StudioHero({ lang }: { lang: Lang }) {
  const t = getDict(lang).studioHero;
  const still = Boolean(useReducedMotion());
  const [round, setRound] = useState(0);
  const [elapsed, setElapsed] = useState(still ? T.loop : 0);
  const [scores, setScores] = useState(still ? [98, 100] : [0, 0]);

  useEffect(() => {
    if (still) return;
    const start = performance.now();
    let frame = 0;
    const loop = (now: number) => {
      const ms = now - start;
      // 80 ms steps: every phase boundary still lands on time, without a render per frame.
      setElapsed(Math.floor(ms / 80) * 80);
      if (ms >= T.score && ms <= T.score + 1400) {
        const eased = 1 - Math.pow(1 - Math.min(1, (ms - T.score) / 1300), 3);
        setScores([Math.round(98 * eased), Math.round(100 * eased)]);
      } else if (ms < T.score) {
        setScores((s) => (s[0] === 0 ? s : [0, 0]));
      }
      if (ms >= T.loop) {
        setRound((r) => r + 1);
        return;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [round, still]);

  const site = SITES[round % SITES.length];
  const codeLines = CODE.filter((_, i) => elapsed >= T.code + i * 380);

  return (
    <section className="relative overflow-clip bg-ecom-black text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-ecom-orange/20 blur-[130px]"
      />
      <div className="relative shell grid min-h-[100svh] items-center gap-14 pt-32 pb-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:pt-36">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow-dark uppercase"
          >
            {t.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-7 font-display text-[clamp(3rem,6.2vw,7rem)] leading-[0.95] font-medium tracking-[-0.035em]"
          >
            {t.headline}
            <br />
            <Typed phrases={t.typed} still={still} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/65"
          >
            {t.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <Link
              href={localizedHref(lang, "/services")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 btn-text text-ecom-on-accent uppercase tracking-wide transition-colors duration-300 hover:bg-white hover:text-ecom-black"
            >
              {t.ctaServices}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                &#8599;
              </span>
            </Link>
            <Link
              href={localizedHref(lang, "/work")}
              className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/60 transition-colors duration-300 hover:text-white"
            >
              {t.ctaWork}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          role="img"
          aria-label={t.browserAria}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1d] shadow-[0_50px_120px_-40px_var(--color-ecom-orange)]"
        >
          <div className="flex items-center gap-1.5 border-b border-white/7 px-3.5 py-3">
            <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-3 flex-1 truncate rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/50">{site.domain}</span>
          </div>

          <div className="relative aspect-[16/10]">
            {BLOCKS.map((block, i) => {
              const shown = elapsed >= T.wire + i * 160;
              const filled = elapsed >= T.fill + i * 90;
              const imaged = i === 1 && elapsed >= T.image;
              return (
                <div
                  key={i}
                  className={`absolute rounded-[10px] bg-cover bg-top transition-[opacity,background-color,border-color] duration-500 ${
                    filled ? "border-transparent bg-white/8" : "border-[1.5px] border-dashed border-white/28"
                  }`}
                  style={{
                    left: `${block.left}%`,
                    top: `${block.top}%`,
                    width: `${block.width}%`,
                    height: `${block.height}%`,
                    opacity: shown ? 1 : 0,
                    backgroundImage: imaged ? `url("${site.img}")` : undefined,
                  }}
                />
              );
            })}

            <div
              className={`absolute bottom-[6%] left-[4%] min-h-28 w-[46%] rounded-xl border border-white/10 bg-[#0a0a0b]/92 px-4 py-3.5 font-mono text-[0.7rem] leading-relaxed text-[#c9c9c9] transition-[opacity,transform] duration-600 sm:text-xs ${
                elapsed >= T.image ? "translate-y-4 opacity-0" : "opacity-100"
              }`}
            >
              {codeLines.map(([tag, body, close], i) => (
                <div key={i} className="truncate">
                  <span className="text-ecom-orange">{tag}</span>
                  {body}
                  <span className="text-ecom-orange">{close}</span>
                </div>
              ))}
            </div>

            <div
              className={`absolute top-[18%] right-[4%] flex gap-3.5 transition-[opacity,transform] duration-600 ${
                elapsed >= T.score ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            >
              <Gauge value={scores[0]} label={t.performance} />
              <Gauge value={scores[1]} label={t.seo} />
            </div>

            <div
              className={`absolute right-[5%] bottom-[7%] flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-[#121213] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                elapsed >= T.lead ? "translate-y-0" : "translate-y-[160%]"
              }`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ecom-orange font-semibold text-ecom-on-accent">+1</span>
              <span>
                <b className="block">{t.leadTitle}</b>
                <small className="text-xs text-[#6b6b6b]">{t.leadMeta}</small>
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-ecom-surface"
      />
    </section>
  );
}
