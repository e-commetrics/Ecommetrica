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
      // Lenis owns its own rAF loop. Driving it by hand is easy to get wrong:
      // a recursive requestAnimationFrame only hands back the id of the *next*
      // frame, so cleanup that stores the first id leaves the loop running
      // forever against a destroyed instance — one leaked loop per navigation.
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
