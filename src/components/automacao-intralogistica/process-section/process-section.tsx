import { ZigzagProcess, type ZigzagStep } from "@/components/layout/zigzag-process";
import { Button } from "@/components/ui/button";
import illoDocument from "@/assets/images/stats/illustration-document.webp";
import illoLamp from "@/assets/images/stats/illustration-lamp.webp";
import illoFolder from "@/assets/images/stats/illustration-folder.webp";
import illoToolBox from "@/assets/images/stats/illustration-tool-box.webp";
import illoShield from "@/assets/images/stats/illustration-shield.webp";
import illoGear from "@/assets/images/stats/illustration-engrenagem.webp";
import type { SectionContent } from "@/sanity/content/fields";
import type { automacaoPage } from "@/sanity/content/pages/automacao";

// Ilustrações provisórias — serão substituídas. Uma por etapa, na ordem das
// etapas editadas no Studio.
const stepArt: Pick<ZigzagStep, "image" | "flip" | "scale">[] = [
  { image: illoDocument },
  { image: illoLamp, flip: true },
  { image: illoFolder },
  { image: illoToolBox },
  { image: illoGear },
  { image: illoShield, flip: true, scale: 0.85 },
];

type ProcessContent = SectionContent<typeof automacaoPage.sections.process>;

export function ProcessSection({ content }: { content: ProcessContent }) {
  const steps: ZigzagStep[] = content.steps.map((step, i) => ({
    ...step,
    ...stepArt[i],
  }));
  return (
    <ZigzagProcess
      gradientId="automacaoProcessFill"
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
          <p className="text-body leading-[1.35] text-neutral-600">
            {content.description}
          </p>
        </div>
      }
      cta={
        <Button variant="primary" size="lg" href="#avaliar-automacao">
          {content.buttonLabel}
        </Button>
      }
    />
  );
}
