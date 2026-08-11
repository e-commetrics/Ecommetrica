const REPEAT = 6;

export default function Marquee({ text }: { text: string }) {
  const items = Array.from({ length: REPEAT }, (_, i) => i);

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-ecom-orange/20 bg-ecom-black py-6 sm:py-8"
    >
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((i) => (
          <div key={i} className="flex shrink-0 items-center">
            <span className="px-6 font-display text-2xl font-medium tracking-wide text-white uppercase sm:px-10 sm:text-4xl">
              {text}
            </span>
            <span aria-hidden className="text-2xl text-ecom-orange sm:text-4xl">
              &middot;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
