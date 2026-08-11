/**
 * Reserved spot for photography that doesn't exist yet — flat color block at the real
 * image's size/ratio, swappable for <Image> later. Scaffolding: `grep -rn "ImageSlot" src`.
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
      {/* Corner tick: reads as a crop mark, not a failed image load. */}
      <span
        aria-hidden
        className={`absolute top-5 left-5 h-6 w-6 border-t border-l ${
          isDark ? "border-white/25" : "border-ecom-ink/25"
        }`}
      />
      <div className="w-full p-5 sm:p-6">
        <p
          className={`text-xs font-medium tracking-[0.18em] uppercase ${
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
