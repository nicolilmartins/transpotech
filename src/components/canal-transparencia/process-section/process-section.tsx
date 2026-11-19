"use client";

import { Fragment } from "react";
import {
  FileText,
  Inbox,
  Search,
  MessageSquareMore,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { StepsProcess } from "@/components/layout/steps-process/steps-process";
import type { SectionContent } from "@/sanity/content/fields";
import type { canalTransparenciaPage } from "@/sanity/content/pages/canal-transparencia";

type ProcessContent = SectionContent<typeof canalTransparenciaPage.sections.process>;

// Ícone de cada etapa, na ordem das etapas editadas no Studio.
const stepIcons: LucideIcon[] = [
  FileText,
  Inbox,
  Search,
  MessageSquareMore,
  ShieldCheck,
];

// Título com Enter vira duas linhas fixas; nowrap só no desktop para não
// quebrar em 3+ linhas dentro da coluna estreita.
function StepTitle({ text }: { text: string }) {
  const lines = text.split("\n");
  if (lines.length === 1) return text;
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="lg:block lg:whitespace-nowrap">{line.trim()}</span>
    </Fragment>
  ));
}

export function ProcessSection({ content }: { content: ProcessContent }) {
  return (
    <StepsProcess
      id="processo"
      // Coluna 4 mais larga p/ o título em duas linhas (nowrap) manter o mesmo
      // respiro dos demais até os divisores.
      columnsTemplate="1fr 1fr 1fr 1.17fr 1fr"
      title={
        <>
          <span className="font-normal lg:block">{content.titleTop}</span>{" "}
          <span className="font-bold text-primary-500 lg:block">
            {content.titleAccent}
          </span>
        </>
      }
      description={content.description}
      steps={content.steps.map((step, i) => ({
        title: <StepTitle text={step.title} />,
        description: step.description,
        Icon: stepIcons[i],
      }))}
    />
  );
}
