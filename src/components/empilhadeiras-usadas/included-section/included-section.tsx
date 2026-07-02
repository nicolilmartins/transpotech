"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  ShieldCheck,
  FileCheck,
  Wrench,
  GraduationCap,
  Truck,
  type LucideIcon,
} from "lucide-react";

type Item = { title: string; description: string; Icon: LucideIcon };

const items: Item[] = [
  {
    title: "Garantia",
    description:
      "Cobertura de 6 a 12 meses conforme o equipamento, incluindo peças e mão de obra.",
    Icon: ShieldCheck,
  },
  {
    title: "Revisão técnica documentada",
    description:
      "Laudo TranspoTech e histórico de manutenção entregues junto ao equipamento.",
    Icon: FileCheck,
  },
  {
    title: "Suporte pós-venda",
    description:
      "Peças, manutenção preventiva e corretiva pela equipe técnica da TranspoTech.",
    Icon: Wrench,
  },
  {
    title: "Treinamento operacional",
    description:
      "Orientação básica de operação e segurança ao operador no recebimento.",
    Icon: GraduationCap,
  },
  {
    title: "Logística de entrega",
    description:
      "Transporte coordenado pela TranspoTech até a sua unidade, com hora marcada.",
    Icon: Truck,
  },
];

const N = items.length; // 5

// ─── Geometria (viewBox quadrado) — círculo um pouco menor que o da home ──────
const VB = 600;
const CX = VB / 2;
const CY = VB / 2;
const ORBIT_R = 240; // raio das bolinhas
const LABEL_R = 268; // âncora dos nomes (logo fora das bolinhas)

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

function dotPct(i: number) {
  const { x, y } = dotPos(i);
  return { left: (x / VB) * 100, top: (y / VB) * 100 };
}

// Tempo sem interação até o ciclo automático voltar.
const IDLE_RESUME_MS = 20_000;

export function IncludedSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fade do conteúdo central sempre que o ativo muda.
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power1.out" },
    );
  }, [active]);

  // Ciclo automático enquanto não pausado.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % N);
    }, 3000);
    return () => clearInterval(id);
  }, [paused]);

  // Cleanup do timer de idle.
  useEffect(
    () => () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    },
    [],
  );

  const scheduleResume = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setPaused(false);
      idleTimer.current = null;
    }, IDLE_RESUME_MS);
  };

  const handleSelect = (i: number) => {
    setActive(i);
    setPaused(true);
    scheduleResume();
  };

  const handleActivity = () => {
    if (idleTimer.current) scheduleResume();
  };

  const current = items[active];
  const CurrentIcon = current.Icon;

  return (
    <section
      data-header-dark
      className="relative overflow-hidden"
      onMouseMove={handleActivity}
    >
      {/* Header — centralizado, no estilo da Solução 360 */}
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-12 sm:px-6 lg:px-16 lg:pt-20 2xl:px-30">
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-5 text-center">
          <h2 className="text-h2 text-neutral-50">
            <span className="font-normal">O que está </span>
            <span className="font-bold text-primary-500">incluso na compra</span>
          </h2>
          <p className="max-w-[474px] text-body leading-6 text-neutral-300">
            Cada empilhadeira usada já vem com a estrutura da TranspoTech por
            trás — da garantia ao suporte pós-venda.
          </p>
        </div>
      </div>

      {/* Órbita centralizada — pontos ao redor, descrição no centro */}
      <div className="px-5 pb-16 pt-10 sm:px-6 lg:pb-24 lg:pt-14 2xl:px-30">
        <div className="relative mx-auto aspect-square w-full max-w-[410px]">
          {/* Anéis sutis + bolinhas */}
          <svg
            viewBox={`0 0 ${VB} ${VB}`}
            className="relative h-auto w-full"
            aria-hidden="true"
            style={{ overflow: "visible" }}
          >
            <circle
              cx={CX}
              cy={CY}
              r={ORBIT_R}
              fill="none"
              stroke="white"
              strokeOpacity="0.10"
              strokeWidth="1"
            />
            <circle
              cx={CX}
              cy={CY}
              r={ORBIT_R - 13}
              fill="none"
              stroke="white"
              strokeOpacity="0.05"
              strokeWidth="1"
            />

            {items.map((_, i) => {
              const dot = dotPos(i);
              const act = i === active;
              return (
                <circle
                  key={i}
                  cx={dot.x.toFixed(2)}
                  cy={dot.y.toFixed(2)}
                  r={act ? 6.5 : 4.5}
                  fill={act ? "#ff9448" : "rgba(245,130,32,0.5)"}
                  style={{
                    transition: "all 0.4s",
                    filter: act
                      ? "drop-shadow(0 0 8px rgba(245,130,32,0.9))"
                      : "none",
                  }}
                />
              );
            })}
          </svg>

          {/* Rótulos nos pontos — pill no ativo */}
          {items.map((item, i) => {
            const { x } = dotPos(i);
            const lbl = labelPos(i);
            const act = i === active;
            const tx = x > CX + 20 ? "0%" : x < CX - 20 ? "-100%" : "-50%";
            return (
              <button
                type="button"
                key={i}
                onMouseEnter={() => handleSelect(i)}
                onClick={() => handleSelect(i)}
                aria-pressed={act}
                style={{
                  left: `${(lbl.x / VB) * 100}%`,
                  top: `${(lbl.y / VB) * 100}%`,
                  transform: `translate(${tx}, -50%)`,
                }}
                className={`absolute cursor-pointer whitespace-nowrap rounded-full border px-3 py-1.5 text-[16px] transition-all duration-300 ${
                  act
                    ? "border-white/15 bg-white/10 font-semibold text-white backdrop-blur-sm"
                    : "border-transparent font-medium text-white/60"
                }`}
              >
                {item.title}
              </button>
            );
          })}

          {/* Centro — ícone + descrição da opção ativa (sem CTA) */}
          <div className="absolute left-1/2 top-1/2 flex w-[64%] max-w-[280px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center">
            <div
              ref={contentRef}
              key={active}
              className="flex flex-col items-center gap-3"
            >
              <CurrentIcon className="size-8 text-primary-300" aria-hidden />
              <p className="text-body leading-[1.5] text-neutral-300">
                {current.description}
              </p>
            </div>
          </div>

          {/* Áreas de clique sobre cada bolinha */}
          {items.map((item, i) => {
            const { left, top } = dotPct(i);
            return (
              <button
                key={i}
                style={{ left: `${left}%`, top: `${top}%` }}
                className="absolute size-9 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
                onMouseEnter={() => handleSelect(i)}
                onClick={() => handleSelect(i)}
                aria-label={item.title}
                aria-pressed={active === i}
              />
            );
          })}
        </div>

        {/* Progress strip centralizado */}
        <div className="mt-8 flex items-center justify-center gap-2" aria-hidden>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              aria-label={items[i].title}
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
