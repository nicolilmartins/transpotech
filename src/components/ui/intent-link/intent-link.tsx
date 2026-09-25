"use client";

import Link from "next/link";
import { useState, type ComponentPropsWithRef } from "react";

type IntentLinkProps = ComponentPropsWithRef<typeof Link>;

/**
 * `next/link` que só pré-carrega a rota (JS + RSC) na intenção de navegar —
 * hover, foco ou toque —, não ao entrar na viewport. Evita que links globais
 * (header, rodapé, CTAs) baixem páginas pesadas enquanto a atual ainda carrega.
 *
 * `prefetch={false}` desliga também o prefetch no hover do Link; por isso o
 * padrão da doc do Next ("Hover-triggered prefetch"): ao armar, volta para o
 * `prefetch` pedido (padrão `null`/auto) e o Link, já visível, pré-carrega.
 */
export function IntentLink({
  prefetch = null,
  onMouseEnter,
  onFocus,
  onTouchStart,
  ...props
}: IntentLinkProps) {
  const [armed, setArmed] = useState(false);

  return (
    <Link
      {...props}
      prefetch={armed ? prefetch : false}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        setArmed(true);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        setArmed(true);
      }}
      onTouchStart={(e) => {
        onTouchStart?.(e);
        setArmed(true);
      }}
    />
  );
}
