"use client";

import { useEffect, useState } from "react";

/**
 * Case-study videos live in public/videos, which is gitignored (see .gitignore) —
 * a checkout without the media files would otherwise show a broken hover video or
 * a "Ver video" button that opens onto a dead player. Probes with a HEAD request
 * so a missing file just means the video feature quietly doesn't render.
 *
 * Starts optimistic (true) so the common case — the file is actually there —
 * never flashes/hides anything; it only flips to false once the probe confirms
 * the file is missing.
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
