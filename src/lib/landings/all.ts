import type { LandingContent } from "@/lib/landings";
import { aiExpressLanding } from "@/lib/landings/aiExpress";
import { launchLanding } from "@/lib/landings/launch";
import { tractionLanding } from "@/lib/landings/traction";
import { scaleLanding } from "@/lib/landings/scale";
import { peakLanding } from "@/lib/landings/peak";
import { partnerLanding } from "@/lib/landings/partner";

/** Every landing's content by slug, for the /pricing/[slug] route. */
export const LANDING_CONTENT: Record<string, LandingContent> = Object.fromEntries(
  [aiExpressLanding, launchLanding, tractionLanding, scaleLanding, peakLanding, partnerLanding].map((content) => [
    content.slug,
    content,
  ]),
);
