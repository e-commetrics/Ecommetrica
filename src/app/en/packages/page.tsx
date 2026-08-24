import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";
import { localizedHref } from "@/lib/i18n/localizedHref";
import PackagesConfigurator from "@/components/PackagesConfigurator";
import ConfiguratorSkeleton from "@/components/ConfiguratorSkeleton";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: "Packages",
  description: t.packagesPage.metaDescription,
  keywords: t.packagesPage.keywords,
  alternates: seoAlternates(LANG, "/packages"),
};

export default function PackagesPage() {
  return (
    <div className="shell py-20 lg:py-28">
      <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
        {t.packagesPage.eyebrow}
      </p>
      <h1 className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
        {t.packagesPage.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ecom-ink/70">
        {t.packagesPage.sub}
      </p>
      <Link
        href={localizedHref(LANG, "/pricing")}
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ecom-ink/60 uppercase transition-colors duration-300 hover:text-ecom-orange"
      >
        {t.planes.viewAll}
        <span aria-hidden>&rarr;</span>
      </Link>

      <Suspense fallback={<ConfiguratorSkeleton />}>
        <PackagesConfigurator />
      </Suspense>
    </div>
  );
}
