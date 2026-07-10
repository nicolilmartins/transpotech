"use client";

import { useEffect, useRef, useState } from "react";
import { STATE_MAPS, type StateMapItem } from "./state-maps";
import { STATE_UNITS, type MapLabelPos } from "./state-units";

// Mapa de um único estado: usa o bounding box do contorno como base do
// viewBox para o estado aparecer grande e centralizado. Contorno branco fino
// + capital, unidades e arcos de conexão (referência: jobyaviation.com).
// Os arcos "desenham" e os pontos surgem quando `active` é true — a seção
// remonta o componente (key) a cada troca de estado para reiniciar a animação.
//
// Tamanhos de texto/pontos são definidos em PIXELS DE TELA (cidade 20px,
// capital 16px etc.): o scale do SVG é medido via ResizeObserver e convertido
// para unidades do viewBox, então ficam constantes em qualquer estado/tela.

// Dots laranjas seguem o padrão da "Solução 360" da home (um pouco maiores):
// laranja com leve glow/sombra laranja, via filtro SVG (o drop-shadow de CSS
// não rende de forma confiável em elementos SVG).
const UNIT_DOT_FILL = "#ff9448";
const UNIT_DOT_R = 8; // px
const CAPITAL_DOT_R = 6; // px
const CITY_FONT = 20; // px
const TIME_FONT = 16; // px
const CAPITAL_FONT = 16; // px
const LABEL_GAP = 12; // px entre o dot e o texto
const LINE_GAP = 21; // px entre cidade e tempo

// Arco quadrático da capital até a unidade, com barriga para cima
// (como na referência). Para linhas quase verticais a barriga vai de lado.
function arcPath(
  cx: number,
  cy: number,
  ux: number,
  uy: number,
  flip = false
): string {
  const dx = ux - cx;
  const dy = uy - cy;
  const dist = Math.hypot(dx, dy) || 1;
  let nx = -dy / dist;
  let ny = dx / dist;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  if (flip) {
    nx = -nx;
    ny = -ny;
  }
  const bulge = dist * 0.22;
  const qx = cx + dx / 2 + nx * bulge;
  const qy = cy + dy / 2 + ny * bulge;
  return `M ${cx} ${cy} Q ${qx} ${qy} ${ux} ${uy}`;
}

// Posição/âncora do rótulo em relação ao dot. Padrão: à esquerda ou à direita
// do ponto, com o bloco centralizado verticalmente; "bottom"/"top" ficam como
// exceção para pontos onde os lados cruzariam linhas do mapa.
function labelLayout(
  pos: MapLabelPos,
  x: number,
  y: number,
  rPx: number,
  px: (n: number) => number,
  lines: number
) {
  const gap = px(rPx + LABEL_GAP);
  const lineGap = px(LINE_GAP);
  switch (pos) {
    case "left":
      return {
        x: x - gap,
        y: y + px(5) - ((lines - 1) * lineGap) / 2,
        anchor: "end" as const,
      };
    case "right":
      return {
        x: x + gap,
        y: y + px(5) - ((lines - 1) * lineGap) / 2,
        anchor: "start" as const,
      };
    case "top":
      return {
        x,
        y: y - px(rPx + LABEL_GAP) - (lines - 1) * lineGap,
        anchor: "middle" as const,
      };
    case "bottom":
      return {
        x,
        y: y + px(rPx + LABEL_GAP + 12),
        anchor: "middle" as const,
      };
  }
}

