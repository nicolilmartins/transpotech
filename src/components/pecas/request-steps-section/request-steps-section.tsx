"use client";

import {
  ClipboardList,
  Forklift,
  Search,
  FileCheck,
  LifeBuoy,
} from "lucide-react";
import { StepsProcess, type ProcessStep } from "@/components/layout/steps-process/steps-process";

const steps: ProcessStep[] = [
  {
    title: "Você informa a necessidade",
    description:
      "Pode ser peça para corretiva, preventiva, reposição ou dúvida técnica.",
    Icon: ClipboardList,
  },
  {
    title: "Envia dados do equipamento",
    description:
      "Modelo, número de série, fotos e diagnóstico ajudam a orientar a cotação.",
    Icon: Forklift,
  },
  {
    title: "A equipe avalia o pedido",
    description:
      "A TranspoTech verifica compatibilidade, aplicação e disponibilidade.",
    Icon: Search,
  },
  {
    title: "Você recebe orientação ou cotação",
    description: "O time retorna com informações e próximos passos.",
    Icon: FileCheck,
  },
  {
    title: "A operação segue com suporte",
    description:
      "Se necessário, a solicitação é conectada a manutenção ou assistência técnica.",
    Icon: LifeBuoy,
  },
];

export function RequestStepsSection() {
  return (
    <StepsProcess
      title={
        <>
          <span className="font-normal">Como funciona a</span>{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">
            solicitação de peças
          </span>
        </>
      }
      description="Um processo simples e transparente, do primeiro contato à orientação ou cotação com suporte da TranspoTech."
      steps={steps}
    />
  );
}
