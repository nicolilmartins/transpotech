import { ZigzagProcess, type ZigzagStep } from "@/components/layout/zigzag-process";
import type { SectionContent } from "@/sanity/content/fields";
import type { locacaoPage } from "@/sanity/content/pages/locacao";
import illoDocument from "@/assets/images/stats/illustration-document.webp";
import illoSearch from "@/assets/images/stats/illustration-search.webp";
import illoFolder from "@/assets/images/stats/illustration-folder.webp";
import illoTruck from "@/assets/images/stats/illustration-truck.webp";
import illoShield from "@/assets/images/stats/illustration-shield.webp";

// Ilustração de cada etapa, na ordem das etapas editadas no Studio.
const art: Pick<ZigzagStep, "image" | "imageLgHeight">[] = [
  { image: illoDocument },
  { image: illoSearch },
  { image: illoFolder },
  { image: illoTruck },
  { image: illoShield, imageLgHeight: "lg:h-[270px]" },
];

type ProcessContent = SectionContent<typeof locacaoPage.sections.process>;

export function ProcessSection({ content }: { content: ProcessContent }) {
  const steps: ZigzagStep[] = content.steps.map((step, i) => ({ ...step, ...art[i] }));

  return (
    <ZigzagProcess
      gradientId="processFill"
      steps={steps}
      header={
        <div className="flex max-w-[560px] flex-col gap-4 text-center">
          <h2 className="text-h2 text-neutral-800">
            <span className="font-normal">{content.titleRegular}</span>
            <span className="font-bold text-primary-500">
              {content.titleAccent}
            </span>
          </h2>
          <p className="text-body leading-[1.35] text-neutral-600">
            {content.description}
          </p>
        </div>
      }
    />
  );
}
