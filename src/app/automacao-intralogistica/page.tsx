import type { Metadata } from "next";

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
      <section aria-labelledby="automacao-title">
        <h1 id="automacao-title">Automação Intralogística</h1>
      </section>
    </main>
  );
}
