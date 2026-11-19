// Animações nativas (Web Animations API + rAF) que substituem tweens simples do
// GSAP, para o chunk dele (~45KB gzip) só baixar nas páginas que ainda usam
// ScrollTrigger com pin.
//
// Eases: fórmulas do gsap-core.js (3.15). `powerN.in` é p^(N+1), `.out` é o
// espelho 1 - in(1 - p) e `.inOut` junta as duas metades. Quando a curva é um
// polinômio de grau ≤ 3 ela é uma Bézier cúbica exata com x(s) = s (pontos de
// controle x = 1/3 e 2/3); os y saem de igualar os coeficientes:
//   power1.out = 1-(1-p)^2          → cubic-bezier(1/3, 2/3, 2/3, 1)
//   power1.in  = p^2                → cubic-bezier(1/3, 0, 2/3, 1/3)
//   power2.out = 1-(1-p)^3          → cubic-bezier(1/3, 1, 2/3, 1)
//   back.out(s) = 1+(s+1)(p-1)^3+s(p-1)^2 → cubic-bezier(1/3, (s+3)/3, 2/3, 1)
// power3.out (grau 4) e sine.inOut não têm Bézier exata: só são usados em
// valores animados por rAF (`tween`), com a fórmula exata.

const THIRD = 1 / 3;
const TWO_THIRDS = 2 / 3;

