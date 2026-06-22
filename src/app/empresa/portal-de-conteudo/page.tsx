import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal de Conteúdo",
  description:
    "Artigos, guias e cases sobre empilhadeiras industriais, manutenção, logística e intralogística. Conteúdo especializado para gestores e decisores B2B.",
  openGraph: {
    title: "Portal de Conteúdo | TranspoTech",
    description:
      "Artigos e guias sobre empilhadeiras, manutenção e intralogística.",
  },
};

export default function PortalConteudoPage() {
  return (
    <main>
      <section aria-labelledby="portal-title">
        <h1 id="portal-title">Portal de Conteúdo</h1>
      </section>
    </main>
  );
}
