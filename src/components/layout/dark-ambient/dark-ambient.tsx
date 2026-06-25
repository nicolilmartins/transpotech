"use client";

import { useEffect, useRef, useState } from "react";

const GREEN_OFFSET = 220; // verde um pouco abaixo do laranja
const FACTOR = 0.6; // parallax — quão rápido os blurs "andam" com o scroll

/**
 * Ambiência das seções dark: um blur laranja (direita) e um verde (esquerda,
 * um pouco abaixo) que "andam" para baixo conforme o scroll, atravessando as
 * seções dark do bloco. Fica atrás do conteúdo (fundo #181616 vem do wrapper).
 */
export function DarkAmbient() {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      setY(Math.max(0, -rect.top) * FACTOR);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Laranja — lado direito */}
      <div
        className="absolute right-0 top-0 size-[520px] rounded-full bg-primary-500/25 blur-[160px]"
        style={{ transform: `translate(25%, ${y}px)` }}
      />
      {/* Verde — lado esquerdo, um pouco abaixo */}
      <div
        className="absolute left-0 top-0 size-[520px] rounded-full bg-secondary-600/25 blur-[160px]"
        style={{ transform: `translate(-25%, ${y + GREEN_OFFSET}px)` }}
      />
    </div>
  );
}
