import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import { LineBreaks } from "@/components/ui/line-breaks";
import type { SectionContent } from "@/sanity/content/fields";
import type { acessoriosPage } from "@/sanity/content/pages/acessorios";
import iconPessoa from "@/assets/images/stats/ct-icon-pessoa.webp";
import iconEmpilhadeira from "@/assets/images/stats/serv-icon-empilhadeira.webp";
import iconVelocimetro from "@/assets/images/stats/acess-icon-velocimetro.webp";
import iconAlerta from "@/assets/images/stats/acess-icon-alerta.webp";
import iconCamera from "@/assets/images/stats/acess-icon-camera.webp";
import iconPin from "@/assets/images/stats/card-pin.webp";

// Mesmo card dark de "Por que as empresas escolhem a TranspoTech" (Novas):
// ilustração 3D escura + máscara exata do Figma (plateau=false) + blend
// lighten. A geometria de cada arte é a já usada nas outras páginas.
type Art = {
  src: StaticImageData;
  width: number;
  height: number;
  maskX: number;
  maskY: number;
  flip: boolean;
  left: number;
  top: number;
};

const BIG = { width: 204.438, height: 153.328 };

// Artes exclusivas desta seção (velocímetro, alerta, câmera): mesmo
// enquadramento do escudo (objeto centralizado, ~30% da largura), sem flip.
const ADAS_ART = {
  width: 188.604,
  height: 141.453,
  maskX: 21.556,
  maskY: -2.145,
  left: -28,
  top: -10,
  flip: false,
};

// Arte de cada card, na ordem das funções da definição.
const arts: Art[] = [
  {
    src: iconPessoa,
    width: 176.409,
    height: 132.307,
    maskX: 13.446,
    maskY: -7.414,
    left: -24,
    top: -5,
    flip: false,
  },
  {
    src: iconEmpilhadeira,
    width: 194.667,
    height: 146,
    maskX: 22.575,
    maskY: 6,
    left: -33,
    top: -18,
    flip: false,
  },
  { ...ADAS_ART, src: iconVelocimetro },
  { ...ADAS_ART, src: iconAlerta },
  { ...ADAS_ART, src: iconCamera },
  { ...BIG, src: iconPin, maskX: 27.265, maskY: 7.819, left: -38, top: -20, flip: true },
];

type AdasContent = SectionContent<typeof acessoriosPage.sections.adas>;

export function AdasSection({ content }: { content: AdasContent }) {
  return (
    <Section data-header-dark className="flex flex-col gap-12 lg:gap-16">
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body font-semibold uppercase tracking-wide text-primary-400">
          {content.eyebrow}
        </p>
        <h2 className="text-h2 font-normal text-neutral-50">
          <LineBreaks text={content.title} brClassName="hidden lg:inline" />{" "}
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          <LineBreaks text={content.description} brClassName="hidden lg:inline" />
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.features.map((feature, i) => (
          <div
            key={feature.title}
            className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-[#222221] p-6 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.35)] lg:min-h-[299px]"
          >
            <CardImageIcon
              {...arts[i]}
              plateau={false}
              blendMode="lighten"
            />
            <div className="relative mt-[124px] lg:mt-[140px] flex flex-col gap-4">
              <h3 className="font-heading text-h6 font-semibold text-neutral-200">
                {feature.title}
              </h3>
              <p className="text-body leading-[1.35] text-neutral-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
