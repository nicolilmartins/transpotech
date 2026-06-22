import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empilhadeiras Usadas",
  description:
    "Empilhadeiras usadas revisadas e com garantia. Equipamentos multimarcas com procedência e histórico de manutenção. Consulte disponibilidade.",
  openGraph: {
    title: "Empilhadeiras Usadas | TranspoTech",
    description:
      "Empilhadeiras usadas revisadas com garantia. Consulte disponibilidade.",
  },
};

export default function EmpilhadeirasUsadasPage() {
  return (
    <main>
      <section aria-labelledby="usadas-title">
        <h1 id="usadas-title">Empilhadeiras Usadas</h1>
      </section>
    </main>
  );
}
