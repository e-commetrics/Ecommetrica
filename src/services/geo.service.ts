import { api } from "./api";
import { API_ROUTES } from "./routes";
import type { Region } from "@/lib/i18n/types";

/** Never throws — a failed geolocation lookup should never break the site. Falls back to
 *  the same "mx" default RegionProvider already uses before this resolves. */
export async function detectRegion(): Promise<Region> {
  try {
    const res = await api.get<{ region: unknown }>(API_ROUTES.geo);
    return res.data.region === "us" ? "us" : "mx";
  } catch {
    return "mx";
  }
}
