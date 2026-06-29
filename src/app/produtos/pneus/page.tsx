import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Pneus para Empilhadeiras",
  description:
    "Pneus para empilhadeiras industriais. Sólidos, pneumáticos e de poliuretano para todas as marcas e modelos. Fornecimento e instalação.",
  openGraph: {
    title: "Pneus para Empilhadeiras | TranspoTech",
    description:
      "Pneus sólidos, pneumáticos e de poliuretano para empilhadeiras.",
  },
};

export default function PneusPage() {
  return (
    <main>
      <UnderConstruction title="Pneus para Empilhadeiras" />
    </main>
  );
}
