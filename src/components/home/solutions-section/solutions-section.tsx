"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
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
    title: "Empilhadeiras usadas",
    icon: CircleDollarSign,
    description:
      "Seminovos revisados, com garantia e o melhor custo-benefício para sua operação.",
    cta: "Ver usadas",
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
  // Rotação acumulada (graus): a engrenagem gira sempre para frente, um passo
  // por ponto, e a transição CSS faz o "gira → para" entre cada ponto.
  const [rotationDeg, setRotationDeg] = useState(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-cycle while not paused: avança um ponto e gira um passo.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % N);
      setRotationDeg((r) => r + STEP_DEG);
    }, 3000);
    return () => clearInterval(id);
  }, [paused]);

  // Cleanup on unmount
  useEffect(() => () => { if (idleTimer.current) clearTimeout(idleTimer.current); }, []);

  // (Re)arma a contagem de inatividade: após IDLE_RESUME_MS sem interação a
  // engrenagem volta a girar. Cada nova interação reinicia a contagem.
  const scheduleResume = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setPaused(false);
      idleTimer.current = null;
    }, IDLE_RESUME_MS);
  };

  // Interação com um ponto: gira para frente até ele, seleciona e para.
  const handleSelect = (i: number) => {
    setRotationDeg((r) => r + ((i - active + N) % N) * STEP_DEG);
    setActive(i);
    setPaused(true);
    scheduleResume();
  };

  // Mexer o mouse sobre a seção mantém a engrenagem parada (reinicia a contagem),
  // sem religá-la. Só rearma quando já existe uma pausa pendente.
  const handleActivity = () => {
    if (idleTimer.current) scheduleResume();
  };

  const sol = solutions[active];
  const SolIcon = sol.icon;

  // Rotação de ponto em ponto: a transição anima o giro até o ângulo do ponto
  // ativo e depois "para" até o próximo passo.
  const gearStyle: CSSProperties = {
    transformOrigin: "center",
    transform: `rotate(${rotationDeg}deg)`,
    transition: "transform 0.85s cubic-bezier(0.45, 0, 0.2, 1)",
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
      <div className="px-4 pt-12 sm:px-8 lg:px-16 lg:pt-20">
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-5 text-center">
          <p className="font-heading text-[16px] font-medium uppercase leading-[1.1] text-primary-300">
            solução 360°
          </p>
          <h2 className="text-balance text-h2 text-neutral-100">
            <span className="block font-normal">Soluções em</span>
            <span className="font-bold">movimentação de cargas</span>
          </h2>
          <p className="max-w-[474px] text-body leading-6 text-neutral-300">
            Escolha a necessidade mais próxima do seu momento e encontre a
            solução adequada com rapidez
          </p>
        </div>
      </div>

      {/* ── Engrenagem centralizada ────────────────────────────────────────── */}
      <div className="px-4 pb-16 pt-10 sm:px-8 lg:pb-24 lg:pt-14">
        <div className="relative mx-auto aspect-square w-full max-w-[560px]">

          {/* Anel segmentado do Figma — gira de ponto em ponto */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: `${(GEAR_D / VB) * 100}%` }}
          >
            <div style={gearStyle}>
              <Image src={gearRing} alt="" className="h-auto w-full" />
            </div>
          </div>

          {/* SVG: anéis sutis + bolinhas + títulos */}
          <svg
            viewBox={`0 0 ${VB} ${VB}`}
            className="relative h-auto w-full"
            aria-hidden="true"
            style={{ overflow: "visible" }}
          >
            {/* Anéis mantidos como estão (independentes do tamanho da engrenagem) */}
            <circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke="white" strokeOpacity="0.10" strokeWidth="1" />
            <circle cx={CX} cy={CY} r={245} fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />

            {/* Bolinhas — laranja; a do ponto aceso em destaque */}
            {solutions.map((_, i) => {
              const dot = dotPos(i);
              const act = i === active;
              return (
                <circle
                  key={i}
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
              <span
                key={i}
                aria-hidden
                style={{
                  left: `${(lbl.x / VB) * 100}%`,
                  top: `${(lbl.y / VB) * 100}%`,
                  transform: `translate(${tx}, -50%)`,
                }}
                className={`pointer-events-none absolute whitespace-nowrap rounded-full border px-3 py-1.5 text-[14px] transition-all duration-300 ${
                  act
                    ? "border-white/15 bg-white/10 font-semibold text-white backdrop-blur-sm"
                    : "border-transparent font-medium text-white/60"
                }`}
              >
                {solution.title}
              </span>
            );
          })}

          {/* Centro da engrenagem — descrição + botão da solução ativa */}
          <div className="absolute left-1/2 top-1/2 flex w-[60%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 text-center">
            <div
              key={active}
              className="flex flex-col items-center gap-3 animate-[fade-in-solution_0.35s_ease-out]"
            >
              {/* Ícone da solução — laranja (mesma cor do label do botão) */}
              <SolIcon className="size-8 text-primary-300" aria-hidden />
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
                className="absolute -translate-x-1/2 -translate-y-1/2 size-9 cursor-pointer rounded-full"
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
