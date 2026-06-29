import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Locação de Empilhadeiras",
  description:
    "Locação flexível de empilhadeiras novas e seminovas STILL, Linde e Baoli, com manutenção inclusa e suporte técnico 24h. Custo previsível e atendimento em todo o Sul e Sudeste.",
  alternates: { canonical: ROUTES.LOCACAO },
  openGraph: {
    title: "Locação de Empilhadeiras | TranspoTech",
    description:
      "Empilhadeiras novas e seminovas com contratos flexíveis, manutenção inclusa e suporte técnico 24h. STILL, Linde e Baoli.",
  },
};

export default function LocacaoPage() {
  return (
    <main>
      <UnderConstruction title="Locação de Empilhadeiras" />
    </main>
  );
}
