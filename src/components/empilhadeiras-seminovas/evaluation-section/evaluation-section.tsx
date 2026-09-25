import { ZigzagProcess, type ZigzagStep } from "@/components/layout/zigzag-process";
import type { SectionContent } from "@/sanity/content/fields";
import type { seminovasPage } from "@/sanity/content/pages/seminovas";
import illoDocument from "@/assets/images/stats/illustration-document.webp";
import illoMotor from "@/assets/images/stats/illustration-motor.webp";
import illoBattery from "@/assets/images/stats/illustration-battery.webp";
import illoToolBox from "@/assets/images/stats/illustration-tool-box.webp";
import illoShield from "@/assets/images/stats/illustration-shield.webp";

// Ilustração de cada etapa, na ordem das etapas editadas no Studio.
// Ilustrações provisórias — serão substituídas.
const art: Pick<ZigzagStep, "image" | "imageLgHeight">[] = [
  { image: illoDocument },
  { image: illoMotor },
  { image: illoBattery },
  { image: illoToolBox },
  { image: illoShield, imageLgHeight: "lg:h-[270px]" },
];

type EvaluationContent = SectionContent<typeof seminovasPage.sections.evaluation>;

export function EvaluationSection({ content }: { content: EvaluationContent }) {
  const steps: ZigzagStep[] = content.steps.map((step, i) => ({ ...step, ...art[i] }));

  return (
    <ZigzagProcess
      gradientId="evaluationFill"
      steps={steps}
      header={
        <div className="flex max-w-[560px] flex-col gap-4 text-center">
          <h2 className="text-h2 text-neutral-800">
            <span className="font-normal">{content.titleRegular}</span>{" "}
            <br className="hidden lg:inline" />
            <span className="font-bold text-primary-500">{content.titleAccent}</span>
          </h2>
          <p className="text-body leading-[1.35] text-neutral-600">
            {content.description}
          </p>
        </div>
      }
    />
  );
}
