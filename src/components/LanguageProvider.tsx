"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Lang } from "@/lib/i18n/types";
import { dict, type Dict } from "@/lib/i18n/dict";

export type { Lang };

const LanguageContext = createContext<{ lang: Lang; t: Dict }>({
  lang: "es",
  t: dict.es,
});

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  return (
    <LanguageContext.Provider value={{ lang, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
