"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Region } from "@/lib/i18n/types";
import { detectRegion } from "@/services/geo.service";

const STORAGE_KEY = "ecom-region";

type RegionContextValue = {
  region: Region;
  setRegion: (region: Region) => void;
};

const RegionContext = createContext<RegionContextValue>({
  region: "mx",
  setRegion: () => {},
});

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region>("mx");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Region | null;
    if (stored === "mx" || stored === "us") {
      setRegionState(stored);
      return;
    }

    // No explicit choice saved yet — auto-detect by IP and apply it, but don't persist it:
    // an unconfirmed guess should keep re-resolving on future visits until the visitor
    // picks a region themselves via RegionSwitcher, at which point setRegion() below wins.
    let cancelled = false;
    detectRegion().then((detected) => {
      if (!cancelled) setRegionState(detected);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function setRegion(next: Region) {
    setRegionState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <RegionContext.Provider value={{ region, setRegion }}>{children}</RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}
