import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Ecommetrica",
  description: "Estrategia, tecnología y marketing digital desde Ecommetrica.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-ecom-red">
        Blog
      </p>
      <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-ecom-dark sm:text-5xl">
        Ideas sobre estrategia, tecnología y marketing.
      </h1>

      <div className="mt-16 flex flex-col divide-y divide-ecom-dark/10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group py-8 first:pt-0"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-ecom-dark/50">
              {new Date(post.date).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="mt-2 font-display text-2xl font-medium text-ecom-dark transition-colors group-hover:text-ecom-red">
              {post.title}
            </h2>
            <p className="mt-3 text-ecom-dark/70">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
