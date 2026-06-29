import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Manutenção Corretiva",
  description:
    "Manutenção corretiva para empilhadeiras com atendimento ágil e peças em estoque. Reduza paradas e mantenha a operação funcionando.",
  openGraph: {
    title: "Manutenção Corretiva | TranspoTech",
    description:
      "Atendimento ágil com peças em estoque para reduzir paradas da frota.",
  },
};

export default function ManutencaoCorretivaPage() {
  return (
    <main>
      <UnderConstruction title="Manutenção Corretiva" />
    </main>
  );
}
