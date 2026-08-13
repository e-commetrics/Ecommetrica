/**
 * Decorative brand shapes from `public/highlights/`, painted as CSS masks so
 * `background-color` supplies theme-following pixels instead of a fixed baked-in
 * color. `tone` is a role, not a literal color (see CLAUDE.md's token contract).
 */

type Shape = "asterisk" | "rings" | "arch" | "monogram" | "logo";
type Tone = "accent" | "ink" | "white";

/** Filenames ship with spaces — pre-encoded here since raw `url()` handles that unreliably. */
const SHAPE_SRC: Record<Shape, string> = {
  asterisk:
    "/highlights/Icono%20ecommetrica%20que%20acelera%20la%20adquisicion%20de%20clientes%20potenciales%20con%20posicionamiento%20a%20la%20medida.png",
  rings: "/highlights/Icono%20de%20ecommetrica%20la%20mejor%20opcion%20para%20crecimiento%20empresarial.png",
  arch: "/highlights/highlight%20ecommetrica%205.png",
  monogram: "/highlights/highlight%20ecommetrica%202.png",
  logo: "/highlights/ecommetrica%20consultora%20y%20gestora%20de%20ecommerce%20y%20marcas.png",
};

/** Intrinsic ratio of each PNG, so callers can size on one axis and let the
 *  other follow instead of hand-matching numbers to the asset. */
export const SHAPE_ASPECT: Record<Shape, string> = {
  asterisk: "1 / 1",
  rings: "1122 / 525",
  arch: "707 / 353",
  monogram: "400 / 343",
  logo: "400 / 343",
};

/** Native tooltip text for shapes that have one — set only where content was supplied.
 *  Shapes stay `aria-hidden` regardless: every call site places them beside text that
 *  already carries the meaning, so exposing this to screen readers would be redundant
 *  (and, for `asterisk`, repeated near-identically across five unrelated pages). */
const SHAPE_TITLE: Partial<Record<Shape, string>> = {
  logo: "Ecommetrica es una Consultora y gestora de tecnología y marketing digital para ecommerce y marcas en Tijuana",
  rings: "Icono espiral de ecommetrica la mejor opción para crecimiento empresarial digital en Tijuana, San Diego y Los Ángeles",
  asterisk:
    "Icono ecommetrica que acelera la adquisición de clientes potenciales con posicionamiento a la medida para que los clientes den contigo",
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
      title={SHAPE_TITLE[shape]}
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
