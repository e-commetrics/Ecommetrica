import type { Metadata } from "next";
import localFont from "next/font/local";
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
        </LanguageProvider>
      </body>
    </html>
  );
}
