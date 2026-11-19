import type { ComponentProps } from "react";

export type CheckboxProps = {
  /** Estado de erro — aplica a borda vermelha e `aria-invalid`. */
  invalid?: boolean;
  /** Aplicado no wrapper (a caixa visual), não no input escondido. */
  className?: string;
} & Omit<ComponentProps<"input">, "type" | "aria-invalid" | "className">;
