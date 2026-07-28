import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ecom-black text-white">
      {/* Placeholder diagonal backdrop — swap for real photography when available */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(232,74,52,0.25) 55%, transparent 70%), repeating-linear-gradient(115deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 40px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-28 lg:px-10 lg:pt-32 lg:pb-40">
        <p className="text-sm font-medium tracking-[0.2em] text-ecom-orange uppercase">
          Ecommetrica Studio
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-6xl lg:text-[5.25rem]">
          We build brands that transform industries and boost businesses.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-white/60">
          Through strategies based on market realities.
        </p>
        <div className="mt-10">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 rounded-full bg-ecom-orange px-7 py-3.5 text-sm font-medium text-white uppercase tracking-wide transition-colors hover:bg-white hover:text-ecom-black"
          >
            Discover the services
            <span aria-hidden>&#8599;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
