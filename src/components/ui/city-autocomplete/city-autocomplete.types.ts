import type { FieldTone } from "@/components/ui/input";

export type CityAutocompleteProps = {
  tone?: FieldTone;
  /** Estado de erro — aplica a borda vermelha e `aria-invalid`. */
  invalid?: boolean;
  /** Valor atual (texto livre ou cidade selecionada, ex.: "Campinas - SP"). */
  value: string;
  onChange: (value: string) => void;
  /** Chamado ao perder o foco (marca "touched" no React Hook Form). */
  onBlur?: () => void;
  placeholder?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  /** Nº mínimo de caracteres para começar a sugerir (padrão: 3). */
  minChars?: number;
  /** Máximo de sugestões exibidas (padrão: 8). */
  maxResults?: number;
};
