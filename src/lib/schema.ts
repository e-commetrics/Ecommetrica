import type { Lang, Region } from "@/lib/i18n/types";
import { getDict } from "@/lib/i18n/dict";
import { SITE_URL } from "@/lib/i18n/seo";
import { localizedHref, withTrailingSlash } from "@/lib/i18n/localizedHref";
import { plans, customPlan } from "@/lib/pricing";
import { faqs } from "@/lib/faq";
import type { PostMeta } from "@/lib/blog";
import type { CaseStudy } from "@/lib/work";

const LOGO_URL = `${SITE_URL}/images/logo-secundario.png`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const REGIONS: Region[] = ["mx", "us"];

function absoluteUrl(lang: Lang, path: string) {
  return SITE_URL + withTrailingSlash(localizedHref(lang, path));
}

export function organizationSchema(lang: Lang) {
  const t = getDict(lang);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Ecommetrica",
    url: SITE_URL,
    logo: LOGO_URL,
    description: t.siteMeta.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Ignacio Zaragoza 8169-306, Gustavo Madero",
      addressLocality: "Tijuana",
      addressRegion: "Baja California",
      postalCode: "22000",
      addressCountry: "MX",
    },
    telephone: "+52 664 642 9633",
    sameAs: ["https://www.instagram.com/ecommetrica/"],
  };
}

export function websiteSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Ecommetrica",
    url: SITE_URL,
    inLanguage: lang,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export type BreadcrumbItem = { name: string; path: string };

/** Root crumb every breadcrumb trail starts from. */
export function homeCrumb(lang: Lang): BreadcrumbItem {
  return { name: lang === "es" ? "Inicio" : "Home", path: "/" };
}

export function breadcrumbSchema(lang: Lang, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(lang, item.path),
    })),
  };
}

export function faqPageSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question[lang],
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer[lang],
      },
    })),
  };
}

export function blogPostingSchema(post: Omit<PostMeta, "slug"> & { slug: string }, lang: Lang) {
  const url = absoluteUrl(lang, `/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    datePublished: post.date,
    ...(post.coverImage ? { image: `${SITE_URL}${post.coverImage}` } : {}),
    inLanguage: lang,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function caseStudyArticleSchema(project: CaseStudy, lang: Lang) {
  const url = absoluteUrl(lang, `/work/${project.slug}`);
  const details = project.details;
  const headline = details?.headline?.[lang] ?? project.name;
  const description = (details?.summary ?? project.description)[lang];
  const image = details?.heroImage ?? project.image;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline,
    description,
    ...(image ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` } : {}),
    inLanguage: lang,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** One Offer per plan per region — price is region-dependent, so a single Offer can't
 *  carry both without ambiguity for validators. Includes `customPlan` as its "from" price. */
export function serviceCatalogSchema(lang: Lang) {
  const t = getDict(lang);

  const planOffers = plans.flatMap((plan) =>
    REGIONS.map((region) => ({
      "@type": "Offer",
      name: `${plan.name[lang]} (${region.toUpperCase()})`,
      price: plan.priceValue[region],
      priceCurrency: "USD",
      eligibleRegion: { "@type": "Country", name: region.toUpperCase() },
      itemOffered: {
        "@type": "Service",
        name: plan.name[lang],
        provider: { "@id": ORGANIZATION_ID },
      },
    })),
  );

  const customOffers = REGIONS.map((region) => ({
    "@type": "Offer",
    name: `${customPlan.name[lang]} (${region.toUpperCase()})`,
    price: customPlan.priceFromValue[region],
    priceCurrency: "USD",
    eligibleRegion: { "@type": "Country", name: region.toUpperCase() },
    itemOffered: {
      "@type": "Service",
      name: customPlan.name[lang],
      provider: { "@id": ORGANIZATION_ID },
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: t.pricingPage.headline,
    itemListElement: [...planOffers, ...customOffers],
  };
}
