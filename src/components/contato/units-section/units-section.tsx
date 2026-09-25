"use client";

import { useMemo, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  getUnitMapsQuery,
  getUnitMapsUrl,
  getUnitTitle,
  type Unit,
} from "@/data/units";
import { LineBreaks } from "@/components/ui/line-breaks";
import type { SectionContent } from "@/sanity/content/fields";
import type { contatoPage } from "@/sanity/content/pages/contato";

type UnitsContent = SectionContent<typeof contatoPage.sections.units>;

// Monta um card por unidade (Blumenau tem duas: Hub Técnico e Seminovas),
// na mesma ordem do rodapé. O link do mapa aponta para a busca real no Google
// Maps da unidade.
const toCards = (units: Unit[]) =>
  units.map((unit) => ({
    key: `${unit.city}-${unit.note ?? ""}`,
    title: getUnitTitle(unit),
    mapUrl: getUnitMapsUrl(unit),
    // Mapa real embutido do Google Maps (sem necessidade de API key).
    embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(
      getUnitMapsQuery(unit)
    )}&z=15&output=embed`,
    address: unit.address,
  }));

type UnitsSectionProps = { units: Unit[]; content: UnitsContent };

export function UnitsSection({ units, content }: UnitsSectionProps) {
  const cards = useMemo(() => toCards(units), [units]);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Desloca ~1 card (largura do primeiro filho + gap).
    const first = track.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Section
      id="unidades"
      className="flex flex-col items-start gap-10 lg:gap-14"
    >
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-h3 text-neutral-800">
            <span className="font-normal">{content.titleRegular}</span>{" "}
            <br className="hidden lg:inline" />
            <span className="font-bold text-primary-500">{content.titleAccent}</span>
          </h2>
          <p className="text-body leading-[1.35] text-neutral-600">
            <LineBreaks text={content.description} brClassName="hidden sm:block" />
          </p>
        </div>

        {/* Setas — na linha do texto, alinhadas à direita (ocultas no mobile) */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <button
            type="button"
            aria-label="Ver unidades anteriores"
            onClick={() => scrollByCard(-1)}
            className="flex size-12 items-center justify-center rounded-full border border-neutral-300 text-primary-500 transition-colors hover:bg-neutral-100"
          >
            <ArrowLeft className="size-6" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Ver próximas unidades"
            onClick={() => scrollByCard(1)}
            className="flex size-12 items-center justify-center rounded-full border border-neutral-300 text-primary-500 transition-colors hover:bg-neutral-100"
          >
            <ArrowRight className="size-6" aria-hidden />
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-6">
        {/* Carrossel horizontal — no mobile sangra até a borda da tela
            (margem negativa + padding interno + scroll-px), para o padding da
            seção não cortar os cards. O padding vertical e as laterais do
            desktop (também compensados por margem negativa) reservam o espaço
            da sombra do hover, que o `overflow-x-auto` recortaria. */}
        <div
          ref={trackRef}
          className="-mx-5 -mb-10 -mt-3 flex w-[calc(100%+2.5rem)] snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-12 pt-3 scroll-px-5 [scrollbar-width:none] sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 sm:scroll-px-6 lg:-mx-8 lg:w-[calc(100%+4rem)] lg:px-8 lg:scroll-px-8"
        >
          {cards.map((card) => (
          <article
            key={card.key}
            className="group relative flex w-[264px] shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-white p-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.10)]"
          >
            {/* Mapa real do Google Maps (embutido, sem API key). O iframe fica
                sem interação e um link por cima abre o endereço real no Maps. */}
            <a
              href={card.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver ${card.title} no Google Maps`}
              className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-100"
            >
              <iframe
                src={card.embedUrl}
                title={`Mapa: ${card.title}`}
                aria-hidden
                tabIndex={-1}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="pointer-events-none absolute inset-0 h-full w-full border-0"
              />
            </a>

            <div className="flex flex-col gap-1.5 p-4">
              <h3 className="font-heading text-h6 font-semibold leading-[1.3] text-neutral-800">
                {card.title}
              </h3>
              <p className="text-body leading-[1.35] text-neutral-600">
                {card.address ?? content.addressFallback}
              </p>
            </div>
          </article>
          ))}
        </div>

        {/* Botão — abaixo dos cards */}
        <Button
          variant="primary"
          size="lg"
          href="#solicitacao"
          className="self-start"
        >
          {content.buttonLabel}
        </Button>
      </div>
    </Section>
  );
}
