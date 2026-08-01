import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";
import { readFileSync } from "fs";
import { join } from "path";
import { buildConfirmationEmail, buildNotificationEmail } from "./email.templates";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
};

// In the production bundle, scripts/build.ts injects the real logo bytes here
// via Bun.build's `define`, read at build time from the frontend's own
// public/images/logo-principal.png — so dist/index.js needs no asset file.
declare const __LOGO_PNG_BASE64__: string | undefined;

const LOGO_CID = "ecommetrica-logo";

function loadLogoBase64(): string {
  if (typeof __LOGO_PNG_BASE64__ !== "undefined") {
    return __LOGO_PNG_BASE64__;
  }
  // Dev fallback (unbundled `bun run index.ts`): read straight from the
  // frontend's public folder, since this only ever runs inside the monorepo.
  const devLogoPath = join(__dirname, "../../../public/images/logo-principal.png");
  return readFileSync(devLogoPath).toString("base64");
}

const LOGO_BASE64 = loadLogoBase64();

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
  const notification = buildNotificationEmail(payload);

  await transporter.sendMail({
    from,
    to: toEmail,
    replyTo: payload.email,
    subject: notification.subject,
    html: notification.html,
    attachments: [logoAttachment()],
  });

  try {
    const confirmation = buildConfirmationEmail(payload);
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
