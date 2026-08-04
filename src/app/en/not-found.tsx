import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: t.notFound.title,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ecom-black text-white">
      {/* Oversized outlined numeral, echoes the Planes "PLANES" treatment */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center select-none"
      >
        <span className="text-stroke font-display text-[clamp(9rem,32vw,22rem)] leading-none font-medium text-white/10">
          404
        </span>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-ecom-orange/20 blur-[130px]"
      />

      <div className="relative mx-auto max-w-2xl px-6 py-32 text-center lg:px-10">
        <p className="eyebrow-rule text-center text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
          {t.notFound.eyebrow}
        </p>
        <h1 className="mt-8 text-balance font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
          {t.notFound.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/60">
          {t.notFound.sub}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <Link
            href={localizedHref(LANG, "/")}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ecom-orange px-7 py-3.5 text-sm font-medium text-white uppercase tracking-wide transition-colors duration-300 hover:bg-white hover:text-ecom-black"
          >
            {t.notFound.cta}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              &#8599;
            </span>
          </Link>
          <Link
            href={localizedHref(LANG, "/contact")}
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 uppercase tracking-wide transition-colors duration-300 hover:text-white"
          >
            {t.notFound.ctaContact}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
