"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Blur verde no rodapé do footer — acompanha o cursor horizontalmente
 * com lerp (fator 0.12) via gsap.ticker + quickSetter.
 */
export function FooterGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef(50);
  const current = useRef(50);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const leftSet = gsap.quickSetter(el, "left", "%");
    leftSet(50);

    const ticker = () => {
      const diff = target.current - current.current;
      if (Math.abs(diff) < 0.05) return;
      current.current += diff * 0.12;
      leftSet(current.current);
    };

    const onMove = (event: MouseEvent) => {
      target.current = (event.clientX / window.innerWidth) * 100;
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
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -bottom-60 size-[520px] -translate-x-1/2 rounded-full bg-secondary-500/30 blur-[160px]"
      style={{ left: "50%" }}
    />
  );
}
