"use client";

import { ClipboardList, Forklift, Eye, FileCheck, Truck } from "lucide-react";
import { StepsProcess, type ProcessStep } from "@/components/layout/steps-process/steps-process";

const steps: ProcessStep[] = [
  {
    title: "Você informa a necessidade",
    description:
      "Tipo de operação, capacidade, ambiente, energia, prazo e orçamento.",
    Icon: ClipboardList,
  },
  {
    title: "Indicação de equipamentos",
    description: "A equipe seleciona equipamentos compatíveis no estoque atual.",
    Icon: Forklift,
  },
  {
    title: "Visita técnica (opcional)",
    description:
      "Você pode visitar a unidade ou pedir vídeo do equipamento em operação.",
    Icon: Eye,
  },
  {
    title: "Laudo e proposta",
    description: "Laudo técnico, garantia e proposta comercial detalhada.",
    Icon: FileCheck,
  },
  {
    title: "Entrega e suporte pós-venda",
    description:
      "Entrega coordenada e início da garantia + suporte técnico TranspoTech.",
    Icon: Truck,
  },
];

export function PurchaseStepsSection() {
  return (
    <StepsProcess
      title={
        <>
          <span className="font-normal">Como funciona</span>{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">
            a compra de seminova
          </span>
        </>
      }
      description="Um processo simples e transparente, do primeiro contato à entrega com garantia e suporte da TranspoTech."
      steps={steps}
    />
  );
}
