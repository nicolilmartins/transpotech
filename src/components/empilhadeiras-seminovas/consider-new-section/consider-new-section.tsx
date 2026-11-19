import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { seminovasPage } from "@/sanity/content/pages/seminovas";

type ConsiderNewContent = SectionContent<typeof seminovasPage.sections.considerNew>;

export function ConsiderNewSection({ content }: { content: ConsiderNewContent }) {
  return (
    <Section
      data-header-dark
      className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16"
    >
      <div className="flex flex-1 flex-col gap-10 lg:gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-h2 text-neutral-50">
            <span className="font-normal">{content.titleRegular}</span>
            <span className="font-bold text-primary-500">{content.titleAccent}</span>
          </h2>
          <p className="max-w-[520px] text-body leading-[1.35] text-neutral-400">
            {content.description}
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          {content.items.map(({ label }, i) => (
            <li key={i} className="flex items-center gap-3">
              <CircleCheck aria-hidden className="size-5 shrink-0 text-neutral-400" />
              <span className="text-body text-neutral-400">{label}</span>
            </li>
          ))}
        </ul>

        <Button
          variant="primary"
          size="lg"
          href={ROUTES.EMPILHADEIRAS_NOVAS}
          className="self-start"
        >
          {content.buttonLabel}
        </Button>
      </div>

      <ParallaxFrame className="h-[260px] w-full rounded-3xl border border-white/10 lg:h-[420px] lg:w-1/2">
        <Image
          src={content.image}
          alt={content.image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </ParallaxFrame>
    </Section>
  );
}
