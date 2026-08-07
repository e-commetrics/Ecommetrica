"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";

const PAUSE_DELAY_MS = 400;

/** Space-encoded: `url()` tolerates a raw space far less reliably than this. */
const LOGO_SRC = "/Logos/LOGO%20PRINCIPAL%20ECOMMETRICA%203.png";

/** Active if the pathname is that link or one of its sub-routes (e.g. /work/some-slug). */
function isActiveHref(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { t, lang } = useLanguage();
  // Falls back to "" (matches nothing) — usePathname() has no router context
  // to read from on the bypassed global-not-found page.
  const pathname = usePathname() ?? "";
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Direction doesn't matter — any active scrolling past the threshold
    // hides the navbar; only a pause (below) brings it back.
    setHidden(latest > 120);

    // Scrolling continuously re-arms this timer, so it only fires once the
    // user actually pauses — that's when the navbar should reappear.
    clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setHidden(false), PAUSE_DELAY_MS);
  });

  useEffect(() => () => clearTimeout(pauseTimer.current), []);

  const navLinks = [
    { href: localizedHref(lang, "/studio"), label: t.nav.studio },
    { href: localizedHref(lang, "/services"), label: t.nav.services },
    { href: localizedHref(lang, "/work"), label: t.nav.work },
    { href: localizedHref(lang, "/blog"), label: t.nav.blog },
    { href: localizedHref(lang, "/contact"), label: t.nav.contact },
  ].map((link) => ({ ...link, active: isActiveHref(pathname, link.href) }));

  return (
    <>
      {/* The logo lost next/image's `priority` when it became a mask, and a
          mask that has not loaded yet paints as an unmasked box — a solid
          accent rectangle in the bar. Preloading keeps it out of that window.
          React hoists this into <head>. */}
      <link rel="preload" as="image" href={LOGO_SRC} />
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
        className="sticky top-0 z-50 border-b border-ecom-orange/20 bg-ecom-black/90 backdrop-blur"
      >
      <div className="shell flex items-center justify-between py-4">
        <Link href={localizedHref(lang, "/")} className="flex items-center gap-2">
          {/* Primary lockup (mark + wordmark) rather than the isotype alone, so
              the brand name is legible in the bar.

              Painted as a CSS mask instead of drawn as an image, for the same
              reason the shapes in Highlight.tsx are: the PNG is a flat #E84A34
              silhouette, so as an <img> it would sit at ember's orange while
              the rest of the bar re-tints under crimson and noir. As a mask the
              file contributes only its alpha — antialiased edges included — and
              background-color supplies the pixels from the live logo token.
              That also means the swap cross-fades for free, since the .theming
              rule in globals.css transitions background-color.

              --color-ecom-logo, not the accent: they match in the colored
              themes, but noir's accent is a mid grey and the lockup has to
              stay white there.

              aspect-ratio rather than w-auto: with no intrinsic image there is
              no natural width for `auto` to resolve against. 940x190 is the
              file's real size, so the wordmark never smears. */}
          <span
            role="img"
            aria-label="Ecommetrica"
            className="block h-7 sm:h-8"
            style={{
              aspectRatio: "940 / 190",
              backgroundColor: "var(--color-ecom-logo)",
              // Unprefixed alone drops the mask on WebKit, which then paints
              // the raw background box — a solid accent rectangle where the
              // logo should be.
              WebkitMaskImage: `url("${LOGO_SRC}")`,
              maskImage: `url("${LOGO_SRC}")`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        </Link>

        {/* gap tightens at md: five links plus both switchers and the CTA pill
            overflow the bar at 768px on the wider gap. */}
        <nav className="hidden items-center gap-5 text-sm font-medium tracking-wide uppercase md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={`relative transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-ecom-orange after:transition-all after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white hover:after:w-full ${
                link.active ? "text-white after:w-full" : "text-white/70 after:w-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Link
            href={localizedHref(lang, "/contact")}
            className="rounded-full bg-ecom-orange px-5 py-2.5 text-sm font-medium tracking-wide text-white shadow-lg shadow-ecom-orange/20 transition-all duration-300 hover:bg-ecom-red hover:shadow-ecom-red/25"
          >
            {t.nav.talk}
          </Link>
        </div>

        <MobileNav
          navLinks={navLinks}
          talk={t.nav.talk}
          menuLabel={t.mobileMenu.open}
          contactHref={localizedHref(lang, "/contact")}
        />
        </div>
      </motion.header>
    </>
  );
}

function MobileNav({
  navLinks,
  talk,
  menuLabel,
  contactHref,
}: {
  navLinks: { href: string; label: string; active: boolean }[];
  talk: string;
  menuLabel: string;
  contactHref: string;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const close = useCallback(() => {
    const el = detailsRef.current;
    if (el) el.open = false;
  }, []);

  // `<details>` only closes by re-clicking its summary, so dismissing it the
  // way every other menu behaves — tapping the page, or Escape — has to be
  // wired up. Pointerdown (not click) so it also dismisses on a drag/scroll
  // gesture that starts outside the panel.
  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const el = detailsRef.current;
      if (!el?.open) return;
      if (!el.contains(event.target as Node)) close();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close]);

  return (
    <details ref={detailsRef} className="relative md:hidden">
      <summary className="list-none cursor-pointer select-none rounded-md border border-white/20 px-3 py-2 text-sm text-white">
        {menuLabel}
      </summary>
      <div className="absolute right-0 mt-2 flex w-52 flex-col gap-3 rounded-xl border border-white/10 bg-ecom-black p-3 shadow-lg">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            aria-current={link.active ? "page" : undefined}
            className={`rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wide hover:bg-white/5 ${
              link.active ? "bg-white/5 text-ecom-orange" : "text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <div className="flex items-center justify-between border-t border-white/10 px-3 pt-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
        <Link
          href={contactHref}
          onClick={close}
          className="rounded-md bg-ecom-orange px-3 py-2 text-center text-sm font-medium text-white"
        >
          {talk}
        </Link>
      </div>
    </details>
  );
}
