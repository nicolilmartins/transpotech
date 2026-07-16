import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import iconBussola from "@/assets/images/stats/novas-icon-bussola.webp";
import iconSelo from "@/assets/images/stats/novas-icon-selo.webp";
import iconLoja from "@/assets/images/stats/novas-icon-loja.webp";
import iconChave from "@/assets/images/stats/novas-icon-chave.webp";
import iconPin from "@/assets/images/stats/novas-icon-pin.webp";
import iconEngrenagem from "@/assets/images/stats/novas-icon-engrenagem.webp";

// Geometria por card conforme o Figma (node 3603:3397). Tons iguais à why-us
// da home: cores originais + máscara exata do Figma (plateau=false) + blend
// lighten. left/top alinham o objeto verticalmente ao texto.
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

type Reason = { title: string; description: string; art: Art };

// Caixa padrão desta seção (204.438×153.328).
const BIG = { width: 204.438, height: 153.328 };

const reasons: Reason[] = [
  {
    title: "Orientação técnica na escolha",
    description:
      "Apoio para escolher o equipamento conforme carga, altura, ambiente, piso, turno e intensidade de uso.",
    art: {
      src: iconBussola,
      width: 188.871,
      height: 141.654,
      maskX: 18.997,
      maskY: 4.145,
      left: -29,
      top: -16,
      flip: false,
    },
  },
  {
    title: "Distribuidor autorizado",
    description:
      "Venda de equipamentos Linde, STILL e Baoli com suporte de quem conhece a operação.",
    art: { ...BIG, src: iconSelo, maskX: 26.78, maskY: 10.819, left: -37, top: -23, flip: false },
  },
  {
    title: "Novas e seminovas no mesmo lugar",
    description:
      "Compare alternativas para compra planejada, renovação de frota ou necessidade imediata.",
    art: { ...BIG, src: iconLoja, maskX: 26.78, maskY: 12.819, left: -37, top: -25, flip: false },
  },
  {
    title: "Pós-venda especializado",
    description:
      "A TranspoTech também oferece serviços, peças, pneus, baterias e carregadores para manter a frota em operação.",
    art: {
      src: iconChave,
      width: 175.718,
      height: 131.789,
      maskX: 13.101,
      maskY: -1.04,
      left: -23,
      top: -11,
      flip: false,
    },
  },
  {
    title: "Estrutura regional",
    description:
      "Atendimento por unidades e equipe técnica para apoiar empresas em diferentes regiões.",
    art: { ...BIG, src: iconPin, maskX: 27.265, maskY: 7.819, left: -38, top: -20, flip: true },
  },
  {
    title: "Soluções além da venda",
    description:
      "Além da compra, a TranspoTech pode apoiar com locação, manutenção e soluções intralogísticas.",
    art: { ...BIG, src: iconEngrenagem, maskX: 22.141, maskY: 9.819, left: -43, top: -22, flip: true },
  },
];

export function WhyChooseSection() {
  return (
    <Section className="flex flex-col items-center gap-10 lg:gap-16">
      <h2 className="max-w-[560px] text-center text-h2 text-neutral-50">
        <span className="lg:block font-normal">Por que as empresas</span>{" "}
        <span className="lg:block font-bold text-primary-500">
          escolhem a TranspoTech
        </span>
      </h2>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-[#222221] p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.35)] lg:h-[299px]"
          >
            <CardImageIcon
              src={reason.art.src}
              width={reason.art.width}
              height={reason.art.height}
              left={reason.art.left}
              top={reason.art.top}
              maskX={reason.art.maskX}
              maskY={reason.art.maskY}
              flip={reason.art.flip}
              plateau={false}
              blendMode="lighten"
            />
            <div className="relative flex flex-col gap-4">
              <h3 className="font-heading text-h6 font-semibold text-neutral-200">
                {reason.title}
              </h3>
              <p className="text-body leading-[1.35] text-neutral-400">
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
