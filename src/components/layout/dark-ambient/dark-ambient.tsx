"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const GREEN_OFFSET = 220;
const FACTOR = 0.6;

/**
 * Ambiência das seções dark: blur laranja (direita) e verde (esquerda, abaixo)
 * que "andam" para baixo com o scroll via GSAP ScrollTrigger scrub.
 */
export function DarkAmbient() {
  const ref = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const greenRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = ref.current!;

    gsap.set(orangeRef.current, { xPercent: 25, y: 0 });
    gsap.set(greenRef.current, { xPercent: -25, y: GREEN_OFFSET });

    gsap.to(orangeRef.current, {
      y: () => container.offsetHeight * FACTOR,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(greenRef.current, {
      y: () => container.offsetHeight * FACTOR + GREEN_OFFSET,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Laranja — lado direito */}
      <div
        ref={orangeRef}
        className="absolute right-0 top-0 size-[520px] rounded-full bg-primary-500/25 blur-[160px]"
      />
      {/* Verde — lado esquerdo, um pouco abaixo */}
      <div
        ref={greenRef}
        className="absolute left-0 top-0 size-[520px] rounded-full bg-secondary-600/25 blur-[160px]"
      />
    </div>
  );
}
