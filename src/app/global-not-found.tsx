import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GlobalNotFoundShell from "@/components/GlobalNotFoundShell";
import { getDict } from "@/lib/i18n/dict";

// This bypasses the (es)/en root layouts entirely (see next.config.ts —
// `experimental.globalNotFound`), so it has to be a full standalone
// document and re-declare anything those layouts normally provide. Stays a
// Server Component (no "use client") because it exports `metadata`; the
// language-aware bits live in GlobalNotFoundShell.
const t = getDict("es");

const clashDisplay = localFont({
  src: [
    { path: "../fonts/ClashDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/ClashDisplay-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/ClashDisplay-Semibold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

export const metadata: Metadata = {
  title: t.notFound.title,
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="es" className={clashDisplay.variable}>
      <body className="flex min-h-screen flex-col antialiased" suppressHydrationWarning>
        <GlobalNotFoundShell />
      </body>
    </html>
  );
}
