import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/components/LanguageProvider";

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
  title: "Ecommetrica | Estrategia, tecnología y marketing digital",
  description:
    "Construimos ecosistemas digitales seguros para el crecimiento sostenible de los negocios. Estrategia, tecnología y marketing trabajando juntos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={clashDisplay.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <LanguageProvider>
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
                fontSize: "14px",
                borderRadius: "9999px",
                padding: "12px 20px",
              },
              success: { iconTheme: { primary: "#e84a34", secondary: "#f2ede9" } },
              error: { iconTheme: { primary: "#9c1512", secondary: "#f2ede9" } },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
