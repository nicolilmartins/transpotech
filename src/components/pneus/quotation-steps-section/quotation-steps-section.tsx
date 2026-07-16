"use client";

import { ClipboardList, Upload, Search, FileCheck } from "lucide-react";
import { StepsProcess, type ProcessStep } from "@/components/layout/steps-process/steps-process";

const steps: ProcessStep[] = [
  {
    title: "Você informa a necessidade",
    description: "Escolha a categoria ou descreva o pneu que precisa.",
    Icon: ClipboardList,
  },
  {
    title: "Envia dados do equipamento",
    description:
      "Modelo, medida, aplicação e foto ajudam a validar a solicitação.",
    Icon: Upload,
  },
  {
    title: "A equipe avalia compatibilidade",
    description:
      "A TranspoTech direciona a melhor alternativa conforme operação e disponibilidade.",
    Icon: Search,
  },
  {
    title: "Você recebe orientação ou cotação",
    description: "O time retorna com os próximos passos para compra.",
    Icon: FileCheck,
  },
];

export function QuotationStepsSection() {
  return (
    <StepsProcess
      title={
        <>
          <span className="font-normal">Como funciona</span>{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">a cotação de pneus</span>
        </>
      }
      description="Um processo simples e rápido, você informa a necessidade e a equipe da TranspoTech indica o pneu certo para a sua operação."
      steps={steps}
    />
  );
}
