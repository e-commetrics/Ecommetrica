"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

/**
 * Site color themes (brand book V1.3 §02, decided 15 oct 2026). Each theme re-tints the
 * page — surface, ink, dark blocks, deep accent, eyebrows — but the brand orange and the
 * logo stay #E84A34 in all six: the E never changes color.
 *
 * `swatch` is the switcher dot: the two companions of the orange, split at 135°. The
 * orange itself is already on the logo and the buttons, so it isn't repeated here.
 *
 * `look` picks the component rules layered on top of the colors (see `lookVars`):
 * Ember keeps the site's original look; the five new themes use the handoff rules.
 */
export const THEMES = [
  {
    id: "ember",
    name: "Ember",
    look: "original",
    swatch: ["#25272A", "#F2EDE9"],
    vars: {
      "--color-ecom-orange": "#E84A34",
      "--color-ecom-red": "#9C1512",
      "--color-ecom-logo": "#E84A34",
      "--color-ecom-surface": "#F2EDE9",
      "--color-ecom-ink": "#25272A",
      "--color-ecom-dark": "#25272A",
      // The original near-black, not the handoff's #25272A: the dark blocks keep their depth.
      "--color-ecom-black": "#121213",
      "--color-ecom-eyebrow": "#E84A34",
      "--color-ecom-hero": "#E84A34",
    },
  },
  {
    id: "brasa",
    look: "handoff",
    name: "Brasa",
    swatch: ["#9C1512", "#2B110B"],
    vars: {
      "--color-ecom-orange": "#E84A34",
      "--color-ecom-red": "#9C1512",
      "--color-ecom-logo": "#E84A34",
      "--color-ecom-surface": "#2B110B",
      "--color-ecom-ink": "#F5EFE7",
      "--color-ecom-dark": "#3B1D16",
      "--color-ecom-black": "#1C0906",
      "--color-ecom-eyebrow": "#E84A34",
      "--color-ecom-hero": "#9C1512",
    },
  },
  {
    id: "bugambilia",
    look: "handoff",
    name: "Bugambilia",
    swatch: ["#C62B7A", "#420F32"],
    vars: {
      "--color-ecom-orange": "#E84A34",
      "--color-ecom-red": "#C62B7A",
      "--color-ecom-logo": "#E84A34",
      "--color-ecom-surface": "#420F32",
      "--color-ecom-ink": "#FBF1ED",
      "--color-ecom-dark": "#561B43",
      "--color-ecom-black": "#190B15",
      "--color-ecom-eyebrow": "#EDA6C1",
      "--color-ecom-hero": "#C62B7A",
    },
  },
  {
    id: "neon",
    look: "handoff",
    name: "Neón",
    swatch: ["#45F0E4", "#0E1035"],
    vars: {
      "--color-ecom-orange": "#E84A34",
      "--color-ecom-red": "#7B2CFF",
      "--color-ecom-logo": "#E84A34",
      "--color-ecom-surface": "#0E1035",
      "--color-ecom-ink": "#F3F1FF",
      "--color-ecom-dark": "#1C2060",
      "--color-ecom-black": "#07081F",
      "--color-ecom-eyebrow": "#45F0E4",
      "--color-ecom-hero": "#45F0E4",
    },
  },
  {
    id: "acido",
    look: "handoff",
    name: "Ácido",
    swatch: ["#D9FB3E", "#16180A"],
    vars: {
      "--color-ecom-orange": "#E84A34",
      "--color-ecom-red": "#A8E000",
      "--color-ecom-logo": "#E84A34",
      "--color-ecom-surface": "#D9FB3E",
      "--color-ecom-ink": "#16180A",
      "--color-ecom-dark": "#2A2F10",
      "--color-ecom-black": "#16180A",
      "--color-ecom-eyebrow": "#16180A",
      "--color-ecom-hero": "#D9FB3E",
    },
  },
  {
    id: "holograma",
    look: "handoff",
    name: "Holograma",
    swatch: ["#5B3FD1", "#F3F0FA"],
    vars: {
      "--color-ecom-orange": "#E84A34",
      "--color-ecom-red": "#FF5FC8",
      "--color-ecom-logo": "#E84A34",
      "--color-ecom-surface": "#F3F0FA",
      "--color-ecom-ink": "#1C1830",
      "--color-ecom-dark": "#2A2450",
      "--color-ecom-black": "#14112A",
      "--color-ecom-eyebrow": "#5B3FD1",
      "--color-ecom-hero": "#FF5FC8",
    },
  },
] as const;

