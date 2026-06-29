"use client";

import { useRef, type MouseEventHandler } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./button.types";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold text-body whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:bg-neutral-300 disabled:text-neutral-500";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-neutral-50 hover:bg-primary-600 focus-visible:bg-primary-700 active:bg-primary-700",
  gray: "bg-neutral-800/10 text-neutral-600 hover:bg-neutral-800/20 focus-visible:bg-neutral-800/40 active:bg-neutral-800/40",
  outline:
    "border border-neutral-300 text-neutral-700 hover:bg-neutral-100",
  dark: "bg-neutral-900 text-neutral-50 hover:bg-neutral-800",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 py-2 text-sm",
  md: "h-11 px-4 py-3",
  lg: "h-12 px-4 py-3",
};

export function Button({
  children,
  variant = "primary",
  size = "lg",
  iconLeft,
  iconRight,
  href,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  // Lift + rotação de texto apenas no botão primário (substitui lift-text-spin @keyframes)
  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (variant !== "primary") return;
    gsap.to(e.currentTarget, { y: -3, duration: 0.2, ease: "power1.out" });
    gsap.fromTo(
      textRef.current,
      { rotationX: 0 },
      { rotationX: 16, duration: 0.14, ease: "power1.out", yoyo: true, repeat: 1 }
    );
  };

  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (variant !== "primary") return;
    gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: "power1.out" });
  };

  const onDown = (e: React.MouseEvent<HTMLElement>) => {
    if (variant !== "primary") return;
    gsap.to(e.currentTarget, { y: 0, duration: 0.1, ease: "power1.out" });
  };

  const content = (
    <>
      {iconLeft && <span className="size-6 shrink-0">{iconLeft}</span>}
      <span ref={textRef} className="inline-block">{children}</span>
      {iconRight && <span className="size-6 shrink-0">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseDown={onDown}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onDown}
      {...props}
    >
      {content}
    </button>
  );
}
