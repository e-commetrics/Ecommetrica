import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: true,
  experimental: {
    // (es) and en are separate root layouts (no top-level app/layout.tsx),
    // so Next can't pick one for a URL that matches neither — this is what
    // renders app/global-not-found.tsx as the static out/404.html instead.
    globalNotFound: true,
  },
};

export default nextConfig;
