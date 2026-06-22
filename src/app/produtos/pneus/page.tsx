import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pneus para Empilhadeiras",
  description:
    "Pneus para empilhadeiras industriais. Sólidos, pneumáticos e de poliuretano para todas as marcas e modelos. Fornecimento e instalação.",
  openGraph: {
    title: "Pneus para Empilhadeiras | TranspoTech",
    description:
      "Pneus sólidos, pneumáticos e de poliuretano para empilhadeiras.",
  },
};

export default function PneusPage() {
  return (
    <main>
      <section aria-labelledby="pneus-title">
        <h1 id="pneus-title">Pneus para Empilhadeiras</h1>
      </section>
    </main>
  );
}
