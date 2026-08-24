"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import RegionSwitcher from "@/components/RegionSwitcher";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedHref } from "@/lib/i18n/localizedHref";

const PAUSE_DELAY_MS = 400;
const EASE = [0.22, 1, 0.36, 1] as const;

const menuContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } },
};

const menuItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

/** Space-encoded: `url()` tolerates a raw space far less reliably than this. */
const LOGO_SRC = "/Logos/Ecommetrica%20consultoria%20tecnologica%20y%20desarrollo%20web.png";

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
    { href: localizedHref(lang, "/faq"), label: t.nav.faq },
    { href: localizedHref(lang, "/contact"), label: t.nav.contact },
  ].map((link) => ({ ...link, active: isActiveHref(pathname, link.href) }));

  return (
    <>
      {/* Preload: an unloaded mask paints as a solid accent rectangle. React hoists this into <head>. */}
      <link rel="preload" as="image" href={LOGO_SRC} />
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
        className="sticky top-0 z-50 border-b border-ecom-orange/20 bg-ecom-black/90 backdrop-blur"
      >
      <div className="shell flex items-center justify-between py-4">
        <Link href={localizedHref(lang, "/")} className="flex items-center gap-2">
          {/* Primary lockup (mark + wordmark), painted as a CSS mask like Highlight.tsx's shapes
              so background-color (--color-ecom-logo) supplies theme-following pixels instead of a fixed baked-in color. */}
          <span
            role="img"
            aria-label={t.nav.logoAlt}
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

        {/* Breakpoint is lg, not md: six links + switchers + CTA need ~880px, the bar only has ~700px at 768px. */}
        <nav className="hidden items-center gap-5 text-sm font-medium tracking-wide uppercase lg:flex xl:gap-8">
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

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher />
          <RegionSwitcher />
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
          closeLabel={t.mobileMenu.close}
          contactHref={localizedHref(lang, "/contact")}
          logoAlt={t.nav.logoAlt}
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
  closeLabel,
  contactHref,
  logoAlt,
}: {
  navLinks: { href: string; label: string; active: boolean }[];
  talk: string;
  menuLabel: string;
  closeLabel: string;
  contactHref: string;
  logoAlt: string;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Portal to <body>: the header has `backdrop-blur`, which — like `transform` or
  // `filter` — creates a containing block for fixed descendants, so a `fixed
  // inset-0` panel left inside it is confined to the header's own box instead of
  // covering the viewport.
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => setPortalReady(true), []);

  // No "outside" to tap once the panel covers the viewport, so only Escape
  // closes it — page scroll is locked for as long as it's open.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={menuLabel}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white"
      >
        <MenuIcon className="h-4 w-4" />
      </button>

      {portalReady &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div
                className="fixed inset-0 z-[60] overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-label={menuLabel}
              >
                {/* Curtain: two panels slide in from their own edge and meet at the
                    center, covering the screen; closing reverses it, each panel
                    retreating back off its own side. */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-ecom-black"
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-y-0 right-0 w-1/2 bg-ecom-black"
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.35, delay: 0.2, ease: EASE } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="relative z-10 flex h-full flex-col"
                >
                  <div className="shell flex items-center justify-between py-4">
                    <span
                      role="img"
                      aria-label={logoAlt}
                      className="block h-7"
                      style={{
                        aspectRatio: "940 / 190",
                        backgroundColor: "var(--color-ecom-logo)",
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
                    <button
                      type="button"
                      onClick={close}
                      aria-label={closeLabel}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white transition-colors duration-300 hover:border-ecom-orange hover:text-ecom-orange"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <motion.nav
                    variants={menuContainer}
                    initial="hidden"
                    animate="show"
                    className="flex flex-1 flex-col items-center justify-center gap-8 px-6"
                  >
                    {navLinks.map((link) => (
                      <motion.div key={link.href} variants={menuItem}>
                        <Link
                          href={link.href}
                          onClick={close}
                          aria-current={link.active ? "page" : undefined}
                          className={`font-display text-3xl font-medium tracking-wide uppercase transition-colors duration-300 hover:text-ecom-orange ${
                            link.active ? "text-ecom-orange" : "text-white"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.nav>

                  <motion.div
                    variants={menuItem}
                    initial="hidden"
                    animate="show"
                    className="shell flex flex-col items-center gap-6 pb-10"
                  >
                    <div className="flex items-center gap-6">
                      <LanguageSwitcher />
                      <RegionSwitcher />
                      <ThemeSwitcher />
                    </div>
                    <Link
                      href={contactHref}
                      onClick={close}
                      className="rounded-full bg-ecom-orange px-6 py-3 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 hover:bg-ecom-red"
                    >
                      {talk}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className={className}
    >
      <path d="M3 5h14M3 10h14M3 15h14" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className={className}
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}
