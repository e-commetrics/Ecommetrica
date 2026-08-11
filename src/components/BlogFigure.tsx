import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Screenshot block for MDX posts: one or more `<BlogImage>` sharing a caption.
 * `not-prose` keeps the typography plugin's fixed greys off; classes live here, not inline in .mdx, since Tailwind only scans source files.
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
 * One image inside a `<BlogFigure>`. `width`/`height` arrive as strings: next-mdx-remote
 * strips JSX expression attributes, so only plain string attrs like these survive to set
 * intrinsic size. Only `max-w-full`/`h-auto` are set — `w-auto` would zero out lazy images before they load.
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
