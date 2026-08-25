"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { useContactPrefill } from "@/components/ContactPrefillProvider";
import { smoothScrollTo } from "@/components/SmoothScroll";

export default function ContactHero() {
  const { t } = useLanguage();
  const { packageSummary } = useContactPrefill();

  return (
    <div className="shell py-20 lg:py-28">
      <p className="text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
        {t.contactPage.eyebrow}
      </p>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
        {t.contactPage.headline}
      </h1>
      <p className="mt-6 max-w-xl text-ecom-ink/70">{t.contactPage.sub}</p>

      {packageSummary && (
        <a
          href="#contact-form"
          onClick={(event) => {
            event.preventDefault();
            smoothScrollTo("#contact-form");
          }}
          className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-ecom-orange/30 bg-ecom-orange/[0.06] px-5 py-3 text-sm font-medium text-ecom-orange transition-colors duration-300 hover:bg-ecom-orange/10"
        >
          {t.contactPage.scrollToFormCta}
          <motion.span
            aria-hidden
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            &darr;
          </motion.span>
        </a>
      )}
    </div>
  );
}
