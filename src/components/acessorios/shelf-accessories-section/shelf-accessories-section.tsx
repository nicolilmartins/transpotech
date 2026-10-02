import { Camera, Spotlight, ScanLine, MoveVertical, Flashlight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { IconCard, type IconCardProps } from "@/components/acessorios/icon-card/icon-card";

const CTA_HREF = "#solicitar-acessorios";

// Acessórios de pronta entrega citados pelo cliente. Descrições pendentes de
// revisão técnica do gerente de produto.
const accessories: IconCardProps[] = [
  {
    title: "Câmera de garfos",
    description:
      "Imagem dos garfos no display da cabine, para posicionar a carga com precisão em grandes alturas.",
    Icon: Camera,
    ctaLabel: "Solicitar cotação",
    ctaHref: CTA_HREF,
  },
  {
    title: "Blue Spot",
    description:
      "Projeção de luz azul no piso que sinaliza a aproximação da empilhadeira para os pedestres.",
    Icon: Spotlight,
    ctaLabel: "Solicitar cotação",
    ctaHref: CTA_HREF,
  },
  {
    title: "Red Zone",
    description:
      "Linhas de luz vermelha no piso que delimitam a área de risco ao redor da máquina.",
    Icon: ScanLine,
    ctaLabel: "Solicitar cotação",
    ctaHref: CTA_HREF,
  },
  {
    title: "Altímetro digital",
    description:
      "Indica a altura dos garfos nas empilhadeiras retráteis e agiliza o posicionamento em estruturas altas.",
    Icon: MoveVertical,
    ctaLabel: "Solicitar cotação",
    ctaHref: CTA_HREF,
  },
  {
    title: "Faróis de trabalho",
    description:
      "Kit de iluminação para operar com mais visibilidade em áreas com pouca luz.",
    Icon: Flashlight,
    ctaLabel: "Solicitar cotação",
    ctaHref: CTA_HREF,
  },
];

export function ShelfAccessoriesSection() {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-800">
          Acessórios para{" "}
          <br className="hidden lg:inline" />
          o dia a dia{" "}
          <span className="font-bold text-primary-500">da operação</span>
        </h2>
        {/* Quebra fixa no desktop antes de "a precisão e a segurança…". */}
        <p className="text-body leading-[1.35] text-neutral-600">
          Itens de pronta entrega que aumentam a visibilidade,{" "}
          <br className="hidden lg:inline" />
          a precisão e a segurança no uso das empilhadeiras.
        </p>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-4">
        {accessories.map((item) => (
          <IconCard key={item.title} {...item} />
        ))}
      </div>
    </Section>
  );
}
