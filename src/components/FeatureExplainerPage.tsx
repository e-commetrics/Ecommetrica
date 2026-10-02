import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { FeatureExplainerContent } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";
import type { Lang } from "@/lib/i18n/types";

/**
 * One layout for every "what is X, why does it matter at this tier, what do we deliver"
 * page linked from a plan feature's "Learn more" (vpat, ga4, meta-graph-api, ...) — each
 * page component just supplies its own FeatureExplainerContent and renders this.
 */
export default function FeatureExplainerPage({
  content,
  lang,
}: {
  content: FeatureExplainerContent;
  lang: Lang;
}) {
  return (
    <div className="shell py-20 lg:py-28">
      <Reveal>
        <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
          {content.eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
          {content.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ecom-ink/70">
          {content.intro}
        </p>
      </Reveal>

      <div className="mt-16 flex max-w-3xl flex-col gap-12">
        <Reveal delay={0.05}>
          <h2 className="font-display text-2xl font-medium tracking-tight text-ecom-ink">
            {content.whatTitle}
          </h2>
          <p className="mt-4 leading-relaxed text-ecom-ink/70">{content.whatBody}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl font-medium tracking-tight text-ecom-ink">
            {content.whyTitle}
          </h2>
          <p className="mt-4 leading-relaxed text-ecom-ink/70">{content.whyBody}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="font-display text-2xl font-medium tracking-tight text-ecom-ink">
            {content.deliverableTitle}
          </h2>
          <p className="mt-4 leading-relaxed text-ecom-ink/70">{content.deliverableBody}</p>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <Link
          href={localizedHref(lang, "/pricing")}
          className="mt-14 inline-flex items-center gap-2 rounded-full bg-ecom-orange px-6 py-3 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 hover:bg-ecom-red"
        >
          {content.backCta}
          <span aria-hidden>&rarr;</span>
        </Link>
      </Reveal>
    </div>
  );
}
