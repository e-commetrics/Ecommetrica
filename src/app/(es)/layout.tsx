import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ContactPrefillProvider } from "@/components/ContactPrefillProvider";
import { getDict } from "@/lib/i18n/dict";
import { SITE_URL } from "@/lib/i18n/seo";

const LANG = "es" as const;

const clashDisplay = localFont({
  src: [
    { path: "../../fonts/ClashDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/ClashDisplay-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/ClashDisplay-Semibold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

const t = getDict(LANG);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: t.siteMeta.title, template: "%s | Ecommetrica" },
  description: t.siteMeta.description,
  keywords: t.siteMeta.keywords,
  robots: { index: true, follow: true },
  authors: [{ name: "Ecommetrica", url: SITE_URL }],
  other: { publisher: "Ecommetrica" },
  openGraph: {
    siteName: "Ecommetrica",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={LANG} className={clashDisplay.variable}>
      <body className="flex min-h-screen flex-col antialiased" suppressHydrationWarning>
        <LanguageProvider lang={LANG}>
          <ContactPrefillProvider>
            <SmoothScroll />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#25272a",
                  color: "#f2ede9",
                  fontSize: "17px",
                  borderRadius: "9999px",
                  padding: "12px 20px",
                },
                success: { iconTheme: { primary: "#e84a34", secondary: "#f2ede9" } },
                error: { iconTheme: { primary: "#9c1512", secondary: "#f2ede9" } },
              }}
            />
          </ContactPrefillProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
