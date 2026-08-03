import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n/types";
import { localizedHref } from "@/lib/i18n/localizedHref";

export const SITE_URL = "https://ecommetrica.com";

/** Canonical + hreflang alternates for a given page path (es unprefixed, en under /en). */
export function seoAlternates(lang: Lang, path: string): Metadata["alternates"] {
  return {
    canonical: localizedHref(lang, path),
    languages: {
      es: localizedHref("es", path),
      en: localizedHref("en", path),
      "x-default": localizedHref("es", path),
    },
  };
}
