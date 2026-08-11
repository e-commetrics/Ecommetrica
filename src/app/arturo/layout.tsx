import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./arturo.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Arturo - Ecommetrica",
  description:
    "Especialista en medicina estética, antiedad y antienvejecimiento en Playas de Tijuana.",
  robots: { index: true, follow: true },
};

export default function ArturoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="overflow-x-hidden font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
