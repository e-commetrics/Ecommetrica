import { describe, expect, test } from "bun:test";
import { createContactFormSchema } from "@/lib/validation/contactForm";
import { getDict } from "@/lib/i18n/dict";

const schema = createContactFormSchema(getDict("es").contactForm);

const VALID = {
  name: "Ana",
  email: "ana@example.com",
  phone: "+52 664 123 4567",
  company: "Acme",
  message: "Quisiera cotizar una página web nueva.",
  consent: "on",
};

describe("createContactFormSchema", () => {
  test("accepts a fully valid payload", () => {
    expect(schema.safeParse(VALID).success).toBe(true);
  });

  test("accepts an optional phone/company left out", () => {
    const { phone, company, ...rest } = VALID;
    expect(schema.safeParse(rest).success).toBe(true);
  });

  test("rejects an empty name", () => {
    const result = schema.safeParse({ ...VALID, name: "  " });
    expect(result.success).toBe(false);
  });

  test("rejects an invalid email", () => {
    const result = schema.safeParse({ ...VALID, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  test("rejects a message shorter than 10 characters", () => {
    const result = schema.safeParse({ ...VALID, message: "too short" });
    expect(result.success).toBe(false);
  });

  test("rejects a malformed phone when provided", () => {
    const result = schema.safeParse({ ...VALID, phone: "abc" });
    expect(result.success).toBe(false);
  });

  test("rejects a payload without the privacy consent", () => {
    const result = schema.safeParse({ ...VALID, consent: undefined });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.consent?.[0]).toBe(
        getDict("es").contactForm.errors.consentRequired,
      );
    }
  });

  test("rejects a consent value other than the checked checkbox value", () => {
    const result = schema.safeParse({ ...VALID, consent: "off" });
    expect(result.success).toBe(false);
  });

  test("uses the English consent error for the English schema", () => {
    const english = createContactFormSchema(getDict("en").contactForm);
    const result = english.safeParse({ ...VALID, consent: undefined });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.consent?.[0]).toBe(
        getDict("en").contactForm.errors.consentRequired,
      );
    }
  });
});
