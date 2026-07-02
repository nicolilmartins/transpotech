import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type TextLinkProps = {
  /** Se informado, renderiza um link (next/link); senão, um <button>. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  children: ReactNode;
  /** Classes extras (cor, largura, padding do rodapé de card, etc.). */
  className?: string;
};

/**
 * Botão apenas de texto: sempre acompanha uma seta após o label e, no hover,
 * revela uma linha embaixo do texto (deixa claro que é clicável).
 */
export function TextLink({
  href,
  onClick,
  type = "button",
  children,
  className = "",
}: TextLinkProps) {
  const classes = `group/textlink inline-flex items-center gap-1.5 text-body font-semibold leading-[1.35] text-primary-500 transition-colors hover:text-primary-600 ${className}`;

  const content = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/textlink:scale-x-100"
        />
      </span>
      <ArrowRight aria-hidden className="size-4 shrink-0" />
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
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
