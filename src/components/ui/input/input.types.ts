import type { ComponentProps, ReactNode } from "react";

/** Ajusta o contraste do campo ao fundo da seção: claro (padrão) ou escuro. */
export type FieldTone = "light" | "dark";

export type InputProps = {
  tone?: FieldTone;
  /** Estado de erro — aplica a borda vermelha e `aria-invalid`. */
  invalid?: boolean;
  /** Ícone decorativo à direita (ex.: lupa de busca). */
  iconEnd?: ReactNode;
} & Omit<ComponentProps<"input">, "aria-invalid">;