const bezier = (x1: number, y1: number, x2: number, y2: number) =>
  `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;

export type Ease = (p: number) => number;

/** Curva cubic-bezier (mesma definição do CSS) resolvida por bisseção em x. */
export const cubicBezier = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): Ease => {
  const at = (s: number, p1: number, p2: number) =>
    3 * p1 * s * (1 - s) ** 2 + 3 * p2 * s * s * (1 - s) + s ** 3;
  return (t) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let s = t;
    for (let i = 0; i < 20; i++) {
      s = (lo + hi) / 2;
      if (at(s, x1, x2) < t) lo = s;
      else hi = s;
    }
    return at(s, y1, y2);
  };
};

const sineIn: Ease = (p) => (p === 1 ? 1 : 1 - Math.cos(p * (Math.PI / 2)));

/** Eases do GSAP como função, para animação por rAF. */
export const ease = {
  power1Out: (p: number) => 1 - (1 - p) ** 2,
  power3Out: (p: number) => 1 - (1 - p) ** 4,
  sineInOut: (p: number) =>
    p < 0.5 ? sineIn(p * 2) / 2 : 1 - sineIn((1 - p) * 2) / 2,
  // Antigo "gearEase" registrado no GSAP.
  gear: cubicBezier(0.45, 0, 0.2, 1),
} satisfies Record<string, Ease>;

/** Eases do GSAP como `easing` de CSS/WAAPI (equivalências exatas acima). */
export const cssEase = {
  power1Out: bezier(THIRD, TWO_THIRDS, TWO_THIRDS, 1),
  power1In: bezier(THIRD, 0, TWO_THIRDS, THIRD),
  power2Out: bezier(THIRD, 1, TWO_THIRDS, 1),
  backOut: (overshoot: number) =>
    bezier(THIRD, (overshoot + 3) / 3, TWO_THIRDS, 1),
};

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Timing = {
  /** Segundos, como no GSAP. */
  duration: number;
  /** Segundos. */
  delay?: number;
};

/**
 * Anima um valor de 0 a 1 por rAF (equivale a `gsap.to(state, { p: 1 })`).
 * Devolve a função que cancela.
 */
export function tween({
  duration,
  delay = 0,
  ease: easeFn,
  onUpdate,
  onComplete,
}: Timing & {
  ease: Ease;
  onUpdate: (value: number) => void;
  onComplete?: () => void;
}): () => void {
  if (duration <= 0 && delay <= 0) {
    onUpdate(1);
    onComplete?.();
    return () => {};
  }
  let raf = 0;
  let start = -1;
  const frame = (now: number) => {
    if (start < 0) start = now + delay * 1000;
    if (now >= start) {
      const t =
        duration > 0 ? Math.min(1, (now - start) / (duration * 1000)) : 1;
      onUpdate(easeFn(t));
      if (t >= 1) {
        onComplete?.();
        return;
      }
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

/** Estado de partida de uma entrada, nos mesmos termos do `gsap.from()`. */
export type FromVars = {
  opacity?: number;
  /** px */
  x?: number;
  /** px */
  y?: number;
  scale?: number;
  borderColor?: string;
};

/**
 * Equivale a um `gsap.from()` (ou `set` + `to` de volta ao valor do CSS)
 * preparado e ainda parado: o elemento fica no estado `from` até `play()`, e
 * então vai para o valor do próprio CSS. Nada é escrito no atributo `style`,
 * então pode rodar durante a hidratação sem mismatch.
 *
 * x/y animam a propriedade `translate` somada (composite "add") à do CSS, que
 * fica por fora de rotate/scale/transform — mesma posição do x/y do GSAP.
 */
export function prepareFrom(
  el: Element | null | undefined,
  from: FromVars,
  { duration, delay = 0, easing }: Timing & { easing: string },
): Animation[] {
  if (!el) return [];
  const timing: KeyframeAnimationOptions = {
    duration: duration * 1000,
    delay: delay * 1000,
    easing,
    // Mantém o estado inicial durante o atraso (stagger).
    fill: "backwards",
  };
  const { x = 0, y = 0, ...rest } = from;
  const frame: Keyframe = { offset: 0 };
  if (rest.opacity !== undefined) frame.opacity = rest.opacity;
  if (rest.scale !== undefined) frame.scale = String(rest.scale);
  if (rest.borderColor !== undefined) frame.borderColor = rest.borderColor;

  // Um só keyframe (offset 0): o final implícito é o valor do CSS.
  const anims: Animation[] = [];
  if (Object.keys(frame).length > 1) anims.push(el.animate([frame], timing));
  if (x !== 0 || y !== 0) {
    anims.push(
      el.animate(
        [{ offset: 0, translate: `${x}px ${y}px`, composite: "add" }],
        timing,
      ),
    );
  }
  anims.forEach((a) => a.pause());
  return anims;
}

/** `prepareFrom` em lista, com `stagger` (segundos) como no GSAP. */
export function prepareFromEach(
  els: ArrayLike<Element | null | undefined>,
  from: FromVars,
  {
    stagger = 0,
    delay = 0,
    ...timing
  }: Timing & { easing: string; stagger?: number },
): Animation[] {
  return Array.from(els)
    .filter((el): el is Element => !!el)
    .flatMap((el, i) =>
      prepareFrom(el, from, { ...timing, delay: delay + i * stagger }),
    );
}

/**
 * Timeline disparada por scroll: toca `anims` (preparadas com `prepareFrom`)
 * quando o elemento passa da linha, como `scrollTrigger: { start, once }`.
 * O cleanup desfaz tudo (equivale ao `ctx.revert()`).
 */
export function playOnScroll(
  el: Element,
  line: number,
  anims: Animation[],
): () => void {
  const stop = onScrollPast(el, line, () => anims.forEach((a) => a.play()));
  return () => {
    stop();
    anims.forEach((a) => a.cancel());
  };
}

const running = new WeakMap<Element, Animation>();

/**
 * Anima do valor atual até `to` e mantém `to` no fim (equivale a `gsap.to()`
 * com valores explícitos). Interromper um em andamento parte de onde ele está,
 * como o GSAP — uma transition de CSS encurtaria a volta.
 */
export function tweenStyle(
  el: HTMLElement | SVGElement,
  to: Record<string, string>,
  {
    duration,
    delay = 0,
    easing,
    onComplete,
  }: Timing & { easing: string; onComplete?: () => void },
) {
  const cs = getComputedStyle(el);
  const from: Keyframe = {};
  for (const prop of Object.keys(to)) {
    from[prop] = cs.getPropertyValue(
      prop.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`),
    );
  }
  const anim = el.animate([from, to], {
    duration: duration * 1000,
    delay: delay * 1000,
    easing,
    fill: "both",
  });
  running.get(el)?.cancel();
  running.set(el, anim);
  anim.finished.then(
    () => {
      try {
        anim.commitStyles();
      } catch {
        // Elemento fora da renderização (display: none / desmontado).
        Object.assign(el.style, to);
      }
      anim.cancel();
      if (running.get(el) === anim) running.delete(el);
      onComplete?.();
    },
    // Cancelada por outra animação do mesmo elemento.
    () => {},
  );
}

