import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import banner from "@/assets/images/operacao-image.webp";

const badges = [
  "Inspeção técnica",
  "Pronta entrega",
  "Garantia de até 12 meses",
];

export function ConsiderUsedSection() {
  return (
    <Section
      data-header-dark
      className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16"
    >
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-h2 text-neutral-50">
            <span className="font-normal">Considere também</span>
            <br />
            <span className="font-bold text-primary-500">
              usadas e seminovas
            </span>
          </h2>
          <p className="max-w-[520px] text-body leading-[1.35] text-neutral-300">
            Equipamentos com revisão técnica TranspoTech, garantia e pronta
            entrega. Indicados para ramp-up rápido, projetos temporários ou
            expansão controlada de frota.
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          {badges.map((label) => (
            <li key={label} className="flex items-center gap-3">
              <CircleCheck
                aria-hidden
                className="size-5 shrink-0 text-neutral-400"
              />
              <span className="text-body text-neutral-100">{label}</span>
            </li>
          ))}
        </ul>

        <Button
          variant="primary"
          size="lg"
          href={ROUTES.EMPILHADEIRAS_USADAS}
          className="self-start"
        >
          Ver catálogo de usadas e seminovas
        </Button>
      </div>

      <ParallaxFrame className="h-[260px] w-full rounded-3xl lg:h-[500px] lg:w-1/2">
        <Image
          src={banner}
          alt="Empilhadeira seminova revisada pela TranspoTech em operação"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </ParallaxFrame>
    </Section>
  );
}
