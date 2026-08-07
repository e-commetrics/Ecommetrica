import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Screenshot block for MDX posts: one or more `<BlogImage>` sharing a caption.
 *
 * Marked `not-prose` so the typography plugin keeps its hands off and every
 * style here resolves through the themed tokens instead of the plugin's fixed
 * greys. That is also why the classes live in this file rather than inline in
 * the .mdx — Tailwind only scans source files for class names.
 */
export function BlogFigure({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="not-prose my-10 flex flex-col gap-4">
      {children}
      {caption ? (
        <figcaption className="text-sm leading-relaxed text-ecom-ink/60">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * One image inside a `<BlogFigure>`.
 *
 * `width`/`height` arrive as strings on purpose: next-mdx-remote strips every
 * JSX *expression* attribute from post content (its `blockJS` guard), so
 * `width={1833}` would silently never reach this component — only plain string
 * attributes survive. They are the image's intrinsic size, so the browser
 * reserves the row and nothing shifts while it loads.
 *
 * The image renders at that intrinsic width capped to the column: an 1800px
 * screenshot fills the measure, a 500px crop stays 500px instead of being
 * upscaled into mush. Sizing deliberately leaves the width to the HTML
 * attribute (only `max-w-full` and `h-auto` are set) — a `w-auto` here would
 * collapse every not-yet-loaded lazy image to zero height, so the ones further
 * down the post never reserve their row and never come into view to load.
 */
export function BlogImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: string;
  height: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={Number(width)}
      height={Number(height)}
      className="mx-auto block h-auto max-w-full rounded-2xl border border-ecom-ink/10"
    />
  );
}
