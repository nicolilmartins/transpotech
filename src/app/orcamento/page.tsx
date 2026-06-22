import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicitar Orçamento",
  description:
    "Solicite um orçamento personalizado para locação ou compra de empilhadeiras. Consultores especializados entrarão em contato para entender sua operação.",
  openGraph: {
    title: "Solicitar Orçamento | TranspoTech",
    description:
      "Orçamento personalizado para locação ou compra de empilhadeiras industriais.",
  },
};

export default function OrcamentoPage() {
  return (
    <main>
      <section aria-labelledby="orcamento-title">
        <h1 id="orcamento-title">Solicitar Orçamento</h1>
      </section>
    </main>
  );
}
