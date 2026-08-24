"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { useRegion } from "@/components/RegionProvider";

/**
 * First-visit prompt: nothing is stored yet, so the visitor picks a region explicitly
 * instead of us silently guessing one. Renders client-side only (hasChosen starts false
 * post-mount, true immediately if localStorage already had a value) — no SSR flash, since
 * the page underneath already rendered with the safe "mx" default either way.
 */
export default function RegionGate() {
  const { t } = useLanguage();
  const { hasChosen, setRegion } = useRegion();

  return (
    <AnimatePresence>
      {!hasChosen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ecom-black/80 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t.regionGate.headline}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-ecom-black p-8 text-center text-white shadow-2xl"
          >
            <h2 className="font-display text-2xl font-medium tracking-tight">
              {t.regionGate.headline}
            </h2>
            <p className="mt-3 text-white/60">{t.regionGate.sub}</p>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setRegion("mx")}
                className="rounded-full bg-ecom-orange px-6 py-3.5 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-white hover:text-ecom-black"
              >
                {t.regionGate.mx}
              </button>
              <button
                type="button"
                onClick={() => setRegion("us")}
                className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
              >
                {t.regionGate.us}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
