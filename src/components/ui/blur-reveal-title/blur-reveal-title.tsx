"use client";

import { Fragment, useEffect, useRef } from "react";
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
  /** Quebra de linha após o trecho; string = classes do <br> (ex.: "hidden sm:block"). */
  br?: boolean | string;
};

// Texto ainda "desligado" (opaco para cobrir a camada base), por tom de fundo:
// cinza bem claro nas heros claras; cinza médio nas heros sobre foto/gradiente
// escuro (lê como texto esmaecido sem parecer já revelado).
const UNLIT = { light: "#e9e7e4", dark: "#5a5652" } as const;

// Degradê da cobertura (da esquerda para a direita): região já revelada
// (transparente) → frente de brilho laranja → texto ainda "desligado".
const coverFor = (unlit: string) =>
  `linear-gradient(90deg, rgba(245,130,32,0) 0%, rgba(245,130,32,0) 40%, rgba(245,130,32,0.95) 50%, ${unlit} 60%, ${unlit} 100%)`;

export function BlurRevealTitle({
  segments,
  className = "",
  tone = "light",
}: {
  segments: Segment[];
  className?: string;
  /** Tom do fundo da hero — define a cor do texto ainda não revelado. */
  tone?: keyof typeof UNLIT;
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

  // A cobertura duplica o texto (inclusive quebras) — só remove as cores
  // (text-*) dos trechos, que ali vêm do degradê clipado nos glifos.
  const renderSegments = (stripTextColor: boolean) =>
    segments.map((segment, si) => (
      <Fragment key={si}>
        <span
          className={
            stripTextColor
              ? segment.className?.replace(/text-\S+/g, "")
              : segment.className
          }
        >
          {segment.text}
        </span>
        {segment.br && (
          <br
            className={typeof segment.br === "string" ? segment.br : undefined}
          />
        )}
      </Fragment>
    ));

  return (
    <h1 className={`relative ${className}`}>
      {/* Camada base — texto real, já nas cores finais (revelado pela varredura) */}
      {renderSegments(false)}

      {/* Cobertura — mesmo texto, pintado pelo degradê clipado nos glifos.
          Visível desde o primeiro paint (SSR) para não piscar o estado final. */}
      <span
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none bg-clip-text text-transparent"
        style={{
          backgroundImage: coverFor(UNLIT[tone]),
          backgroundSize: "300% 100%",
          backgroundPosition: "72% 0%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {renderSegments(true)}
      </span>
    </h1>
  );
}
