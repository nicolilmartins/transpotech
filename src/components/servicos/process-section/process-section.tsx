import { ZigzagProcess, type ZigzagStep } from "@/components/layout/zigzag-process";
import { Button } from "@/components/ui/button";
import illoDocument from "@/assets/images/stats/illustration-document.webp";
import illoSearch from "@/assets/images/stats/illustration-search.webp";
import illoFolder from "@/assets/images/stats/illustration-folder.webp";
import illoToolBox from "@/assets/images/stats/illustration-tool-box.webp";
import illoShield from "@/assets/images/stats/illustration-shield.webp";
import type { SectionContent } from "@/sanity/content/fields";
import type { servicosPage } from "@/sanity/content/pages/servicos";

// Ilustrações provisórias — serão substituídas. Uma por etapa, na ordem das
// etapas editadas no Studio.
const stepArt: Pick<ZigzagStep, "image" | "imageLgHeight">[] = [
  { image: illoDocument },
  { image: illoSearch },
  { image: illoFolder },
  { image: illoToolBox },
  { image: illoShield, imageLgHeight: "lg:h-[270px]" },
];

type ProcessContent = SectionContent<typeof servicosPage.sections.process>;

export function ProcessSection({ content }: { content: ProcessContent }) {
  const steps: ZigzagStep[] = content.steps.map((step, i) => ({
    ...step,
    ...stepArt[i],
  }));
  return (
    <ZigzagProcess
      gradientId="serviceProcessFill"
      steps={steps}
      header={
        <div className="flex max-w-[560px] flex-col items-center gap-4 text-center">
          <p className="text-body font-semibold uppercase tracking-wide text-secondary-600">
            {content.eyebrow}
          </p>
          <h2 className="text-h2 text-neutral-800">
            <span className="font-normal">{content.titleRegular}</span>
            <span className="font-bold text-primary-500">{content.titleAccent}</span>
          </h2>
        </div>
      }
      cta={
        <Button variant="primary" size="lg" href="#solicitar-servico">
          {content.buttonLabel}
        </Button>
      }
    />
  );
}
