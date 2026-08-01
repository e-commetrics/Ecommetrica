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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function baseLayout(preheader: string, bodyHtml: string) {
  return `<!doctype html>
<html lang="es">
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
                  Ecommetrica &middot; ecommetrica.com
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

export function buildNotificationEmail(data: ContactTemplateData): EmailTemplate {
  const rows = [
    detailRow("Nombre", data.name),
    detailRow("Correo", data.email),
    data.phone ? detailRow("Teléfono", data.phone) : "",
    data.company ? detailRow("Empresa", data.company) : "",
  ].join("");

  const body = `
    <p style="margin:0 0 4px; font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:${COLORS.orange};">Nuevo contacto</p>
    <h1 style="margin:0 0 20px; font-size:22px; line-height:1.3; color:${COLORS.black};">Formulario de contacto recibido</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${rows}
    </table>
    <p style="margin:0 0 8px; font-size:12px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:${COLORS.gray};">Mensaje</p>
    <p style="margin:0; font-size:15px; line-height:1.6; color:${COLORS.dark}; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
  `;

  return {
    subject: `Nuevo contacto: ${data.name}`,
    html: baseLayout(`Nuevo formulario de contacto de ${data.name}`, body),
  };
}

export function buildConfirmationEmail(data: ContactTemplateData): EmailTemplate {
  const body = `
    <p style="margin:0 0 4px; font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:${COLORS.orange};">Gracias por escribirnos</p>
    <h1 style="margin:0 0 16px; font-size:22px; line-height:1.3; color:${COLORS.black};">Hola ${escapeHtml(data.name)}, recibimos tu mensaje</h1>
    <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:${COLORS.dark};">
      Gracias por contactar a Ecommetrica. Nuestro equipo revisará tu solicitud y te responderá en menos de 24 horas hábiles.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.cream}; border-radius:12px; margin:0 0 28px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 6px; font-size:12px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:${COLORS.gray};">Tu mensaje</p>
          <p style="margin:0; font-size:14px; line-height:1.6; color:${COLORS.dark}; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
        </td>
      </tr>
    </table>
    <a href="https://ecommetrica.com" style="display:inline-block; background-color:${COLORS.orange}; color:#ffffff; text-decoration:none; font-size:14px; font-weight:600; padding:14px 28px; border-radius:999px;">
      Visitar ecommetrica.com
    </a>
  `;

  return {
    subject: "Recibimos tu mensaje — Ecommetrica",
    html: baseLayout("Gracias por contactar a Ecommetrica, te responderemos pronto.", body),
  };
}
