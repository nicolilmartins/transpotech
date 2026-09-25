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
import type { SectionContent } from "@/sanity/content/fields";
import type { locacaoPage } from "@/sanity/content/pages/locacao";

// Ícone de cada item, na ordem dos itens editados no Studio.
const icons: LucideIcon[] = [Truck, Headset, BadgeCheck, Package, MapPin];

type StructureContent = SectionContent<typeof locacaoPage.sections.structure>;

export function StructureSection({ content }: { content: StructureContent }) {
  return (
    <Section
      data-header-dark
      className="flex flex-col items-center gap-12 lg:gap-16"
    >
      {/* Cabeçalho centralizado */}
      <div className="flex max-w-[560px] flex-col gap-4 text-center">
        <h2 className="text-h2 text-neutral-50">
          {/* Quebra fixa em todos os tamanhos: "Estrutura para atender" /
              "sua operação" (no mobile o fluxo natural deixava "operação"
              sozinha na terceira linha). */}
          <span className="font-normal">{content.titleRegular}</span>
          <br />
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          {content.description}
        </p>
      </div>

      {/* Imagem + lista de capacidades — imagem acompanha a altura dos tópicos */}
      <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16">
        <ParallaxFrame className="order-2 min-h-[260px] w-full self-stretch rounded-2xl lg:order-none lg:min-h-0 lg:w-1/2">
          <Image
            src={content.image}
            alt={content.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ParallaxFrame>

        <ul className="flex flex-1 flex-col">
          {content.items.map(({ label }, i) => {
            const Icon = icons[i];
            return (
              <li
                key={label}
                className="flex items-center gap-4 border-b border-white/10 py-4 first:pt-0"
              >
                <Icon aria-hidden className="size-5 shrink-0 text-primary-500" />
                <span className="text-body font-semibold leading-[1.35] text-neutral-100">
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
