"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { getUnitMapsUrl, getUnitTitle, type Unit } from "@/data/units";
import type { SectionContent } from "@/sanity/content/fields";
import type { quemSomosPage } from "@/sanity/content/pages/quem-somos";

// A galeria segue `galleryOrder`, independente da ordem por estado usada no
// rodapé e na Contato; unidade sem posição vai para o fim (sort estável).
const byGalleryOrder = (a: Unit, b: Unit) =>
  (a.galleryOrder ?? Number.MAX_SAFE_INTEGER) -
  (b.galleryOrder ?? Number.MAX_SAFE_INTEGER);

type UnitsGallerySectionProps = {
  units: Unit[];
  content: SectionContent<typeof quemSomosPage.sections.units>;
};

export function UnitsGallerySection({ units, content }: UnitsGallerySectionProps) {
  const galleryUnits = useMemo(() => [...units].sort(byGalleryOrder), [units]);
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
      id="nossas-unidades"
      className="flex flex-col items-start gap-10 lg:gap-14"
    >
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="flex max-w-[720px] flex-col gap-4">
          <p className="text-body font-semibold uppercase tracking-wide text-secondary-600">
            {content.eyebrow}
          </p>
          <h2 className="text-h2 text-neutral-800">
            <span className="font-normal lg:block">{content.titleTop}</span>{" "}
            <span className="font-bold text-primary-500 lg:block">
              {content.titleAccent}
            </span>
          </h2>
          <p className="text-body leading-[1.5] text-neutral-600">
            {content.description}
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

      {/* Carrossel horizontal — mesmo trilho da seção de unidades da Contato:
          no mobile sangra até a borda da tela; padding vertical e laterais
          (compensados por margem negativa) reservam a sombra do hover, que o
          `overflow-x-auto` recortaria. */}
      <div
        ref={trackRef}
        className="-mx-5 -mb-10 -mt-3 flex w-[calc(100%+2.5rem)] items-start snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-12 pt-3 scroll-px-5 [scrollbar-width:none] sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 sm:scroll-px-6 lg:-mx-8 lg:w-[calc(100%+4rem)] lg:px-8 lg:scroll-px-8"
      >
        {galleryUnits.map((unit) => {
          const title = getUnitTitle(unit);
          return (
            <article
              key={`${unit.city}-${unit.note ?? ""}`}
              className="group relative flex w-[288px] shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-white p-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.10)] lg:w-[320px]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-100">
                {unit.image ? (
                  <Image
                    src={unit.image}
                    alt={
                      unit.image.alt ||
                      `Fachada da unidade TranspoTech em ${title}`
                    }
                    fill
                    sizes="(min-width: 1024px) 320px, 288px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  // PENDÊNCIA: foto da unidade.
                  <div className="flex h-full w-full items-center justify-center text-neutral-400">
                    <Building2 className="size-10" aria-hidden />
                  </div>
                )}
              </div>

              {/* Mesma anatomia dos cards do Portal de Conteúdo: título, linha
                  fina e link empilhados com gap fixo, sem empurrar a linha para
                  a base — então não sobra vão entre o texto e a divisória. */}
              <div className="flex flex-col gap-3 px-4 pb-1 pt-4">
                <h3 className="font-heading text-h6 font-semibold leading-[1.3] text-neutral-800">
                  {title}
                </h3>
                <div className="border-t border-neutral-200" />
                <a
                  href={unit.googleProfileUrl ?? getUnitMapsUrl(unit)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Conhecer a unidade ${title} no Google (abre em nova aba)`}
                  className="group/link inline-flex w-fit items-center gap-1.5 rounded-sm text-body font-semibold text-primary-500 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  <span className="underline-offset-4 group-hover/link:underline">
                    {content.linkLabel}
                  </span>
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
