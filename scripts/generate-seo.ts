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
import { getDict } from "../src/lib/i18n/dict";
import type { Lang } from "../src/lib/i18n/types";

const OUT_DIR = path.join(process.cwd(), "out");
const LANGS: Lang[] = ["es", "en"];

type Entry = { path: string; lastmod?: string };

const STATIC_ENTRIES: Entry[] = [
  { path: "/" },
  { path: "/studio" },
  { path: "/services" },
  { path: "/pricing" },
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

/** Human labels for `STATIC_ENTRIES`, keyed by the same `path` — used only for llms.txt's
 *  link list, so it stays in lockstep with STATIC_ENTRIES rather than a separate list. */
const STATIC_LABELS: Record<string, { es: string; en: string }> = {
  "/": { es: "Inicio", en: "Home" },
  "/studio": { es: "Estudio", en: "Studio" },
  "/services": { es: "Servicios", en: "Services" },
  "/pricing": { es: "Precios", en: "Pricing" },
  "/work": { es: "Trabajo", en: "Work" },
  "/blog": { es: "Blog", en: "Blog" },
  "/contact": { es: "Contacto", en: "Contact" },
  "/faq": { es: "Preguntas frecuentes", en: "FAQ" },
  "/legal/privacy-policy": { es: "Aviso de privacidad", en: "Privacy policy" },
  "/legal/terms-of-service": { es: "Términos de servicio", en: "Terms of service" },
};

/** Section headings + cross-link note for llms.txt, one set per language — each generated
 *  file stays 100% in its own language, mirroring how every other page pair on the site
 *  (`(es)/foo` vs `en/foo`) is a same-shape translation rather than a mixed document. */
const LLMS_SECTION_LABELS: Record<Lang, { pages: string; work: string; blog: string; altNote: string }> = {
  es: {
    pages: "Páginas principales",
    work: "Casos de estudio",
    blog: "Blog",
    altNote: `English version: ${SITE_URL}/en/llms.txt`,
  },
  en: {
    pages: "Main pages",
    work: "Case studies",
    blog: "Blog",
    altNote: `Versión en español: ${SITE_URL}/llms.txt`,
  },
};

/**
 * llms.txt (llmstxt.org): a plain-language index for LLM crawlers (ChatGPT, Claude,
 * Perplexity, etc.), the same role robots.txt/sitemap.xml play for traditional crawlers.
 * One file per language (es at the root, en under /en/, same split as every other route)
 * rather than one mixed-language file.
 */
function buildLlmsTxt(lang: Lang): string {
  const t = getDict(lang);
  const labels = LLMS_SECTION_LABELS[lang];

  const linkLine = (label: string, entryPath: string) =>
    `- [${label}](${SITE_URL + withTrailingSlash(localizedHref(lang, entryPath))})`;

  const pagesList = STATIC_ENTRIES.map((entry) =>
    linkLine(STATIC_LABELS[entry.path]?.[lang] ?? entry.path, entry.path),
  ).join("\n");

  const workList = getInternalCaseStudies()
    .map((project) => linkLine(project.name, `/work/${project.slug}`))
    .join("\n");

  const blogList = getAllPosts(lang)
    .map((post) => linkLine(post.title, `/blog/${post.slug}`))
    .join("\n");

  return `# Ecommetrica

> ${t.siteMeta.description}

${labels.altNote}

## ${labels.pages}

${pagesList}

## ${labels.work}

${workList}

## ${labels.blog}

${blogList}
`;
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    throw new Error(`"${OUT_DIR}" does not exist — run "next build" before this script.`);
  }

  fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), buildSitemap());
  fs.writeFileSync(path.join(OUT_DIR, "robots.txt"), buildRobots());
  fs.writeFileSync(path.join(OUT_DIR, "llms.txt"), buildLlmsTxt("es"));
  fs.mkdirSync(path.join(OUT_DIR, "en"), { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "en", "llms.txt"), buildLlmsTxt("en"));

  console.log(
    "Generated out/sitemap.xml, out/robots.txt, out/llms.txt, and out/en/llms.txt",
  );
}

main();
