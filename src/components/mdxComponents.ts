import { BlogFigure, BlogImage } from "@/components/BlogFigure";

/**
 * Components an .mdx post can use without importing anything. Both blog
 * `[slug]` pages hand this to `<MDXRemote components={...}>`, so a component
 * added here becomes available to every post in both languages at once.
 *
 * Note for anything added here: next-mdx-remote strips JSX expression
 * attributes from post content, so props must be plain strings or children.
 */
export const mdxComponents = { BlogFigure, BlogImage };
