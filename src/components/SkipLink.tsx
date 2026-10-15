"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function SkipLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ecom-black"
    >
      {t.a11y.skipToContent}
    </a>
  );
}
