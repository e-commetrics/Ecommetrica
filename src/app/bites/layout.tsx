import type { Metadata } from "next";
import { Poppins, Roboto, Poor_Story, Pompiere } from "next/font/google";
import "./bites.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins-sans",
});
const roboto = Roboto({ subsets: ["latin"], weight: ["400"], variable: "--font-roboto-sans" });
const poorStory = Poor_Story({ subsets: ["latin"], weight: "400", variable: "--font-poorstory-sans" });
const pompiere = Pompiere({ subsets: ["latin"], weight: "400", variable: "--font-pompiere-sans" });

export const metadata: Metadata = {
  title: "Descubre el Poder de una Sonrisa con Bites Creadores de Sonrisas.",
  description:
    "Descubre el arte de la odontología estética en Bites Creadores de Sonrisas. Desde blanqueamiento hasta rehabilitación oral, crea una sonrisa saludable y deslumbrante con nuestros expertos en cuidado bucal.",
  robots: { index: true, follow: true },
};

export default function BitesLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${roboto.variable} ${poorStory.variable} ${pompiere.variable}`}
    >
      <body className="overflow-x-hidden font-poppins" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
