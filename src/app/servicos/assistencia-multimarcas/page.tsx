import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Assistência Técnica Multimarcas",
  description:
    "Assistência técnica multimarcas para empilhadeiras Linde, STILL, Baoli e outras. Técnicos especializados e cobertura regional.",
  openGraph: {
    title: "Assistência Técnica Multimarcas | TranspoTech",
    description:
      "Suporte técnico para empilhadeiras Linde, STILL, Baoli e outras marcas.",
  },
};

export default function AssistenciaMultimarcasPage() {
  return (
    <main>
      <UnderConstruction title="Assistência Técnica Multimarcas" />
    </main>
  );
}
