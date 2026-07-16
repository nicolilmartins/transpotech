"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { ScrollTrigger } from "@/lib/gsap";
import illoDocument from "@/assets/images/stats/illustration-document.webp";
import illoLamp from "@/assets/images/stats/illustration-lamp.webp";
import illoFolder from "@/assets/images/stats/illustration-folder.webp";
import illoToolBox from "@/assets/images/stats/illustration-tool-box.webp";
import illoShield from "@/assets/images/stats/illustration-shield.webp";
import illoGear from "@/assets/images/stats/illustration-engrenagem.webp";

type Step = {
  title: string;
  description: string;
  image: StaticImageData;
  /** Espelha a imagem horizontalmente (apenas nesta seção). */
  flip?: boolean;
  /** Reduz/aumenta a imagem para equalizar o tamanho aparente. */
  scale?: number;
};

const steps: Step[] = [
  {
    title: "Diagnóstico",
    description: "Visita técnica, análise de dados e mapeamento de fluxos atuais.",
    image: illoDocument,
  },
  {
    title: "Concepção",
    description:
      "Modelagem da solução, simulações e business case com TIR e payback.",
    image: illoLamp,
    flip: true,
  },
  {
    title: "Engenharia",
    description:
      "Projeto detalhado, especificação de equipamentos, software e integrações.",
    image: illoFolder,
  },
  {
    title: "Implantação",
    description:
      "Fabricação, instalação e comissionamento com mínimo impacto à operação.",
    image: illoToolBox,
  },
  {
    title: "Go-live",
    description: "Treinamento, ramp-up assistido e estabilização da operação.",
    image: illoGear,
  },
  {
    title: "Operação contínua",
    description: "Manutenção, evolução e otimização ao longo do ciclo de vida.",
    image: illoShield,
    flip: true,
    scale: 0.85,
  },
];

type Pt = { x: number; y: number };

// Constrói um path SVG ortogonal (cantos arredondados) a partir dos pontos.
function roundedPath(points: Pt[], radius: number): string {
  if (points.length < 2) return "";
  const dist = (a: Pt, b: Pt) => Math.hypot(b.x - a.x, b.y - a.y);
  const f = (n: number) => n.toFixed(1);
  let d = `M ${f(points[0].x)} ${f(points[0].y)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];
    const dPrev = dist(prev, curr) || 1;
    const dNext = dist(curr, next) || 1;
    const r1 = Math.min(radius, dPrev / 2);
    const r2 = Math.min(radius, dNext / 2);
    const p1 = {
      x: curr.x + ((prev.x - curr.x) / dPrev) * r1,
      y: curr.y + ((prev.y - curr.y) / dPrev) * r1,
    };
    const p2 = {
      x: curr.x + ((next.x - curr.x) / dNext) * r2,
      y: curr.y + ((next.y - curr.y) / dNext) * r2,
    };
    d += ` L ${f(p1.x)} ${f(p1.y)} Q ${f(curr.x)} ${f(curr.y)} ${f(p2.x)} ${f(p2.y)}`;
  }
  const last = points[points.length - 1];
  d += ` L ${f(last.x)} ${f(last.y)}`;
  return d;
}

export function ProcessSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const stop1Ref = useRef<SVGStopElement>(null);
  const stop2Ref = useRef<SVGStopElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [d, setD] = useState("");

  // Mede a posição de cada passo e desenha a linha zigue-zague (lado a lado).
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const build = () => {
      const wrapRect = wrap.getBoundingClientRect();
      const W = wrapRect.width;
      const H = wrapRect.height;
      if (W === 0) return;
      const railL = 2;
      const railR = W - 2;
      const railFor = (i: number) => (i % 2 === 0 ? railL : railR);
      const pts: Pt[] = [];
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const top = r.top - wrapRect.top;
        const bottom = r.bottom - wrapRect.top;
        if (i === 0) pts.push({ x: railFor(0), y: top });
        pts.push({ x: railFor(i), y: bottom });
        if (i < steps.length - 1) pts.push({ x: railFor(i + 1), y: bottom });
      });
      setDims({ w: W, h: H });
      setD(roundedPath(pts, 24));
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Preenche a linha de laranja conforme o scroll.
  useEffect(() => {
    const wrap = wrapRef.current;
    const s1 = stop1Ref.current;
    const s2 = stop2Ref.current;
    if (!wrap || !s1 || !s2 || !d) return;
    const FADE = 0.06;
    const setProgress = (p: number) => {
      s1.setAttribute("offset", `${Math.max(0, p - FADE)}`);
      s2.setAttribute("offset", `${Math.min(1, p)}`);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    setProgress(0);
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top 60%",
      end: "bottom 75%",
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    });
    ScrollTrigger.refresh();
    return () => st.kill();
  }, [d]);

  return (
    <Section className="flex flex-col items-center gap-12 lg:gap-16">
      {/* Cabeçalho centralizado */}
      <div className="flex max-w-[560px] flex-col items-center gap-4 text-center">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Como entregamos
        </p>
        <h2 className="text-h2 text-neutral-800">
          <span className="font-normal">O processo do projeto, </span>
          <span className="font-bold text-primary-500">da ideia à operação</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Etapas claras para reduzir risco e acelerar a captura de valor. A
          TranspoTech implementa conforme a necessidade de cada cliente, em fases
          que se adequam à sua operação, da automação parcial à completa.
        </p>
      </div>

      <div ref={wrapRef} className="relative w-full max-w-[808px]">
        {/* Linha zigue-zague (desktop) — base clara + preenchimento laranja no scroll */}
        {dims.w > 0 && (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${dims.w} ${dims.h}`}
            fill="none"
          >
            <defs>
              <linearGradient
                id="automacaoProcessFill"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="0"
                y2={dims.h}
              >
                <stop offset="0" stopColor="#F58220" />
                <stop ref={stop1Ref} offset="0" stopColor="#F58220" />
                <stop
                  ref={stop2Ref}
                  offset="0"
                  stopColor="#F58220"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <path
              d={d}
              stroke="#E7E5E4"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={d}
              stroke="url(#automacaoProcessFill)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        <ol className="relative flex flex-col gap-10 lg:gap-0">
          {steps.map((step, i) => {
            const left = i % 2 === 0;
            const imgTransform =
              [
                step.flip ? "scaleX(-1)" : "",
                step.scale != null ? `scale(${step.scale})` : "",
              ]
                .filter(Boolean)
                .join(" ") || undefined;
            return (
              <li
                key={step.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={`flex flex-col gap-4 px-10 lg:h-[300px] lg:flex-row lg:items-center lg:gap-5 ${
                  left
                    ? "lg:pl-[100px] lg:pr-0"
                    : "lg:flex-row-reverse lg:pl-0 lg:pr-[100px]"
                }`}
              >
                <div className="flex flex-1 flex-col gap-3">
                  <span className="font-heading text-h2 font-bold leading-none text-primary-500">
                    {i + 1}.
                  </span>
                  <h3 className="text-h6 font-semibold text-neutral-700">
                    {step.title}
                  </h3>
                  <p className="max-w-[360px] text-body leading-[1.35] text-neutral-600">
                    {step.description}
                  </p>
                </div>
                {/* Ilustração (placeholder — será substituída) */}
                <div className="flex shrink-0 justify-center">
                  <Image
                    src={step.image}
                    alt=""
                    style={{ transform: imgTransform }}
                    className="h-[200px] w-auto select-none object-contain lg:h-[300px]"
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <Button variant="primary" size="lg" href={ROUTES.ORCAMENTO}>
        Avaliar minha operação
      </Button>
    </Section>
  );
}
