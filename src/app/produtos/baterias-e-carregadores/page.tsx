import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Baterias e Carregadores para Empilhadeiras",
  description:
    "Baterias de tração e carregadores para empilhadeiras elétricas. Soluções de alto desempenho para operações contínuas e eletrificação da frota.",
  openGraph: {
    title: "Baterias e Carregadores | TranspoTech",
    description:
      "Baterias de tração e carregadores para empilhadeiras elétricas.",
  },
};

export default function BateriasPage() {
  return (
    <main>
      <UnderConstruction title="Baterias e Carregadores" />
    </main>
  );
}
