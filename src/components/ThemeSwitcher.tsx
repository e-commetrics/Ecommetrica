"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

/**
 * Each theme re-tints the whole page — surface, dark sections, both accents — so
 * switching reads as a different art direction, not a recolored button. Light/dark structure never changes, only hue and temperature.
 */
const THEMES = [
  {
    id: "ember",
    label: "Ember",
    accent: "#e84a34", // ecom-orange, the logo mark
    accentDeep: "#9c1512", // ecom-red
    logo: "#e84a34", // tracks the accent here
    surface: "#f2ede9", // warm beige paper
    ink: "#25272a",
    dark: "#25272a",
    black: "#121213",
  },
  {
    // Deep oxblood — goes dark like noir but stays saturated/warm, not a rosier ember.
    id: "crimson",
    label: "Crimson",
    accent: "#e02e42",
    accentDeep: "#6e0f1c",
    logo: "#e02e42", // tracks the accent here too
    surface: "#1a1013",
    ink: "#f2e6e4",
    dark: "#261a1e",
    black: "#1a1013",
  },
  {
    // Fully dark/desaturated. `surface`/`black` share a value so no seam shows between
    // sections; `dark` sits a hair above so card gradients still separate.
    id: "noir",
    label: "Noir",
    accent: "#7c8085",
    accentDeep: "#4a4d51",
    // The one theme where the logo parts company with the accent: this accent
    // is a mid grey, and the lockup is meant to read white on the dark bar.
    logo: "#ffffff",
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
    root.style.setProperty("--color-ecom-logo", theme.logo);

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
