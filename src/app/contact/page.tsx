import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Ecommetrica",
  description: "Leave a request and the Ecommetrica team will get back to you.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
        Contact us
      </p>
      <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-ecom-dark sm:text-5xl">
        Let&rsquo;s build something that lasts.
      </h1>
      <p className="mt-6 max-w-xl text-ecom-dark/70">
        Tell us about your project below — our team gets back to every
        request personally.
      </p>
    </div>
  );
}
