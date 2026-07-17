"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { StateMap } from "./state-map";
import { STATE_MAPS } from "./state-maps";
import { STATE_UNITS, countStateUnits } from "./state-units";

// Seção "estrutura por estado" compartilhada (serviços e quem-somos): lista
// de estados em cards com acordeão à esquerda + mapa interativo do estado à
// direita (capital, unidades, arcos animados). Fundo dark — envolver num
// wrapper bg-[#181616] na página.
type StructureMapSectionProps = {
  /** Primeira linha do título (peso normal). */
  titleTop: string;
  /** Segunda linha do título (negrito). */
  titleBottom: string;
  /** Destaca a segunda linha do título em laranja (primary). */
  accentBottom?: boolean;
  description: string;
  /** Largura máx. da descrição (controla a quebra de linhas). Ex.: "540px". */
  descriptionWidth?: string;
};

export function StructureMapSection({
  titleTop,
  titleBottom,
  accentBottom = false,
  description,
  descriptionWidth = "760px",
}: StructureMapSectionProps) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const current = STATE_MAPS[active];

  // A animação do mapa (arcos + pontos) só começa quando a seção entra na
  // viewport; depois disso, cada clique num estado remonta o mapa (key) e
  // reanima a conexão capital → unidades.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section
      ref={sectionRef}
      data-header-dark
      className="flex flex-col gap-8 lg:gap-10"
    >
      {/* Linha do título — largura total, só o título e a descrição */}
      <div className="flex flex-col gap-4">
        <h2 className="text-h3 text-neutral-50">
          <span className="lg:block lg:whitespace-nowrap font-normal">
            {titleTop}
          </span>{" "}
          <span
            className={`lg:block lg:whitespace-nowrap font-bold ${
              accentBottom ? "text-primary-500" : ""
            }`}
          >
            {titleBottom}
          </span>
        </h2>
        <p
          className="text-balance text-body leading-[1.35] text-neutral-400"
          style={{ maxWidth: descriptionWidth }}
        >
          {description}
        </p>
      </div>

      {/* Linha cards + mapa — o mapa alinha com a região dos cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[440px_1fr] lg:items-stretch lg:gap-8">
        {/* Lista de estados — cards com stroke igual ao contorno do mapa.
            Ativo = nome do estado em laranja + acordeão com as unidades e a
            distância aproximada desde a capital (tudo em branco). */}
        <ul className="flex flex-col gap-4 lg:gap-3">
          {STATE_MAPS.map((s, i) => {
            const isActive = i === active;
            const units = countStateUnits(s.uf);
            const stateUnits = STATE_UNITS[s.uf];
            return (
              <li
                key={s.uf}
                className="rounded-xl border border-white/30 transition-colors duration-300"
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className="group flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left"
                >
                  <span
                    className={`font-heading text-xl font-semibold leading-tight transition-colors duration-300 ${
                      isActive
                        ? "text-primary-500"
                        : "text-neutral-50 group-hover:text-primary-500"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="shrink-0 text-base text-neutral-400">
                    {units} {units === 1 ? "unidade" : "unidades"}
                  </span>
                </button>

                {/* Acordeão — unidades do estado + distância desde a capital */}
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                    isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="flex flex-col gap-2.5 px-5 pb-5 pt-1">
                      {stateUnits.points.flatMap((p) =>
                        (p.notes ?? [undefined]).map((note) => (
                          <li
                            key={`${p.city}${note ?? ""}`}
                            className="flex items-baseline justify-between gap-4 text-base text-neutral-50"
                          >
                            <span>
                              {p.city}
                              {note && <span>, {note}</span>}
                            </span>
                            {p.time && (
                              <span className="shrink-0">
                                {p.time} {p.timeFrom ?? "da capital"}
                              </span>
                            )}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Mapa grande do estado selecionado — no mobile fica acima dos cards
            de estado (order-first). No mobile a altura segue a proporção real
            do viewBox (sem caixa fixa — estados "largos" como SC não deixam
            sobra vazia embaixo). No desktop o SVG fica absolute para a
            proporção não definir a altura da linha do grid (estados
            "quadrados" estourariam o viewport). */}
        <div className="relative order-first lg:order-none lg:min-h-[480px] lg:self-stretch">
          <StateMap
            key={current.uf}
            state={current}
            active={inView}
            className="h-auto w-full lg:absolute lg:inset-0 lg:h-full"
          />
        </div>
      </div>
    </Section>
  );
}
