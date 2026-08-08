"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { faqs } from "@/lib/faq";
import type { Lang } from "@/lib/i18n/types";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Collapsed by default — the list reads as questions only until one is opened. */
export default function FaqAccordion({ lang }: { lang: Lang }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        // Keyed off the English question: it's the stable id in src/lib/faq.ts.
        const slug = `faq-${i}`;

        return (
          <div key={faq.question.en} className="border-t border-ecom-ink/10 last:border-b">
            {/* h3, not h2: the page's section heading above the list is the h2. */}
            <h3>
              <button
                type="button"
                id={`${slug}-button`}
                aria-expanded={isOpen}
                aria-controls={`${slug}-panel`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="group flex w-full items-start gap-4 py-6 text-left sm:gap-6 sm:py-7"
              >
                <span
                  aria-hidden
                  className="mt-1 font-display text-sm font-medium tabular-nums text-ecom-orange"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className={`flex-1 font-display text-lg font-medium tracking-[-0.01em] transition-colors duration-300 sm:text-xl ${
                    isOpen ? "text-ecom-orange" : "text-ecom-ink group-hover:text-ecom-orange"
                  }`}
                >
                  {faq.question[lang]}
                </span>

                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                    isOpen
                      ? "border-ecom-orange bg-ecom-orange text-white"
                      : "border-ecom-ink/15 text-ecom-ink/60 group-hover:border-ecom-orange group-hover:text-ecom-orange"
                  }`}
                >
                  {/* Chevron drawn pointing right; open rotates it a quarter
                      turn so it points down at the answer. */}
                  <motion.svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <path d="m9 5 7 7-7 7" />
                  </motion.svg>
                </span>
              </button>
            </h3>

            {/* Always mounted and clipped rather than unmounted on close: the
                answers stay in the markup for crawlers, and `inert` keeps the
                hidden ones out of the tab order and the a11y tree. */}
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
            >
              <div
                id={`${slug}-panel`}
                role="region"
                aria-labelledby={`${slug}-button`}
                inert={!isOpen}
                className="max-w-3xl pb-7 pl-9 text-ecom-ink/70 sm:pl-11 sm:pr-14"
              >
                {faq.answer[lang]}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
