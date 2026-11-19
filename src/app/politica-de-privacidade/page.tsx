import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";

import { PrivacyHeroSection } from "@/components/politica-de-privacidade/hero-section/hero-section";
import { PolicyContent } from "@/components/politica-de-privacidade/policy-content/policy-content";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade e de Cookies da TranspoTech: como coletamos, usamos e protegemos as suas informações pessoais neste site.",
  openGraph: {
    ...baseOpenGraph,
    title: "Política de Privacidade | TranspoTech",
    description:
      "Como a TranspoTech coleta, usa e protege as suas informações pessoais.",
  },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main>
      <PrivacyHeroSection />
      <PolicyContent />
    </main>
  );
}
