"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useVideoAvailable } from "@/lib/useVideoAvailable";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function VideoLightbox({
  src,
  label,
  closeLabel,
  title,
}: {
  src: string;
  label: string;
  closeLabel: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const available = useVideoAvailable(src);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!available) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2.5 rounded-full border border-ecom-ink/15 px-7 py-3.5 text-sm font-medium uppercase tracking-wide text-ecom-ink transition-colors duration-300 hover:border-ecom-orange hover:text-ecom-orange"
      >
        <PlayIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
        {label}
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
            aria-label={title}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative w-full max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={closeLabel}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-ecom-orange sm:-top-14"
              >
                <CloseIcon className="h-4 w-4" />
              </button>

              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[0_50px_120px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
                <video
                  key={src}
                  src={src}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              </div>
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
