import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostSource } from "@/lib/blog";
import { mdxComponents } from "@/components/mdxComponents";
import { getDict } from "@/lib/i18n/dict";
import { localizedHref } from "@/lib/i18n/localizedHref";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "en" as const;
const t = getDict(LANG);

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostSource(slug, LANG);
  if (!post) return { title: { absolute: "Ecommetrica" } };

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    keywords: [post.meta.title, ...t.blogPage.keywords],
    alternates: seoAlternates(LANG, `/blog/${slug}`),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostSource(slug, LANG);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-28">
      <Link
        href={localizedHref(LANG, "/blog")}
        className="text-sm font-medium text-ecom-ink/60 hover:text-ecom-orange"
      >
        &larr; {t.blogDetail.back}
      </Link>

      <p className="mt-8 text-sm font-medium uppercase tracking-widest text-ecom-ink/50">
        {new Date(post.meta.date).toLocaleDateString(t.blogDetail.dateLocale, {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })}
      </p>
      <h1 className="mt-3 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ecom-ink">
        {post.meta.title}
      </h1>

      <div className="prose prose-neutral mt-10 max-w-none lg:prose-lg prose-headings:font-display prose-headings:text-ecom-ink prose-a:text-ecom-orange">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
