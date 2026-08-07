"use client";

import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-ecom-gradient text-white">
      <div className="relative shell pt-24 lg:pt-32">
        {/* Headline and form sit side by side: stacked, the form's own max-width
            left most of the shell empty on a wide screen. */}
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-24">
          <Reveal>
            <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-white/60 uppercase">
              {t.footer.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,6vw,7rem)] font-medium leading-[0.98] tracking-[-0.03em]">
              {t.footer.headline}
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/70">
              <span aria-hidden className="mr-2 text-ecom-orange">
                &mdash;
              </span>
              {t.footer.leaveRequest}
            </p>
          </Reveal>

          <Reveal id="contact-form" delay={0.15} className="scroll-mt-24 lg:pt-6">
            <ContactForm />
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/15 py-8 text-xs tracking-wide text-white/60 uppercase sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={localizedHref(lang, "/legal/privacy-policy")} className="hover:text-white">
              {t.footer.privacy}
            </Link>
            <Link href={localizedHref(lang, "/legal/terms-of-service")} className="hover:text-white">
              {t.footer.terms}
            </Link>
            <Link href={localizedHref(lang, "/faq")} className="hover:text-white">
              {t.footer.faq}
            </Link>
          </div>
          <p className="normal-case">
            &copy; {new Date().getFullYear()} Ecommetrica. {t.footer.rights}
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
