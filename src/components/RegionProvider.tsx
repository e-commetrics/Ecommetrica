"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Region } from "@/lib/i18n/types";
import { detectRegion } from "@/services/geo.service";
import { useLanguage } from "@/components/LanguageProvider";
import { swapLangInPath } from "@/lib/i18n/localizedHref";

type RegionContextValue = {
  region: Region;
};

const RegionContext = createContext<RegionContextValue>({ region: "mx" });

/** Set by LanguageSwitcher when the visitor picks a language themselves; it then wins over
 *  the location-based redirect below. */
export const LANG_CHOICE_KEY = "ecom-lang-choice";

/** Search-engine and preview crawlers keep the page they asked for, so each language stays
 *  indexed on its own URLs. */
const BOT = /bot|crawler|spider|crawling|preview|lighthouse|facebookexternalhit|slurp/i;

/**
 * The price market comes from where the visit comes from (services/geo.service.ts):
 * Mexico and Latin America → Tijuana offer ("mx"); anywhere else → San Diego offer ("us"),
 * and the site in English first — a visitor from outside Latin America who lands on a
 * Spanish page is moved to its English version, unless they chose Spanish themselves.
 * `initialRegion` (from the page's language) is only the guess shown until detection
 * answers, so prices don't jump for most visitors.
 */
export function RegionProvider({ initialRegion, children }: { initialRegion: Region; children: ReactNode }) {
  const [region, setRegion] = useState<Region>(initialRegion);
  const { lang } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    detectRegion().then((detected) => {
      if (cancelled) return;
      setRegion(detected);
      if (detected !== "us" || lang !== "es" || BOT.test(navigator.userAgent)) return;
      let chose = false;
      try {
        chose = localStorage.getItem(LANG_CHOICE_KEY) === "es";
      } catch {
        // Storage blocked: no recorded choice.
      }
      if (!chose && pathname) router.replace(swapLangInPath(pathname, "en"));
    });
    return () => {
      cancelled = true;
    };
  }, [lang, pathname, router]);

  return <RegionContext.Provider value={{ region }}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  return useContext(RegionContext);
}
