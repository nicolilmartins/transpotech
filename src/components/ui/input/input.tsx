import { fieldBase, fieldIconTones, fieldTones } from "./field.styles";
import type { InputProps } from "./input.types";

export function Input({
  tone = "light",
  invalid,
  iconEnd,
  className = "",
  ...props
}: InputProps) {
  const input = (
    <input
      aria-invalid={invalid || undefined}
      className={`${fieldBase} ${fieldTones[tone]} h-12 pl-4 ${
        iconEnd ? "pr-12" : "pr-4"
      } ${className}`}
      {...props}
    />
  );

  if (!iconEnd) return input;

  return (
    <div className="relative w-full">
      {input}
      <span
        aria-hidden
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 ${fieldIconTones[tone]}`}
      >
        {iconEnd}
      </span>
    </div>
  );
}
