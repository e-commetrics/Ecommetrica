import type { Localized } from "@/lib/i18n/types";

/**
 * Captions for the reserved photography slots rendered by <ImageSlot>. Kept out of
 * dict.ts since these are scaffolding — delete a slot's entry + <ImageSlot>, drop in an
 * <Image> once the real photo lands. Outstanding slots: `grep -rn "ImageSlot" src`.
 */
export const imageSlots = {
  /** Studio page, under the opening quote. Light surface, wide banner. */
  studioBanner: {
    es: "Foto del estudio o del equipo completo — panorámica, ambiente de trabajo",
    en: "Studio or full-team photo — wide, showing the working environment",
  },

  /** Services page, beside the headline. Light surface. */
  servicesPageIntro: {
    es: "Producto terminado en contexto: sitio en laptop y móvil sobre escritorio real",
    en: "Finished work in context: a site on laptop and phone on a real desk",
  },

  /** Home, Pillars section, beside the statement. Dark block in every theme. */
  pillarsStatement: {
    es: "Equipo en sesión de trabajo — encuadre horizontal, ambiente real de oficina",
    en: "Team in a working session — landscape framing, real office setting",
  },
} satisfies Record<string, Localized>;
