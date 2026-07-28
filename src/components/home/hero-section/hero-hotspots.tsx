"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

// Hotspots sutis sobre a empilhadeira da hero (só desktop). Bolinhas sempre
// "acesas" (laranja com halo borrado) e pulsando levemente até o usuário
// interagir. A pill (sempre "Venda de …") acende uma por vez e leva à página.
//
// Posição ancorada na IMAGEM (não no viewport): u/v são coordenadas relativas
// à foto (0..1). Como a hero desktop usa object-cover num wrapper escalado, a
// empilhadeira "anda" conforme a largura — então calculamos a posição de tela
// levando o recorte em conta, e as bolinhas grudam na peça em qualquer largura.
type Hotspot = {
  label: string;
  href: string;
  /** Coordenadas relativas à foto original (0..1). */
  u: number;
  v: number;
  /** Lado para o qual a pill abre a partir da bolinha. Default "left". */
  side?: "left" | "right";
};

const hotspots: Hotspot[] = [
  {
    label: "Venda de faróis",
    href: ROUTES.PECAS,
    u: 0.522,
    v: 0.474,
    side: "right",
  },
  {
    label: "Venda de retrovisores",
    href: ROUTES.PECAS,
    u: 0.489,
    v: 0.535,
    side: "right",
  },
  { label: "Venda de mastros", href: ROUTES.PECAS, u: 0.655, v: 0.605 },
  { label: "Venda de baterias", href: ROUTES.BATERIAS, u: 0.609, v: 0.701 },
  { label: "Venda de pneus", href: ROUTES.PNEUS, u: 0.552, v: 0.864 },
];

// Geometria da imagem/hero (hero-section.tsx): foto 4096×2155 dentro do wrapper
// left-[-14%] top-[-46%] w-[146%] h-[154%], com object-cover object-bottom.
const IMG_W = 4096;
const IMG_H = 2155;
const WRAP_LEFT = -0.14;
const WRAP_TOP = -0.46;
const WRAP_W = 1.46;
const WRAP_H = 1.54;

const CYCLE_MS = 2200;

type Pos = { x: number; y: number };

function computePositions(w: number, h: number): Pos[] {
  const boxW = WRAP_W * w;
  const boxH = WRAP_H * h;
  const scale = Math.max(boxW / IMG_W, boxH / IMG_H); // object-cover
  const renderedW = IMG_W * scale;
  const renderedH = IMG_H * scale;
  const imgLeft = (boxW - renderedW) / 2; // centralizado no eixo x
  const imgTop = boxH - renderedH; // object-bottom → alinhado embaixo
  const originX = WRAP_LEFT * w + imgLeft;
  const originY = WRAP_TOP * h + imgTop;
  return hotspots.map((s) => ({
    x: originX + s.u * renderedW,
    y: originY + s.v * renderedH,
  }));
}

export function HeroHotspots() {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [positions, setPositions] = useState<Pos[] | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Mede o container (= tamanho da section) e recalcula as posições ancoradas
  // na imagem a cada resize — assim as bolinhas grudam na peça em qualquer
  // largura, mesmo com o recorte do object-cover mudando.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const recalc = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setPositions(computePositions(rect.width, rect.height));
      }
    };
    recalc();
    const observer = new ResizeObserver(recalc);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-ciclo: acende uma pill por vez ao entrar na viewport. Para de vez na
  // primeira interação do usuário; respeita prefers-reduced-motion.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (engaged) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let interval: ReturnType<typeof setInterval> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !interval) {
          interval = setInterval(() => {
            setActive((i) => (i + 1) % hotspots.length);
          }, CYCLE_MS);
        } else if (!entry.isIntersecting && interval) {
          clearInterval(interval);
          interval = null;
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [engaged]);

  // Após a primeira interação, a pill só aparece no hover/foco do próprio dot.
  const engage = (index: number) => {
    setEngaged(true);
    setActive(index);
  };

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-[5] hidden lg:block"
    >
      {positions &&
        hotspots.map((spot, i) => {
          const isActive = active === i;
          // Quando alguma bolinha está ativa (pill aberta), as outras ficam
          // mais clarinhas (esmaecidas) para destacar a ativa.
          const dimmed = active >= 0 && !isActive;
          const openRight = spot.side === "right";
          const pos = positions[i];
          return (
            <div
              key={spot.label}
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
              onMouseLeave={() => {
                if (engaged) setActive(-1);
              }}
            >
              <Link
                href={spot.href}
                aria-label={spot.label}
                onMouseEnter={() => engage(i)}
                onFocus={() => engage(i)}
                onClick={() => engage(i)}
                className="group/hotspot relative flex size-9 items-center justify-center rounded-full outline-none"
              >
                {/* Wrapper das bolinhas — pulsa sempre (piscar). O atraso por
                    índice desencontra o pulso. Esmaece quando outra está ativa. */}
                <span
                  style={{ animationDelay: `${i * 0.3}s` }}
                  className={`hero-dot-pulse relative flex items-center justify-center transition-opacity duration-300 ${
                    dimmed ? "opacity-70" : "opacity-100"
                  }`}
                >
                  {/* Bolinha maior e transparente atrás — cresce no hover */}
                  <span
                    aria-hidden
                    className="absolute size-[26px] rounded-full bg-white/25 transition-all duration-300 group-hover/hotspot:size-[32px]"
                  />
                  {/* Bolinha branca */}
                  <span
                    aria-hidden
                    className="relative size-[14px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
                  />
                </span>
              </Link>

              {/* Pill do rótulo — abre para o lado definido em `side`. Escura/
                  translúcida para legibilidade sobre o fundo claro da hero. */}
              <Link
                href={spot.href}
                tabIndex={-1}
                onMouseEnter={() => engage(i)}
                onClick={() => engage(i)}
                className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-neutral-900/80 px-3 py-1.5 text-[14px] font-semibold text-white backdrop-blur-sm transition-all duration-300 ${
                  openRight
                    ? "left-[calc(50%+10px)] origin-left"
                    : "right-[calc(50%+10px)] origin-right"
                } ${
                  isActive
                    ? "pointer-events-auto translate-x-0 scale-100 opacity-100"
                    : `pointer-events-none scale-90 opacity-0 ${
                        openRight ? "-translate-x-2" : "translate-x-2"
                      }`
                }`}
              >
                {spot.label}
              </Link>
            </div>
          );
        })}
    </div>
  );
}
