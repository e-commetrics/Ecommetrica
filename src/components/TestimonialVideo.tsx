"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useVideoAvailable } from "@/lib/useVideoAvailable";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Filmed client testimonial on /work/[slug]: a muted preview that plays itself
 * in the header, and a full-size player over a dimmed page on demand.
 *
 * Two <video> elements rather than one moved into the overlay — React would
 * unmount and remount the node on the way, which drops the buffer and restarts
 * the download. They share a position instead: opening always starts the big
 * one from zero, and closing hands its timestamp back to the preview so the
 * conversation carries on from wherever you left it rather than snapping back.
 *
 * `aspect` seeds the box at the right shape for the first paint. Without it the
 * frame renders 16:9, and a portrait clip sits pillarboxed until metadata
 * arrives — on a large file that's a visible, and visibly wrong, first frame.
 */
export default function TestimonialVideo({
  src,
  poster,
  aspect = 16 / 9,
  label,
  watchLabel,
  closeLabel,
}: {
  src: string;
  poster?: string;
  aspect?: number;
  label: string;
  watchLabel: string;
  closeLabel: string;
}) {
  const available = useVideoAvailable(src);
  const [open, setOpen] = useState(false);
  const [ratio, setRatio] = useState(aspect);
  const previewRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // `close` is stable enough here — it only touches refs and setOpen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!available) return null;

  function close() {
    // Read before the exit animation unmounts the element.
    const at = modalRef.current?.currentTime;
    const preview = previewRef.current;
    if (preview && at !== undefined) {
      preview.currentTime = at;
      preview.play().catch(() => {});
    }
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          previewRef.current?.pause();
          setOpen(true);
        }}
        aria-label={`${watchLabel} — ${label}`}
        className="group relative block w-full overflow-hidden rounded-2xl bg-ecom-black ring-1 ring-ecom-ink/10"
        style={{ aspectRatio: ratio }}
      >
        <video
          ref={previewRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          onLoadedMetadata={(event) => {
            const { videoWidth, videoHeight } = event.currentTarget;
            if (videoWidth && videoHeight) setRatio(videoWidth / videoHeight);
          }}
          className="h-full w-full object-cover"
        />

        {/* Keeps the pill legible whatever the footage is doing behind it. */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ecom-black/70 to-transparent"
        />
        <span className="absolute inset-x-0 bottom-0 flex justify-center p-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-ecom-black transition-colors duration-300 group-hover:bg-ecom-orange group-hover:text-white">
            <PlayIcon className="h-2.5 w-2.5" />
            {watchLabel}
          </span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ecom-black/90 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                aria-label={closeLabel}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-ecom-orange sm:-top-14"
              >
                <CloseIcon className="h-4 w-4" />
              </button>

              {/* No aspect box here — the element sizes to the footage, so the
                  same markup fits a portrait interview and a landscape one. */}
              <video
                ref={modalRef}
                src={src}
                poster={poster}
                controls
                autoPlay
                playsInline
                aria-label={label}
                // 78vh, not more: a 9:16 clip at full height leaves no room
                // above it for the close button, which sits outside the frame.
                className="max-h-[78vh] w-auto max-w-full rounded-2xl bg-black shadow-[0_50px_120px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M4 2.5v11l10-5.5-10-5.5z" />
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
