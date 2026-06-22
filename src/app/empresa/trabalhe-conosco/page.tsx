import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trabalhe Conosco",
  description:
    "Faça parte da TranspoTech. Vagas para técnicos especializados em empilhadeiras, áreas comercial, administrativa e de logística em todo o Brasil.",
  openGraph: {
    title: "Trabalhe Conosco | TranspoTech",
    description:
      "Vagas para técnicos, comercial e logística em todo o Brasil.",
  },
};

export default function TrabalheConoscoPage() {
  return (
    <main>
      <section aria-labelledby="trabalhe-title">
        <h1 id="trabalhe-title">Trabalhe Conosco</h1>
      </section>
    </main>
  );
}
