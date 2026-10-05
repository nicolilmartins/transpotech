"use client";

import { useEffect, type RefObject } from "react";

// Dica de scroll (mobile): rola o box um pouco para a direita e volta duas
// vezes (dois "vai e volta" suaves em seno), mostrando que dá para arrastar.
// Devolve a função que interrompe a animação.
function nudgeScrollHint(el: HTMLElement): () => void {
  const peak = 48;
  const humps = 2;
  const duration = 2600;
  const start = performance.now();
  let frame = 0;
  const step = (now: number) => {
    const p = Math.min((now - start) / duration, 1);
    // ((p*humps) % 1) reinicia o seno a cada hump → dois arcos 0 → pico → 0.
    el.scrollLeft = peak * Math.sin(((p * humps) % 1) * Math.PI);
    if (p < 1) frame = requestAnimationFrame(step);
    else el.scrollLeft = 0;
  };
  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}

/**
 * Ao entrar na viewport (uma vez), se o box tiver rolagem horizontal — só no
 * mobile, onde a tabela não cabe — dispara a dica de arrastar. Para no
 * primeiro toque/roda do usuário no box, para não brigar com o scroll dele.
 */
export function useScrollHint(boxRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopNudge: (() => void) | undefined;
    const interactions = ["pointerdown", "touchstart", "wheel"] as const;
    const onInteract = () => {
      stopNudge?.();
      interactions.forEach((type) => box.removeEventListener(type, onInteract));
    };
    interactions.forEach((type) =>
      box.addEventListener(type, onInteract, { passive: true }),
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (box.scrollWidth > box.clientWidth + 8) {
          stopNudge = nudgeScrollHint(box);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(box);
    return () => {
      observer.disconnect();
      onInteract();
    };
  }, [boxRef]);
}
