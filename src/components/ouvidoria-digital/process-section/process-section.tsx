"use client";

import { Send, Inbox, Search, Reply, type LucideIcon } from "lucide-react";
import { StepsProcess } from "@/components/layout/steps-process/steps-process";
import type { SectionContent } from "@/sanity/content/fields";
import type { ouvidoriaPage } from "@/sanity/content/pages/ouvidoria";

type ProcessContent = SectionContent<typeof ouvidoriaPage.sections.process>;

// Ícone de cada etapa, na ordem das etapas editadas no Studio.
const stepIcons: LucideIcon[] = [Send, Inbox, Search, Reply];

export function ProcessSection({ content }: { content: ProcessContent }) {
  return (
    <StepsProcess
      title={
        <>
          <span className="font-normal">{content.titleTop}</span>{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </>
      }
      description={content.description}
      steps={content.steps.map((step, i) => ({ ...step, Icon: stepIcons[i] }))}
    />
  );
}
