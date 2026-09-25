"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ease, prefersReducedMotion } from "@/lib/motion";

// Malha grande que "anda" sozinha pelo fundo (referência:
// terminal-industries.com/about). Mesmo desenho do HoverMesh (pontos +
// linhas laranja), mas em células bem maiores e revelada por blobs de
// máscara que vagam pela área — a malha aparece numa região, esvanece e
// surge em outra, sem depender do cursor.

// Célula da grade (HoverMesh usa 18px; aqui bem maior, como na referência).
const SPACING = 100;

// Blobs de revelação: raio + posição inicial (em % do container).
// Raios contidos para a união deles não cobrir a hero inteira — é o
// contraste entre região revelada e o resto que dá o efeito de "andar".
const BLOBS = [
  { r: 300, x: 22, y: 30 },
  { r: 240, x: 78, y: 22 },
  { r: 210, x: 55, y: 78 },
];

// Camada base: malha levemente visível em toda a área, mesmo fora dos blobs.
const BASE_VISIBILITY = 0.14;

// Fade vertical (mesma máscara da MeshBackground em imagem): topo visível →
// base transparente. Vai num wrapper próprio porque a máscara dos blobs é
// inline no elemento da malha — camadas extras de mask compõem por união,
// não por interseção, então o fade não pode entrar na mesma mask.
const FADE =
  "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.55) 35%, transparent 75%)";

export function DriftMesh({
  className,
  fade = false,
  speed = 1,
}: {
  className?: string;
  /** Apaga a malha de cima para baixo — para heros em wrappers altos onde a
      malha deve sumir antes do conteúdo seguinte (substitui a MeshBackground). */
  fade?: boolean;
  /** Multiplicador da velocidade dos blobs (1 = padrão das heros). */
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    // Fora da viewport o movimento fica pausado: animar as variáveis da mask
    // repinta a área inteira a cada frame, e o footer monta uma instância em
    // toda página. Pausado, o trecho em curso não completa nem sorteia o
    // próximo.
    // Trocar a mask por camadas movidas por transform não dá o mesmo pixel: as
    // camadas de mask compõem por união (1 − Π(1 − aᵢ)) antes de multiplicar a
    // malha, e camadas de conteúdo empilhadas somariam a malha várias vezes.
    let visible = false;
    let started = false;
    let raf = 0;
    let last = 0;

    // Cada blob vagueia para um alvo aleatório (5–95% / 8–92%, inteiros) em
    // 3–6s, com sine.inOut, e re-sorteia ao chegar.
    const blobs = BLOBS.map((b) => ({
      x: b.x,
      y: b.y,
      fromX: b.x,
      fromY: b.y,
      toX: b.x,
      toY: b.y,
      elapsed: 0,
      duration: 0,
    }));
    const randomInt = (min: number, max: number) =>
      Math.round(min + Math.random() * (max - min));
    const retarget = (b: (typeof blobs)[number]) => {
      b.fromX = b.x;
      b.fromY = b.y;
      b.toX = randomInt(5, 95);
      b.toY = randomInt(8, 92);
      b.elapsed = 0;
      b.duration = (3 + Math.random() * 3) / speed;
    };

    const frame = (now: number) => {
      // Mesmo lagSmoothing padrão do GSAP: um salto > 500ms (aba em segundo
      // plano, thread travada) conta como 33ms.
      const gap = now - last;
      const dt = (gap > 500 ? 33 : gap) / 1000;
      last = now;
      blobs.forEach((b, i) => {
        b.elapsed += dt;
        const p = ease.sineInOut(Math.min(1, b.elapsed / b.duration));
        b.x = b.fromX + (b.toX - b.fromX) * p;
        b.y = b.fromY + (b.toY - b.fromY) * p;
        el.style.setProperty(`--bx${i}`, `${b.x}%`);
        el.style.setProperty(`--by${i}`, `${b.y}%`);
        if (b.elapsed >= b.duration) retarget(b);
      });
      raf = requestAnimationFrame(frame);
    };
    const run = () => {
      if (raf) return;
      raf = requestAnimationFrame((now) => {
        last = now;
        raf = requestAnimationFrame(frame);
      });
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // O movimento só nasce na primeira entrada na viewport (o do footer, na
    // maioria das visitas, nunca). Até lá valem os fallbacks do var().
    const start = () => {
      started = true;
      blobs.forEach(retarget);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !started) start();
      if (visible) run();
      else pause();
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      pause();
    };
  }, [speed]);

  const mask = [
    // União (default de múltiplas camadas de mask): base fraca + blobs.
    `linear-gradient(rgba(0,0,0,${BASE_VISIBILITY}), rgba(0,0,0,${BASE_VISIBILITY}))`,
    ...BLOBS.map(
      (b, i) =>
        `radial-gradient(circle ${b.r}px at var(--bx${i}, ${b.x}%) var(--by${i}, ${b.y}%), rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 45%, transparent 75%)`
    ),
  ].join(", ");

  const half = SPACING / 2;
  const style: CSSProperties = {
    backgroundImage: [
      // Ponto na interseção das linhas (centro de cada célula).
      "radial-gradient(circle, rgba(255,148,72,0.5) 0 2px, transparent 3px)",
      `linear-gradient(to right, transparent 0 ${half - 0.5}px, rgba(255,148,72,0.2) ${half - 0.5}px ${half + 0.5}px, transparent ${half + 0.5}px)`,
      `linear-gradient(to bottom, transparent 0 ${half - 0.5}px, rgba(255,148,72,0.2) ${half - 0.5}px ${half + 0.5}px, transparent ${half + 0.5}px)`,
    ].join(", "),
    backgroundSize: `${SPACING}px ${SPACING}px`,
    maskImage: mask,
    WebkitMaskImage: mask,
  };

  return (
    <div
      aria-hidden
      className={className}
      style={fade ? { maskImage: FADE, WebkitMaskImage: FADE } : undefined}
    >
      <div ref={ref} className="absolute inset-0" style={style} />
    </div>
  );
}
