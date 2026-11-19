"use client";

import { useRef, type ReactNode } from "react";
import { useScrollHint } from "@/hooks/use-scroll-hint";

type ScrollHintBoxProps = {
  children: ReactNode;
  /** Classes do container — deve incluir o overflow-x-auto. */
  className?: string;
};

/**
 * Container com rolagem horizontal que, no mobile, "balança" uma vez ao entrar
 * na tela para mostrar que dá para arrastar (mesma dica da tabela do simulador).
 * Permite manter a seção como Server Component: só o container é client.
 */
export function ScrollHintBox({ children, className }: ScrollHintBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  useScrollHint(boxRef);

  return (
    <div ref={boxRef} className={className}>
      {children}
    </div>
  );
}
