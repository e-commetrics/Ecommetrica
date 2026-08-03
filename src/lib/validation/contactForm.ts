import { z } from "zod";
import type { Dict } from "@/lib/i18n/dict";

const PHONE_REGEX = /^[+()\d\s-]{7,20}$/;

export function createContactFormSchema(t: Dict["contactForm"]) {
  return z.object({
    name: z.string().trim().min(1, t.errors.nameRequired),
    email: z.string().trim().min(1, t.errors.emailRequired).email(t.errors.emailInvalid),
    phone: z
      .string()
      .trim()
      .optional()
      .refine((value) => !value || PHONE_REGEX.test(value), t.errors.phoneInvalid),
    company: z.string().trim().optional(),
    message: z.string().trim().min(10, t.errors.messageTooShort),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;
