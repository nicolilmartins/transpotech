import type { ComponentProps, ElementType, ReactNode } from "react";

export type SectionProps = {
  children: ReactNode;
  /** Utilitários aditivos (flex/grid/gap/bg/items-*). Não use para padding — ele é controlado pelo primitivo. */
  className?: string;
  /** Tag raiz renderizada. Default: "section". */
  as?: ElementType;
  /** Remove max-width e padding lateral (layouts full-bleed, ex.: carrossel). Mantém o padding vertical. */
  bleed?: boolean;
} & Omit<ComponentProps<"section">, "className">;
