import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ouvidoria Digital",
  description:
    "Ouvidoria digital da TranspoTech. Registre reclamações, sugestões ou elogios. Seu feedback é importante para a melhoria contínua dos nossos serviços.",
  openGraph: {
    title: "Ouvidoria Digital | TranspoTech",
    description:
      "Registre reclamações, sugestões ou elogios para a TranspoTech.",
  },
};

export default function OuvidoriaPage() {
  return (
    <main>
      <section aria-labelledby="ouvidoria-title">
        <h1 id="ouvidoria-title">Ouvidoria Digital</h1>
      </section>
    </main>
  );
}
