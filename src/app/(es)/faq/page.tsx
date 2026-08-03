import type { Metadata } from "next";
import { faqs } from "@/lib/faq";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "es" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: "FAQ",
  description: t.faqPage.metaDescription,
  keywords: t.faqPage.keywords,
  alternates: seoAlternates(LANG, "/faq"),
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <h1 className="font-display text-4xl font-medium tracking-tight text-ecom-ink">
        {t.faqPage.title}
      </h1>
      <div className="mt-12 flex flex-col divide-y divide-ecom-ink/10">
        {faqs.map((faq) => (
          <div key={faq.question.en} className="py-6 first:pt-0">
            <h2 className="font-display text-lg font-medium text-ecom-ink">
              {faq.question[LANG]}
            </h2>
            <p className="mt-2 text-ecom-ink/70">{faq.answer[LANG]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
