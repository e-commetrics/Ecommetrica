import { AxiosError } from "axios";
import { api } from "./api";
import { API_ROUTES } from "./routes";
import type { Lang } from "@/lib/i18n/types";

export type ContactFormPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  lang: Lang;
};

export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  try {
    await api.post(API_ROUTES.contact, payload);
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.error ?? "Something went wrong. Please try again.");
    }
    throw err;
  }
}
