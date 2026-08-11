"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Users who ask for reduced motion get plain native scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      // autoRaf: Lenis owns its own rAF loop — driving it by hand risks a leaked
      // loop, since cleanup can only ever store the first frame's id.
      autoRaf: true,
      // Touch devices keep native scrolling. Hijacking touch is what makes a
      // page feel like it sticks or lags behind the finger on mobile.
      syncTouch: false,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  // This component lives in the root layout, so it mounts once and survives
  // client-side navigations — Lenis has no idea a route change happened and
  // keeps whatever scroll offset the previous page was at. Reset it here.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
