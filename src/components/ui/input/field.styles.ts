import type { FieldTone } from "./input.types";

// Estilo base compartilhado por Input, Select e Textarea — padrão do input de
// e-mail da newsletter: fundo transparente, borda cinza clara arredondada,
// foco laranja e borda de erro quando `aria-invalid`.
export const fieldBase =
  "w-full rounded-xl border text-body transition-colors focus-visible:border-primary-500 focus-visible:outline-none aria-[invalid=true]:border-error disabled:cursor-not-allowed disabled:opacity-50";

export const fieldTones: Record<FieldTone, string> = {
  light:
    "border-neutral-200 bg-transparent text-neutral-800 placeholder:text-neutral-400",
  dark: "border-white/10 bg-white/5 text-neutral-50 placeholder:text-neutral-500",
};

// Cor dos ícones decorativos posicionados dentro do campo (lupa, chevron).
export const fieldIconTones: Record<FieldTone, string> = {
  light: "text-neutral-400",
  dark: "text-neutral-500",
};
