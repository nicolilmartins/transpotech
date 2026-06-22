"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="text-8xl font-bold text-error">!</span>
      <h1 className="text-2xl font-semibold text-foreground">
        Algo deu errado
      </h1>
      <p className="max-w-md text-muted-foreground">
        Ocorreu um erro inesperado. Por favor, tente novamente.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        Tentar novamente
      </button>
    </main>
  );
}
