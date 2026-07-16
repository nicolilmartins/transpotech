"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { ScrollTrigger } from "@/lib/gsap";
import illoDocument from "@/assets/images/stats/illustration-document.webp";
import illoMotor from "@/assets/images/stats/illustration-motor.webp";
import illoBattery from "@/assets/images/stats/illustration-battery.webp";
import illoToolBox from "@/assets/images/stats/illustration-tool-box.webp";
import illoShield from "@/assets/images/stats/illustration-shield.webp";

type Step = { title: string; description: string; image: StaticImageData };

const steps: Step[] = [
  {
    title: "Avaliação de chegada",
    description:
      "Histórico, documentação, número de série e horímetro são auditados.",
    image: illoDocument,
  },
  {
    title: "Inspeção mecânica e hidráulica",
    description: "Motor, transmissão, mastro, cilindros, vazamentos e folgas.",
    image: illoMotor,
  },
  {
    title: "Inspeção elétrica e eletrônica",
    description: "Bateria, carregador, comandos, sensores e chicotes.",
    image: illoBattery,
  },
  {
    title: "Reparos e substituições",
    description:
      "Peças de desgaste trocadas e ajustes feitos pelo time técnico TranspoTech.",
    image: illoToolBox,
  },
  {
    title: "Laudo e teste operacional",
    description:
      "Equipamento liberado com laudo técnico assinado e teste de operação.",
    image: illoShield,
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

export function EvaluationSection() {
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
    const FADE = 0.06; // tamanho do degradê na ponta (fração da altura)
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
      <div className="flex max-w-[560px] flex-col gap-4 text-center">
        <h2 className="text-h2 text-neutral-800">
          <span className="font-normal">Como avaliamos</span>{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">cada equipamento</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Antes de entrar no estoque, cada equipamento passa por inspeção
          técnica e laudo TranspoTech.
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
                id="evaluationFill"
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
              stroke="url(#evaluationFill)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        <ol className="relative flex flex-col gap-10 lg:gap-0">
          {steps.map((step, i) => {
            const left = i % 2 === 0;
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
                    className={`h-[200px] w-auto select-none object-contain ${
                      i === 4 ? "lg:h-[270px]" : "lg:h-[300px]"
                    }`}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
