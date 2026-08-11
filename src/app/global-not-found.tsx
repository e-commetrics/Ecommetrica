import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GlobalNotFoundShell from "@/components/GlobalNotFoundShell";
import { getDict } from "@/lib/i18n/dict";

// Bypasses the (es)/en root layouts (next.config.ts's `experimental.globalNotFound`), so this
// is a full standalone document; stays a Server Component to export `metadata`.
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
      <body className="antialiased" suppressHydrationWarning>
        <GlobalNotFoundShell />
      </body>
    </html>
  );
}
