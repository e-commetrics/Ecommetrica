"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { id: "orange", label: "Orange", hex: "#e84a34" },
  { id: "red", label: "Red", hex: "#9c1512" },
  { id: "noir", label: "Noir", hex: "#585a5c" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

export default function ThemeSwitcher() {
  const [active, setActive] = useState<ThemeId>("orange");

  useEffect(() => {
    const stored = window.localStorage.getItem("ecom-theme") as ThemeId | null;
    if (stored) applyTheme(stored, false);
  }, []);

  function applyTheme(id: ThemeId, persist = true) {
    const theme = THEMES.find((t) => t.id === id);
    if (!theme) return;
    document.documentElement.style.setProperty("--color-ecom-orange", theme.hex);
    setActive(id);
    if (persist) window.localStorage.setItem("ecom-theme", id);
  }

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Accent color">
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          type="button"
          aria-label={theme.label}
          aria-pressed={active === theme.id}
          onClick={() => applyTheme(theme.id)}
          className={`h-4 w-4 rounded-full ring-offset-2 ring-offset-ecom-black transition-all ${
            active === theme.id ? "ring-2 ring-white" : "ring-1 ring-white/30 hover:ring-white/60"
          }`}
          style={{ backgroundColor: theme.hex }}
        />
      ))}
    </div>
  );
}
