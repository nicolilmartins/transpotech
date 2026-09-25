import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { AutomationDots } from "./automation-dots";
import { AutomationHotspots } from "./automation-hotspots";
import illoAutomation from "@/assets/images/stats/illustration-automation.webp";
import type { SectionContent } from "@/sanity/content/fields";
import type { automacaoPage } from "@/sanity/content/pages/automacao";

type PartnershipContent = SectionContent<typeof automacaoPage.sections.partnership>;
type HotspotsContent = SectionContent<typeof automacaoPage.sections.hotspots>;

export function PartnershipSection({
  content,
  hotspots,
}: {
  content: PartnershipContent;
  hotspots: HotspotsContent;
}) {
  return (
    <Section className="relative flex flex-col">
      <div className="relative flex flex-col gap-10 lg:min-h-[420px] lg:flex-row lg:items-start">
        {/* Ilustração — no desktop é absoluta e maior, sangrando pela direita e
            pelo topo (ultrapassa o padding da seção, conforme Figma 3508:4342). */}
        <div className="relative order-last w-full select-none lg:absolute lg:left-[44%] lg:top-0 lg:order-none lg:w-[62%]">
          <Image
            src={illoAutomation}
            alt="Fluxo de automação intralogística de ponta a ponta, TranspoTech + Dematic"
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="pointer-events-none h-auto w-full object-contain"
          />
          <AutomationDots />
          <AutomationHotspots content={hotspots.items} />
        </div>

        {/* Texto */}
        <div className="relative z-10 flex max-w-[600px] flex-col items-start gap-8 lg:max-w-[580px] lg:gap-14">
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-body font-semibold uppercase tracking-wide text-secondary-600">
                {content.eyebrow}
              </p>
              <h2 className="text-h3 font-normal text-neutral-800">
                {content.title}
              </h2>
              <p className="text-body leading-[1.35] text-neutral-600">
                {content.description}
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {content.highlights.map(({ label: highlight }) => (
                <li key={highlight} className="flex items-center gap-2">
                  <CircleCheck aria-hidden className="size-5 shrink-0 text-primary-500" />
                  <span className="text-body leading-[1.35] text-neutral-600 lg:whitespace-nowrap">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Button variant="primary" size="lg" href="#solucoes">
            {content.buttonLabel}
          </Button>
        </div>
      </div>
    </Section>
  );
}
