"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "es" | "en";

type Dict = {
  studio: string;
  work: string;
  blog: string;
  contact: string;
  talk: string;
  privacy: string;
  terms: string;
  faq: string;
};

const dict: Record<Lang, Dict> = {
  es: {
    studio: "Studio",
    work: "Work",
    blog: "Blog",
    contact: "Contact",
    talk: "Hablemos",
    privacy: "Aviso de privacidad",
    terms: "Términos de servicio",
    faq: "FAQ",
  },
  en: {
    studio: "Studio",
    work: "Work",
    blog: "Blog",
    contact: "Contact",
    talk: "Let's talk",
    privacy: "Privacy policy",
    terms: "Terms of service",
    faq: "FAQ",
  },
};

const LanguageContext = createContext<{
  lang: Lang;
  t: Dict;
  toggle: () => void;
}>({ lang: "es", t: dict.es, toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem("ecom-lang") as Lang | null;
    if (stored === "en" || stored === "es") setLang(stored);
  }, []);

  function toggle() {
    setLang((prev) => {
      const next = prev === "es" ? "en" : "es";
      window.localStorage.setItem("ecom-lang", next);
      return next;
    });
  }

  return (
    <LanguageContext.Provider value={{ lang, t: dict[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
