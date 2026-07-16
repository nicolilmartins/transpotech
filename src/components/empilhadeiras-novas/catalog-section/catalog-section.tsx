import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Catalog } from "@/components/catalog/catalog";
import { forkliftsNovas } from "@/data/forklifts-novas";
import still from "@/assets/Logos/Logo still.svg";
import linde from "@/assets/Logos/Logo Linde.svg";
import baoli from "@/assets/Logos/Logo Baoli.svg";

const brandLogos = [
  { src: still, alt: "STILL" },
  { src: linde, alt: "Linde" },
  { src: baoli, alt: "Baoli" },
];

export function CatalogSection() {
  return (
    <Section className="flex flex-col gap-10 lg:gap-12">
      {/* Cabeçalho da página */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-h2 text-neutral-800">
            <span className="font-normal">Empilhadeiras </span>
            <span className="font-bold text-primary-500">novas</span>
          </h1>
          <p className="max-w-[384px] text-body leading-[1.35] text-neutral-600">
            Equipamentos zero-hora com garantia de fábrica e configuração sob
            medida.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:gap-x-12 lg:gap-16">
          {brandLogos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-10 w-auto [filter:brightness(0)_invert(0.35)] sm:h-12"
            />
          ))}
        </div>
      </div>

      <Catalog forklifts={forkliftsNovas} />
    </Section>
  );
}
