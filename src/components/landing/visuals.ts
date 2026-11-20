import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { Lang } from "@/lib/i18n/types";

/**
 * Each package landing's hero visual, by landing slug (see PACKAGE_LANDINGS). Loaded per
 * page, so a landing only ships its own animation. Each one should be a step up from the
 * package below it: AI generating a site → a brand kit assembling → a live sales feed →
 * a growth engine → a command center of wired systems → your embedded team.
 */
type Visual = ComponentType<{ lang: Lang }>;

export const LANDING_VISUALS: Record<string, Visual> = {
  "ai-express": dynamic(() => import("@/components/landing/AiPromptSite")),
  launch: dynamic(() => import("@/components/landing/BrandKitLaunch")),
  traction: dynamic(() => import("@/components/landing/SalesFeed")),
  scale: dynamic(() => import("@/components/landing/GrowthEngine")),
  peak: dynamic(() => import("@/components/landing/PeakVisual")),
  partner: dynamic(() => import("@/components/landing/TeamOrbit")),
};
