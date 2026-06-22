import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a TranspoTech. Atendimento especializado em empilhadeiras industriais. Encontre a unidade mais próxima ou fale com um consultor.",
  openGraph: {
    title: "Contato | TranspoTech",
    description:
      "Fale com um consultor TranspoTech. 11 unidades em todo o Brasil.",
  },
};

export default function ContatoPage() {
  return (
    <main>
      <section aria-labelledby="contato-title">
        <h1 id="contato-title">Contato</h1>
      </section>
    </main>
  );
}
