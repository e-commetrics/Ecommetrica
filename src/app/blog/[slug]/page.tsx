import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostSource } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostSource(slug);
  return { title: post ? `${post.meta.title} | Ecommetrica` : "Ecommetrica" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostSource(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-20 lg:px-10 lg:py-28">
      <Link
        href="/blog"
        className="text-sm font-medium text-ecom-dark/60 hover:text-ecom-red"
      >
        &larr; Back to blog
      </Link>

      <p className="mt-8 text-xs font-medium uppercase tracking-widest text-ecom-dark/50">
        {new Date(post.meta.date).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })}
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ecom-dark">
        {post.meta.title}
      </h1>

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-display prose-headings:text-ecom-dark prose-a:text-ecom-red">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
