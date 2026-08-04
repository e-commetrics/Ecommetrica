"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";
import type { Lang } from "@/lib/i18n/types";

// global-not-found.tsx is built once into a single static out/404.html, so
// the server-rendered markup is always Spanish. This detects the language
// from the actual broken URL after mount and swaps the whole shell —
// Header/Footer pick it up automatically via useLanguage(). Starting from
// "es" (matching the server render) and only switching post-mount avoids a
// hydration mismatch; it does mean a brief flash of Spanish on /en/* 404s.
export default function GlobalNotFoundShell() {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const detected: Lang = window.location.pathname.startsWith("/en") ? "en" : "es";
    document.documentElement.lang = detected;
    setLang(detected);
  }, []);

  return (
    <LanguageProvider lang={lang}>
      <SmoothScroll />
      <Header />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#25272a",
            color: "#f2ede9",
            fontSize: "14px",
            borderRadius: "9999px",
            padding: "12px 20px",
          },
          success: { iconTheme: { primary: "#e84a34", secondary: "#f2ede9" } },
          error: { iconTheme: { primary: "#9c1512", secondary: "#f2ede9" } },
        }}
      />
    </LanguageProvider>
  );
}

function NotFoundContent() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ecom-black text-white">
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
            href={localizedHref(lang, "/")}
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
            href={localizedHref(lang, "/contact")}
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
