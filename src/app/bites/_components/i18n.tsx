"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { dict, type BitesLang } from "./dict";

type I18nValue = {
  language: BitesLang;
  changeLanguage: (lang: BitesLang) => void;
};

const I18nContext = createContext<I18nValue>({ language: "es", changeLanguage: () => {} });

export function BitesI18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<BitesLang>("es");
  return (
    <I18nContext.Provider value={{ language, changeLanguage: setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const { language, changeLanguage } = useContext(I18nContext);
  function t(key: string) {
    return dict[language][key] ?? dict.es[key] ?? key;
  }
  return { t, i18n: { language, changeLanguage } };
}
