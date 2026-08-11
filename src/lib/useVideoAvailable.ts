"use client";

import { useEffect, useState } from "react";

/**
 * Case-study videos live in public/videos, which is gitignored — probes with a HEAD
 * request so a missing file quietly hides the video feature instead of showing a broken player. Starts optimistic (true) so the common case never flashes.
 */
export function useVideoAvailable(src?: string): boolean {
  const [available, setAvailable] = useState(Boolean(src));

  useEffect(() => {
    if (!src) {
      setAvailable(false);
      return;
    }

    let cancelled = false;
    fetch(src, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  return available;
}
