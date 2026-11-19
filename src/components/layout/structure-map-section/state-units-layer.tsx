import { STATE_UNITS, type MapLabelPos } from "./state-units";

// Camada de um estado com unidades: capital, unidades e arcos de conexão com
// o tempo de deslocamento (referência: jobyaviation.com). Desenhada dentro do
// mapa do Brasil quando o estado recebe zoom — coordenadas no espaço do br.svg.
// Os arcos "desenham" e os pontos surgem quando `drawn` é true; o mapa remonta
// a camada (key) a cada troca de estado para reiniciar a animação.
//
// Tamanhos de texto/pontos são definidos em PIXELS DE TELA (cidade 20px,
// capital 16px etc.) e convertidos para unidades do viewBox via `px`.

// Dots laranjas seguem o padrão da "Solução 360" da home (um pouco maiores):
// laranja com leve glow/sombra laranja, via filtro SVG (o drop-shadow de CSS
// não rende de forma confiável em elementos SVG).
export const UNIT_DOT_CLASS = "fill-primary-400";
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
  flip = false,
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
  lines: number,
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

type StateUnitsLayerProps = {
  uf: string;
  /** Dispara a animação de conexão (arcos desenham, pontos surgem). */
  drawn: boolean;
  /** Converte pixels de tela em unidades do viewBox (já considera o zoom). */
  px: (n: number) => number;
  /** Como `px`, mas com piso de 16px de tela — só para tamanhos de fonte. */
  pxFont: (n: number) => number;
  /** Usa `labelPosMobile` quando o mapa está estreito. */
  isMobile: boolean;
  /** id do filtro de glow dos dots (definido no <defs> do mapa). */
  glowId: string;
};

export function StateUnitsLayer({
  uf,
  drawn,
  px,
  pxFont,
  isMobile,
  glowId,
}: StateUnitsLayerProps) {
  const data = STATE_UNITS[uf];
  if (!data) return null;

  const posOf = (p: { labelPos: MapLabelPos; labelPosMobile?: MapLabelPos }) =>
    isMobile ? (p.labelPosMobile ?? p.labelPos) : p.labelPos;
  // Origem dos arcos: a capital ou, sem ela (ex.: PR), a primeira unidade.
  const origin = data.capital ?? data.points[0];
  const connected = data.capital ? data.points : data.points.slice(1);

  return (
    <g data-units-layer className="pointer-events-none">
      {/* Arcos origem → unidade (desenham com stroke-dashoffset) */}
      {connected.map((p, i) => (
        <path
          key={p.city}
          d={arcPath(origin.x, origin.y, p.x, p.y, p.arcFlip)}
          fill="none"
          strokeOpacity={0.75}
          // Sem non-scaling-stroke: ele faria o dasharray ser medido em
          // pixels de tela e quebraria a animação via pathLength=1.
          strokeWidth={px(1.5)}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={drawn ? 0 : 1}
          className="stroke-background transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
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
            className="fill-background"
          />
          <text
            {...(() => {
              const l = labelLayout(
                posOf(data.capital),
                data.capital.x,
                data.capital.y,
                CAPITAL_DOT_R,
                px,
                1,
              );
              return { x: l.x, y: l.y, textAnchor: l.anchor };
            })()}
            fontSize={pxFont(CAPITAL_FONT)}
            strokeWidth={px(4)}
            strokeLinejoin="round"
            paintOrder="stroke"
            className="fill-neutral-300 stroke-neutral-900"
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
          p.time ? 2 : 1,
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
              className={UNIT_DOT_CLASS}
              filter={`url(#${glowId})`}
            />
            <text
              x={label.x}
              y={label.y}
              textAnchor={label.anchor}
              fontSize={pxFont(CITY_FONT)}
              fontWeight={600}
              strokeWidth={px(4)}
              strokeLinejoin="round"
              paintOrder="stroke"
              className="fill-neutral-50 stroke-neutral-900"
            >
              {p.city}
              {p.time && (
                <tspan
                  x={label.x}
                  dy={px(LINE_GAP)}
                  fontSize={pxFont(TIME_FONT)}
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
    </g>
  );
}
