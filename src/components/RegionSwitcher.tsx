"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { useRegion } from "@/components/RegionProvider";

export default function RegionSwitcher() {
  const { t } = useLanguage();
  const { region, setRegion } = useRegion();

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium tracking-widest text-white/60 uppercase"
      role="group"
      aria-label={t.regionSwitcher.ariaLabel}
    >
      <button
        type="button"
        onClick={() => setRegion("mx")}
        className={`transition-colors hover:text-white ${region === "mx" ? "text-white" : ""}`}
      >
        Mx
      </button>
      <span aria-hidden>/</span>
      <button
        type="button"
        onClick={() => setRegion("us")}
        className={`transition-colors hover:text-white ${region === "us" ? "text-white" : ""}`}
      >
        Us
      </button>
    </div>
  );
}
