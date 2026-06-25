"use client";

import { useEffect, useRef } from "react";

/**
 * Blur verde no rodapé do footer — fica fixo na parte inferior e acompanha
 * o cursor horizontalmente, com um leve trailing (lerp).
 */
export function FooterGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef(50); // posição-alvo em % da largura
  const current = useRef(50);
  const raf = useRef(0);

  useEffect(() => {
    const tick = () => {
      const diff = target.current - current.current;
      current.current += diff * 0.12; // trailing suave
      if (ref.current) ref.current.style.left = `${current.current}%`;
      raf.current = Math.abs(diff) > 0.05 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (event: MouseEvent) => {
      target.current = (event.clientX / window.innerWidth) * 100;
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -bottom-60 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-secondary-500/30 blur-[160px]"
    />
  );
}
