"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAZIL_STATES, type BrazilStateItem } from "./brazil-states";
import { ACTIVE_UFS, UNIT_UFS, coverageTier } from "./coverage";
import { STATE_UNITS } from "./state-units";
import { StateUnitsLayer, UNIT_DOT_CLASS } from "./state-units-layer";

// Mapa do Brasil com os estados de atuação TranspoTech (interação baseada em
// inputs/abrangencia-nacional- Transpotech.html): hover mostra tooltip, clique
// num estado com atuação dá zoom nele e esmaece os demais. Nos estados com
// unidade o zoom revela capital, unidades e tempos de deslocamento (mesma
// camada do antigo mapa por estado); nos demais, o rótulo "Atuação
// TranspoTech". Contornos e pontos no espaço do br.svg (0 0 1000 912).
//
// Tamanhos de texto/pontos são em PIXELS DE TELA: a escala do SVG é medida via
// ResizeObserver e convertida em unidades do viewBox (dividindo pelo zoom).

// viewBox rente ao território (bbox 45.5–835.4 × 41.4–870.3, sem ilhas
// oceânicas — Trindade etc. ficam fora do recorte), com folga de ~0.4 (meio
// traço): o desenho encosta no padding direito e no topo da seção.
const VB = { x: 45.1, y: 41, w: 790.7, h: 829.7 };
// Zoom da câmera: mesma curva/duração do HTML de referência.
const ZOOM_MS = 540;
const ZOOM_EASE = "cubic-bezier(.45,.05,.25,1)";
// Fração da tela ocupada pelo estado no zoom. Estados com unidade ficam menores
// para os rótulos de cidade/tempo (20px) caberem dentro do mapa. No mobile os
// rótulos caem para 65% e o estado ocupa quase toda a largura (como no mapa
// por estado antigo), senão as cidades próximas se sobrepõem.
const FIT_AREA = 0.82;
const FIT_UNITS = 0.64;
const FIT_UNITS_MOBILE = 0.62;
// Ajuste por estado: no RS as duas cidades empilhadas (Caxias do Sul / Nova
// Santa Rita) se sobrepõem com o enquadramento padrão; em SC o rótulo
// "Florianópolis" (à direita, junto à costa) precisa de mais folga lateral.
const FIT_OVERRIDES: Record<string, number> = { RS: 0.8, SC: 0.56 };
const MAX_ZOOM = 60;
// Fade nas bordas do mapa durante o zoom.
// No mobile o fade é mais curto para não apagar rótulos junto à borda.
const edgeFade = (pct: number) =>
  `linear-gradient(to right, transparent, #000 ${pct}%, #000 ${100 - pct}%, transparent), linear-gradient(to bottom, transparent, #000 ${pct}%, #000 ${100 - pct}%, transparent)`;

// Pins da visão Brasil (px de tela).
const PIN_R = 5;
const MIN_FONT_PX = 16; // piso de tamanho de texto, em px de tela
const PIN_FONT = 16;
const AREA_FONT = 16;

