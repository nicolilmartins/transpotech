import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
// Mesmas imagens da seção "Frota, equipe e cobertura nacional" (home).
// PLACEHOLDER: ajustar o mapeamento imagem→estatística depois.
import card1 from "@/assets/images/stats/card1.png";
import card2 from "@/assets/images/stats/card2.png";
import illoMap from "@/assets/images/stats/map-illustration.webp";

type Stat = { value: string; label: string; image: StaticImageData };

const stats: Stat[] = [
  { value: "+800", label: "colaboradores", image: card1 },
  { value: "+360", label: "carros oficina", image: card2 },
  { value: "+3.700", label: "máquinas locadas", image: card1 },
  { value: "42.500", label: "metros quadrados de estrutura", image: illoMap },
];

export function StatsSection() {
  return (
    <Section className="flex flex-col gap-10 lg:gap-14">
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Estrutura
        </p>
        <h2 className="text-h3 text-neutral-800">
          <span className="font-normal">A estrutura que sustenta </span>
          <span className="font-bold text-primary-500">cada operação</span>
        </h2>
        <p className="text-body leading-[1.5] text-neutral-600">
          Equipe técnica especializada, estoque robusto, postos de atendimento
          regionais e transporte especializado para manter sua operação em
          movimento.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:flex">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="group relative flex min-h-[160px] flex-1 flex-col gap-1 overflow-hidden rounded-3xl bg-[#f9f9f9] p-4 lg:h-[172px] lg:p-5"
          >
            {/* Ilustração à direita — zoom no hover (desktop) */}
            <Image
              src={stat.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className={`pointer-events-none origin-right select-none object-contain object-right transition-transform duration-500 ease-out ${
                i === 3
                  ? "translate-x-[31%] scale-[1.4] lg:group-hover:scale-[1.47]"
                  : "scale-100 lg:group-hover:scale-105"
              }`}
            />

            {/* Glow laranja radial no rodapé — aparece no hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[165px] h-[66px] w-[162px] -translate-x-1/2 rounded-full bg-primary-500 opacity-0 blur-[77px] transition-opacity duration-300 group-hover:opacity-100"
            />

            <div className="relative flex flex-col gap-2">
              <span className="font-heading text-h2 font-bold leading-[1.3] text-primary-500">
                {stat.value}
              </span>
              <span className="text-body leading-[1.35] text-neutral-600">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
