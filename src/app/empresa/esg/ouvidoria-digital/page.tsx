import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Ouvidoria Digital",
  description:
    "Ouvidoria digital da TranspoTech. Registre reclamações, sugestões ou elogios. Seu feedback é importante para a melhoria contínua dos nossos serviços.",
  openGraph: {
    title: "Ouvidoria Digital | TranspoTech",
    description:
      "Registre reclamações, sugestões ou elogios para a TranspoTech.",
  },
};

export default function OuvidoriaPage() {
  return (
    <main>
      <UnderConstruction title="Ouvidoria Digital" />
    </main>
  );
}
