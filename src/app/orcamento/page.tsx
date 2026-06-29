import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Solicitar Orçamento",
  description:
    "Solicite um orçamento personalizado para locação ou compra de empilhadeiras. Consultores especializados entrarão em contato para entender sua operação.",
  openGraph: {
    title: "Solicitar Orçamento | TranspoTech",
    description:
      "Orçamento personalizado para locação ou compra de empilhadeiras industriais.",
  },
};

export default function OrcamentoPage() {
  return (
    <main>
      <UnderConstruction title="Solicitar Orçamento" />
    </main>
  );
}
