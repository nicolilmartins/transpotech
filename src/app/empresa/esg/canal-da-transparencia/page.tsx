import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canal da Transparência",
  description:
    "Canal de transparência da TranspoTech. Reporte condutas, esclareça dúvidas e acesse informações sobre nossas práticas de governança corporativa.",
  openGraph: {
    title: "Canal da Transparência | TranspoTech",
    description:
      "Canal de reporte e governança corporativa da TranspoTech.",
  },
};

export default function CanalTransparenciaPage() {
  return (
    <main>
      <section aria-labelledby="transparencia-title">
        <h1 id="transparencia-title">Canal da Transparência</h1>
      </section>
    </main>
  );
}
