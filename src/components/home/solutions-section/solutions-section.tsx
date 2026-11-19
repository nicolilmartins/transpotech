"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import { cssEase, ease, tween } from "@/lib/motion";
import Image from "next/image";
import { IntentLink } from "@/components/ui/intent-link";
import {
  ArrowRight,
  Forklift,
  Sparkles,
  CircleDollarSign,
  Wrench,
  Network,
  Truck,
  BatteryCharging,
  Settings2,
  Disc3,
  type LucideIcon,
} from "lucide-react";
import gearRing from "@/assets/images/solutions-gear.svg";
import { ROUTES } from "@/lib/routes";
import type { SectionContent } from "@/sanity/content/fields";
import type { homePage } from "@/sanity/content/pages/home";

// Ícone e destino de cada solução, na ordem das soluções editadas no Studio.
type SolutionLink = {
  icon: LucideIcon;
  /** Destino do CTA no centro da engrenagem. */
  href: string;
};

const solutionLinks: SolutionLink[] = [
  { icon: Forklift, href: ROUTES.LOCACAO },
  {
    icon: Sparkles,
    // /produtos/empilhadeiras (índice) ainda está em construção — o destino
    // útil é direto o catálogo de novas.
    href: ROUTES.EMPILHADEIRAS_NOVAS,
  },
  { icon: CircleDollarSign, href: ROUTES.EMPILHADEIRAS_SEMINOVAS },
  {
    icon: Wrench,
    // /servicos/assistencia-multimarcas seria o destino literal, mas está em
    // construção — /servicos cobre preventiva, corretiva e multimarcas.
    href: ROUTES.SERVICOS,
  },
  { icon: Network, href: ROUTES.AUTOMACAO },
  {
    icon: Truck,
    // Não há página de transporte no site; o CTA já é de conversa, então vai
    // para o contato.
    href: ROUTES.CONTATO,
  },
  { icon: BatteryCharging, href: ROUTES.BATERIAS },
  { icon: Settings2, href: ROUTES.PECAS },
  { icon: Disc3, href: ROUTES.PNEUS },
];

const N = solutionLinks.length; // 9

// ─── Geometria (viewBox quadrado, engrenagem centralizada) ───────────────────
const VB       = 600;      // viewBox quadrado
const CX       = VB / 2;   // 300
const CY       = VB / 2;   // 300
const ORBIT_R  = 258;      // raio das bolinhas (anéis mantidos como estão)
const LABEL_R  = 286;      // âncora dos nomes (logo fora das bolinhas)
const GEAR_D   = 425;      // diâmetro do anel segmentado (entre as versões)

// Passo angular entre pontos: a engrenagem gira de ponto em ponto.
const STEP_DEG = 360 / N;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function orbitAngle(i: number): number {
  return (i / N) * Math.PI * 2 - Math.PI / 2; // 0 = topo (12h)
}

function dotPos(i: number): { x: number; y: number } {
  const a = orbitAngle(i);
  return { x: CX + ORBIT_R * Math.cos(a), y: CY + ORBIT_R * Math.sin(a) };
}

function labelPos(i: number): { x: number; y: number } {
  const a = orbitAngle(i);
  return { x: CX + LABEL_R * Math.cos(a), y: CY + LABEL_R * Math.sin(a) };
}

// Posição percentual da bolinha dentro do viewBox
function dotPct(i: number) {
  const { x, y } = dotPos(i);
  return { left: (x / VB) * 100, top: (y / VB) * 100 };
}

// ─── Component ───────────────────────────────────────────────────────────────
// Tempo sem nenhuma interação até a engrenagem voltar a girar.
const IDLE_RESUME_MS = 20_000;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type SolutionsContent = SectionContent<typeof homePage.sections.solutions>;

