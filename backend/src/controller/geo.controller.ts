import type { Request, Response } from "express";
import { resolveRegion } from "../services/geo.service";

/** Node prefixes IPv4 addresses reached over a dual-stack socket with this — geoip-lite's
 *  lookup only recognizes the bare IPv4 form. */
const IPV4_MAPPED_PREFIX = "::ffff:";

export function getGeo(req: Request, res: Response) {
  const ip = req.ip?.startsWith(IPV4_MAPPED_PREFIX)
    ? req.ip.slice(IPV4_MAPPED_PREFIX.length)
    : (req.ip ?? "");

  return res.status(200).json({ region: resolveRegion(ip) });
}
