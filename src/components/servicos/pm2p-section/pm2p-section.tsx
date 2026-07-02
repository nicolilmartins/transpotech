import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
// PLACEHOLDER: trocar por imagem de checklist técnico / técnico em atendimento
import pm2pImage from "@/assets/images/operacao-image.webp";

const benefits = [
  "Mais previsibilidade na manutenção",
  "Mais segurança para operadores",
  "Identificação antecipada de falhas",
  "Redução de custos corretivos",
];

export function Pm2pSection() {
  return (
    <Section data-header-dark className="flex flex-col items-start">
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        {/* Coluna de texto */}
        <div className="flex flex-1 flex-col gap-14">
          <div className="flex flex-col gap-10">
            <div className="flex max-w-[560px] flex-col gap-4">
              <p className="text-body-sm font-semibold uppercase tracking-wide text-primary-500">
                Programa
              </p>
              <h2 className="text-h2 text-neutral-50">
                <span className="font-normal">
                  PM2P: manutenção programada
                </span>
                <br />
                <span className="font-bold text-primary-500">
                  para reduzir paradas
                </span>
              </h2>
              <p className="text-body leading-[1.35] text-neutral-400">
                O Programa de Manutenção Produtiva Programada ajuda sua empresa a
                manter a frota acompanhada de forma recorrente, com revisões
                preventivas e correções identificadas durante o atendimento.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <CircleCheck
                    className="size-5 shrink-0 text-primary-500"
                    aria-hidden
                  />
                  <span className="text-body leading-[1.35] text-neutral-200">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="primary"
            size="lg"
            href={ROUTES.ORCAMENTO}
            className="self-start"
          >
            Conhecer PM2P
          </Button>
        </div>

        {/* Imagem — coluna direita */}
        <div className="relative order-2 min-h-[280px] min-w-0 flex-1 self-stretch overflow-hidden rounded-xl border border-white/10 bg-white/5 lg:order-none lg:min-h-0">
          <Image
            src={pm2pImage}
            alt="Técnico da TranspoTech em atendimento programado"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
