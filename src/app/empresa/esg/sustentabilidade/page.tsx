import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustentabilidade",
  description:
    "Compromisso da TranspoTech com a sustentabilidade: eletrificação da frota, redução de emissões e práticas responsáveis na cadeia de intralogística.",
  openGraph: {
    title: "Sustentabilidade | TranspoTech",
    description:
      "Compromisso com a sustentabilidade: eletrificação e práticas responsáveis.",
  },
};

export default function SustentabilidadePage() {
  return (
    <main>
      <section aria-labelledby="sustentabilidade-title">
        <h1 id="sustentabilidade-title">Sustentabilidade</h1>
      </section>
    </main>
  );
}
