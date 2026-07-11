import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      {/* <section> para o ScrollReveal global aplicar a entrada em cascata
          (o seletor é "main section" — conteúdo solto no main fica de fora). */}
      <section className="flex flex-col items-center gap-6 text-center">
        <span className="text-8xl font-bold text-primary">404</span>
        <h1 className="text-2xl font-semibold text-foreground">
          Página não encontrada
        </h1>
        <p className="max-w-md text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Voltar ao início
        </Link>
      </section>
    </main>
  );
}
