import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getDict, type FeatureExplainerContent } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";
import type { Lang } from "@/lib/i18n/types";
import { formatUSD, matrix, plans } from "@/lib/pricing";

/**
 * One layout for every "what is X, why does it matter at this tier, what do we deliver"
 * page linked from a plan feature's "Learn more" (vpat, ga4, meta-graph-api, ...) — each
 * page component just supplies its own FeatureExplainerContent and renders this.
 *
 * `slug` is the same value as the matrix row's `learnMoreSlug`; it drives the side column
 * listing the plans that include the feature, which also fills what would otherwise be an
 * empty right half of the page on wide screens.
 */
export default function FeatureExplainerPage({
  content,
  lang,
  slug,
}: {
  content: FeatureExplainerContent;
  lang: Lang;
  slug: string;
}) {
  const t = getDict(lang);
  const row = matrix.flatMap((category) => category.rows).find((r) => r.learnMoreSlug === slug);
  // MX is the default market (see RegionProvider); every explainer row is the same in both.
  const includingPlans = row ? plans.filter((plan) => row.availability.mx.includes(plan.id)) : [];

  return (
    <div className="shell py-20 lg:py-28">
      <Reveal>
        <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-eyebrow uppercase">
          {content.eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl text-balance font-display text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
          {content.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ecom-ink/70">
          {content.intro}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-24">
        <div className="flex max-w-3xl flex-col gap-12">
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

        <Reveal delay={0.2} className="lg:sticky lg:top-28 lg:self-start">
          <aside className="rounded-3xl border border-ecom-ink/10 bg-ecom-ink/[0.03] p-6 sm:p-8">
            {includingPlans.length > 0 && (
              <>
                <p className="text-sm font-medium tracking-[0.2em] text-ecom-ink/70 uppercase">
                  {t.pricingPage.includedInLabel}
                </p>
                <ul className="mt-5 flex flex-col divide-y divide-ecom-ink/10">
                  {includingPlans.map((plan) => (
                    <li key={plan.id}>
                      <Link
                        href={`${localizedHref(lang, "/packages")}?plan=${plan.id}`}
                        className="group flex items-baseline justify-between gap-4 py-3"
                      >
                        <span className="font-display text-lg font-medium text-ecom-ink transition-colors group-hover:text-ecom-orange">
                          {plan.name[lang]}
                        </span>
                        <span className="shrink-0 text-sm text-ecom-ink/60">
                          {formatUSD(plan.priceValue.mx)}
                          {!plan.oneTime && t.pricingPage.perMonth}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={localizedHref(lang, "/pricing")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ecom-orange px-6 py-3 text-base font-semibold tracking-wide text-ecom-black uppercase transition-colors duration-300 hover:bg-ecom-ink hover:text-ecom-surface"
              >
                {content.backCta}
                <span aria-hidden>&rarr;</span>
              </Link>
              <Link
                href={localizedHref(lang, "/contact")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ecom-ink/15 px-6 py-3 text-base font-semibold tracking-wide text-ecom-ink uppercase transition-colors duration-300 hover:border-ecom-orange hover:text-ecom-orange"
              >
                {t.nav.talk}
              </Link>
            </div>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