type Theme = (typeof THEMES)[number];
type ThemeId = Theme["id"];

/**
 * Component rules layered on top of a theme's colors. They're tokens rather than
 * classes so one set of components can carry both looks. Keep the "original" branch in
 * sync with the `:root` / `@theme` defaults in globals.css (the server render).
 */
function lookVars(theme: Theme): Record<string, string> {
  const v = theme.vars;
  if (theme.look === "original") {
    return {
      "--color-ecom-eyebrow-dark": v["--color-ecom-orange"],
      "--color-ecom-on-accent": "#FFFFFF",
      "--color-ecom-accent-hover": v["--color-ecom-red"],
      "--color-ecom-on-accent-hover": "#FFFFFF",
      "--color-ecom-meta": `color-mix(in srgb, ${v["--color-ecom-ink"]} 50%, transparent)`,
      "--ecom-btn-size": "var(--text-sm)",
      "--ecom-btn-weight": "500",
      "--ecom-dash": "currentColor",
      "--ecom-dash-opacity": "0.5",
    };
  }
  // Handoff (15 oct 2026): white eyebrows on dark blocks, dark labels on the orange,
  // ink/70 meta, 19px semibold buttons, solid orange dash. Orange buttons hover to
  // ink/surface — a dark label on the deep accent would fail contrast.
  return {
    "--color-ecom-eyebrow-dark": "#FFFFFF",
    "--color-ecom-on-accent": v["--color-ecom-black"],
    "--color-ecom-accent-hover": v["--color-ecom-ink"],
    "--color-ecom-on-accent-hover": v["--color-ecom-surface"],
    "--color-ecom-meta": `color-mix(in srgb, ${v["--color-ecom-ink"]} 70%, transparent)`,
    "--ecom-btn-size": "var(--text-base)",
    "--ecom-btn-weight": "600",
    "--ecom-dash": v["--color-ecom-orange"],
    "--ecom-dash-opacity": "1",
  };
}

export const DEFAULT_THEME: ThemeId = "ember";

/** Themes saved in localStorage["ecom-theme"] before the 15 oct 2026 change. */
export const LEGACY_THEMES: Record<string, ThemeId> = { crimson: "brasa", noir: "bugambilia" };

const STORAGE_KEY = "ecom-theme";

function resolveStored(value: string | null): ThemeId | null {
  if (!value) return null;
  if (value in LEGACY_THEMES) return LEGACY_THEMES[value];
  return THEMES.some((theme) => theme.id === value) ? (value as ThemeId) : null;
}

export default function ThemeSwitcher() {
  const { t } = useLanguage();
  const [active, setActive] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage blocked (private mode, etc.): stay on the default theme.
    }
    const id = resolveStored(stored);
    // A legacy id is rewritten to its replacement so the migration only happens once.
    if (id) applyTheme(id, { persist: id !== stored, animate: false });
  }, []);

  function applyTheme(
    id: ThemeId,
    { persist = true, animate = true }: { persist?: boolean; animate?: boolean } = {},
  ) {
    const theme = THEMES.find((item) => item.id === id);
    if (!theme) return;

    const root = document.documentElement;

    // Cross-fade every themed property for the duration of the swap only,
    // so normal hover transitions aren't affected the rest of the time.
    if (animate) {
      root.classList.add("theming");
      window.setTimeout(() => root.classList.remove("theming"), 500);
    }

    for (const [name, value] of Object.entries({ ...theme.vars, ...lookVars(theme) })) {
      root.style.setProperty(name, value);
    }

    setActive(id);
    if (persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, id);
      } catch {
        // Not persisted; the theme still applies for this visit.
      }
    }
  }

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label={t.themeSwitcher.ariaLabel}>
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          type="button"
          aria-label={theme.name}
          title={theme.name}
          aria-pressed={active === theme.id}
          onClick={() => applyTheme(theme.id)}
          className={`h-4 w-4 rounded-full ring-offset-2 ring-offset-ecom-black transition-all ${
            active === theme.id
              ? "ring-2 ring-white"
              : "ring-1 ring-white/30 hover:ring-white/60"
          }`}
          style={{
            background: `linear-gradient(135deg, ${theme.swatch[0]} 0 50%, ${theme.swatch[1]} 50% 100%)`,
          }}
        />
      ))}
    </div>
  );
}
