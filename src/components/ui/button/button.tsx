"use client";

import { useRef, type ComponentProps, type MouseEventHandler } from "react";
import { IntentLink } from "@/components/ui/intent-link";
import { cssEase, prefersReducedMotion, tweenStyle } from "@/lib/motion";
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
  sm: "h-9 px-3 py-2 text-body",
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
  target,
  rel,
  className = "",
  onClick,
  // Padrão HTML é "submit", o que faz botões de ação dentro (ou associados) a
  // formulários dispararem validação sem querer — aqui o padrão é "button".
  type = "button",
  ...props
}: ButtonProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  // Lift + rotação de texto apenas no botão primário. Por evento e não por
  // :hover/:active: o lift some no mousedown e só volta no próximo mouseenter.
  const lift = (el: HTMLElement, y: number, duration: number) => {
    if (variant !== "primary" || prefersReducedMotion()) return false;
    tweenStyle(el, { translate: `0px ${y}px` }, { duration, easing: cssEase.power1Out });
    return true;
  };

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!lift(e.currentTarget, -3, 0.2)) return;
    // Vai a 16° e volta pela mesma curva, de trás para frente.
    textRef.current?.animate(
      [{ transform: "rotateX(0deg)" }, { transform: "rotateX(16deg)" }],
      {
        duration: 140,
        easing: cssEase.power1Out,
        direction: "alternate",
        iterations: 2,
      }
    );
  };

  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    lift(e.currentTarget, 0, 0.2);
  };

  const onDown = (e: React.MouseEvent<HTMLElement>) => {
    lift(e.currentTarget, 0, 0.1);
  };

  const content = (
    <>
      {iconLeft && <span className="size-6 shrink-0">{iconLeft}</span>}
      <span ref={textRef} className="inline-block">{children}</span>
      {iconRight && <span className="size-6 shrink-0">{iconRight}</span>}
    </>
  );

  if (href) {
    // Os props vêm tipados para <button>; no <a> só os globais (aria-*, data-*,
    // id, tabIndex) têm efeito.
    const anchorProps = props as unknown as ComponentProps<"a">;
    return (
      <IntentLink
        {...anchorProps}
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseDown={onDown}
      >
        {content}
      </IntentLink>
    );
  }

  return (
    <button
      type={type}
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
