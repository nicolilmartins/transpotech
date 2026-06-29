"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  BatteryCharging,
  TrendingDown,
  Leaf,
  TrendingUp,
  Clock,
  Zap,
  Maximize,
  Battery,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import illoForklift from "@/assets/images/stats/illustration-forklift.webp";
import illoCharge from "@/assets/images/stats/illustration-charge.webp";
import illoTool from "@/assets/images/stats/illustration-tool.webp";

// Conta o número principal preservando prefixo/sufixo ("+3700", "80%", "24/7").
const countValue = (value: string, progress: number) =>
  value.replace(/\d+/, (digits) =>
    String(Math.round(parseInt(digits, 10) * progress))
  );

type Stat = { value: string; label: string; image: StaticImageData };

const stats: Stat[] = [
  {
    value: "+3700",
    label: "Empilhadeiras trabalhando em frota",
    image: illoForklift,
  },
  { value: "80%", label: "Das empilhadeiras são elétricas.", image: illoCharge },
  {
    value: "24/7",
    label: "Atendimento com manutenção preventiva e corretiva",
    image: illoTool,
  },
];

type Benefit = { title: string; description: string; Icon: LucideIcon };

const retorno: Benefit[] = [
  {
    title: "Sem troca de bateria",
    description: "Menor custo operacional ao longo do tempo.",
    Icon: BatteryCharging,
  },
  {
    title: "Redução de até 30% no consumo",
    description: "Eficiência energética superior.",
    Icon: TrendingDown,
  },
  {
    title: "Sem emissão de gases nem ácidos",
    description: "Ambiente mais seguro e limpo.",
    Icon: Leaf,
  },
  {
    title: "Retorno do investimento mais rápido",
    description: "Comparado a tecnologias tradicionais.",
    Icon: TrendingUp,
  },
];

const eficiencia: Benefit[] = [
  {
    title: "Vida útil até 3x maior.",
    description: "Em relação a baterias chumbo-ácidas.",
    Icon: Clock,
  },
  {
    title: "Carregamento rápido",
    description: "Cargas de oportunidade entre operações.",
    Icon: Zap,
  },
  {
    title: "Não requer sala de baterias",
    description: "Menos área dedicada na operação.",
    Icon: Maximize,
  },
  {
    title: "Uma única bateria por equipamento",
    description: "Sem troca durante o turno.",
    Icon: Battery,
  },
];

function BenefitColumn({ title, items }: { title: string; items: Benefit[] }) {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-h6 font-semibold text-secondary-600">{title}</h4>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary-600/10 text-secondary-600">
              <item.Icon aria-hidden className="size-5" />
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-body font-semibold leading-[1.35] text-neutral-800">
                {item.title}
              </span>
              <span className="text-body-sm leading-[1.35] text-neutral-500">
                {item.description}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FleetTechSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    stats.forEach((s, i) => {
      const node = numberRefs.current[i];
      if (node) node.textContent = countValue(s.value, 0);
    });

    const counters = stats.map(() => ({ progress: 0 }));
    const tweens: gsap.core.Tween[] = [];

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: () => {
        stats.forEach((s, i) => {
          tweens.push(
            gsap.to(counters[i], {
              progress: 1,
              duration: 1.8,
              ease: "power3.out",
              onUpdate: () => {
                const node = numberRefs.current[i];
                if (node)
                  node.textContent = countValue(s.value, counters[i].progress);
              },
            })
          );
        });
      },
    });

    return () => {
      trigger.kill();
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <Section className="flex flex-col gap-10 lg:gap-12">
      {/* Cabeçalho */}
      <div className="flex w-full max-w-[560px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Frota e tecnologia
        </p>
        <h2 className="text-h2 font-normal text-neutral-800">
          Frota pronta para qualquer perfil de operação
        </h2>
      </div>

      {/* Cards de números + card "frota elétrica" — 16px de gap entre eles */}
      <div className="flex flex-col gap-4">
        {/* Estatísticas — mesmo card/hover da home; larguras adaptadas */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
        {stats.map((s, i) => {
          // Cards 1 e 2 (forklift e bateria) sangram mais para a direita,
          // ficando mais próximos da lateral. Card 3 mantém o deslocamento base.
          const shiftX =
            i < 2
              ? "translate-x-[14%] group-hover:translate-x-[14%]"
              : "translate-x-[7%] group-hover:translate-x-[7%]";
          return (
          <div
            key={s.value}
            className="group relative flex min-h-[160px] flex-col gap-1 overflow-hidden rounded-3xl bg-[#f9f9f9] p-5 lg:h-[172px]"
          >
            {/* Ilustração à direita: ampliada e deslocada para fora da borda
                direita (sangra/corta pelo overflow-hidden do card) — zoom no hover */}
            <Image
              src={s.image}
              alt=""
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className={`pointer-events-none origin-right scale-[1.6] select-none object-contain object-right transition-transform duration-500 ease-out group-hover:scale-[1.67] ${shiftX}`}
            />

            {/* Glow laranja radial no rodapé — visível apenas no hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[165px] h-[66px] w-[162px] -translate-x-1/2 rounded-full bg-primary-500 opacity-0 blur-[77px] transition-opacity duration-300 group-hover:opacity-100"
            />

            <div className="relative flex flex-col gap-1">
              <span
                ref={(node) => {
                  numberRefs.current[i] = node;
                }}
                className="font-heading text-h2 font-bold leading-[1.3] text-primary-500"
              >
                {s.value}
              </span>
              <span className="max-w-[170px] text-body leading-[1.35] text-neutral-600">
                {s.label}
              </span>
            </div>
          </div>
          );
        })}
      </div>

        {/* Por que a maior parte da frota é elétrica — card no tom dos números */}
        <div className="flex flex-col gap-10 rounded-3xl bg-[#f9f9f9] p-8 lg:flex-row lg:gap-16 lg:p-12">
          <h3 className="text-h4 text-neutral-800 lg:w-[340px] lg:shrink-0">
            <span className="font-normal">Por que a maior parte da </span>
            <span className="font-bold">nossa frota é elétrica</span>
          </h3>
          <div className="grid flex-1 grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            <BenefitColumn title="Retorno" items={retorno} />
            <BenefitColumn title="Eficiência" items={eficiencia} />
          </div>
        </div>
      </div>
    </Section>
  );
}
