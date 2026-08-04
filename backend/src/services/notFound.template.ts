import { LOGO_BASE64 } from "./logo";
import type { Lang } from "../types";

// Standalone page — this backend has no access to the frontend's _next/static
// chunks (separate cPanel Node app), so it can't reuse the Next.js-rendered
// 404 as-is. Same brand colors/logo, plain inline CSS instead of Tailwind.
const COLORS = {
  orange: "#e84a34",
  black: "#121213",
};

const COPY: Record<Lang, { eyebrow: string; title: string; body: string; cta: string }> = {
  es: {
    eyebrow: "Error 404",
    title: "Esta página no existe.",
    body: "El enlace que seguiste puede estar roto o la página fue movida.",
    cta: "Volver al inicio",
  },
  en: {
    eyebrow: "Error 404",
    title: "This page doesn't exist.",
    body: "The link you followed may be broken, or the page may have moved.",
    cta: "Back to home",
  },
};

function homeUrl(lang: Lang): string {
  // FRONTEND_URL is a comma-separated CORS allowlist (see app.ts) — first
  // entry doubles as "the" site URL for the CTA link.
  const [first] = (process.env.FRONTEND_URL ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const base = first ?? "";
  // Frontend's next.config.ts has trailingSlash: true — match it here too.
  if (lang === "en") return `${base}/en/`;
  return base ? `${base}/` : "/";
}

export function buildNotFoundHtml(lang: Lang): string {
  const c = COPY[lang];

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>404 · Ecommetrica</title>
    <meta name="robots" content="noindex, nofollow" />
  </head>
  <body style="margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; background:${COLORS.black}; color:#ffffff; font-family:Helvetica, Arial, sans-serif; text-align:center; padding:32px;">
    <div>
      <img src="data:image/png;base64,${LOGO_BASE64}" alt="Ecommetrica" width="160" style="margin-bottom:40px;" />
      <p style="margin:0 0 12px; font-size:12px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:${COLORS.orange};">
        ${c.eyebrow}
      </p>
      <h1 style="margin:0 0 16px; font-size:32px; font-weight:600;">${c.title}</h1>
      <p style="margin:0 auto 32px; max-width:420px; font-size:16px; line-height:1.6; color:rgba(255,255,255,0.6);">
        ${c.body}
      </p>
      <a
        href="${homeUrl(lang)}"
        style="display:inline-block; background:${COLORS.orange}; color:#ffffff; text-decoration:none; font-size:14px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; padding:14px 32px; border-radius:999px;"
      >
        ${c.cta}
      </a>
    </div>
  </body>
</html>`;
}
