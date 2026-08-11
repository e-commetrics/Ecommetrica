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

/** Lets /packages hand its summary to the footer's ContactForm (lives on every route,
 *  outlives navigation), which shows it as a locked, read-only field. */
export function useContactPrefill() {
  return useContext(ContactPrefillContext);
}
