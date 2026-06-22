import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peças para Empilhadeiras",
  description:
    "Peças originais e alternativas para empilhadeiras de todas as marcas. Estoque próprio, entrega ágil e suporte técnico especializado.",
  openGraph: {
    title: "Peças para Empilhadeiras | TranspoTech",
    description:
      "Peças originais e alternativas para empilhadeiras de todas as marcas.",
  },
};

export default function PecasPage() {
  return (
    <main>
      <section aria-labelledby="pecas-title">
        <h1 id="pecas-title">Peças para Empilhadeiras</h1>
      </section>
    </main>
  );
}