export function StateMap({
  state,
  active,
  className = "",
}: {
  state: StateMapItem;
  /** Dispara a animação de conexão (seção visível / estado clicado). */
  active: boolean;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);
  // Unidades do viewBox por pixel de tela (para textos/pontos em px fixos).
  // Em telas estreitas o mapa fica pequeno demais para rótulos de 20px, então
  // todos os tamanhos em px são reduzidos proporcionalmente (fator 0.65).
  const [unitsPerPx, setUnitsPerPx] = useState(0.2);
  const [mobileFactor, setMobileFactor] = useState(1);

  const [x, y, w, h] = state.box;
  const pad = Math.max(w, h) * 0.06;
  const vbW = w + pad * 2;
  const vbH = h + pad * 2;
  const viewBox = `${x - pad} ${y - pad} ${vbW} ${vbH}`;

  useEffect(() => {
    if (!active) return;
    // Dois rAF garantem um paint com o estado inicial antes da transição.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setDrawn(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [active]);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const scale = Math.min(rect.width / vbW, rect.height / vbH);
      if (scale > 0) setUnitsPerPx(1 / scale);
      setMobileFactor(rect.width < 520 ? 0.65 : 1);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [vbW, vbH]);

  const px = (n: number) => n * unitsPerPx * mobileFactor;
  const isMobile = mobileFactor < 1;
  const posOf = (p: { labelPos: MapLabelPos; labelPosMobile?: MapLabelPos }) =>
    isMobile ? (p.labelPosMobile ?? p.labelPos) : p.labelPos;
  const data = STATE_UNITS[state.uf];
  // Origem dos arcos: a capital ou, sem ela (ex.: PR), a primeira unidade.
  const origin = data?.capital ?? data?.points[0];
  const connected = data
    ? data.capital
      ? data.points
      : data.points.slice(1)
    : [];

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      fill="none"
      role="img"
      aria-label={`Mapa de ${state.name} com a capital e as unidades TranspoTech`}
      className={`overflow-visible ${className}`}
      // yMin: ancora o desenho no topo do wrapper (alinhado à região dos cards)
      preserveAspectRatio="xMidYMin meet"
    >
      <defs>
        {/* Glow laranja dos dots — mesmo efeito do drop-shadow da Solução 360 */}
        <filter
          id={`dot-glow-${state.uf}`}
          x="-150%"
          y="-150%"
          width="400%"
          height="400%"
        >
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation={px(3.5)}
            floodColor="#f58220"
            floodOpacity="0.55"
          />
        </filter>
      </defs>
      <path
        d={state.d}
        fill="none"
        stroke="#FDFDFD"
        strokeOpacity={0.5}
        strokeWidth={0.75}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {data && origin && (
        <>
          {/* Arcos origem → unidade (desenham com stroke-dashoffset) */}
          {connected.map((p, i) => (
            <path
              key={p.city}
              d={arcPath(origin.x, origin.y, p.x, p.y, p.arcFlip)}
              stroke="#FDFDFD"
              strokeOpacity={0.75}
              // Sem non-scaling-stroke: ele faria o dasharray ser medido em
              // pixels de tela e quebraria a animação via pathLength=1.
              strokeWidth={px(1.5)}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={drawn ? 0 : 1}
              className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
              style={{ transitionDelay: `${150 + i * 120}ms` }}
            />
          ))}

          {/* Capital — ponto branco preenchido */}
          {data.capital && (
            <g
              className="transition-opacity duration-500 motion-reduce:transition-none"
              style={{ opacity: drawn ? 1 : 0 }}
            >
              <circle
                cx={data.capital.x}
                cy={data.capital.y}
                r={px(CAPITAL_DOT_R)}
                fill="#FDFDFD"
              />
              <text
                {...(() => {
                  const l = labelLayout(
                    posOf(data.capital),
                    data.capital.x,
                    data.capital.y,
                    CAPITAL_DOT_R,
                    px,
                    1
                  );
                  return { x: l.x, y: l.y, textAnchor: l.anchor };
                })()}
                fontSize={px(CAPITAL_FONT)}
                className="fill-neutral-300"
              >
                {data.capital.name}
              </text>
            </g>
          )}

          {/* Unidades — dot laranja (padrão Solução 360) + cidade e tempo */}
          {data.points.map((p, i) => {
            const label = labelLayout(
              posOf(p),
              p.x,
              p.y,
              UNIT_DOT_R,
              px,
              p.time ? 2 : 1
            );
            return (
              <g
                key={p.city}
                className="transition-opacity duration-500 motion-reduce:transition-none"
                style={{
                  opacity: drawn ? 1 : 0,
                  transitionDelay: `${550 + i * 120}ms`,
                }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={px(UNIT_DOT_R)}
                  fill={UNIT_DOT_FILL}
                  filter={`url(#dot-glow-${state.uf})`}
                />
                <text
                  x={label.x}
                  y={label.y}
                  textAnchor={label.anchor}
                  fontSize={px(CITY_FONT)}
                  fontWeight={600}
                  className="fill-neutral-50"
                >
                  {p.city}
                  {p.time && (
                    <tspan
                      x={label.x}
                      dy={px(LINE_GAP)}
                      fontSize={px(TIME_FONT)}
                      fontWeight={400}
                      className="fill-primary-400"
                    >
                      {p.time}
                    </tspan>
                  )}
                </text>
              </g>
            );
          })}
        </>
      )}
    </svg>
  );
}

export { STATE_MAPS };
