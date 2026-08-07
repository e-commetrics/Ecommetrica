/**
 * A reserved spot for photography that doesn't exist yet.
 *
 * Renders as a flat block of color at the exact size and ratio the real image
 * will occupy, so the layout around it is already final — dropping in the photo
 * later is a one-line swap for <Image>, not a re-layout. The label states what
 * belongs there and at what ratio, which is the whole point: an unlabelled grey
 * box reads as a broken image, a labelled one reads as a decision.
 *
 * Fills its container, so the caller owns the dimensions. Give it an explicit
 * `ratio` (or a height) or it collapses to nothing.
 *
 * NOTE: this is scaffolding. Every instance is meant to be replaced by a real
 * <Image>; `grep -rn "ImageSlot" src` lists what is still outstanding.
 */

export default function ImageSlot({
  label,
  ratio,
  tone = "light",
  className = "",
}: {
  /** What image goes here, e.g. "Equipo en sesión de trabajo". */
  label: string;
  /** CSS aspect-ratio, e.g. "16 / 9". Omit only when the caller sets a height. */
  ratio?: string;
  /** `dark` for the blocks that stay dark in every theme (Hero, Pillars). */
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div
      role="img"
      aria-label={label}
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={`relative flex w-full items-end overflow-hidden rounded-3xl ${
        isDark
          ? "bg-white/8 ring-1 ring-white/10"
          : "bg-ecom-ink/8 ring-1 ring-ecom-ink/10"
      } ${className}`}
    >
      {/* Corner tick: reads as a crop mark, and keeps the empty box from looking
          like a failed image load. */}
      <span
        aria-hidden
        className={`absolute top-5 left-5 h-6 w-6 border-t border-l ${
          isDark ? "border-white/25" : "border-ecom-ink/25"
        }`}
      />
      <div className="w-full p-5 sm:p-6">
        <p
          className={`text-[0.7rem] font-medium tracking-[0.18em] uppercase ${
            isDark ? "text-white/40" : "text-ecom-ink/40"
          }`}
        >
          {ratio ? `Imagen · ${ratio.replace(/\s/g, "")}` : "Imagen"}
        </p>
        <p
          className={`mt-1.5 font-display text-sm leading-snug sm:text-base ${
            isDark ? "text-white/70" : "text-ecom-ink/60"
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
