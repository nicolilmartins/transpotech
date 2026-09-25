import { ZigzagProcess, type ZigzagStep } from "@/components/layout/zigzag-process";
import illoDocument from "@/assets/images/stats/illustration-document.webp";
import illoSearch from "@/assets/images/stats/illustration-search.webp";
import illoBattery from "@/assets/images/stats/illustration-battery.webp";
import illoFolder from "@/assets/images/stats/illustration-folder.webp";
import type { SectionContent } from "@/sanity/content/fields";
import type { bateriasPage } from "@/sanity/content/pages/baterias";

// Ilustrações provisórias — serão substituídas. Uma por etapa, na ordem das
// etapas editadas no Studio.
const arts: Pick<ZigzagStep, "image" | "flip">[] = [
  { image: illoDocument },
  { image: illoSearch },
  { image: illoBattery },
  { image: illoFolder, flip: true },
];

type RequestStepsContent = SectionContent<typeof bateriasPage.sections.requestSteps>;

export function RequestStepsSection({ content }: { content: RequestStepsContent }) {
  return (
    <ZigzagProcess
      gradientId="requestStepsFill"
      steps={content.steps.map((step, i) => ({ ...step, ...arts[i] }))}
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
