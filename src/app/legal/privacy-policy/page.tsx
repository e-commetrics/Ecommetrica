import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ecommetrica",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <h1 className="font-display text-4xl font-medium tracking-tight text-ecom-ink">
        Privacy Policy
      </h1>
      <p className="mt-6 text-ecom-ink/70">
        This page is a placeholder. Replace this copy with Ecommetrica&rsquo;s
        actual privacy policy before launch — what data is collected through
        this site (including the contact form), how it is stored and used,
        and how visitors can request deletion.
      </p>
    </div>
  );
}
