import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Venda de Empilhadeiras",
  description:
    "Catálogo completo de empilhadeiras novas e seminovas. Representante oficial STILL, Linde e Baoli (grupo KION). Encontre o equipamento ideal para sua operação.",
  openGraph: {
    title: "Venda de Empilhadeiras | TranspoTech",
    description:
      "Catálogo de empilhadeiras novas e seminovas. Representante oficial STILL, Linde e Baoli.",
  },
};

export default function EmpilhadeirasPage() {
  return (
    <main>
      <UnderConstruction title="Venda de Empilhadeiras" />
    </main>
  );
}
