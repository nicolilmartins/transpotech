"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { scrubOnScroll } from "@/lib/motion";
import { useNearViewport } from "@/hooks/use-near-viewport";

export type ZigzagStep = {
  title: string;
  description: string;
  image: StaticImageData;
  /** Espelha a imagem horizontalmente. */
  flip?: boolean;
  /** Reduz/aumenta a imagem para equalizar o tamanho aparente. */
  scale?: number;
  /** Altura da imagem no desktop. Padrão: "lg:h-[300px]". */
  imageLgHeight?: string;
};

type ZigzagProcessProps = {
  /** Cabeçalho da seção, com o próprio wrapper (h2 e textos). */
  header: ReactNode;
  steps: ZigzagStep[];
  /** id do degradê SVG — único por página, referenciado por url(#id). */
  gradientId: string;
  /** Botão abaixo da trilha. */
  cta?: ReactNode;
};

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

function imageTransform(step: ZigzagStep): string | undefined {
  return (
    [
      step.flip ? "scaleX(-1)" : "",
      step.scale != null ? `scale(${step.scale})` : "",
    ]
      .filter(Boolean)
      .join(" ") || undefined
  );
}

// Imagem com altura fixa (200px / lg:300px ou `imageLgHeight`) e largura
// proporcional. Sem `sizes`, o srcset em 1x/2x da largura intrínseca baixava
// as versões de 1200/1920px para ilustrações de ~300px.
function imageSizes(step: ZigzagStep): string {
  const { width, height } = step.image;
  const lgHeight = Number(step.imageLgHeight?.match(/\d+/)?.[0] ?? 300);
  const at = (h: number) => `${Math.ceil((h * width) / height)}px`;
  return `(min-width: 1024px) ${at(lgHeight)}, ${at(200)}`;
}

// Passos em zigue-zague ligados por uma linha que preenche de laranja no scroll.
export function ZigzagProcess({
  header,
  steps,
  gradientId,
  cta,
}: ZigzagProcessProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const stop1Ref = useRef<SVGStopElement>(null);
  const stop2Ref = useRef<SVGStopElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [d, setD] = useState("");
  const stepCount = steps.length;
  // O scrub da linha só é criado quando a trilha se aproxima da
  // viewport; até lá os stops do JSX (offset 0) já são o estado vazio.
  const [near, setNear] = useState(false);
  useNearViewport(wrapRef, () => setNear(true));

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
        if (i < stepCount - 1) pts.push({ x: railFor(i + 1), y: bottom });
      });
      setDims({ w: W, h: H });
      setD(roundedPath(pts, 24));
    };

    // Sem build() síncrono: o ResizeObserver entrega a primeira medida após o
    // layout do frame, sem forçar layout durante a hidratação.
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [stepCount]);

  // Preenche a linha de laranja conforme o scroll. Em vez de um corte seco, o
  // laranja vira gradiente na ponta (mais claro/transparente) onde encontra a
  // linha clara — então não há quebra brusca.
  useEffect(() => {
    const wrap = wrapRef.current;
    const s1 = stop1Ref.current;
    const s2 = stop2Ref.current;
    if (!near || !wrap || !s1 || !s2 || !d) return;
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
    return scrubOnScroll(wrap, { startLine: 0.6, endLine: 0.75 }, setProgress);
  }, [d, near]);

  return (
    <Section className="flex flex-col items-center gap-12 lg:gap-16">
      <Fragment key="header">{header}</Fragment>

      <div ref={wrapRef} className="relative w-full max-w-[808px]">
        {/* Linha zigue-zague (mobile + desktop) — base clara + preenchimento
            laranja no scroll */}
        {dims.w > 0 && (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${dims.w} ${dims.h}`}
            fill="none"
          >
            <defs>
              <linearGradient
                id={gradientId}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="0"
                y2={dims.h}
              >
                <stop
                  offset="0"
                  style={{ stopColor: "var(--color-primary-500)" }}
                />
                <stop
                  ref={stop1Ref}
                  offset="0"
                  style={{ stopColor: "var(--color-primary-500)" }}
                />
                <stop
                  ref={stop2Ref}
                  offset="0"
                  style={{ stopColor: "var(--color-primary-500)" }}
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
              stroke={`url(#${gradientId})`}
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
                {/* Imagem com altura fixa, largura proporcional (object-contain não distorce) */}
                <div className="flex shrink-0 justify-center">
                  <Image
                    src={step.image}
                    alt=""
                    sizes={imageSizes(step)}
                    style={{ transform: imageTransform(step) }}
                    className={`h-[200px] w-auto select-none object-contain ${
                      step.imageLgHeight ?? "lg:h-[300px]"
                    }`}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <Fragment key="cta">{cta}</Fragment>
    </Section>
  );
}