// Margem enorme em cima e dos lados: o que já passou da linha (inclusive num
// salto de âncora que pula o elemento) conta como "entrou".
const FAR = 100_000;

/**
 * `rootMargin` de IntersectionObserver em que "intersecta" = o topo do
 * elemento passou da linha (fração da altura da viewport), como o `start:
 * "top N%"` do ScrollTrigger.
 */
export const scrollLineMargin = (line: number) =>
  `${FAR}px ${FAR}px ${(-(1 - line) * 100).toFixed(2)}% ${FAR}px`;

/**
 * Equivale a um ScrollTrigger `{ start: "top <line * 100>%", once: true }`:
 * chama `onEnter` uma vez, quando o topo do elemento passa da linha (fração da
 * altura da viewport), ou logo de início se ele já passou. Devolve o cleanup.
 */
export function onScrollPast(
  el: Element,
  line: number,
  onEnter: () => void,
): () => void {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      onEnter();
    },
    { rootMargin: scrollLineMargin(line) },
  );
  observer.observe(el);
  return () => observer.disconnect();
}

// Scrub linear (ScrollTrigger `scrub: true`, `ease: "none"`): um listener de
// scroll e um rAF para todos; lê os rects de todos antes de escrever. Fora da
// viewport o progresso não muda; ao sair, o elemento ganha uma última leitura
// que o crava em 0 ou 1 (e o mesmo ao registrar, para a posição atual).
type Scrub = {
  el: Element;
  startLine: number;
  endLine: number;
  onProgress: (progress: number, rect: DOMRect) => void;
  visible: boolean;
  pending: boolean;
};

const scrubs = new Set<Scrub>();
let scrubRaf = 0;

const flushScrubs = () => {
  scrubRaf = 0;
  const due = [...scrubs].filter((s) => s.visible || s.pending);
  const rects = due.map((s) => s.el.getBoundingClientRect());
  const vh = window.innerHeight;
  due.forEach((s, i) => {
    s.pending = false;
    const rect = rects[i];
    // start "top <startLine>" → end "bottom <endLine>", em px da viewport.
    const from = s.startLine * vh;
    const span = rect.height + (s.startLine - s.endLine) * vh;
    const raw = span > 0 ? (from - rect.top) / span : rect.top < from ? 1 : 0;
    s.onProgress(Math.min(1, Math.max(0, raw)), rect);
  });
};

const scheduleScrubs = () => {
  if (!scrubRaf) scrubRaf = requestAnimationFrame(flushScrubs);
};

const onScrubResize = () => {
  scrubs.forEach((s) => (s.pending = true));
  scheduleScrubs();
};

/**
 * Equivale a um ScrollTrigger `{ start: "top <startLine*100>%", end: "bottom
 * <endLine*100>%", scrub: true }` com ease linear: chama `onProgress` com o
 * progresso 0–1 do scroll entre as duas linhas. Devolve o cleanup.
 */
export function scrubOnScroll(
  el: Element,
  { startLine, endLine }: { startLine: number; endLine: number },
  onProgress: (progress: number, rect: DOMRect) => void,
): () => void {
  const scrub: Scrub = {
    el,
    startLine,
    endLine,
    onProgress,
    visible: false,
    pending: true,
  };
  // Margem: o IntersectionObserver entrega com um frame de atraso.
  const observer = new IntersectionObserver(
    ([entry]) => {
      scrub.visible = entry.isIntersecting;
      if (!scrub.visible) scrub.pending = true;
      scheduleScrubs();
    },
    { rootMargin: "25% 0px" },
  );
  observer.observe(el);
  if (scrubs.size === 0) {
    window.addEventListener("scroll", scheduleScrubs, { passive: true });
    window.addEventListener("resize", onScrubResize, { passive: true });
  }
  scrubs.add(scrub);
  scheduleScrubs();

  return () => {
    observer.disconnect();
    scrubs.delete(scrub);
    if (scrubs.size === 0) {
      window.removeEventListener("scroll", scheduleScrubs);
      window.removeEventListener("resize", onScrubResize);
      cancelAnimationFrame(scrubRaf);
      scrubRaf = 0;
    }
  };
}
