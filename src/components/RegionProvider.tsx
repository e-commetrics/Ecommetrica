"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Region } from "@/lib/i18n/types";
import { detectRegion } from "@/services/geo.service";

type RegionContextValue = {
  region: Region;
};

const RegionContext = createContext<RegionContextValue>({ region: "mx" });

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<Region>("mx");

  useEffect(() => {
    let cancelled = false;
    detectRegion().then((detected) => {
      if (!cancelled) setRegion(detected);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return <RegionContext.Provider value={{ region }}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  return useContext(RegionContext);
}
