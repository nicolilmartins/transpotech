"use client";

import { useEffect, useRef } from "react";
import { cssEase, tweenStyle } from "@/lib/motion";

const fade = { duration: 0.3, easing: cssEase.power1Out };

/**
 * Blur verde suave que acompanha o cursor dentro da Hero e só existe no hover.
 * Segue o cursor com lerp (fator 0.18) por quadro.
 */
export function HeroGlow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    if (!wrap || !glow) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let inside = false;
    let init = false;
    let raf = 0;

    const place = () => {
      glow.style.transform = `translate(${cx - glow.offsetWidth / 2}px, ${
        cy - glow.offsetHeight / 2
      }px)`;
    };

    // Lerp por quadro; o rAF só roda enquanto o glow ainda não chegou ao alvo.
    const tick = () => {
      raf = 0;
      if (!inside) return;
      if (Math.abs(tx - cx) < 0.3 && Math.abs(ty - cy) < 0.3) return;
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      place();
      raf = requestAnimationFrame(tick);
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
          place();
          init = true;
        }
        if (!inside) {
          inside = true;
          tweenStyle(glow, { opacity: "0.18" }, fade);
        }
        if (!raf) raf = requestAnimationFrame(tick);
      } else if (inside) {
        inside = false;
        tweenStyle(glow, { opacity: "0" }, fade);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
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
        className="absolute left-0 top-0 size-[400px] rounded-full bg-secondary-600 opacity-0 blur-[110px]"
      />
    </div>
  );
}
