import { BitesI18nProvider } from "./_components/i18n";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Information from "./_components/Information";
import Mision from "./_components/Mision";
import Task from "./_components/Task";
import Contact from "./_components/Contact";
import Booking from "./_components/Booking";
import Map from "./_components/Map";
import ServiceCard from "./_components/ServiceCard";
import Footer from "./_components/Footer";
import FooterText from "./_components/FooterText";

export default function BitesPage() {
  return (
    <BitesI18nProvider>
      <div className="overflow-x-hidden">
        <Navbar />
        <Hero />
        <Information />
        <Mision />
        <Task />
        <Contact />
        <Booking />
        <Map />
        <ServiceCard />
        <Footer />
        <FooterText className="bg-[#FE81BD]" hoverColor="hover:text-blue-400" />
      </div>
    </BitesI18nProvider>
  );
}
