import type { Metadata } from "next";
import Highlight from "@/components/Highlight";
import ImageSlot from "@/components/ImageSlot";
import { serviceGroups } from "@/lib/services";
import { imageSlots } from "@/lib/imageSlots";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: "Services",
  description: t.servicesPage.metaDescription,
  keywords: t.servicesPage.keywords,
  alternates: seoAlternates(LANG, "/services"),
};

export default function ServicesPage() {
  return (
    <div className="shell py-20 lg:py-28">
      <p className="eyebrow-rule text-sm font-medium uppercase tracking-[0.2em] text-ecom-orange">
        {t.servicesPage.eyebrow}
      </p>
      <h1 className="mt-6 max-w-5xl text-balance font-display text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
        {t.servicesPage.headline}
      </h1>

      {/* Two columns: a single stack of seven would run body copy the full
          width of the shell, well past a readable line length. */}
      <div className="mt-20 grid gap-x-16 gap-y-14 md:grid-cols-2 lg:gap-x-24">
        {serviceGroups.map((group) => (
          // scroll-mt clears the sticky header for the /services#<id> deep
          // links the home page's service cards point at.
          <section
            key={group.id}
            id={group.id}
            className="scroll-mt-24 border-t border-ecom-ink/10 pt-8"
          >
            <h2 className="font-display text-2xl font-medium tracking-tight text-ecom-ink sm:text-3xl">
              {group.name[LANG]}
            </h2>
            {group.tagline && (
              <p className="mt-4 text-lg leading-relaxed text-ecom-ink/70">
                {group.tagline[LANG]}
              </p>
            )}
            {group.items && (
              <ul className="mt-5 flex flex-col gap-2.5 text-ecom-ink/70">
                {group.items.map((item) => (
                  <li key={item.en} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ecom-orange"
                    />
                    {item[LANG]}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Seven groups across two columns leave the eighth cell empty — image fills that hole. */}
        <div className="relative border-t border-ecom-ink/10 pt-8">
          <Highlight
            shape="asterisk"
            // Negative inset only from sm: up, so it never hangs past the viewport below 640px.
            className="absolute -top-5 right-0 z-10 w-14 sm:-top-7 sm:-right-7 sm:w-16"
          />
          <ImageSlot ratio="4 / 3" label={imageSlots.servicesPageIntro[LANG]} />
        </div>
      </div>
    </div>
  );
}
