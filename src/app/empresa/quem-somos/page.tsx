import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a TranspoTech: 25 anos de mercado, 11 unidades próprias e ~380 técnicos especializados. Representante oficial STILL, Linde e Baoli (grupo KION).",
  openGraph: {
    title: "Quem Somos | TranspoTech",
    description:
      "25 anos de mercado, 11 unidades e 380 técnicos especializados em empilhadeiras industriais.",
  },
};

export default function QuemSomosPage() {
  return (
    <main>
      <UnderConstruction title="Quem Somos" />
    </main>
  );
}
