"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { t } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 120);
  });

  const navLinks = [
    { href: "/studio", label: t.studio },
    { href: "/work", label: t.work },
    { href: "/blog", label: t.blog },
    { href: "/contact", label: t.contact },
  ];

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      className="sticky top-0 z-50 border-b border-ecom-orange/20 bg-ecom-black/90 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Logos/LOGO SECUNDARIO ECOMMETRICA 2.1.png"
            alt="Ecommetrica"
            width={160}
            height={40}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide uppercase md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-white/70 transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-ecom-orange after:transition-all after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Link
            href="/contact"
            className="rounded-full bg-ecom-orange px-5 py-2.5 text-sm font-medium tracking-wide text-white shadow-lg shadow-ecom-orange/20 transition-all duration-300 hover:bg-ecom-red hover:shadow-ecom-red/25"
          >
            {t.talk}
          </Link>
        </div>

        <MobileNav navLinks={navLinks} talk={t.talk} />
      </div>
    </motion.header>
  );
}

function MobileNav({
  navLinks,
  talk,
}: {
  navLinks: { href: string; label: string }[];
  talk: string;
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
        Menu
      </summary>
      <div className="absolute right-0 mt-2 flex w-52 flex-col gap-3 rounded-xl border border-white/10 bg-ecom-black p-3 shadow-lg">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            className="rounded-md px-3 py-2 text-sm font-medium text-white uppercase tracking-wide hover:bg-white/5"
          >
            {link.label}
          </Link>
        ))}
        <div className="flex items-center justify-between border-t border-white/10 px-3 pt-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
        <Link
          href="/contact"
          onClick={close}
          className="rounded-md bg-ecom-orange px-3 py-2 text-center text-sm font-medium text-white"
        >
          {talk}
        </Link>
      </div>
    </details>
  );
}
