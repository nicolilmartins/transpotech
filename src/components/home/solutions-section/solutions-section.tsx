"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
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

type Solution = {
  title: string;
  icon: LucideIcon;
  description: string;
  cta: string;
};

const solutions: Solution[] = [
  {
    title: "Locação de empilhadeiras",
    icon: Forklift,
    description:
      "STILL, Linde e Baoli com frota pronta para operação imediata e custo previsível.",
    cta: "Ver locação",
  },
  {
    title: "Venda de empilhadeiras novas",
    icon: Sparkles,
    description:
      "Linde, Still e Baoli zero-km com orientação técnica para a escolha certa.",
    cta: "Ver novas",
  },
  {
    title: "Empilhadeiras seminovas",
    icon: CircleDollarSign,
    description:
      "Seminovas revisadas, com garantia e o melhor custo-benefício para sua operação.",
    cta: "Ver seminovas",
  },
  {
    title: "Assistência multimarcas",
    icon: Wrench,
    description:
      "Manutenção preventiva, corretiva e multimarcas com 380+ técnicos especializados e peças em estoque.",
    cta: "Ver serviços",
  },
  {
    title: "Automação intralogística",
    icon: Network,
    description:
      "Menos gargalos, mais produtividade. Automação por etapas adaptada à maturidade da operação.",
    cta: "Conhecer automação",
  },
  {
    title: "Transporte",
    icon: Truck,
    description:
      "Movimentação e logística de cargas com equipe especializada e cobertura nacional.",
    cta: "Falar sobre transporte",
  },
  {
    title: "Baterias e carregadores",
    icon: BatteryCharging,
    description:
      "Baterias, carregadores e infraestrutura de energia para operações elétricas eficientes.",
    cta: "Ver baterias",
  },
  {
    title: "Peças e componentes",
    icon: Settings2,
    description:
      "Peças originais e compatíveis com estoque amplo para reduzir tempo de parada.",
    cta: "Ver peças",
  },
  {
    title: "Pneus",
    icon: Disc3,
    description:
      "Pneus para empilhadeiras de todos os portes e aplicações, com troca no local.",
    cta: "Ver pneus",
  },
];

const N = solutions.length; // 9

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

export function SolutionsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const rotationDeg = useRef(0);
  // Espelho do ativo para o guard de rotação: mouseenter + click disparam
  // handleSelect em sequência antes do re-render, e o state ainda antigo
  // deixaria o giro somar dois passos.
  const activeRef = useRef(0);
  const gearRef = useRef<HTMLDivElement>(null);
  const solutionContentRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Anima a engrenagem para o ângulo acumulado usando GSAP + CustomEase
  const rotateGear = (targetDeg: number) => {
    gsap.to(gearRef.current, {
      rotation: targetDeg,
      duration: 0.85,
      ease: "gearEase",
      overwrite: "auto",
    });
  };

  // Fade da solução ativa — substitui @keyframes fade-in-solution
  const fadeSolution = () => {
    if (!solutionContentRef.current) return;
    gsap.fromTo(
      solutionContentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power1.out" }
    );
  };

  // Auto-cycle while not paused
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % N;
        activeRef.current = next;
        rotationDeg.current += STEP_DEG;
        rotateGear(rotationDeg.current);
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  // Cleanup on unmount
  useEffect(() => () => { if (idleTimer.current) clearTimeout(idleTimer.current); }, []);

  // Fade da solução sempre que o ativo muda
  useEffect(() => {
    fadeSolution();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  };

  return (
    <section
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
            solução 360°
          </p>
          <h2 className="text-balance text-h2 text-neutral-100">
            <span className="lg:block font-normal">Soluções em</span>{" "}
            <span className="font-bold">movimentação de cargas</span>
          </h2>
          <p className="max-w-[474px] text-body leading-6 text-neutral-300">
            Escolha a necessidade mais próxima do seu momento e encontre a
            solução adequada com rapidez
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
                className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3 py-1.5 text-[12px] transition-all duration-300 ${
                  act
                    ? "border-white/15 bg-white/10 font-semibold text-white backdrop-blur-sm"
                    : "border-white/10 font-medium text-white/60"
                }`}
              >
                {solution.title}
              </button>
            );
          })}
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[560px]">

          {/* Anel segmentado do Figma — gira de ponto em ponto via GSAP */}
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
                  className="hidden lg:block"
                  cx={dot.x.toFixed(2)} cy={dot.y.toFixed(2)}
                  r={act ? 6.5 : 4.5}
                  fill={act ? "#ff9448" : "rgba(245,130,32,0.5)"}
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
                className={`absolute hidden cursor-pointer whitespace-nowrap rounded-full border px-3 py-1.5 text-[14px] transition-all duration-300 lg:block ${
                  act
                    ? "border-white/15 bg-white/10 font-semibold text-white backdrop-blur-sm"
                    : "border-transparent font-medium text-white/60"
                }`}
              >
                {solution.title}
              </button>
            );
          })}

          {/* Centro da engrenagem — descrição + botão da solução ativa */}
          <div className="absolute left-1/2 top-1/2 flex w-[60%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 text-center">
            <div
              ref={solutionContentRef}
              key={active}
              className="flex flex-col items-center gap-3"
            >
              {/* Ícone da solução — laranja (mesma cor do label do botão),
                  com leve glow laranja atrás sem comprometer a leitura */}
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 opacity-30 blur-[32px]"
                />
                <SolIcon className="relative size-8 text-primary-300" aria-hidden />
              </div>
              <p className="text-body leading-[1.5] text-neutral-300">
                {sol.description}
              </p>
            </div>
            <button className="group/cta inline-flex items-center gap-2 rounded-full bg-primary-500/15 px-5 py-2.5 text-sm font-semibold text-primary-300 transition-colors hover:bg-primary-500/25">
              <span>{sol.cta}</span>
              <ArrowRight
                className="size-4 transition-transform group-hover/cta:translate-x-0.5"
                aria-hidden
              />
            </button>
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
        <div className="mt-8 flex items-center justify-center gap-2" aria-hidden>
          {solutions.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              aria-label={solutions[i].title}
              className={`h-[3px] rounded-full transition-all duration-300 ${
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
