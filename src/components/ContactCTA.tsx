import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-28">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-ecom-red">
        Contact us
      </p>
      <h2 className="mt-6 font-display text-4xl font-medium tracking-tight text-ecom-dark sm:text-5xl">
        Are you ready?
      </h2>
      <div className="mt-10">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-ecom-dark px-8 py-4 text-sm font-medium text-ecom-cream transition-colors hover:bg-ecom-red"
        >
          Leave a request
        </Link>
      </div>
    </section>
  );
}
