import type { FieldTone } from "@/components/ui/input";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  tone?: FieldTone;
  /** Estado de erro — aplica a borda vermelha e `aria-invalid`. */
  invalid?: boolean;
  /** Opções: strings (valor = rótulo) ou pares valor/rótulo. */
  options: ReadonlyArray<string | SelectOption>;
  /** Valor selecionado ("" ou undefined = nenhum, mostra o placeholder). */
  value?: string;
  onChange?: (value: string) => void;
  /** Chamado ao fechar/perder o foco (marca "touched" no React Hook Form). */
  onBlur?: () => void;
  placeholder?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
};
