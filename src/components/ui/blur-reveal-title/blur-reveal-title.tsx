"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Efeito de fonte da terminal-industries.com/why-terminal: o título chega
// bem clarinho e vai "ligando" conforme uma faixa de brilho laranja com
// bordas difusas varre as letras — sem deformar nada (o próprio texto é a
// máscara). Implementação: a camada base rende nas cores finais (preto +
// laranja) e uma camada duplicada por cima (background-clip: text) pinta os
// glifos com um degradê [transparente | brilho laranja | cinza claro] cujo
// background-position é animado — à frente da faixa o texto fica claro, no
// rastro dela as cores finais aparecem. Com prefers-reduced-motion a
// cobertura é removida sem animação.

type Segment = {
  text: string;
  /** Classes do trecho (peso/cor final — ex.: "font-bold text-primary-500"). */
  className?: string;
};

// Degradê da cobertura (da esquerda para a direita): região já revelada
// (transparente) → frente de brilho laranja → texto ainda "desligado"
// (cinza bem claro, opaco para cobrir a camada base).
const COVER =
  "linear-gradient(90deg, rgba(245,130,32,0) 0%, rgba(245,130,32,0) 40%, rgba(245,130,32,0.95) 50%, #e9e7e4 60%, #e9e7e4 100%)";

export function BlurRevealTitle({
  segments,
  className = "",
}: {
  segments: Segment[];
  className?: string;
}) {
  const overlayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      overlay.style.opacity = "0";
      return;
    }

    // background-size 300%: position 100% mostra só o trecho claro do
    // degradê (tudo "desligado"); 0% mostra só o transparente (tudo ligado).
    // O estado inicial (72%, também no SSR) já deixa a faixa de brilho
    // entrando no texto — ao chegar na seção a varredura parece que já está
    // acontecendo; o ease .out mantém a sensação de movimento em andamento.
    const tl = gsap.timeline();
    tl.to(overlay, {
      backgroundPosition: "0% 0%",
      duration: 2.6,
      ease: "power2.out",
    });
    tl.set(overlay, { opacity: 0 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <h1 className={`relative ${className}`}>
      {/* Camada base — texto real, já nas cores finais (revelado pela varredura) */}
      {segments.map((segment, si) => (
        <span key={si} className={segment.className}>
          {segment.text}
        </span>
      ))}

      {/* Cobertura — mesmo texto, pintado pelo degradê clipado nos glifos.
          Visível desde o primeiro paint (SSR) para não piscar o estado final. */}
      <span
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none bg-clip-text text-transparent"
        style={{
          backgroundImage: COVER,
          backgroundSize: "300% 100%",
          backgroundPosition: "72% 0%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {segments.map((segment, si) => (
          <span key={si} className={segment.className?.replace(/text-\S+/g, "")}>
            {segment.text}
          </span>
        ))}
      </span>
    </h1>
  );
}
