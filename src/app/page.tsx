import Hero from "@/components/Hero";
import SelectWork from "@/components/SelectWork";
import Pillars from "@/components/Pillars";
import AboutStudio from "@/components/AboutStudio";
import Pricing from "@/components/Pricing";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectWork />
      <Pillars />
      <AboutStudio />
      <Pricing />
      <ContactCTA />
    </>
  );
}
