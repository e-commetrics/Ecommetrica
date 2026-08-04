import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n/types";
import { localizedHref, withTrailingSlash } from "@/lib/i18n/localizedHref";

export const SITE_URL = "https://dev.ecommetrica.com";

/** Canonical + hreflang alternates for a given page path (es unprefixed, en under /en). */
export function seoAlternates(lang: Lang, path: string): Metadata["alternates"] {
  return {
    canonical: withTrailingSlash(localizedHref(lang, path)),
    languages: {
      es: withTrailingSlash(localizedHref("es", path)),
      en: withTrailingSlash(localizedHref("en", path)),
      "x-default": withTrailingSlash(localizedHref("es", path)),
    },
  };
}
