import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
// PLACEHOLDER: trocar por foto de operação automatizada
import partnerImage from "@/assets/images/operacao-image.webp";

const highlights = [
  "Operações com mais de 1 milhão de pedidos/dia em uso pela base global Dematic",
  "Soluções implementadas em e-commerce, alimentos, farma e indústria",
  "Roadmap conjunto de tecnologia: AS/RS, AGV, software e robótica",
];

export function PartnershipSection() {
  return (
    <Section className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
      <div className="relative h-[280px] w-full overflow-hidden rounded-2xl bg-neutral-100 lg:h-[420px] lg:w-1/2">
        <Image
          src={partnerImage}
          alt="Operação intralogística automatizada TranspoTech + Dematic"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
            Parceria tecnológica
          </p>
          <h2 className="text-h3 font-normal text-neutral-800">
            TranspoTech + Dematic
          </h2>
          <p className="text-body leading-[1.35] text-neutral-600">
            A Dematic é referência mundial em automação intralogística, presente
            em mais de 35 países e parte do grupo KION. A TranspoTech leva essa
            tecnologia ao Brasil, somando engenharia local, equipe própria de
            implantação e cobertura nacional de pós-venda.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3">
              <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-500" />
              <span className="text-body leading-[1.35] text-neutral-700">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
