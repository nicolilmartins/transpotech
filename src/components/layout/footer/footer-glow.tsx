"use client";

import { useEffect, useRef } from "react";

/**
 * Blur laranja no rodapé do footer — acompanha o cursor horizontalmente
 * com lerp (fator 0.12) por quadro.
 */
export function FooterGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef(50);
  const current = useRef(50);

  useEffect(() => {
    const el = ref.current;
    const footer = el?.parentElement;
    if (!el || !footer) return;

    // Anima transform em vez de `left` (sem relayout do blur de 520px a cada
    // quadro). O left fica fixo em 50% e a centragem no -translate-x-1/2 (a
    // propriedade `translate`, aplicada antes do `transform`); o deslocamento
    // em px equivale ao antigo left em % da largura do footer.
    let width = footer.clientWidth;
    const apply = () => {
      el.style.transform = `translateX(${((current.current - 50) / 100) * width}px)`;
    };

    // O rAF só roda enquanto o glow está a caminho do alvo; ao chegar, para e
    // volta no próximo mousemove.
    let raf = 0;
    const stopTicking = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const tick = () => {
      const diff = target.current - current.current;
      if (Math.abs(diff) < 0.05) {
        raf = 0;
        return;
      }
      current.current += diff * 0.12;
      apply();
      raf = requestAnimationFrame(tick);
    };

    let visible = false;
    // O mousemove sempre grava o alvo; o rAF roda apenas com o footer na tela.
    const onMove = (event: MouseEvent) => {
      target.current = (event.clientX / window.innerWidth) * 100;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    };

    const resize = new ResizeObserver(() => {
      width = footer.clientWidth;
      apply();
    });

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        // Fora da tela o glow não seguiu o cursor: entra já na posição atual,
        // como se o rAF tivesse rodado o tempo todo.
        current.current = target.current;
        apply();
        visible = true;
      } else if (!entry.isIntersecting && visible) {
        stopTicking();
        visible = false;
      }
    });

    window.addEventListener("mousemove", onMove, { passive: true });
    resize.observe(footer);
    visibility.observe(footer);

    return () => {
      stopTicking();
      window.removeEventListener("mousemove", onMove);
      resize.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -bottom-60 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-primary-500/60 blur-[160px]"
    />
  );
}
