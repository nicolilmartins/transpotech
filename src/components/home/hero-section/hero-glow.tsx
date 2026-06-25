"use client";

import { useEffect, useRef } from "react";

/**
 * Blur verde suave que acompanha o cursor dentro da Hero e só existe no hover.
 * Fica atrás da imagem (transparente no topo), então aparece apenas no fundo
 * claro. Segue o cursor com um leve trailing (lerp).
 */
export function HeroGlow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    if (!wrap || !glow) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let inside = false;
    let init = false;

    const place = () => {
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    };
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      place();
      raf =
        inside && (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3)
          ? requestAnimationFrame(tick)
          : 0;
    };

    const onMove = (event: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const within = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      if (within) {
        tx = x;
        ty = y;
        if (!init) {
          cx = x;
          cy = y;
          init = true;
          place();
        }
        if (!inside) {
          inside = true;
          glow.style.opacity = "0.18";
        }
        if (!raf) raf = requestAnimationFrame(tick);
      } else if (inside) {
        inside = false;
        glow.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute left-0 top-0 size-[400px] rounded-full bg-[#146b55] opacity-0 blur-[110px] transition-opacity duration-300 ease-out"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}
