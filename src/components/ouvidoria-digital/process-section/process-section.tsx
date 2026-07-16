"use client";

import { Send, Inbox, Search, Reply } from "lucide-react";
import { StepsProcess, type ProcessStep } from "@/components/layout/steps-process/steps-process";

const steps: ProcessStep[] = [
  {
    title: "Você envia sua manifestação",
    description:
      "Preencha o formulário com seus dados, tipo de manifestação e mensagem.",
    Icon: Send,
  },
  {
    title: "A demanda é recebida",
    description:
      "As informações são direcionadas para análise e encaminhamento interno.",
    Icon: Inbox,
  },
  {
    title: "A área responsável avalia",
    description:
      "A equipe relacionada ao tema analisa o caso e, quando necessário, busca mais informações.",
    Icon: Search,
  },
  {
    title: "O retorno é realizado",
    description:
      "Quando houver dados de contato, a TranspoTech poderá retornar conforme o fluxo definido.",
    Icon: Reply,
  },
];

export function ProcessSection() {
  return (
    <StepsProcess
      title={
        <>
          <span className="font-normal">Como funciona a</span>{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">Ouvidoria</span>
        </>
      }
      description="Um processo simples e transparente, do envio da manifestação ao retorno da TranspoTech."
      steps={steps}
    />
  );
}
