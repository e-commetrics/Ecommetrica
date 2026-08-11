/**
 * Decorative brand shapes from `public/highlights/`, painted as CSS masks so
 * `background-color` supplies theme-following pixels instead of a fixed baked-in
 * color. `tone` is a role, not a literal color (see CLAUDE.md's token contract).
 */

type Shape = "asterisk" | "rings" | "arch" | "monogram";
type Tone = "accent" | "ink" | "white";

/** Filenames ship with spaces — pre-encoded here since raw `url()` handles that unreliably. */
const SHAPE_SRC: Record<Shape, string> = {
  asterisk: "/highlights/highlight%20ecommetrica%204.png",
  rings: "/highlights/highlight%20ecommetrica%203.png",
  arch: "/highlights/highlight%20ecommetrica%205.png",
  monogram: "/highlights/highlight%20ecommetrica%202.png",
};

/** Intrinsic ratio of each PNG, so callers can size on one axis and let the
 *  other follow instead of hand-matching numbers to the asset. */
export const SHAPE_ASPECT: Record<Shape, string> = {
  asterisk: "1 / 1",
  rings: "1122 / 525",
  arch: "707 / 353",
  monogram: "400 / 343",
};

const TONE_BG: Record<Tone, string> = {
  accent: "var(--color-ecom-orange)",
  ink: "var(--color-ecom-ink)",
  white: "#ffffff",
};

export default function Highlight({
  shape,
  tone = "accent",
  className = "",
  opacity,
}: {
  shape: Shape;
  tone?: Tone;
  /** Size and position it here — the component sets no dimensions of its own. */
  className?: string;
  opacity?: number;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none block select-none ${className}`}
      style={{
        aspectRatio: SHAPE_ASPECT[shape],
        backgroundColor: TONE_BG[tone],
        opacity,
        // Unprefixed alone drops the shape entirely on WebKit, which paints the
        // raw background box instead — a solid rectangle across the section.
        WebkitMaskImage: `url("${SHAPE_SRC[shape]}")`,
        maskImage: `url("${SHAPE_SRC[shape]}")`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
