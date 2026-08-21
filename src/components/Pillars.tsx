import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import Highlight from "@/components/Highlight";
import type { Lang } from "@/lib/i18n/types";
import { getDict } from "@/lib/i18n/dict";

export default function Pillars({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const flow = t.pillars.flow;

  // overflow-clip, not -hidden: crops the accent wash without becoming a scroll container.
  return (
    <section className="relative overflow-clip bg-ecom-black text-white">
      {/* Accent wash so the flat black picks up the active theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-ecom-orange/10 blur-[130px]"
      />

      <div className="relative shell py-24 lg:py-32">
        <Reveal className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium tracking-[0.15em] text-white/50 uppercase">
          {flow.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="text-ecom-orange">
                  &rarr;
                </span>
              )}
              {item}
            </span>
          ))}
        </Reveal>

        {/* Statement and image share a row, fractional columns with the image getting the
            larger share; statement text drops to 36px between lg/2xl to fit its narrower column. */}
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
          <Reveal delay={0.1}>
            <p className="text-balance font-display text-2xl leading-[1.25] font-medium tracking-[-0.01em] sm:text-4xl 2xl:text-5xl">
              {t.pillars.headlinePre}{" "}
              <span className="text-white">{t.pillars.headlineStrong}</span>{" "}
              <span className="text-white/40">{t.pillars.headlineTail}</span>
            </p>
          </Reveal>

          {/* Width cap lives on the Reveal, not the frame, so the monogram's `right-0`
              keeps meeting the photo's corner at every width. */}
          <Reveal
            delay={0.2}
            className="relative mx-auto w-full max-w-[40rem] lg:mx-0 lg:max-w-none"
          >
            {/* Monogram half off the slot's top-right corner, ties photo back to the mark.
                Accent, not white, since it's the one tone contrast-checked on both light and dark (CLAUDE.md). */}
            <Highlight
              shape="logo"
              tone="accent"
              // Negative inset only from sm: up — below 640px the shell pads
              // just 1.25rem, so a wider offset would overhang the viewport.
              className="absolute -top-8 right-0 z-10 w-24 [filter:drop-shadow(0_2px_14px_rgba(18,18,19,0.55))] sm:-top-10 sm:-right-6 sm:w-32"
              opacity={0.9}
            />
            <video
              src={lang === "en" ? "/videos/pillars-en.webm" : "/videos/pillars-flow.webm"}
              autoPlay
              muted
              loop
              playsInline
              className="relative w-full rounded-3xl object-cover ring-1 ring-white/10"
              style={{ aspectRatio: "4 / 3" }}
            />
          </Reveal>
        </div>

        <div className="mt-20 grid border-t border-white/10 sm:grid-cols-3">
          {t.pillars.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className="border-b border-white/10 py-10 last:border-b-0 sm:border-b-0 sm:border-l sm:first:border-l-0 sm:px-8 sm:first:pl-0"
            >
              <p className="font-display text-5xl font-medium tracking-[-0.02em] text-ecom-orange sm:text-6xl">
                <Counter value={stat.value} />
              </p>
              <p className="mt-3 text-sm tracking-wide text-white/60">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-16 sm:grid-cols-3">
          {t.pillars.items.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1} className="group">
              <span
                aria-hidden
                className="block h-px w-10 bg-ecom-orange transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-20"
              />
              <h3 className="mt-5 font-display text-2xl font-medium tracking-wide text-ecom-orange uppercase sm:text-3xl">
                {pillar.title}
              </h3>
              <p className="mt-3 leading-relaxed text-white/60">
                {pillar.copy}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
