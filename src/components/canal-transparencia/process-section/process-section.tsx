"use client";

import {
  FileText,
  Inbox,
  Search,
  MessageSquareMore,
  ShieldCheck,
} from "lucide-react";
import { StepsProcess, type ProcessStep } from "@/components/layout/steps-process/steps-process";

const steps: ProcessStep[] = [
  {
    title: "Você registra o relato",
    description: "Informe o ocorrido com o máximo de detalhes possível.",
    Icon: FileText,
  },
  {
    title: "O relato é recebido",
    description:
      "As informações são direcionadas para avaliação conforme o fluxo definido pela empresa.",
    Icon: Inbox,
  },
  {
    title: "A análise é iniciada",
    description:
      "A comissão responsável avalia o conteúdo, evidências e necessidade de apuração.",
    Icon: Search,
  },
  {
    // Duas linhas fixas; nowrap só no desktop para não quebrar em 3+ linhas
    // dentro da coluna estreita.
    title: (
      <>
        <span className="lg:block lg:whitespace-nowrap">
          Podem ser solicitadas
        </span>{" "}
        <span className="lg:block lg:whitespace-nowrap">
          informações adicionais
        </span>
      </>
    ),
    description:
      "Quando houver identificação ou canal de retorno, a empresa pode solicitar complementos.",
    Icon: MessageSquareMore,
  },
  {
    title: "O caso recebe encaminhamento",
    description:
      "As medidas cabíveis são tratadas conforme políticas internas e legislação aplicável.",
    Icon: ShieldCheck,
  },
];

export function ProcessSection() {
  return (
    <StepsProcess
      id="processo"
      // Coluna 4 mais larga p/ o título em duas linhas (nowrap) manter o mesmo
      // respiro dos demais até os divisores.
      columnsTemplate="1fr 1fr 1fr 1.17fr 1fr"
      title={
        <>
          <span className="font-normal lg:block">Como funciona</span>{" "}
          <span className="font-bold text-primary-500 lg:block">
            o processo
          </span>
        </>
      }
      description="Um processo estruturado e sigiloso, do registro do relato ao encaminhamento conforme as políticas internas."
      steps={steps}
    />
  );
}
