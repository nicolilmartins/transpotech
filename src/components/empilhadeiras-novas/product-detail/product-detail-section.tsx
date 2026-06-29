import { MapPin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb/breadcrumb";
import { ProductGallery } from "@/components/catalog/product-gallery/product-gallery";
import { ROUTES } from "@/lib/routes";
import { stateFromLocation } from "@/data/forklifts-novas";
import type { Forklift } from "@/types/forklift.types";

export function ProductDetailSection({ forklift }: { forklift: Forklift }) {
  const [firstWord, ...restWords] = forklift.name.split(" ");
  const galleryImages = [forklift.image];
  const specs = [
    { value: forklift.capacity, label: "Capacidade" },
    { value: forklift.energy, label: "Energia" },
    { value: forklift.availability, label: "Disponibilidade" },
  ];

  return (
    <Section className="!pt-6 !pb-6 flex flex-col gap-8 lg:gap-12">
      <Breadcrumb
        items={[
          { label: "Início", href: ROUTES.HOME },
          { label: "Produtos" },
          { label: "Empilhadeiras novas", href: ROUTES.EMPILHADEIRAS_NOVAS },
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

            {/* Especificações */}
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

            {/* Disponibilidade regional */}
            <div className="flex items-start gap-4 rounded-xl bg-neutral-50 p-4">
              <MapPin aria-hidden className="size-6 shrink-0 text-primary-500" />
              <div className="flex flex-col gap-2">
                <p className="text-body font-semibold leading-[1.35] text-neutral-700">
                  Disponibilidade regional
                </p>
                <p className="text-body leading-[1.35] text-neutral-600">
                  Equipamento disponível em {stateFromLocation(forklift.location)}{" "}
                  - confirme logística e prazo de entrega para outras cidades.
                </p>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              href={ROUTES.ORCAMENTO}
              className="justify-center"
            >
              Solicitar orçamento deste modelo
            </Button>
            <Button
              variant="gray"
              size="lg"
              href={ROUTES.ORCAMENTO}
              className="justify-center"
            >
              Falar com especialista
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
