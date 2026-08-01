"use client";

import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ecom-gradient text-white">
      <div className="relative mx-auto max-w-7xl px-6 pt-24 lg:px-10 lg:pt-32">
        <Reveal>
          <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-white/60 uppercase">
            Contact us
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.02em] sm:text-6xl lg:text-7xl">
            Are you ready?
          </h2>
          <p className="mt-2 text-lg text-white/70">
            <span aria-hidden className="mr-2 text-ecom-orange">
              &mdash;
            </span>
            Leave a request
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 max-w-2xl">
          <ContactForm />
        </Reveal>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/15 py-8 text-xs tracking-wide text-white/60 uppercase sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/legal/privacy-policy" className="hover:text-white">
              {t.privacy}
            </Link>
            <Link href="/legal/terms-of-service" className="hover:text-white">
              {t.terms}
            </Link>
            <Link href="/faq" className="hover:text-white">
              {t.faq}
            </Link>
          </div>
          <p className="normal-case">
            &copy; {new Date().getFullYear()} Ecommetrica. All rights reserved.
          </p>
        </div>
      </div>

      <div className="overflow-hidden">
        <Reveal y={40}>
          {/* Clash Display Medium renders ECOMMETRICA at 7.22em wide with
              this tracking, so the size has to stay under ~13.8vw to fit the
              viewport. 13vw leaves a small margin on either side. */}
          <p
            aria-hidden
            className="translate-y-[0.15em] text-center font-display text-[13vw] leading-none font-medium tracking-[-0.03em] whitespace-nowrap text-white/40 select-none"
          >
            ECO<span className="text-white">MM</span>ETRICA
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
