import Image from "next/image";
import {
  Truck,
  Headset,
  BadgeCheck,
  Package,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import operacao from "@/assets/images/operacao-image.webp";

type Capability = { label: string; Icon: LucideIcon };

const capabilities: Capability[] = [
  { label: "+360 carros oficina", Icon: Truck },
  { label: "Atendimento técnico especializado", Icon: Headset },
  { label: "Dealer Linde, Still e Baoli", Icon: BadgeCheck },
  { label: "Peças, pneus, baterias e serviços", Icon: Package },
  { label: "Estrutura regional para suporte", Icon: MapPin },
];

export function StructureSection() {
  return (
    <Section
      data-header-dark
      className="flex flex-col items-center gap-12 lg:gap-16"
    >
      {/* Cabeçalho centralizado */}
      <div className="flex max-w-[560px] flex-col gap-4 text-center">
        <h2 className="text-h2 text-neutral-50">
          <span className="font-normal">Estrutura para atender</span>
          <br />
          <span className="font-bold text-primary-500">sua operação</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          A TranspoTech reúne estrutura técnica, frota, peças, unidades e
          atendimento especializado para apoiar operações de movimentação de
          materiais.
        </p>
      </div>

      {/* Imagem + lista de capacidades — imagem acompanha a altura dos tópicos */}
      <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16">
        <ParallaxFrame className="order-2 min-h-[260px] w-full self-stretch rounded-2xl lg:order-none lg:min-h-0 lg:w-1/2">
          <Image
            src={operacao}
            alt="Empilhadeiras Linde, STILL e Baoli enfileiradas em pátio de operação"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ParallaxFrame>

        <ul className="flex flex-1 flex-col">
          {capabilities.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-4 border-b border-white/10 py-4 first:pt-0"
            >
              <item.Icon
                aria-hidden
                className="size-5 shrink-0 text-primary-500"
              />
              <span className="text-body font-semibold leading-[1.35] text-neutral-100">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
