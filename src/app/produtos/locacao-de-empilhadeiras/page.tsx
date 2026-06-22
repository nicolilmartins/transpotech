import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locação de Empilhadeiras",
  description:
    "Locação de empilhadeiras industriais com manutenção preventiva incluída. STILL, Linde e Baoli. Atendimento em todo o Brasil com 11 unidades próprias.",
  openGraph: {
    title: "Locação de Empilhadeiras | TranspoTech",
    description:
      "Locação de empilhadeiras industriais com manutenção preventiva incluída. STILL, Linde e Baoli.",
  },
};

export default function LocacaoPage() {
  return (
    <main>
      <section aria-labelledby="locacao-title">
        <h1 id="locacao-title">Locação de Empilhadeiras</h1>
      </section>
    </main>
  );
}
