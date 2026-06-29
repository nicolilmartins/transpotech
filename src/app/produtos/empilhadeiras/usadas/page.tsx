import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

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
      <UnderConstruction title="Empilhadeiras Usadas" />
    </main>
  );
}
