import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

export const metadata: Metadata = {
  title: "Automação Intralogística",
  description:
    "Soluções de automação intralogística com a Dematic. Sistemas automatizados de movimentação, armazenagem e distribuição para centros de distribuição e indústrias.",
  openGraph: {
    title: "Automação Intralogística | TranspoTech",
    description:
      "Soluções de automação intralogística com a Dematic para CD e indústrias.",
  },
};

export default function AutomacaoPage() {
  return (
    <main>
      <UnderConstruction title="Automação Intralogística" />
    </main>
  );
}
