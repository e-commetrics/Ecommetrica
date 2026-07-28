"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-1 text-xs font-medium tracking-widest text-white/60 uppercase transition-colors hover:text-white"
      aria-label="Toggle language"
    >
      <span className={lang === "es" ? "text-white" : ""}>Es</span>
      <span aria-hidden>/</span>
      <span className={lang === "en" ? "text-white" : ""}>En</span>
    </button>
  );
}
