import geoip from "geoip-lite";
import type { Region } from "../types";

/**
 * Countries served with the Tijuana offer (region "mx"): Mexico and Latin America. Every
 * other country gets the San Diego offer ("us") and the English site first.
 */
export const LATAM_COUNTRIES = new Set([
  "MX",
  // Central America
  "GT", "BZ", "SV", "HN", "NI", "CR", "PA",
  // Caribbean
  "CU", "DO", "HT", "PR",
  // South America
  "AR", "BO", "BR", "CL", "CO", "EC", "PY", "PE", "UY", "VE",
]);

export function regionForCountry(country: string): Region {
  return LATAM_COUNTRIES.has(country) ? "mx" : "us";
}

export function resolveRegion(ip: string): Region {
  const result = geoip.lookup(ip);
  // Local or unresolvable addresses keep the default (Tijuana) offer.
  if (!result) return "mx";
  return regionForCountry(result.country);
}
