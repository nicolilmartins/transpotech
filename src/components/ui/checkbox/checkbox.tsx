import { Check } from "lucide-react";
import type { CheckboxProps } from "./checkbox.types";

// Checkbox no padrão visual do site: caixa com borda cinza que fica laranja
// com check branco quando marcada. Input, caixa e ícone são irmãos para o
// estado `:checked` chegar via CSS (peer) — funciona controlado ou via
// register do React Hook Form, sem depender de estado em JS.
export function Checkbox({ invalid, className = "", ...props }: CheckboxProps) {
  return (
    <span className={`relative inline-flex size-5 shrink-0 ${className}`}>
      <input
        type="checkbox"
        aria-invalid={invalid || undefined}
        className="peer absolute inset-0 cursor-pointer opacity-0"
        {...props}
      />
      <span
        aria-hidden
        className="pointer-events-none flex size-5 items-center justify-center rounded border border-neutral-300 bg-white transition-colors peer-checked:border-primary-500 peer-checked:bg-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/40 peer-aria-[invalid=true]:border-error"
      />
      <Check
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 text-neutral-50 opacity-0 transition-opacity peer-checked:opacity-100"
      />
    </span>
  );
}
