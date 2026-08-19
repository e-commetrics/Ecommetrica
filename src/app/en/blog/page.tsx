import type { Metadata } from "next";
import Image from "next/image";
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

      {/* Page intro: what this blog is, for first-time visitors. Kept as page
          copy (not a post) so it never scrolls out of the feed over time. */}
      <div className="mt-10 grid gap-10 border-b border-ecom-ink/10 pb-14 lg:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ecom-ink/70">
          <p>{t.blogPage.intro.lead}</p>
          <p>{t.blogPage.intro.closing}</p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-ecom-ink/50">
            {t.blogPage.intro.listTitle}
          </p>
          <ul className="mt-5 space-y-4">
            {t.blogPage.intro.items.map((item) => (
              <li key={item} className="flex gap-3 text-ecom-ink/80">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ecom-orange" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="mt-14 text-sm font-medium uppercase tracking-[0.2em] text-ecom-ink/50">
        {t.blogPage.latestTitle}
      </h2>

      <div className="mt-8 flex flex-col divide-y divide-ecom-ink/10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={localizedHref(LANG, `/blog/${post.slug}`)}
            className="group flex flex-col gap-6 py-8 first:pt-0 sm:flex-row sm:items-center"
          >
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt ?? ""}
                width={640}
                height={360}
                className="aspect-video w-full shrink-0 rounded-2xl border border-ecom-ink/10 object-cover sm:w-56"
              />
            ) : null}
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-ecom-ink/50">
                {new Date(post.date).toLocaleDateString(t.blogPage.dateLocale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </p>
              <h3 className="mt-2 font-display text-2xl font-medium text-ecom-ink transition-colors group-hover:text-ecom-orange">
                {post.title}
              </h3>
              <p className="mt-3 text-ecom-ink/70">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
