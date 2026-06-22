import Link from "next/link";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./button.types";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold text-body whitespace-nowrap transition-colors disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  // Sangue Laranja
  primary: "bg-primary-500 text-neutral-50 hover:bg-primary-500/90",
  // Cinza translúcido (rgba(43,39,40,0.1))
  gray: "bg-[rgba(43,39,40,0.1)] text-neutral-600 hover:bg-[rgba(43,39,40,0.16)]",
  outline: "border border-neutral-300 text-neutral-700 hover:bg-neutral-100",
  dark: "bg-neutral-900 text-neutral-50 hover:bg-neutral-800",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-4 py-3", // 44px
  lg: "h-12 px-4 py-3", // 48px
};

export function Button({
  children,
  variant = "primary",
  size = "lg",
  iconLeft,
  iconRight,
  href,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {iconLeft && <span className="size-6 shrink-0">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="size-6 shrink-0">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
