import type { Lang } from "../types";

export type ContactTemplateData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
};

export type EmailTemplate = {
  subject: string;
  html: string;
};

const COLORS = {
  orange: "#e84a34",
  gray: "#585a5c",
  cream: "#f2ede9",
  dark: "#25272a",
  black: "#121213",
};

const COPY = {
  es: {
    footer: "Ecommetrica &middot; ecommetrica.com",
    notification: {
      eyebrow: "Nuevo contacto",
      title: "Formulario de contacto recibido",
      nameLabel: "Nombre",
      emailLabel: "Correo",
      phoneLabel: "Teléfono",
      companyLabel: "Empresa",
      messageLabel: "Mensaje",
      subject: (name: string) => `Nuevo contacto: ${name}`,
      preheader: (name: string) => `Nuevo formulario de contacto de ${name}`,
    },
    confirmation: {
      eyebrow: "Gracias por escribirnos",
      title: (name: string) => `Hola ${name}, recibimos tu mensaje`,
      body: "Gracias por contactar a Ecommetrica. Nuestro equipo revisará tu solicitud y te responderá en menos de 24 horas hábiles.",
      messageLabel: "Tu mensaje",
      cta: "Visitar ecommetrica.com",
      subject: "Recibimos tu mensaje — Ecommetrica",
      preheader: "Gracias por contactar a Ecommetrica, te responderemos pronto.",
    },
  },
  en: {
    footer: "Ecommetrica &middot; ecommetrica.com",
    notification: {
      eyebrow: "New contact",
      title: "Contact form received",
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      companyLabel: "Company",
      messageLabel: "Message",
      subject: (name: string) => `New contact: ${name}`,
      preheader: (name: string) => `New contact form submission from ${name}`,
    },
    confirmation: {
      eyebrow: "Thanks for reaching out",
      title: (name: string) => `Hi ${name}, we received your message`,
      body: "Thank you for contacting Ecommetrica. Our team will review your request and get back to you within 24 business hours.",
      messageLabel: "Your message",
      cta: "Visit ecommetrica.com",
      subject: "We received your message — Ecommetrica",
      preheader: "Thanks for contacting Ecommetrica, we'll be in touch soon.",
    },
  },
} as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function baseLayout(lang: Lang, preheader: string, bodyHtml: string) {
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ecommetrica</title>
  </head>
  <body style="margin:0; padding:0; background-color:${COLORS.cream}; font-family:Helvetica, Arial, sans-serif;">
    <span style="display:none; font-size:1px; color:${COLORS.cream}; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
      ${escapeHtml(preheader)}
    </span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.cream}; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 1px 3px rgba(18,18,19,0.08);">
            <tr>
              <td style="background-color:${COLORS.black}; padding:28px 32px;">
                <img src="cid:ecommetrica-logo" alt="Ecommetrica" width="160" style="display:block; border:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:${COLORS.dark}; padding:20px 32px; text-align:center;">
                <p style="margin:0; font-size:12px; letter-spacing:0.05em; color:rgba(255,255,255,0.6); text-transform:uppercase;">
                  ${COPY[lang].footer}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0; border-bottom:1px solid #eee; font-size:12px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:${COLORS.gray}; width:110px; vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0; border-bottom:1px solid #eee; font-size:15px; color:${COLORS.dark};">${escapeHtml(value)}</td>
    </tr>`;
}

export function buildNotificationEmail(data: ContactTemplateData, lang: Lang): EmailTemplate {
  const c = COPY[lang].notification;
  const rows = [
    detailRow(c.nameLabel, data.name),
    detailRow(c.emailLabel, data.email),
    data.phone ? detailRow(c.phoneLabel, data.phone) : "",
    data.company ? detailRow(c.companyLabel, data.company) : "",
  ].join("");

  const body = `
    <p style="margin:0 0 4px; font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:${COLORS.orange};">${c.eyebrow}</p>
    <h1 style="margin:0 0 20px; font-size:22px; line-height:1.3; color:${COLORS.black};">${c.title}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${rows}
    </table>
    <p style="margin:0 0 8px; font-size:12px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:${COLORS.gray};">${c.messageLabel}</p>
    <p style="margin:0; font-size:15px; line-height:1.6; color:${COLORS.dark}; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
  `;

  return {
    subject: c.subject(data.name),
    html: baseLayout(lang, c.preheader(data.name), body),
  };
}

export function buildConfirmationEmail(data: ContactTemplateData, lang: Lang): EmailTemplate {
  const c = COPY[lang].confirmation;
  const body = `
    <p style="margin:0 0 4px; font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:${COLORS.orange};">${c.eyebrow}</p>
    <h1 style="margin:0 0 16px; font-size:22px; line-height:1.3; color:${COLORS.black};">${c.title(escapeHtml(data.name))}</h1>
    <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:${COLORS.dark};">
      ${c.body}
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.cream}; border-radius:12px; margin:0 0 28px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 6px; font-size:12px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:${COLORS.gray};">${c.messageLabel}</p>
          <p style="margin:0; font-size:14px; line-height:1.6; color:${COLORS.dark}; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
        </td>
      </tr>
    </table>
    <a href="https://ecommetrica.com" style="display:inline-block; background-color:${COLORS.orange}; color:#ffffff; text-decoration:none; font-size:14px; font-weight:600; padding:14px 28px; border-radius:999px;">
      ${c.cta}
    </a>
  `;

  return {
    subject: c.subject,
    html: baseLayout(lang, c.preheader, body),
  };
}
