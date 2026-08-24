import geoip from "geoip-lite";
import type { Region } from "../types";

export function resolveRegion(ip: string): Region {
  const result = geoip.lookup(ip);
  if (!result) return "mx";
  return result.country === "MX" ? "mx" : "us";
}
