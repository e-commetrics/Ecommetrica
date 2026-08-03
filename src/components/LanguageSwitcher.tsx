"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { swapLangInPath } from "@/lib/i18n/localizedHref";

export default function LanguageSwitcher() {
  const { lang, t } = useLanguage();
  const pathname = usePathname();

  const esHref = swapLangInPath(pathname, "es");
  const enHref = swapLangInPath(pathname, "en");

  return (
    <div
      className="flex items-center gap-1 text-xs font-medium tracking-widest text-white/60 uppercase"
      role="group"
      aria-label={t.languageSwitcher.ariaLabel}
    >
      <Link
        href={esHref}
        className={`transition-colors hover:text-white ${lang === "es" ? "text-white" : ""}`}
      >
        Es
      </Link>
      <span aria-hidden>/</span>
      <Link
        href={enHref}
        className={`transition-colors hover:text-white ${lang === "en" ? "text-white" : ""}`}
      >
        En
      </Link>
    </div>
  );
}
