import { api } from "./api";
import { API_ROUTES } from "./routes";
import type { Region } from "@/lib/i18n/types";

const CACHE_KEY = "ecom-region";

/** Time zones of the US and Canada; any other "America/…" zone is Mexico or Latin America. */
const US_CANADA_ZONE =
  /^America\/(New_York|Detroit|Kentucky|Indiana|Chicago|Menominee|North_Dakota|Denver|Boise|Phoenix|Los_Angeles|Anchorage|Juneau|Sitka|Metlakatla|Yakutat|Nome|Adak|Toronto|Montreal|Vancouver|Edmonton|Winnipeg|Regina|Halifax|St_Johns|Moncton|Glace_Bay|Goose_Bay|Whitehorse|Dawson|Yellowknife|Iqaluit|Rankin_Inlet|Cambridge_Bay|Swift_Current|Atikokan|Creston|Fort_Nelson|Inuvik|Resolute)/;

/** Browser locales of Mexico and Latin America (es-MX, es-419, pt-BR…); es-US / es-ES don't count. */
const LATAM_LOCALE = /^(es-(MX|419|GT|BZ|SV|HN|NI|CR|PA|CU|DO|PR|AR|BO|CL|CO|EC|PY|PE|UY|VE)|pt-BR)$/i;

/** Fallback when the geo API can't be reached (e.g. a Vercel preview without the backend).
 *  A Latin American time zone or browser locale → Tijuana offer; anything else → San Diego.
 *  The locale matters because Tijuana shares its time zone with San Diego (Windows reports
 *  both as America/Los_Angeles). */
function regionFromBrowser(): Region {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (zone.startsWith("America/") && !US_CANADA_ZONE.test(zone)) return "mx";
    const locales = navigator.languages?.length ? navigator.languages : [navigator.language];
    if (locales.some((locale) => LATAM_LOCALE.test(locale))) return "mx";
    return zone ? "us" : "mx";
  } catch {
    return "mx";
  }
}

/**
 * Where the visit comes from: "mx" (Mexico and Latin America, Tijuana offer) or "us"
 * (everywhere else, San Diego offer). Asks the backend's GeoIP lookup first, falls back to
 * the browser's time zone and locale, and caches the answer for the visit. Never throws.
 */
export async function detectRegion(): Promise<Region> {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached === "mx" || cached === "us") return cached;
  } catch {
    // Storage blocked: just detect again.
  }

  let region: Region;
  try {
    const res = await api.get<{ region: unknown }>(API_ROUTES.geo, { timeout: 4000 });
    region = res.data.region === "us" ? "us" : "mx";
  } catch {
    region = regionFromBrowser();
  }

  try {
    sessionStorage.setItem(CACHE_KEY, region);
  } catch {
    // Not cached; harmless.
  }
  return region;
}
