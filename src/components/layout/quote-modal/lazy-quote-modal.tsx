"use client";

import dynamic from "next/dynamic";

// O modal só existe depois do clique em "Solicitar orçamento": carregá-lo sob
// demanda tira react-hook-form, zod e o autocomplete de cidades do bundle
// inicial do catálogo e das páginas de detalhe.
export const LazyQuoteModal = dynamic(
  () => import("./quote-modal").then((m) => m.QuoteModal),
  { ssr: false }
);

/**
 * Começa a baixar o modal na intenção de clique (hover/foco no botão), para
 * ele abrir sem espera perceptível. É o mesmo módulo do `dynamic` acima: o
 * bundler baixa uma vez só.
 */
export const preloadQuoteModal = () => {
  void import("./quote-modal");
};
