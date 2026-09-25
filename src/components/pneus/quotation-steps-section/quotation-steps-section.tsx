"use client";

import { ClipboardList, Upload, Search, FileCheck } from "lucide-react";
import { StepsProcess } from "@/components/layout/steps-process/steps-process";
import type { SectionContent } from "@/sanity/content/fields";
import type { pneusPage } from "@/sanity/content/pages/pneus";

// Ícone de cada etapa, na ordem das etapas editadas no Studio.
const icons = [ClipboardList, Upload, Search, FileCheck];

type QuotationStepsContent = SectionContent<typeof pneusPage.sections.quotationSteps>;

export function QuotationStepsSection({ content }: { content: QuotationStepsContent }) {
  return (
    <StepsProcess
      title={
        <>
          <span className="font-normal">{content.titleRegular}</span>{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </>
      }
      description={content.description}
      steps={content.steps.map((step, i) => ({ ...step, Icon: icons[i] }))}
    />
  );
}
