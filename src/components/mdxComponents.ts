import { BlogFigure, BlogImage } from "@/components/BlogFigure";

/**
 * Components an .mdx post can use without importing — available to every post in both
 * languages via `<MDXRemote components={...}>`. Props must be plain strings/children (next-mdx-remote strips JSX expression attributes).
 */
export const mdxComponents = { BlogFigure, BlogImage };
