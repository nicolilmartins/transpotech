import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços especializados em empilhadeiras: planos de manutenção preventiva, manutenção corretiva e assistência técnica multimarcas. 380 técnicos em todo o Brasil.",
  openGraph: {
    title: "Serviços | TranspoTech",
    description:
      "Manutenção preventiva, corretiva e assistência multimarcas para empilhadeiras.",
  },
};

export default function ServicosPage() {
  return (
    <main>
      <section aria-labelledby="servicos-title">
        <h1 id="servicos-title">Serviços</h1>
      </section>

      <section id="manutencao-preventiva" aria-labelledby="preventiva-title">
        <h2 id="preventiva-title">Planos de Manutenção Preventiva</h2>
      </section>

      <section id="manutencao-corretiva" aria-labelledby="corretiva-title">
        <h2 id="corretiva-title">Manutenção Corretiva</h2>
      </section>

      <section id="assistencia-multimarcas" aria-labelledby="multimarcas-title">
        <h2 id="multimarcas-title">Assistência Multimarcas</h2>
      </section>
    </main>
  );
}
