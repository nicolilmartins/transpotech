import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a TranspoTech. Atendimento especializado em empilhadeiras industriais. Encontre a unidade mais próxima ou fale com um consultor.",
  openGraph: {
    title: "Contato | TranspoTech",
    description:
      "Fale com um consultor TranspoTech. 11 unidades em todo o Brasil.",
  },
};

export default function ContatoPage() {
  return (
    <main>
      <UnderConstruction title="Contato" />
    </main>
  );
}
