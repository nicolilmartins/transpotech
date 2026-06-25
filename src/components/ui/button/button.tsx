import Link from "next/link";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./button.types";

// group/btn — scoped group para que o span do texto responda APENAS ao hover
// do botão em si, nunca ao de um elemento pai que também tenha class="group".
const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold text-body whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:bg-neutral-300 disabled:text-neutral-500";

const variants: Record<ButtonVariant, string> = {
  // Laranja — sobe 3 px no hover (lift) e desce ao pressionar (feedback táctil)
  primary:
    "bg-primary-500 text-neutral-50 hover:bg-primary-600 focus-visible:bg-primary-700 active:bg-primary-700 hover:-translate-y-[3px] active:translate-y-0",
  // Cinza translúcido — apenas troca de cor, sem efeito de lift
  gray: "bg-neutral-800/10 text-neutral-600 hover:bg-neutral-800/20 focus-visible:bg-neutral-800/40 active:bg-neutral-800/40",
  outline:
    "border border-neutral-300 text-neutral-700 hover:bg-neutral-100",
  dark: "bg-neutral-900 text-neutral-50 hover:bg-neutral-800",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 py-2 text-sm",   // 36 px
  md: "h-11 px-4 py-3",           // 44 px
  lg: "h-12 px-4 py-3",           // 48 px
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

  // O texto do botão primário faz uma rotação suave no eixo X enquanto o botão
  // sobe, criando a ilusão de estar sendo "levantado". A animação (definida em
  // globals.css como @keyframes lift-text-spin) dispara uma vez por hover e
  // termina flat (forwards), mantendo o texto estático após o levantamento.
  const textClass =
    variant === "primary"
      ? "inline-block group-hover/btn:animate-[lift-text-spin_0.28s_ease-out_forwards]"
      : "";

  const content = (
    <>
      {iconLeft && <span className="size-6 shrink-0">{iconLeft}</span>}
      <span className={textClass}>{children}</span>
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
