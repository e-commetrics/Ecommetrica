import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: "Blog",
  description: t.blogPage.metaDescription,
  keywords: t.blogPage.keywords,
  alternates: seoAlternates(LANG, "/blog"),
};

export default function BlogPage() {
  const posts = getAllPosts(LANG);

  return (
    <div className="shell py-20 lg:py-28">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-ecom-orange">
        Blog
      </p>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
        {t.blogPage.headline}
      </h1>

      <div className="mt-16 flex flex-col divide-y divide-ecom-ink/10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={localizedHref(LANG, `/blog/${post.slug}`)}
            className="group py-8 first:pt-0"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-ecom-ink/50">
              {new Date(post.date).toLocaleDateString(t.blogPage.dateLocale, {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </p>
            <h2 className="mt-2 font-display text-2xl font-medium text-ecom-ink transition-colors group-hover:text-ecom-orange">
              {post.title}
            </h2>
            <p className="mt-3 text-ecom-ink/70">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
