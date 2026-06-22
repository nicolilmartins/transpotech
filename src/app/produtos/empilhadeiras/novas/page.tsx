import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empilhadeiras Novas",
  description:
    "Empilhadeiras novas STILL, Linde e Baoli. Modelos elétricos, a gás e a combustão para operações industriais de alta performance.",
  openGraph: {
    title: "Empilhadeiras Novas | TranspoTech",
    description:
      "Empilhadeiras novas STILL, Linde e Baoli para operações industriais.",
  },
};

export default function EmpilhadeirasNovasPage() {
  return (
    <main>
      <section aria-labelledby="novas-title">
        <h1 id="novas-title">Empilhadeiras Novas</h1>
      </section>
    </main>
  );
}
