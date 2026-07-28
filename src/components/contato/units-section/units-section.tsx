"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { units } from "@/data/units";

// Monta um card por unidade (Blumenau tem duas: Hub Técnico e Seminovas),
// na mesma ordem do rodapé. O link do mapa aponta para a busca real no Google
// Maps da unidade.
const cards = units.map((unit) => {
  const [city, uf] = unit.city.split(" - ").map((s) => s.trim());
  const title = unit.note ? `${city} · ${unit.note}` : city;
  // Consulta usada tanto no link quanto no mapa embutido: endereço + cidade/UF.
  const query = unit.address
    ? `${unit.address}, ${city} - ${uf}`
    : `TranspoTech ${unit.city}`;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
  // Mapa real embutido do Google Maps (sem necessidade de API key).
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&z=15&output=embed`;
  return {
    key: `${unit.city}-${unit.note ?? ""}`,
    title,
    uf,
    mapUrl,
    embedUrl,
    address: unit.address,
  };
});

export function UnitsSection() {
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
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-h3 text-neutral-800">
            <span className="font-normal">Encontre a unidade</span>{" "}
            <br className="hidden lg:inline" />
            <span className="font-bold text-primary-500">mais próxima</span>
          </h2>
          <p className="text-body leading-[1.35] text-neutral-600">
            A TranspoTech conta com unidades e estrutura regional
            <br className="hidden sm:block" /> para atender empresas em
            diferentes localidades.
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
            seção não cortar os cards; no desktop volta ao padding normal. */}
        <div
          ref={trackRef}
          className="-mx-5 flex w-[calc(100%+2.5rem)] snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 scroll-px-5 [scrollbar-width:none] sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 sm:scroll-px-6 lg:mx-0 lg:w-full lg:px-0 lg:scroll-px-0"
        >
          {cards.map((card) => (
          <article
            key={card.key}
            className="group flex w-[264px] shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-white p-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.10)]"
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
              <p className="text-body-sm leading-[1.35] text-neutral-600">
                {card.address ?? "Endereço completo disponível em breve."}
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
          Encontrar atendimento na minha região
        </Button>
      </div>
    </Section>
  );
}
