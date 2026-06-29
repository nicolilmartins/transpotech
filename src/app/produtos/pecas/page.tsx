import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Peças para Empilhadeiras",
  description:
    "Peças originais e alternativas para empilhadeiras de todas as marcas. Estoque próprio, entrega ágil e suporte técnico especializado.",
  openGraph: {
    title: "Peças para Empilhadeiras | TranspoTech",
    description:
      "Peças originais e alternativas para empilhadeiras de todas as marcas.",
  },
};

export default function PecasPage() {
  return (
    <main>
      <UnderConstruction title="Peças para Empilhadeiras" />
    </main>
  );
}
