import type { Metadata } from "next";
import { UnderConstruction } from "@/components/layout/under-construction/under-construction";

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
      <UnderConstruction title="Canal da Transparência" />
    </main>
  );
}
