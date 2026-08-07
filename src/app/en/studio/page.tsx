import type { Metadata } from "next";
import Image from "next/image";
import Methodology from "@/components/Methodology";
import Highlight from "@/components/Highlight";
import ImageSlot from "@/components/ImageSlot";
import { team } from "@/lib/team";
import { imageSlots } from "@/lib/imageSlots";
import { getDict } from "@/lib/i18n/dict";
import { seoAlternates } from "@/lib/i18n/seo";

const LANG = "en" as const;
const t = getDict(LANG);

export const metadata: Metadata = {
  title: "Studio",
  description: t.studioPage.metaDescription,
  keywords: t.studioPage.keywords,
  alternates: seoAlternates(LANG, "/studio"),
};

export default function StudioPage() {
  return (
    <div className="shell py-20 lg:py-28">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-ecom-orange">
        Studio
      </p>
      <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ecom-ink">
        &ldquo;{t.studioPage.quote}&rdquo;
      </h1>

      <div className="mt-10 max-w-3xl space-y-4 text-lg leading-relaxed text-ecom-ink/70">
        {t.studioPage.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {/* Full-width banner between the opening statement and mission/vision —
          this page ran text-only from the quote all the way to the team grid. */}
      <div className="relative mt-16">
        <Highlight
          shape="asterisk"
          className="absolute -top-8 right-6 z-10 w-16 sm:w-20"
        />
        <ImageSlot ratio="21 / 9" label={imageSlots.studioBanner[LANG]} />
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-medium uppercase tracking-wide text-ecom-ink">
            {t.studioPage.missionTitle}
          </h2>
          <p className="mt-3 text-ecom-ink/70">{t.studioPage.missionCopy}</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-medium uppercase tracking-wide text-ecom-ink">
            {t.studioPage.visionTitle}
          </h2>
          <p className="mt-3 text-ecom-ink/70">{t.studioPage.visionCopy}</p>
        </div>
      </div>

      {/* overflow-clip rather than -hidden: the arch hangs past the right edge,
          and `hidden` would make this a sideways-scrollable container. */}
      <div className="relative mt-20 overflow-clip border-t border-ecom-ink/10 pt-16">
        {/* Arch, tonal rather than accent — a soft mass behind the reasons grid
            so this block reads as a section instead of a wall of paragraphs. */}
        <Highlight
          shape="arch"
          tone="ink"
          className="absolute -top-4 -right-24 w-[26rem] lg:w-[34rem]"
          opacity={0.06}
        />
        <h2 className="relative font-display text-sm font-medium uppercase tracking-[0.2em] text-ecom-ink/60">
          {t.studioPage.howWeWorkTitle}
        </h2>
        <div className="relative mt-8 grid gap-10 sm:grid-cols-2">
          {t.studioPage.reasons.map((reason) => (
            <Reason key={reason.title} title={reason.title} copy={reason.copy} />
          ))}
        </div>
      </div>

      <Methodology lang={LANG} />

      <div className="mt-20 border-t border-ecom-ink/10 pt-16">
        <h2 className="font-display text-sm font-medium uppercase tracking-[0.2em] text-ecom-ink/60">
          {t.studioPage.teamTitle}
        </h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="group">
              {/* Same portrait pair as the home page carousel — swapped on
                  hover with CSS so this page stays a server component. */}
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-ecom-ink/10 ring-1 ring-ecom-ink/5">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                <Image
                  src={member.imgHover}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <h3 className="mt-5 font-display text-lg font-medium text-ecom-ink">
                {member.name}
              </h3>
              <p className="text-sm font-medium uppercase tracking-wide text-ecom-orange">
                {member.role[LANG]}
              </p>
              <p className="mt-3 text-ecom-ink/70">{member.description[LANG]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Reason({ title, copy }: { title: string; copy: string }) {
  return (
    <div>
      <h3 className="font-display text-base font-medium text-ecom-ink">
        {title}
      </h3>
      <p className="mt-2 text-ecom-ink/70">{copy}</p>
    </div>
  );
}
