import { MapPin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Breadcrumb } from "@/components/ui/breadcrumb/breadcrumb";
import { ProductGallery } from "@/components/layout/product-gallery/product-gallery";
import { ProductQuoteButton } from "@/components/layout/product-quote-button/product-quote-button";
import { ROUTES } from "@/lib/routes";
import { stateFromLocation } from "@/data/forklifts-novas";
import type { Forklift } from "@/types/forklift.types";
import type { SectionContent } from "@/sanity/content/fields";
import type { seminovasPage } from "@/sanity/content/pages/seminovas";

// Detalhe enxuto do classificado: mesma composição da hero do detalhe de novas
// (galeria + informações), com as características de seminova e um único CTA
// de orçamento. Sem palco do modelo nem destaques — o classificado é sobre o
// equipamento em estoque, não sobre a linha do fabricante.
type SeminovaDetailSectionProps = {
  forklift: Forklift;
  /** Estoque completo, oferecido no modal de orçamento. */
  forklifts: Forklift[];
  /** Textos comuns a todas as páginas de equipamento. */
  content: SectionContent<typeof seminovasPage.sections.detail>;
};

export function SeminovaDetailSection({
  forklift,
  forklifts,
  content,
}: SeminovaDetailSectionProps) {
  const [firstWord, ...restWords] = forklift.name.split(" ");
  const galleryImages = forklift.gallery ?? [forklift.image];
  const specs = [
    { value: forklift.year ?? "—", label: "Ano" },
    { value: forklift.workedHours ?? "—", label: "Horas trabalhadas" },
    { value: forklift.capacity, label: "Capacidade" },
  ];

  return (
    <Section className="!pb-6 !pt-11 flex flex-col gap-3 lg:!pt-[60px]">
      <Breadcrumb
        items={[
          { label: "Início", href: ROUTES.HOME },
          { label: "Produtos" },
          {
            label: "Empilhadeiras seminovas",
            href: ROUTES.EMPILHADEIRAS_SEMINOVAS,
          },
          { label: forklift.name },
        ]}
      />

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        {/* Galeria */}
        <div className="lg:w-[56%]">
          <ProductGallery images={galleryImages} alt={forklift.name} />
        </div>

        {/* Informações */}
        <div className="flex flex-1 flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-h2 text-neutral-800">
                <span className="font-normal">{firstWord} </span>
                <span className="font-bold">{restWords.join(" ")}</span>
              </h1>
              <p className="text-body font-light text-neutral-600">
                {forklift.application}.
              </p>
            </div>

            {/* Características do equipamento */}
            <dl className="flex flex-wrap gap-x-16 gap-y-6">
              {specs.map((spec) => (
                <div key={spec.label} className="flex flex-col">
                  <dt className="order-2 text-body text-neutral-600">
                    {spec.label}
                  </dt>
                  <dd className="order-1 text-[1.5rem] font-semibold leading-[1.35] text-neutral-900">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Onde o equipamento está */}
            <div className="flex items-start gap-4 rounded-xl bg-neutral-50 p-4">
              <MapPin aria-hidden className="size-6 shrink-0 text-primary-500" />
              <div className="flex flex-col gap-2">
                <p className="text-body font-semibold leading-[1.35] text-neutral-700">
                  {content.locationTitle}
                </p>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {content.locationPrefix} {stateFromLocation(forklift.location)}{" "}
                  {content.locationSuffix}
                </p>
              </div>
            </div>
          </div>

          {/* Ação — orçamento deste equipamento */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <ProductQuoteButton
              forklift={forklift}
              forklifts={forklifts}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
