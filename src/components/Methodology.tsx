import Reveal from "@/components/Reveal";
import type { Lang } from "@/lib/i18n/types";
import { getDict } from "@/lib/i18n/dict";

/** Renders inside the studio page's own container — same block rhythm as the
 *  "how we work" and "team" sections there. */
export default function Methodology({ lang }: { lang: Lang }) {
  const t = getDict(lang);

  return (
    <div className="mt-20 border-t border-ecom-ink/10 pt-16">
      <h2 className="font-display text-sm font-medium uppercase tracking-[0.2em] text-ecom-ink/60">
        {t.methodology.eyebrow}
      </h2>

      <p className="mt-6 max-w-3xl font-display text-2xl font-medium tracking-[-0.01em] text-ecom-ink sm:text-3xl">
        {t.methodology.headline}
      </p>

      <div className="mt-6 max-w-3xl space-y-3">
        {t.methodology.intro.map((paragraph) => (
          <p key={paragraph} className="text-ecom-ink/70">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-3">
        {t.methodology.steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.1}>
            <p
              aria-hidden
              className="font-display text-3xl font-medium tracking-[-0.02em] text-ecom-orange"
            >
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-display text-base font-medium text-ecom-ink">
              {step.title}
            </h3>
            {/* Absent `copy` renders nothing — see the TODO(copy) in dict.ts. */}
            {step.copy && <p className="mt-2 text-ecom-ink/70">{step.copy}</p>}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
