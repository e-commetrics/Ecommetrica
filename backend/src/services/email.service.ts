import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";
import { buildConfirmationEmail, buildNotificationEmail } from "./email.templates";
import { LOGO_BASE64 } from "./logo";
import type { Lang } from "../types";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  lang: Lang;
};

const LOGO_CID = "ecommetrica-logo";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !port || !user || !pass) {
    throw new Error("Missing SMTP configuration");
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });
}

function logoAttachment(): Attachment {
  return { filename: "logo.png", content: Buffer.from(LOGO_BASE64, "base64"), cid: LOGO_CID };
}

export async function sendContactEmail(payload: ContactPayload) {
  const transporter = getTransporter();
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!toEmail) {
    throw new Error("Missing CONTACT_TO_EMAIL configuration");
  }

  const from = `"Ecommetrica" <${process.env.SMTP_USER}>`;
  const notification = buildNotificationEmail(payload, payload.lang);

  await transporter.sendMail({
    from,
    to: toEmail,
    replyTo: payload.email,
    subject: notification.subject,
    html: notification.html,
    attachments: [logoAttachment()],
  });

  try {
    const confirmation = buildConfirmationEmail(payload, payload.lang);
    await transporter.sendMail({
      from,
      to: payload.email,
      subject: confirmation.subject,
      html: confirmation.html,
      attachments: [logoAttachment()],
    });
  } catch (error) {
    console.error("Failed to send confirmation email to visitor:", error);
  }
}
