/**
 * Decorative brand shapes from `public/highlights/`.
 *
 * The source PNGs are flat silhouettes baked in one fixed color (the asterisk
 * and rings are orange, the arch grey, the monogram white), so dropping them in
 * as <img> would strand them at `ember`'s palette while the rest of the page
 * re-tints under `crimson` and `noir`. They are painted as CSS masks instead:
 * the PNG contributes only its alpha channel and `background-color` supplies the
 * pixels, which means every shape follows the live theme token.
 *
 * `tone` is the role, not a color — see the token contract in CLAUDE.md:
 * - accent  -> --color-ecom-orange. Safe on light surfaces and on dark blocks.
 * - ink     -> page text color. Light-surface sections only; inverts under noir.
 * - white   -> hardcoded, for the blocks that stay dark in every theme.
 *
 * Always decorative: rendered aria-hidden and non-interactive at every call
 * site, so nothing here is reachable by a screen reader or a pointer.
 */

type Shape = "asterisk" | "rings" | "arch" | "monogram";
type Tone = "accent" | "ink" | "white";

/**
 * The filenames ship with spaces in them. `url()` tolerates that unquoted far
 * less reliably than an encoded path does, so the space is pre-encoded here
 * rather than at each call site.
 */
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
