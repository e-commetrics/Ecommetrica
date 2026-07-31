import type { Metadata } from "next";
import WorkGallery from "@/components/WorkGallery";
import { caseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work | Ecommetrica",
  description: "Proyectos de branding y desarrollo web de Ecommetrica.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <p className="eyebrow-rule text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
        Work
      </p>
      <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-medium tracking-[-0.02em] text-ecom-ink sm:text-5xl lg:text-6xl">
        Proyectos que construyen ecosistemas digitales sostenibles.
      </h1>

      {/* Filtering is client-side, so the list lives in a client component
          while this page stays a server component and keeps its metadata. */}
      <WorkGallery projects={caseStudies} />
    </div>
  );
}
