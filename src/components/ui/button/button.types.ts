import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "gray" | "outline" | "dark";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  href?: string;
  /** Usados apenas quando `href` está presente (ex.: link externo em nova aba). */
  target?: string;
  rel?: string;
  className?: string;
} & Omit<ComponentProps<"button">, "ref">;
