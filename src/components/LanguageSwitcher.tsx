"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { swapLangInPath } from "@/lib/i18n/localizedHref";
import { saveScrollForLangSwitch } from "@/lib/i18n/langSwitchScroll";
import { LANG_CHOICE_KEY } from "@/components/RegionProvider";
import type { Lang } from "@/lib/i18n/types";

/** Remembers that the visitor picked a language on purpose, so the location-based
 *  "English first" redirect (RegionProvider) never overrides it. */
function rememberChoice(choice: Lang) {
  try {
    localStorage.setItem(LANG_CHOICE_KEY, choice);
  } catch {
    // Storage blocked: the choice lasts only for this page.
  }
}

export default function LanguageSwitcher() {
  const { lang, t } = useLanguage();
  const pathname = usePathname();

  const esHref = swapLangInPath(pathname, "es");
  const enHref = swapLangInPath(pathname, "en");

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium tracking-widest text-white/60 uppercase"
      role="group"
      aria-label={t.languageSwitcher.ariaLabel}
    >
      <Link
        href={esHref}
        scroll={false}
        onClick={() => { rememberChoice("es"); saveScrollForLangSwitch(esHref); }}
        className={`transition-colors hover:text-white ${lang === "es" ? "text-white" : ""}`}
      >
        Es
      </Link>
      <span aria-hidden>/</span>
      <Link
        href={enHref}
        scroll={false}
        onClick={() => { rememberChoice("en"); saveScrollForLangSwitch(enHref); }}
        className={`transition-colors hover:text-white ${lang === "en" ? "text-white" : ""}`}
      >
        En
      </Link>
    </div>
  );
}
