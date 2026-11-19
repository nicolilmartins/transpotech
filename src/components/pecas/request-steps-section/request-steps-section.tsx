"use client";

import {
  ClipboardList,
  Forklift,
  Search,
  FileCheck,
  LifeBuoy,
} from "lucide-react";
import { StepsProcess } from "@/components/layout/steps-process/steps-process";
import type { SectionContent } from "@/sanity/content/fields";
import type { pecasPage } from "@/sanity/content/pages/pecas";

// Ícone de cada etapa, na ordem das etapas editadas no Studio.
const icons = [ClipboardList, Forklift, Search, FileCheck, LifeBuoy];

type RequestStepsContent = SectionContent<typeof pecasPage.sections.requestSteps>;

export function RequestStepsSection({ content }: { content: RequestStepsContent }) {
  return (
    <StepsProcess
      title={
        <>
          <span className="font-normal">{content.titleRegular}</span>{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">
            {content.titleAccent}
          </span>
        </>
      }
      description={content.description}
      steps={content.steps.map((step, i) => ({ ...step, Icon: icons[i] }))}
    />
  );
}
