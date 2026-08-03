"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

/**
 * Each theme re-tints the whole page, not just the accent: the light
 * surface, the dark sections and the two accents all shift together, so
 * switching reads as a different art direction rather than a recolored
 * button. What never changes is the light/dark *structure* — light sections
 * stay light in every theme, dark sections stay dark — only their hue and
 * temperature move.
 *
 * `swatch` is what the picker dot shows; it's the accent for the colored
 * themes and the surface pair for the monochrome one.
 */
const THEMES = [
  {
    id: "ember",
    label: "Ember",
    accent: "#e84a34", // ecom-orange, the logo mark
    accentDeep: "#9c1512", // ecom-red
    surface: "#f2ede9", // warm beige paper
    ink: "#25272a",
    dark: "#25272a",
    black: "#121213",
  },
  {
    // Deep oxblood. Goes dark like noir — same seamless surface/black trick —
    // but stays saturated and warm, so it reads as a different art direction
    // rather than a rosier ember.
    id: "crimson",
    label: "Crimson",
    accent: "#e02e42",
    accentDeep: "#6e0f1c",
    surface: "#1a1013",
    ink: "#f2e6e4",
    dark: "#261a1e",
    black: "#1a1013",
  },
  {
    // Fully dark, fully desaturated. `surface` and `black` are deliberately
    // the SAME value: the light and dark sections collapse onto one another
    // so no boundary line can appear between components. `dark` sits a hair
    // above them so card gradients still separate from the page.
    id: "noir",
    label: "Noir",
    accent: "#7c8085",
    accentDeep: "#4a4d51",
    surface: "#141517",
    ink: "#eceded",
    dark: "#1e1f22",
    black: "#141517",
  },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "ecom-theme";

export default function ThemeSwitcher() {
  const { t } = useLanguage();
  const [active, setActive] = useState<ThemeId>("ember");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (stored && THEMES.some((t) => t.id === stored)) {
      applyTheme(stored, { persist: false, animate: false });
    }
  }, []);

  function applyTheme(
    id: ThemeId,
    { persist = true, animate = true }: { persist?: boolean; animate?: boolean } = {},
  ) {
    const theme = THEMES.find((t) => t.id === id);
    if (!theme) return;

    const root = document.documentElement;

    // Cross-fade every themed property for the duration of the swap only,
    // so normal hover transitions aren't affected the rest of the time.
    if (animate) {
      root.classList.add("theming");
      window.setTimeout(() => root.classList.remove("theming"), 500);
    }

    root.style.setProperty("--color-ecom-orange", theme.accent);
    root.style.setProperty("--color-ecom-red", theme.accentDeep);
    root.style.setProperty("--color-ecom-surface", theme.surface);
    root.style.setProperty("--color-ecom-ink", theme.ink);
    root.style.setProperty("--color-ecom-dark", theme.dark);
    root.style.setProperty("--color-ecom-black", theme.black);

    setActive(id);
    if (persist) window.localStorage.setItem(STORAGE_KEY, id);
  }

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label={t.themeSwitcher.ariaLabel}>
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          type="button"
          aria-label={theme.label}
          aria-pressed={active === theme.id}
          onClick={() => applyTheme(theme.id)}
          className={`h-4 w-4 rounded-full ring-offset-2 ring-offset-ecom-black transition-all ${
            active === theme.id
              ? "ring-2 ring-white"
              : "ring-1 ring-white/30 hover:ring-white/60"
          }`}
          style={{
            background: `linear-gradient(135deg, ${theme.accent} 0 50%, ${theme.surface} 50% 100%)`,
          }}
        />
      ))}
    </div>
  );
}
