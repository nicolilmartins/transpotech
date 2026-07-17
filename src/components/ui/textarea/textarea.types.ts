import type { ComponentProps } from "react";
import type { FieldTone } from "@/components/ui/input";

export type TextareaProps = {
  tone?: FieldTone;
  /** Estado de erro — aplica a borda vermelha e `aria-invalid`. */
  invalid?: boolean;
} & Omit<ComponentProps<"textarea">, "aria-invalid">;
