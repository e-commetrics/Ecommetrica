import type { ReactNode } from "react";
import type { LegalSection } from "@/lib/i18n/dict";

/* Emails and bare URLs are written inline in the dictionary copy rather than as
   separate fields, so the renderer pulls them back out and makes them clickable.
   Keeping them in the sentence is what lets a translator move them freely. */
const LINK = /(https?:\/\/[^\s,)]+[^\s.,)]|[\w.+-]+@[\w-]+\.[\w.-]+)/g;

function linkify(text: string): ReactNode[] {
  return text.split(LINK).map((part, i) => {
    // split() with a capturing group alternates literal / match, so every odd
    // index is a captured link.
    if (i % 2 === 0) return part;
    const href = part.includes("@") ? `mailto:${part}` : part;
    return (
      <a
        key={i}
        href={href}
        className="text-ecom-orange underline decoration-ecom-orange/40 underline-offset-4 transition-colors hover:decoration-ecom-orange"
      >
        {part}
      </a>
    );
  });
}

export default function LegalDocument({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string[];
  sections: LegalSection[];
}) {
  return (
    <article className="mx-auto max-w-2xl px-6 py-20 lg:px-10 lg:py-28">
      <h1 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ecom-ink">
        {title}
      </h1>

      <div className="mt-10 space-y-5 text-ecom-ink/70">
        {intro.map((paragraph, i) => (
          <p key={i}>{linkify(paragraph)}</p>
        ))}
      </div>

      {sections.map((section) => (
        <section key={section.heading} className="mt-14">
          <h2 className="font-display text-2xl font-medium tracking-[-0.01em] text-ecom-ink">
            {section.heading}
          </h2>

          <div className="mt-4 space-y-5 text-ecom-ink/70">
            {section.paragraphs.map((paragraph, i) => (
              <p key={i}>{linkify(paragraph)}</p>
            ))}
          </div>

          {section.bullets && (
            <ul className="mt-4 space-y-2.5 text-ecom-ink/70">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ecom-orange"
                  />
                  <span>{linkify(bullet)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
