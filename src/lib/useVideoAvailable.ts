"use client";

import { useEffect, useState } from "react";

/**
 * Case-study videos live in public/videos, which is gitignored — probes with a HEAD
 * request so a missing file quietly hides the video feature instead of showing a broken player. Starts optimistic (true) so the common case never flashes.
 */
export function useVideoAvailable(src?: string): boolean {
  const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!src) return;

    let cancelled = false;
    fetch(src, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setFailedSrc(res.ok ? undefined : src);
      })
      .catch(() => {
        if (!cancelled) setFailedSrc(src);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  return Boolean(src) && failedSrc !== src;
}
