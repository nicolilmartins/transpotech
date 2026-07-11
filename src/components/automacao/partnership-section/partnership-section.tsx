import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { AutomationDots } from "./automation-dots";
import illoAutomation from "@/assets/images/stats/illustration-automation.webp";

const highlights = [
  "Recebimento e armazenagem automatizados, com máximo uso do espaço",
  "Separação e expedição mais rápidas e com menos erros",
  "Engenharia local, implantação própria e pós-venda em cobertura nacional",
];

export function PartnershipSection() {
  return (
    <Section className="relative flex flex-col">
      <div className="relative flex flex-col gap-10 lg:min-h-[420px] lg:flex-row lg:items-start">
        {/* Ilustração — no desktop é absoluta e maior, sangrando pela direita e
            pelo topo (ultrapassa o padding da seção, conforme Figma 3508:4342). */}
        <div className="pointer-events-none relative order-last w-full select-none lg:absolute lg:left-[39%] lg:top-[-56px] lg:z-0 lg:order-none lg:w-[66%]">
          <Image
            src={illoAutomation}
            alt="Fluxo de automação intralogística de ponta a ponta, TranspoTech + Dematic"
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="h-auto w-full object-contain"
          />
          <AutomationDots />
        </div>

        {/* Texto */}
        <div className="relative z-10 flex max-w-[600px] flex-col items-start gap-8 lg:gap-14">
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
                Parceria tecnológica
              </p>
              <h2 className="text-h3 font-normal text-neutral-800">
                TranspoTech + Dematic
              </h2>
              <p className="text-body leading-[1.35] text-neutral-600">
                A TranspoTech leva ao Brasil a automação intralogística da
                Dematic, referência mundial e parte do grupo KION. Automatizamos
                a operação de ponta a ponta, do recebimento à expedição, com
                engenharia local e suporte próprio.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <CircleCheck aria-hidden className="size-5 shrink-0 text-primary-500" />
                  <span className="text-body leading-[1.35] text-neutral-600">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Button variant="primary" size="lg" href="#solucoes">
            Conheça as soluções
          </Button>
        </div>
      </div>
    </Section>
  );
}