export function SolutionsSection({ content }: { content: SolutionsContent }) {
  const solutions = content.items.map((item, i) => ({ ...item, ...solutionLinks[i] }));
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // O ciclo automático só roda com a seção na tela: fora dela, o re-render e
  // o giro a cada 3s disputavam frame com o scroll no mobile.
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rotationDeg = useRef(0);
  // Espelho do ativo para o guard de rotação: mouseenter + click disparam
  // handleSelect em sequência antes do re-render, e o state ainda antigo
  // deixaria o giro somar dois passos.
  const activeRef = useRef(0);
  const gearRef = useRef<HTMLDivElement>(null);
  const solutionContentRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Anima a engrenagem do ângulo em que está (mesmo no meio de um giro) até
  // o ângulo acumulado. Por rAF e não por WAAPI: o ângulo passa de 360° e a
  // partida tem que ser o valor exato, não o lido da matriz computada.
  const gearAngle = useRef(0);
  const stopGear = useRef<(() => void) | null>(null);
  const rotateGear = (targetDeg: number) => {
    const gear = gearRef.current;
    if (!gear) return;
    stopGear.current?.();
    const from = gearAngle.current;
    stopGear.current = tween({
      duration: prefersReducedMotion() ? 0 : 0.85,
      ease: ease.gear,
      onUpdate: (p) => {
        gearAngle.current = from + (targetDeg - from) * p;
        gear.style.transform = `rotate(${gearAngle.current}deg)`;
      },
    });
  };

  // Fade da solução ativa
  const fadeSolution = () => {
    const el = solutionContentRef.current;
    if (!el || prefersReducedMotion()) return;
    el.animate(
      [
        { opacity: 0, translate: "0px 10px" },
        { opacity: 1, translate: "0px 0px" },
      ],
      { duration: 350, easing: cssEase.power1Out }
    );
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle while not paused
  useEffect(() => {
    if (paused || !inView || prefersReducedMotion()) return;
    const id = setInterval(() => {
      const next = (activeRef.current + 1) % N;
      activeRef.current = next;
      rotationDeg.current += STEP_DEG;
      rotateGear(rotationDeg.current);
      setActive(next);
    }, 3000);
    return () => clearInterval(id);
  }, [paused, inView]);

  // Cleanup on unmount
  useEffect(() => () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    stopGear.current?.();
  }, []);

  // Fade da solução sempre que o ativo muda
  useEffect(() => {
    fadeSolution();
  }, [active]);

  const scheduleResume = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setPaused(false);
      idleTimer.current = null;
    }, IDLE_RESUME_MS);
  };

  const handleSelect = (i: number) => {
    // Sempre 1 passo por clique (como no auto-cycle): a engrenagem tem 9
    // dentes idênticos e o passo é 40°, então um passo único é visualmente
    // indistinguível da contagem real — e o giro fica com velocidade
    // constante para qualquer bolinha.
    if (i !== activeRef.current) {
      activeRef.current = i;
      rotationDeg.current += STEP_DEG;
      rotateGear(rotationDeg.current);
    }
    setActive(i);
    setPaused(true);
    scheduleResume();
  };

  const handleActivity = () => {
    if (idleTimer.current) scheduleResume();
  };

  const sol = solutions[active];
  const SolIcon = sol.icon;

  const gearStyle: CSSProperties = {
    transformOrigin: "center",
    willChange: "transform",
  };

  return (
    <section
      ref={sectionRef}
      data-header-dark
      className="relative overflow-hidden"
      onMouseMove={handleActivity}
    >
      {/* Fundo: usa o #181616 + DarkAmbient do bloco dark (blurs que andam no
          scroll) — sem glow próprio para manter o mesmo tom das outras seções. */}

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-12 sm:px-6 lg:px-16 lg:pt-20">
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-5 text-center">
          <p className="font-heading text-[16px] font-medium uppercase leading-[1.1] text-primary-300">
            {content.eyebrow}
          </p>
          <h2 className="text-balance text-h2 text-neutral-100">
            <span className="lg:block font-normal">{content.titleRegular}</span>{" "}
            <span className="lg:block font-bold text-primary-500">
              {content.titleAccent}
            </span>
          </h2>
          <p className="max-w-[474px] text-body leading-6 text-neutral-300">
            {content.description}
          </p>
        </div>
      </div>

      {/* ── Engrenagem centralizada ────────────────────────────────────────── */}
      <div className="px-5 pb-12 pt-10 sm:px-6 lg:pb-24 lg:pt-14">
        {/* Mobile: pills com os 9 tipos de solução acima do círculo — todas
            visíveis, com quebra de linha */}
        <div className="mx-auto mb-8 flex max-w-[560px] flex-wrap justify-center gap-1.5 lg:hidden">
          {solutions.map((solution, i) => {
            const act = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(i)}
                aria-pressed={act}
                className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3 py-1.5 text-body font-medium transition-colors duration-300 ${
                  act
                    ? "border-primary-400 bg-white/10 text-white backdrop-blur-sm"
                    : "border-white/10 text-white/60"
                }`}
              >
                {solution.title}
              </button>
            );
          })}
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[560px]">

          {/* Anel segmentado do Figma — gira de ponto em ponto */}
          {/* Mobile (sem labels ao redor): engrenagem e anéis ganham escala
              extra; como tudo é percentual, segue cabendo em qualquer largura */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.12] lg:scale-100"
            style={{ width: `${(GEAR_D / VB) * 100}%` }}
          >
            <div ref={gearRef} style={gearStyle}>
              <Image src={gearRing} alt="" className="h-auto w-full" />
            </div>
          </div>

          {/* SVG: anéis sutis + bolinhas + títulos */}
          <svg
            viewBox={`0 0 ${VB} ${VB}`}
            className="relative h-auto w-full scale-[1.12] lg:scale-100"
            aria-hidden="true"
            style={{ overflow: "visible" }}
          >
            {/* Anéis mantidos como estão (independentes do tamanho da engrenagem) */}
            <circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke="white" strokeOpacity="0.10" strokeWidth="1" />
            <circle cx={CX} cy={CY} r={245} fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />

            {/* Bolinhas — laranja; a do ponto aceso em destaque (só desktop —
                no mobile a seleção é pelas pills acima do círculo) */}
            {solutions.map((_, i) => {
              const dot = dotPos(i);
              const act = i === active;
              return (
                <circle
                  key={i}
                  className={`hidden lg:block ${act ? "fill-primary-400" : ""}`}
                  cx={dot.x.toFixed(2)} cy={dot.y.toFixed(2)}
                  r={act ? 6.5 : 4.5}
                  fill="rgba(245,130,32,0.5)"
                  style={{
                    transition: "all 0.4s",
                    filter: act ? "drop-shadow(0 0 8px rgba(245,130,32,0.9))" : "none",
                  }}
                />
              );
            })}
          </svg>

          {/* Títulos nos pontos — texto branco; só o ativo em 100% e com pill */}
          {solutions.map((solution, i) => {
            const { x } = dotPos(i);
            const lbl = labelPos(i);
            const act = i === active;
            const tx = x > CX + 20 ? "0%" : x < CX - 20 ? "-100%" : "-50%";
            return (
              <button
                type="button"
                key={i}
                aria-hidden
                tabIndex={-1}
                onMouseEnter={() => handleSelect(i)}
                onClick={() => handleSelect(i)}
                style={{
                  left: `${(lbl.x / VB) * 100}%`,
                  top: `${(lbl.y / VB) * 100}%`,
                  transform: `translate(${tx}, -50%)`,
                }}
                className={`absolute hidden cursor-pointer whitespace-nowrap rounded-full border px-3 py-1.5 text-body transition-all duration-300 lg:block ${
                  act
                    ? "border-primary-400 bg-white/10 font-semibold text-white backdrop-blur-sm"
                    : "border-transparent font-medium text-white/60"
                }`}
              >
                {solution.title}
              </button>
            );
          })}

          {/* Centro da engrenagem — descrição + botão da solução ativa */}
          <div className="absolute left-1/2 top-1/2 flex w-[60%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 text-center">
            <div className="relative flex flex-col items-center">
              {/* Glow laranja atrás do ícone — fica fora do bloco que faz fade
                  e em camada própria, para não ser repintado a cada troca.
                  top-4 = centro do ícone (size-8). */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-4 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 opacity-30 blur-[32px] will-change-transform"
              />
              <div
                ref={solutionContentRef}
                className="relative flex flex-col items-center gap-3"
              >
                {/* Ícone da solução — laranja (mesma cor do label do botão) */}
                <SolIcon className="size-8 text-primary-300" aria-hidden />
                <p className="text-body leading-[1.5] text-neutral-300">
                  {sol.description}
                </p>
              </div>
            </div>
            {/* CTA da solução ativa — leva à página correspondente. O
                aria-label repete o título porque "Ver novas" sozinho não diz
                do que se trata fora do contexto visual do círculo. */}
            <IntentLink
              href={sol.href}
              aria-label={`${sol.cta} — ${sol.title}`}
              className="group/cta inline-flex items-center gap-2 rounded-full bg-primary-500/15 px-5 py-2.5 text-body font-semibold text-primary-300 transition-colors hover:bg-primary-500/25"
            >
              <span>{sol.cta}</span>
              <ArrowRight
                className="size-4 transition-transform group-hover/cta:translate-x-0.5"
                aria-hidden
              />
            </IntentLink>
          </div>

          {/* Áreas de clique transparentes sobre cada bolinha */}
          {solutions.map((solution, i) => {
            const { left, top } = dotPct(i);
            return (
              <button
                key={i}
                style={{ left: `${left}%`, top: `${top}%` }}
                className="absolute hidden -translate-x-1/2 -translate-y-1/2 size-9 cursor-pointer rounded-full lg:block"
                onMouseEnter={() => handleSelect(i)}
                onClick={() => handleSelect(i)}
                aria-label={solution.title}
                aria-pressed={active === i}
              />
            );
          })}
        </div>

        {/* Progress strip centralizado */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {solutions.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => handleSelect(i)}
              aria-label={solutions[i].title}
              aria-pressed={active === i}
              className={`h-[3px] rounded-full transition-[width,background-color] duration-300 ${
                i === active
                  ? "w-6 bg-primary-400"
                  : "w-[6px] bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
