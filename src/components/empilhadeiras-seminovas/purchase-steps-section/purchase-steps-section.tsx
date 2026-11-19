"use client";

import { ClipboardList, Forklift, Eye, FileCheck, Truck } from "lucide-react";
import { StepsProcess, type ProcessStep } from "@/components/layout/steps-process/steps-process";
import type { SectionContent } from "@/sanity/content/fields";
import type { seminovasPage } from "@/sanity/content/pages/seminovas";

// Ícone de cada etapa, na ordem das etapas editadas no Studio.
const icons = [ClipboardList, Forklift, Eye, FileCheck, Truck];

type PurchaseStepsContent = SectionContent<typeof seminovasPage.sections.purchaseSteps>;

export function PurchaseStepsSection({ content }: { content: PurchaseStepsContent }) {
  const steps: ProcessStep[] = content.steps.map((step, i) => ({ ...step, Icon: icons[i] }));

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
      steps={steps}
    />
  );
}
