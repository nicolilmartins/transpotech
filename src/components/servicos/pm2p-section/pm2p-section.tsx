import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import { Button } from "@/components/ui/button";
import type { SectionContent } from "@/sanity/content/fields";
import type { servicosPage } from "@/sanity/content/pages/servicos";

type Pm2pContent = SectionContent<typeof servicosPage.sections.pm2p>;

export function Pm2pSection({ content }: { content: Pm2pContent }) {
  return (
    <Section data-header-dark className="flex flex-col items-start">
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        {/* Coluna de texto */}
        <div className="flex flex-col gap-10 lg:flex-[1.35] lg:gap-14">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-body font-semibold uppercase tracking-wide text-primary-500">
                {content.eyebrow}
              </p>
              <h2 className="text-h2 text-neutral-50">
                <span className="font-normal">{content.titleTop}</span>{" "}
                <br className="hidden lg:inline" />
                <span className="font-bold text-primary-500">
                  {content.titleAccent}
                </span>
              </h2>
              <p className="max-w-[560px] text-body leading-[1.35] text-neutral-400">
                {content.description}
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {content.benefits.map(({ label: benefit }) => (
                <li key={benefit} className="flex items-center gap-2">
                  <CircleCheck
                    className="size-5 shrink-0 text-primary-500"
                    aria-hidden
                  />
                  <span className="text-body leading-[1.35] text-neutral-200">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="primary"
            size="lg"
            href="#solicitar-servico"
            className="self-start"
          >
            {content.buttonLabel}
          </Button>
        </div>

        {/* Imagem — coluna direita */}
        <ParallaxFrame className="order-2 min-h-[280px] min-w-0 self-stretch rounded-xl border border-white/10 bg-white/5 lg:order-none lg:min-h-0 lg:flex-1">
          <Image
            src={content.image}
            alt={content.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ParallaxFrame>
      </div>
    </Section>
  );
}