// Posicionamento automático dos nomes de cidade na visão Brasil (algoritmo do
// HTML de referência): cada rótulo testa lados até achar um livre. Offsets em
// px de tela, calibrados para fonte de 10px — escalados para PIN_FONT.
const LABEL_CANDIDATES: {
  x: number;
  y: number;
  anchor: "start" | "end" | "middle";
}[] = [
  { x: 11, y: 3.5, anchor: "start" },
  { x: -11, y: 3.5, anchor: "end" },
  { x: 11, y: -8, anchor: "start" },
  { x: -11, y: -8, anchor: "end" },
  { x: 11, y: 15, anchor: "start" },
  { x: -11, y: 15, anchor: "end" },
  { x: 0, y: -12, anchor: "middle" },
  { x: 0, y: 19, anchor: "middle" },
  { x: 22, y: -14, anchor: "start" },
  { x: -22, y: -14, anchor: "end" },
  { x: 22, y: 22, anchor: "start" },
  { x: -22, y: 22, anchor: "end" },
  { x: 34, y: -26, anchor: "start" },
  { x: -34, y: -26, anchor: "end" },
  { x: 34, y: 30, anchor: "start" },
  { x: -34, y: 30, anchor: "end" },
  { x: 0, y: -28, anchor: "middle" },
  { x: 0, y: 34, anchor: "middle" },
  { x: 46, y: 6, anchor: "start" },
  { x: -46, y: 6, anchor: "end" },
  // Anéis extras (com linha-guia) para regiões densas — ex.: litoral de SC,
  // onde Curitiba, Joinville, Blumenau e Itajaí ficam a poucos px entre si.
  ...[58, 72, 88].flatMap((r) =>
    Array.from({ length: 12 }, (_, k) => {
      const a = (k * Math.PI) / 6;
      const cos = Math.cos(a);
      return {
        x: Math.round(cos * r),
        y: Math.round(Math.sin(a) * r * 0.7 + 3.5),
        anchor: (cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle") as
          | "start"
          | "end"
          | "middle",
      };
    }),
  ),
];
const CANDIDATE_SCALE = PIN_FONT / 10;
// Penalidades do posicionamento: sobreposição é praticamente proibida (só
// acontece se nenhum candidato estiver livre); o resto desempata.
const PENALTY_LABEL = 1000;
const PENALTY_DOT = 500;
const PENALTY_EDGE = 300;
const PENALTY_BELONG = 8;
const LABEL_PASSES = 3;

type Rect = { x0: number; x1: number; y0: number; y1: number };
const hits = (a: Rect, b: Rect) =>
  a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
const rectDist = (r: Rect, x: number, y: number) =>
  Math.hypot(Math.max(r.x0 - x, 0, x - r.x1), Math.max(r.y0 - y, 0, y - r.y1));

type Pin = {
  uf: string;
  city: string;
  notes?: string[];
  x: number;
  y: number;
};

// Uma entrada por cidade (Blumenau reúne as duas unidades via `notes`).
const PINS: Pin[] = Object.entries(STATE_UNITS).flatMap(([uf, s]) =>
  s.points.map((p) => ({ uf, city: p.city, notes: p.notes, x: p.x, y: p.y })),
);

const STATE_BY_UF = Object.fromEntries(
  BRAZIL_STATES.map((s) => [s.uf, s]),
) as Record<string, BrazilStateItem>;

type Tip = {
  x: number;
  y: number;
  title: string;
  body: string;
  extra?: string;
};

function camera(uf: string | null, isMobile: boolean) {
  const state = uf ? STATE_BY_UF[uf] : null;
  if (!state) return { k: 1, tx: 0, ty: 0 };
  const [x, y, w, h] = state.box;
  const fit = UNIT_UFS.includes(state.uf)
    ? isMobile
      ? FIT_UNITS_MOBILE
      : (FIT_OVERRIDES[state.uf] ?? FIT_UNITS)
    : FIT_AREA;
  const k = Math.min(MAX_ZOOM, fit / Math.max(w / VB.w, h / VB.h));
  return {
    k,
    tx: VB.x + VB.w / 2 - k * (x + w / 2),
    ty: VB.y + VB.h / 2 - k * (y + h / 2),
  };
}

export function BrazilMap({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pinsRef = useRef<SVGGElement>(null);
  const glowId = `dot-glow-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const [selected, setSelected] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [tip, setTip] = useState<Tip | null>(null);
  const [inView, setInView] = useState(false);
  // Unidades do viewBox por pixel de tela (k = 1). Em telas estreitas os
  // tamanhos da camada de distâncias caem para 65% (mesmo fator do mapa antigo)
  // e os nomes de cidade da visão Brasil são ocultados (só os pins ficam).
  const [unitsPerPx, setUnitsPerPx] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const { k, tx, ty } = camera(selected, isMobile);
  const selectedState = selected ? STATE_BY_UF[selected] : null;
  const selectedHasUnits = !!selected && UNIT_UFS.includes(selected);
  const mobileFactor = isMobile ? 0.65 : 1;
  // px de tela → unidades do viewBox já considerando o zoom da câmera.
  const px = useCallback(
    (n: number) => (n * unitsPerPx * mobileFactor) / k,
    [unitsPerPx, mobileFactor, k],
  );
  // Igual ao `px`, mas com piso de 16px de tela: a redução de 65% do mobile
  // encolhe a geometria da camada de distâncias, nunca a legibilidade do texto.
  const pxFont = useCallback(
    (n: number) => (Math.max(n * mobileFactor, MIN_FONT_PX) * unitsPerPx) / k,
    [unitsPerPx, mobileFactor, k],
  );
  // px na visão Brasil (sem zoom e sem o fator mobile).
  const pxBase = (n: number) => n * unitsPerPx;

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const scale = Math.min(rect.width / VB.w, rect.height / VB.h);
      if (scale > 0) setUnitsPerPx(1 / scale);
      setIsMobile(rect.width < 520);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pins surgem quando o mapa entra na viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // A camada de distâncias anima (arcos desenham) depois que a câmera chega.
  // (`drawn` é zerado em `select`, junto com a troca de estado.)
  useEffect(() => {
    if (!selected) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const id = window.setTimeout(() => setDrawn(true), reduce ? 0 : ZOOM_MS);
    return () => window.clearTimeout(id);
  }, [selected]);

  const select = useCallback((uf: string | null) => {
    setTip(null);
    setDrawn(false);
    setSelected(uf);
  }, []);

  // Clicar de novo no estado aberto volta para o Brasil todo.
  const toggle = useCallback(
    (uf: string) => select(selected === uf ? null : uf),
    [select, selected],
  );

  // Esc volta para o Brasil todo.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") select(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, select]);

  // Nomes de cidade da visão Brasil: mede as caixas reais e resolve colisões
  // contra rótulos e pinos já colocados (porta do placeLabels do HTML).
  useLayoutEffect(() => {
    const root = pinsRef.current;
    if (!root || isMobile) return;
    const nodes = Array.from(root.querySelectorAll<SVGGElement>("[data-pin]"));
    const items = nodes
      .map((node) => {
        const i = Number(node.dataset.pin);
        return {
          node,
          text: node.querySelector("text") as SVGTextElement,
          leader: node.querySelector("line") as SVGLineElement,
          pin: PINS[i],
        };
      })
      .sort((a, b) => a.pin.city.length - b.pin.city.length);

    const u = unitsPerPx;
    const dotHalf = 6 * u;
    const dots: Rect[] = items.map(({ pin }) => ({
      x0: pin.x - dotHalf,
      x1: pin.x + dotHalf,
      y0: pin.y - dotHalf,
      y1: pin.y + dotHalf,
    }));
    const edge = 4 * u;
    const pad = 2 * u; // folga do contorno escuro do texto
    const rects: (Rect | null)[] = items.map(() => null);

    // Mede cada rótulo uma vez por âncora, na origem: mudar x/y do <text> só
    // translada a caixa, então a caixa de cada candidato sai por aritmética —
    // sem setAttribute + getBBox (relayout forçado) por candidato e passada.
    const anchors = ["start", "middle", "end"] as const;
    const boxes = items.map(({ text }) => {
      const byAnchor = {} as Record<(typeof anchors)[number], DOMRect>;
      for (const anchor of anchors) {
        text.setAttribute("x", "0");
        text.setAttribute("y", "0");
        text.setAttribute("text-anchor", anchor);
        byAnchor[anchor] = text.getBBox();
      }
      return byAnchor;
    });
    const placed = items.map(() => LABEL_CANDIDATES[0]);

    // Primeira passada gulosa (menores rótulos primeiro, contra os já
    // colocados); as seguintes reposicionam cada rótulo contra TODOS os
    // outros, resolvendo conflitos criados pela ordem da primeira.
    for (let pass = 0; pass < LABEL_PASSES; pass++) {
      items.forEach(({ pin }, i) => {
        const toRect = (c: (typeof LABEL_CANDIDATES)[number]): Rect => {
          const bb = boxes[i][c.anchor];
          const x = c.x * CANDIDATE_SCALE * u + bb.x;
          const y = c.y * CANDIDATE_SCALE * u + bb.y;
          return {
            x0: pin.x + x - pad,
            x1: pin.x + x + bb.width + pad,
            y0: pin.y + y - pad,
            y1: pin.y + y + bb.height + pad,
          };
        };
        const others = rects.filter((q, j): q is Rect => j !== i && !!q);
        let best = LABEL_CANDIDATES[0];
        let bestScore = Infinity;
        for (const c of LABEL_CANDIDATES) {
          const r = toRect(c);
          let score = 0;
          others.forEach((q) => {
            if (hits(r, q)) score += PENALTY_LABEL;
          });
          dots.forEach((q, j) => {
            if (j !== i && hits(r, q)) score += PENALTY_DOT;
          });
          // Penaliza sair da área visível do mapa.
          if (
            r.x0 < VB.x + edge ||
            r.x1 > VB.x + VB.w - edge ||
            r.y0 < VB.y + edge ||
            r.y1 > VB.y + VB.h - edge
          )
            score += PENALTY_EDGE;
          // Pertencimento: nenhum pino alheio pode estar mais perto do rótulo
          // que o próprio.
          const own = rectDist(r, pin.x, pin.y);
          dots.forEach((q, j) => {
            if (j === i) return;
            const cx = (q.x0 + q.x1) / 2;
            const cy = (q.y0 + q.y1) / 2;
            if (rectDist(r, cx, cy) < own + 6 * u) score += PENALTY_BELONG;
          });
          score += (own / u) * 0.06;
          if (score < bestScore) {
            bestScore = score;
            best = c;
          }
        }
        rects[i] = toRect(best);
        placed[i] = best;
      });
    }
    items.forEach(({ text }, i) => {
      const c = placed[i];
      text.setAttribute("x", String(c.x * CANDIDATE_SCALE * u));
      text.setAttribute("y", String(c.y * CANDIDATE_SCALE * u));
      text.setAttribute("text-anchor", c.anchor);
    });

    // Linha-guia do pino até o rótulo.
    items.forEach(({ text, leader }) => {
      const bb = text.getBBox();
      const anchor = text.getAttribute("text-anchor");
      const lx =
        anchor === "end"
          ? bb.x + bb.width
          : anchor === "start"
            ? bb.x
            : bb.x + bb.width / 2;
      const ly = bb.y + bb.height / 2;
      const a = Math.atan2(ly, lx);
      // Rótulo colado ao ponto dispensa a linha.
      const near = rectDist(
        { x0: bb.x, x1: bb.x + bb.width, y0: bb.y, y1: bb.y + bb.height },
        0,
        0,
      );
      leader.style.display = near < 12 * u ? "none" : "";
      leader.setAttribute("x1", String(Math.cos(a) * 6 * u));
      leader.setAttribute("y1", String(Math.sin(a) * 6 * u));
      leader.setAttribute("x2", String(lx));
      leader.setAttribute("y2", String(ly));
    });
  }, [unitsPerPx, isMobile]);

  const showTip = (e: PointerEvent, content: Omit<Tip, "x" | "y">) => {
    if (e.pointerType !== "mouse") return;
    const box = wrapRef.current?.getBoundingClientRect();
    if (!box) return;
    setTip({ ...content, x: e.clientX - box.left, y: e.clientY - box.top });
  };

  const onStateKey = (e: KeyboardEvent, uf: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(uf);
    }
  };

  const liveMessage = useMemo(() => {
    if (!selectedState) return "";
    if (!selectedHasUnits) return `${selectedState.name}: atuação TranspoTech.`;
    const cities = STATE_UNITS[selectedState.uf].points.map((p) =>
      p.time ? `${p.city}, ${p.time}` : p.city,
    );
    return `${selectedState.name}: unidades em ${cities.join("; ")}.`;
  }, [selectedState, selectedHasUnits]);

  const transition = `transform ${ZOOM_MS}ms ${ZOOM_EASE}`;

  return (
    <div
      ref={wrapRef}
      data-reveal-atom
      className={`relative ${className}`}
      // Proporção do território: o wrapper pode ser dimensionado só pela
      // largura OU só pela altura. `--map-ratio` fica disponível para limites
      // em calc() (ex.: largura máx. derivada da altura do viewport).
      style={
        {
          aspectRatio: `${VB.w} / ${VB.h}`,
          "--map-ratio": VB.w / VB.h,
        } as CSSProperties
      }
    >
      <svg
        ref={svgRef}
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        // Quando a caixa não segue a proporção (coluna estreita em lg), o
        // desenho fica no topo (alinhado ao título) e à direita (padding).
        preserveAspectRatio="xMaxYMin meet"
        role="group"
        aria-label="Mapa do Brasil com os estados de atuação da TranspoTech e as cidades com unidade física. Selecione um estado para ver os detalhes."
        className="block h-full w-full overflow-hidden"
        // No zoom, os estados vizinhos esmaecidos são cortados pela borda do
        // SVG: a máscara suaviza o recorte (só com zoom — na visão Brasil o
        // território inteiro fica visível).
        style={
          selected
            ? {
                maskImage: edgeFade(isMobile ? 3 : 8),
                WebkitMaskImage: edgeFade(isMobile ? 3 : 8),
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }
            : undefined
        }
        onPointerLeave={() => setTip(null)}
      >
        <defs>
          {/* Glow laranja dos dots — mesmo efeito do drop-shadow da Solução 360 */}
          <filter id={glowId} x="-150%" y="-150%" width="400%" height="400%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation={px(3.5)}
              style={{ floodColor: "var(--color-primary-500)" }}
              floodOpacity="0.55"
            />
          </filter>
        </defs>

        {/* Fundo clicável: volta para o Brasil todo */}
        <rect
          x={VB.x}
          y={VB.y}
          width={VB.w}
          height={VB.h}
          fill="transparent"
          onClick={() => select(null)}
        />

        {/* Câmera — translate/scale com transição (zoom no estado) */}
        <g
          style={{
            transform: `translate(${tx}px, ${ty}px) scale(${k})`,
            transformBox: "view-box",
            transformOrigin: "0 0",
            transition,
          }}
          className="motion-reduce:transition-none!"
        >
          {BRAZIL_STATES.map((s) => {
            const active = ACTIVE_UFS.includes(s.uf);
            const unit = UNIT_UFS.includes(s.uf);
            const isSel = selected === s.uf;
            const dim = !!selected && !isSel;
            // Dois tons: locação (mais forte) e atuação em venda/manutenção.
            // O ponto da unidade física é desenhado por cima, à parte.
            const tierFill = {
              rental: "fill-primary-500/55 stroke-neutral-50/40",
              active: "fill-primary-500/30 stroke-neutral-50/40",
            } as const;
            const tier = coverageTier(s.uf);
            const fill = !active
              ? "fill-neutral-50/4 stroke-neutral-50/40"
              : isSel
                ? "fill-primary-500/15 stroke-primary-400"
                : tier
                  ? tierFill[tier]
                  : "fill-primary-500/30 stroke-neutral-50/40";
            const interactive = active && !dim;
            return (
              <path
                key={s.uf}
                data-uf={s.uf}
                d={s.d}
                strokeWidth={isSel ? 1.5 : 0.75}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className={`outline-none! transition-[fill,stroke,opacity] duration-300 motion-reduce:transition-none ${fill} ${
                  dim ? "pointer-events-none opacity-[0.14]" : ""
                } ${
                  interactive
                    ? `cursor-pointer ${
                        isSel
                          ? ""
                          : "hover:fill-primary-400/80 hover:stroke-primary-300 focus-visible:fill-primary-400/80 focus-visible:stroke-primary-300"
                      }`
                    : "pointer-events-none"
                }`}
                {...(interactive
                  ? {
                      role: "button",
                      tabIndex: 0,
                      "aria-label": isSel
                        ? `${s.name} — voltar para o Brasil todo`
                        : `${s.name} — ver atuação TranspoTech`,
                      "aria-pressed": isSel,
                      onClick: () => toggle(s.uf),
                      onKeyDown: (e: KeyboardEvent) => onStateKey(e, s.uf),
                      onPointerMove: (e: PointerEvent) =>
                        showTip(e, {
                          title: s.name,
                          body: "Atuação TranspoTech",
                          extra: unit
                            ? STATE_UNITS[s.uf].points
                                .map((p) => p.city)
                                .join(" · ")
                            : undefined,
                        }),
                      onPointerLeave: () => setTip(null),
                    }
                  : {})}
              />
            );
          })}

          {/* Estado com unidades: capital, unidades, arcos e tempos */}
          {selectedHasUnits && selected && (
            <StateUnitsLayer
              key={selected}
              uf={selected}
              drawn={drawn}
              px={px}
              pxFont={pxFont}
              isMobile={isMobile}
              glowId={glowId}
            />
          )}

          {/* Estado sem unidade: rótulo "Atuação TranspoTech" no centro */}
          {selectedState && !selectedHasUnits && (
            <text
              x={selectedState.center[0]}
              y={selectedState.center[1] + pxFont(AREA_FONT) * 0.35}
              textAnchor="middle"
              fontSize={pxFont(AREA_FONT)}
              fontWeight={700}
              strokeWidth={px(3.5)}
              strokeLinejoin="round"
              paintOrder="stroke"
              className="pointer-events-none fill-neutral-50 stroke-neutral-900 transition-opacity duration-300 motion-reduce:transition-none"
              style={{ opacity: drawn ? 1 : 0 }}
            >
              Atuação TranspoTech
            </text>
          )}
        </g>

        {/* Pins da visão Brasil (sem zoom): unidade física + nome da cidade */}
        <g
          ref={pinsRef}
          className={`transition-opacity duration-300 motion-reduce:transition-none ${
            selected || !inView
              ? "pointer-events-none opacity-0"
              : "opacity-100"
          }`}
        >
          {PINS.map((p, i) => (
            <g
              key={`${p.uf}-${p.city}`}
              data-pin={i}
              transform={`translate(${p.x} ${p.y})`}
              className="group/pin"
            >
              <circle
                r={pxBase(PIN_R * 1.4)}
                fill="none"
                strokeWidth={pxBase(1.4)}
                className="pointer-events-none origin-center animate-ping stroke-primary-400 [animation-duration:3s] [transform-box:fill-box] motion-reduce:hidden"
                style={{ animationDelay: `${((i * 0.37) % 1.6).toFixed(2)}s` }}
              />
              <circle
                r={pxBase(PIN_R)}
                filter={`url(#${glowId})`}
                className={`${UNIT_DOT_CLASS} pointer-events-none transition-[fill] duration-200 group-hover/pin:fill-neutral-50`}
              />
              {!isMobile && (
                <>
                  <line
                    strokeOpacity={0.45}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                    className="pointer-events-none stroke-background"
                  />
                  <text
                    fontSize={pxBase(PIN_FONT)}
                    fontWeight={700}
                    strokeWidth={pxBase(3)}
                    strokeLinejoin="round"
                    paintOrder="stroke"
                    className="pointer-events-none fill-neutral-50 stroke-neutral-900"
                  >
                    {p.city}
                  </text>
                </>
              )}
              {/* Área de clique/hover maior que o dot */}
              <circle
                r={pxBase(isMobile ? 8 : 14)}
                fill="transparent"
                className="cursor-pointer"
                onClick={() => toggle(p.uf)}
                onPointerMove={(e) =>
                  showTip(e, {
                    title: `${p.city} — ${p.uf}`,
                    body: p.notes?.join(" · ") ?? "Unidade TranspoTech",
                  })
                }
                onPointerLeave={() => setTip(null)}
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Tooltip (somente mouse) */}
      <div
        aria-hidden
        className={`pointer-events-none absolute z-10 max-w-[230px] -translate-x-1/2 -translate-y-full rounded-lg border border-primary-500/45 bg-neutral-900 px-3 py-2 text-sm leading-[1.45] text-neutral-200 shadow-lg transition-opacity duration-200 ${
          tip ? "opacity-100" : "opacity-0"
        }`}
        style={tip ? { left: tip.x, top: tip.y - 12 } : undefined}
      >
        {tip && (
          <>
            <span className="block font-semibold text-primary-400">
              {tip.title}
            </span>
            {tip.body}
            {tip.extra && (
              <span className="mt-1 block font-semibold text-neutral-50">
                {tip.extra}
              </span>
            )}
          </>
        )}
      </div>

      {/* Voltar para o Brasil todo */}
      <div
        className={`absolute right-0 top-0 z-10 transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
          selected
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <Button
          variant="dark"
          size="sm"
          onClick={() => select(null)}
          tabIndex={selected ? 0 : -1}
          aria-hidden={!selected}
          iconLeft={<ArrowLeft aria-hidden className="size-5" />}
          className="border border-white/30"
        >
          Ver Brasil todo
        </Button>
      </div>

      <p aria-live="polite" className="sr-only">
        {liveMessage}
      </p>
    </div>
  );
}
