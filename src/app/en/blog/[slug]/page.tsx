import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostSource } from "@/lib/blog";
import { mdxComponents } from "@/components/mdxComponents";
import { getDict } from "@/lib/i18n/dict";
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
    title: post.meta.metaTitle ?? post.meta.title,
    description: post.meta.metaDescription ?? post.meta.excerpt,
    keywords: post.meta.keywords ?? [post.meta.title, ...t.blogPage.keywords],
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

  const dateLabel = new Date(post.meta.date).toLocaleDateString(
    t.blogDetail.dateLocale,
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
  );

  return (
    <article className="pb-20 lg:pb-28">
      {post.meta.coverImage ? (
        <div className="relative flex min-h-[60vh] items-end overflow-hidden sm:min-h-[70vh]">
          <Image
            src={post.meta.coverImage}
            alt={post.meta.coverImageAlt ?? ""}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
          <div className="relative mx-auto w-full max-w-4xl px-6 pb-10 lg:px-10 lg:pb-14">
            <p className="text-sm font-medium uppercase tracking-widest text-white/70">
              {dateLabel}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
              {post.meta.title}
            </h1>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl px-6 pt-20 lg:px-10 lg:pt-28">
          <p className="text-sm font-medium uppercase tracking-widest text-ecom-ink/50">
            {dateLabel}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ecom-ink">
            {post.meta.title}
          </h1>
        </div>
      )}

      <div className="mx-auto max-w-4xl px-6 pt-10 lg:px-10 lg:pt-14">
        <div className="prose prose-neutral max-w-none lg:prose-lg prose-headings:font-display prose-headings:text-ecom-ink prose-a:text-ecom-orange">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
