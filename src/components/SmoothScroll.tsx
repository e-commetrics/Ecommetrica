"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
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

    return () => lenis.destroy();
  }, []);

  return null;
}
