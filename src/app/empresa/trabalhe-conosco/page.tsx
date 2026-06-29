import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Trabalhe Conosco",
  description:
    "Faça parte da TranspoTech. Vagas para técnicos especializados em empilhadeiras, áreas comercial, administrativa e de logística em todo o Brasil.",
  openGraph: {
    title: "Trabalhe Conosco | TranspoTech",
    description:
      "Vagas para técnicos, comercial e logística em todo o Brasil.",
  },
};

export default function TrabalheConoscoPage() {
  return (
    <main>
      <UnderConstruction title="Trabalhe Conosco" />
    </main>
  );
}
