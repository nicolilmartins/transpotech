"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "@/lib/gsap";

const SPACING = 18;
const RADIUS = 160;
const FAR = -9999;

/**
 * Malha sutil revelada num círculo ao redor do cursor. Variáveis CSS --mx/--my
 * atualizadas via gsap.quickSetter — sem RAF manual.
 */
export function HoverMesh({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mxSet = gsap.quickSetter(el, "--mx");
    const mySet = gsap.quickSetter(el, "--my");

    // Inicia fora da tela
    mxSet(`${FAR}px`);
    mySet(`${FAR}px`);

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const near =
        event.clientX >= rect.left - RADIUS &&
        event.clientX <= rect.right + RADIUS &&
        event.clientY >= rect.top - RADIUS &&
        event.clientY <= rect.bottom + RADIUS;

      if (!near) {
        mxSet(`${FAR}px`);
        mySet(`${FAR}px`);
        return;
      }
      mxSet(`${event.clientX - rect.left}px`);
      mySet(`${event.clientY - rect.top}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const mask = `radial-gradient(circle ${RADIUS}px at var(--mx, ${FAR}px) var(--my, ${FAR}px), rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 42%, transparent 80%)`;

  const style: CSSProperties = {
    backgroundImage: [
      "radial-gradient(circle, rgba(255,148,72,0.5) 0 1px, transparent 1.6px)",
      "linear-gradient(to right, transparent 0 8.5px, rgba(255,148,72,0.12) 8.5px 9.5px, transparent 9.5px)",
      "linear-gradient(to bottom, transparent 0 8.5px, rgba(255,148,72,0.12) 8.5px 9.5px, transparent 9.5px)",
    ].join(", "),
    backgroundSize: `${SPACING}px ${SPACING}px`,
    maskImage: mask,
    WebkitMaskImage: mask,
  };

  return <div ref={ref} aria-hidden className={className} style={style} />;
}
