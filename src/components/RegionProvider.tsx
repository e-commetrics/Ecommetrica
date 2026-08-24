"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Region } from "@/lib/i18n/types";

const STORAGE_KEY = "ecom-region";

type RegionContextValue = {
  region: Region;
  /** False until the visitor has picked a region (post-mount only, to avoid a hydration
   *  mismatch) — drives whether RegionGate shows its first-visit prompt. */
  hasChosen: boolean;
  setRegion: (region: Region) => void;
};

const RegionContext = createContext<RegionContextValue>({
  region: "mx",
  hasChosen: true,
  setRegion: () => {},
});

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region>("mx");
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Region | null;
    if (stored === "mx" || stored === "us") {
      setRegionState(stored);
      setHasChosen(true);
    }
  }, []);

  function setRegion(next: Region) {
    setRegionState(next);
    setHasChosen(true);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <RegionContext.Provider value={{ region, hasChosen, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}
