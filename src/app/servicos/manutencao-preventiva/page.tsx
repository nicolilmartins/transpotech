import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Planos de Manutenção Preventiva",
  description:
    "Planos de manutenção preventiva para empilhadeiras: cronograma de visitas técnicas, inspeções programadas e disponibilidade garantida da frota.",
  openGraph: {
    title: "Planos de Manutenção Preventiva | TranspoTech",
    description:
      "Cronograma de visitas técnicas e inspeções programadas para sua frota.",
  },
};

export default function ManutencaoPreventivaPage() {
  return (
    <main>
      <UnderConstruction title="Planos de Manutenção Preventiva" />
    </main>
  );
}
