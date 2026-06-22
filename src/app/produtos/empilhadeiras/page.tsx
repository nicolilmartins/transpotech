import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venda de Empilhadeiras",
  description:
    "Catálogo completo de empilhadeiras novas e usadas. Representante oficial STILL, Linde e Baoli (grupo KION). Encontre o equipamento ideal para sua operação.",
  openGraph: {
    title: "Venda de Empilhadeiras | TranspoTech",
    description:
      "Catálogo de empilhadeiras novas e usadas. Representante oficial STILL, Linde e Baoli.",
  },
};

export default function EmpilhadeirasPage() {
  return (
    <main>
      <section aria-labelledby="empilhadeiras-title">
        <h1 id="empilhadeiras-title">Venda de Empilhadeiras</h1>
      </section>
    </main>
  );
}
