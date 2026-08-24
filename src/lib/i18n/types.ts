export type Lang = "es" | "en";

/** "us" covers USA, Europe, and Asia pricing — internally shorthanded "CA" in business docs,
 *  but it's a market tier, not a literal California/US-only bucket. */
export type Region = "mx" | "us";

export type Localized = {
  es: string;
  en: string;
};
