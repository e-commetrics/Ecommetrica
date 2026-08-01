import type { Request, Response } from "express";
import { sendContactEmail } from "../services/email.service";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(req: Request, res: Response) {
  const { name, email, phone, company, message } = req.body ?? {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !message.trim() ||
    !EMAIL_REGEX.test(email)
  ) {
    return res.status(400).json({ error: "Invalid form data." });
  }

  try {
    await sendContactEmail({
      name,
      email,
      message,
      phone: typeof phone === "string" ? phone : undefined,
      company: typeof company === "string" ? company : undefined,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return res.status(502).json({ error: "Failed to send message. Please try again later." });
  }
}
