import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a TranspoTech: 25 anos de mercado, 11 unidades próprias e ~380 técnicos especializados. Representante oficial STILL, Linde e Baoli (grupo KION).",
  openGraph: {
    title: "Quem Somos | TranspoTech",
    description:
      "25 anos de mercado, 11 unidades e 380 técnicos especializados em empilhadeiras industriais.",
  },
};

export default function QuemSomosPage() {
  return (
    <main>
      <section aria-labelledby="quem-somos-title">
        <h1 id="quem-somos-title">Quem Somos</h1>
      </section>
    </main>
  );
}
