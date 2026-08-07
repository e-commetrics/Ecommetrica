"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ContactPrefillContextValue = {
  packageSummary: string;
  setPackageSummary: (summary: string) => void;
};

const ContactPrefillContext = createContext<ContactPrefillContextValue>({
  packageSummary: "",
  setPackageSummary: () => {},
});

export function ContactPrefillProvider({ children }: { children: ReactNode }) {
  const [packageSummary, setPackageSummary] = useState("");
  return (
    <ContactPrefillContext.Provider value={{ packageSummary, setPackageSummary }}>
      {children}
    </ContactPrefillContext.Provider>
  );
}

/** Lets the /packages configurator hand its summary off to the footer's
 * ContactForm, which lives on every route and outlives client-side navigation.
 * ContactForm shows it as a locked, read-only field — never as editable text. */
export function useContactPrefill() {
  return useContext(ContactPrefillContext);
}
