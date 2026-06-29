"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Blur verde de fundo (mobile) que "anda" conforme a seção é rolada — dá o
 * efeito de blur no fundo da seção "Por que escolhem a Transpotech" no mobile.
 * No desktop quem cuida da ambiência é o DarkAmbient (lg:hidden aqui).
 */
export function WhyUsGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      // Progresso do scroll dentro da seção (parallax suave).
      setY(Math.max(0, -rect.top + window.innerHeight * 0.3) * 0.4);
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
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden lg:hidden"
    >
      <div
        className="absolute left-1/2 top-0 size-[360px] rounded-full bg-secondary-600/30 blur-[120px]"
        style={{ transform: `translate(-50%, ${y}px)` }}
      />
    </div>
  );
}
