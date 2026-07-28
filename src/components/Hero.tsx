import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-20 pb-24 lg:px-10 lg:pt-28 lg:pb-32">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-ecom-red">
        Ecommetrica Studio
      </p>
      <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] font-medium tracking-tight text-ecom-dark sm:text-6xl lg:text-7xl">
        We build brands that transform industries and boost businesses.
      </h1>
      <p className="mt-8 max-w-xl text-lg text-ecom-dark/70">
        Through strategies based on market realities.
      </p>
      <div className="mt-10">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 rounded-full bg-ecom-dark px-7 py-3.5 text-sm font-medium text-ecom-cream transition-colors hover:bg-ecom-red"
        >
          Discover the services
        </Link>
      </div>
    </section>
  );
}
