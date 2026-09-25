"use client";

import { useEffect, type RefObject } from "react";

/**
 * Roda `setup` uma única vez, quando o elemento chega a até uma altura de tela
 * abaixo da viewport (ou já está acima dela, ao recarregar no meio da página).
 * Tira da hidratação a preparação de animações de scroll abaixo da dobra: os
 * `.from()` escrevem estilo e o ScrollTrigger mede o layout ao ser criado.
 * O retorno de `setup` é chamado na desmontagem.
 */
export function useNearViewport(
  ref: RefObject<Element | null>,
  setup: () => (() => void) | void
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cleanup: (() => void) | void;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
        observer.disconnect();
        cleanup = setup();
      },
      { rootMargin: "0px 0px 100% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cleanup?.();
    };
    // setup roda uma vez por montagem, como o useGSAP sem dependências que
    // ele substitui.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
