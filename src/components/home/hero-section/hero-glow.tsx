"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Blur verde suave que acompanha o cursor dentro da Hero e só existe no hover.
 * Segue o cursor com lerp (fator 0.18) via gsap.ticker + quickSetter.
 */
export function HeroGlow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    if (!wrap || !glow) return;

    const xSet = gsap.quickSetter(glow, "x", "px");
    const ySet = gsap.quickSetter(glow, "y", "px");

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let inside = false;
    let init = false;

    const ticker = () => {
      if (!inside) return;
      if (Math.abs(tx - cx) < 0.3 && Math.abs(ty - cy) < 0.3) return;
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      xSet(cx - glow.offsetWidth / 2);
      ySet(cy - glow.offsetHeight / 2);
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
          xSet(cx - glow.offsetWidth / 2);
          ySet(cy - glow.offsetHeight / 2);
          init = true;
        }
        if (!inside) {
          inside = true;
          gsap.to(glow, { opacity: 0.18, duration: 0.3, ease: "power1.out" });
        }
      } else if (inside) {
        inside = false;
        gsap.to(glow, { opacity: 0, duration: 0.3, ease: "power1.out" });
      }
    };

    gsap.ticker.add(ticker);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      gsap.ticker.remove(ticker);
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
        className="absolute left-0 top-0 size-[400px] rounded-full bg-[#146b55] opacity-0 blur-[110px]"
      />
    </div>
  );
}
