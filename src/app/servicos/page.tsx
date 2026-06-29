import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços especializados em empilhadeiras: planos de manutenção preventiva, manutenção corretiva e assistência técnica multimarcas. 380 técnicos em todo o Brasil.",
  openGraph: {
    title: "Serviços | TranspoTech",
    description:
      "Manutenção preventiva, corretiva e assistência multimarcas para empilhadeiras.",
  },
};

export default function ServicosPage() {
  return (
    <main>
      <UnderConstruction title="Serviços" />
    </main>
  );
}
