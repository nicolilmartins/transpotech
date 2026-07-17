import { fieldBase, fieldTones } from "@/components/ui/input";
import type { TextareaProps } from "./textarea.types";

export function Textarea({
  tone = "light",
  invalid,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={`${fieldBase} ${fieldTones[tone]} px-4 py-3 ${className}`}
      {...props}
    />
  );
}
