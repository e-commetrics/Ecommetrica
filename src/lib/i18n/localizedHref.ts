import type { Lang } from "@/lib/i18n/types";

/** Prefixes an internal path with the locale segment — Spanish has none, English gets "/en". */
export function localizedHref(lang: Lang, path: string) {
  if (lang === "es") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** Swaps the locale of a pathname (e.g. "/en/work" -> "/work", "/work" -> "/en/work"). */
export function swapLangInPath(pathname: string, nextLang: Lang) {
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const basePath = isEn ? pathname.slice(3) || "/" : pathname;
  return localizedHref(nextLang, basePath);
}

/**
 * Appends the trailing slash next.config.ts's `trailingSlash: true` puts on
 * every real route. Only for canonical/sitemap URLs built as plain strings —
 * next/link already does this automatically for in-app navigation. Root
 * ("/") is already correct as-is; never call this on a path with a hash or
 * query string (none of our sitemap/canonical paths have one).
 */
export function withTrailingSlash(path: string) {
  return path === "/" ? path : `${path}/`;
}
