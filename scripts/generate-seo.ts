/**
 * Generates robots.txt and sitemap.xml directly into the static export
 * output (`out/`, from next.config.ts's `output: "export"`). Runs as the
 * "postbuild" script so it sees the exact route list without duplicating
 * Next's own build step — `next build` has already produced `out/` (with
 * `public/sitemap.xsl` already copied into it) by the time this runs.
 */
import fs from "fs";
import path from "path";
import { SITE_URL } from "../src/lib/i18n/seo";
import { localizedHref, withTrailingSlash } from "../src/lib/i18n/localizedHref";
import { getInternalCaseStudies } from "../src/lib/work";
import { getAllPosts } from "../src/lib/blog";
import type { Lang } from "../src/lib/i18n/types";

const OUT_DIR = path.join(process.cwd(), "out");
const LANGS: Lang[] = ["es", "en"];

type Entry = { path: string; lastmod?: string };

const STATIC_ENTRIES: Entry[] = [
  { path: "/" },
  { path: "/studio" },
  { path: "/work" },
  { path: "/blog" },
  { path: "/contact" },
  { path: "/faq" },
  { path: "/legal/privacy-policy" },
  { path: "/legal/terms-of-service" },
];

function buildEntries(): Entry[] {
  const workEntries = getInternalCaseStudies().map((project) => ({
    path: `/work/${project.slug}`,
  }));
  const blogEntries = getAllPosts().map((post) => ({
    path: `/blog/${post.slug}`,
    lastmod: post.date,
  }));
  return [...STATIC_ENTRIES, ...workEntries, ...blogEntries];
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      default:
        return "&quot;";
    }
  });
}

function urlBlock(entry: Entry, lang: Lang): string {
  const loc = escapeXml(SITE_URL + withTrailingSlash(localizedHref(lang, entry.path)));
  const alternates = LANGS.map(
    (altLang) =>
      `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${escapeXml(SITE_URL + withTrailingSlash(localizedHref(altLang, entry.path)))}" />`,
  ).join("\n");
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(SITE_URL + withTrailingSlash(localizedHref("es", entry.path)))}" />`;
  const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";

  return `  <url>
    <loc>${loc}</loc>${lastmod}
${alternates}
${xDefault}
  </url>`;
}

function buildSitemap(): string {
  const entries = buildEntries();
  const urls = entries.flatMap((entry) => LANGS.map((lang) => urlBlock(entry, lang))).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

function buildRobots(): string {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    throw new Error(`"${OUT_DIR}" does not exist — run "next build" before this script.`);
  }

  fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), buildSitemap());
  fs.writeFileSync(path.join(OUT_DIR, "robots.txt"), buildRobots());

  console.log("Generated out/sitemap.xml and out/robots.txt");
}

main();
