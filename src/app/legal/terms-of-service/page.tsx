import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Ecommetrica",
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <h1 className="font-display text-4xl font-medium tracking-tight text-ecom-ink">
        Terms of Service
      </h1>
      <p className="mt-6 text-ecom-ink/70">
        This page is a placeholder. Replace this copy with Ecommetrica&rsquo;s
        actual terms of service before launch.
      </p>
    </div>
  );
}
