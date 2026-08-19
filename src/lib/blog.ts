import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Lang } from "@/lib/i18n/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

/** Base (Spanish, no suffix) mdx files define the canonical set of slugs. */
function baseSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.includes(".en."))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function fileFor(slug: string, lang: Lang): string {
  if (lang !== "es") {
    const localized = path.join(BLOG_DIR, `${slug}.${lang}.mdx`);
    if (fs.existsSync(localized)) return localized;
  }
  return path.join(BLOG_DIR, `${slug}.mdx`);
}

export function getAllPosts(lang: Lang = "es"): PostMeta[] {
  return baseSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(fileFor(slug, lang), "utf8");
      const { data } = matter(raw);
      return { slug, data };
    })
    .filter(({ data }) => !data.hidden)
    .map(({ slug, data }) => ({
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSource(slug: string, lang: Lang = "es") {
  const filePath = fileFor(slug, lang);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  return { content, meta: data as Omit<PostMeta, "slug"> };
}
