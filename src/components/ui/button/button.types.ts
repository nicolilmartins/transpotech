import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "gray" | "outline" | "dark";
export type ButtonSize = "md" | "lg";

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  href?: string;
  className?: string;
} & Omit<ComponentProps<"button">, "ref">;
