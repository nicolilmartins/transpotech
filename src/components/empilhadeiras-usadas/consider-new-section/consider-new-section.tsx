import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import banner from "@/assets/images/RCE 20 + 16.webp";

const checklist = [
  "Garantia de fábrica",
  "Configuração sob medida",
  "Programas de financiamento e leasing",
];

export function ConsiderNewSection() {
  return (
    <Section
      data-header-dark
      className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16"
    >
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-h2 text-neutral-50">
            <span className="font-normal">Considere também </span>
            <span className="font-bold text-primary-500">empilhadeiras novas</span>
          </h2>
          <p className="max-w-[520px] text-body leading-[1.35] text-neutral-400">
            Equipamentos zero-hora com garantia de fábrica e configuração sob
            medida. Indicados para operações de longo prazo, multi-turno intenso
            ou programas de modernização da frota.
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          {checklist.map((label) => (
            <li key={label} className="flex items-center gap-3">
              <CircleCheck aria-hidden className="size-5 shrink-0 text-neutral-400" />
              <span className="text-body text-neutral-400">{label}</span>
            </li>
          ))}
        </ul>

        <Button
          variant="primary"
          size="lg"
          href={ROUTES.EMPILHADEIRAS_NOVAS}
          className="self-start"
        >
          Ver catálogo de novas
        </Button>
      </div>

      <div className="relative h-[260px] w-full overflow-hidden rounded-3xl border border-white/10 lg:h-[420px] lg:w-1/2">
        <Image
          src={banner}
          alt="Empilhadeira nova STILL RCE 20 + 16 em operação"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </Section>
  );
}
