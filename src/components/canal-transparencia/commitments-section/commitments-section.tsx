import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { CardImageIcon } from "@/components/ui/card-image-icon";
import iconSelo from "@/assets/images/stats/ct-icon-selo.webp";
import iconEscudo from "@/assets/images/stats/ct-icon-escudo.webp";
import iconPessoa from "@/assets/images/stats/ct-icon-pessoa.webp";
import iconCadeado from "@/assets/images/stats/ct-icon-cadeado.webp";

// Geometria por card conforme o Figma (node 3616:3178). Tons iguais à why-us
// da home: cores originais + máscara exata do Figma (plateau=false) + blend
// lighten. left/top alinham o objeto verticalmente ao texto.
type Art = {
  src: StaticImageData;
  width: number;
  height: number;
  maskX: number;
  maskY: number;
  left: number;
  top: number;
  flip: boolean;
};

type Commitment = { title: string; description: string; art: Art };

const commitments: Commitment[] = [
  {
    title: "Tratamento responsável",
    description:
      "Os relatos são avaliados com seriedade e encaminhados conforme sua natureza.",
    art: {
      src: iconSelo,
      width: 204.438,
      height: 153.328,
      maskX: 26.78,
      maskY: 10.819,
      left: -37,
      top: -23,
      flip: false,
    },
  },
  {
    title: "Confidencialidade",
    description:
      "As informações são tratadas com confidencialidade conforme políticas internas e requisitos aplicáveis.",
    art: {
      src: iconEscudo,
      width: 188.604,
      height: 141.453,
      maskX: 21.556,
      maskY: -2.145,
      left: -28,
      top: -10,
      flip: true,
    },
  },
  {
    title: "Possibilidade de anonimato",
    description:
      "O usuário pode optar por não se identificar, quando essa opção estiver disponível no formulário.",
    art: {
      src: iconPessoa,
      width: 176.409,
      height: 132.307,
      maskX: 13.446,
      maskY: -7.414,
      left: -24,
      top: -5,
      flip: false,
    },
  },
  {
    title: "Não retaliação",
    description:
      "A empresa deve tratar relatos de boa-fé com responsabilidade e sem tolerância a retaliações.",
    art: {
      src: iconCadeado,
      width: 176.465,
      height: 132.349,
      maskX: 16.244,
      maskY: -0.519,
      left: -27,
      top: -12,
      flip: false,
    },
  },
];

export function CommitmentsSection() {
  return (
    <Section
      data-header-dark
      className="flex flex-col items-start gap-10 lg:gap-14"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-h3 font-normal text-neutral-50">
          Nossos compromissos
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {commitments.map((item) => (
          <div
            key={item.title}
            className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-[#222221] p-6 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.35)] lg:h-[299px]"
          >
            <CardImageIcon
              src={item.art.src}
              width={item.art.width}
              height={item.art.height}
              left={item.art.left}
              top={item.art.top}
              maskX={item.art.maskX}
              maskY={item.art.maskY}
              flip={item.art.flip}
              plateau={false}
              blendMode="lighten"
            />
            <div className="relative flex flex-col gap-4">
              <h3 className="font-heading text-h6 font-semibold text-neutral-200">
                {item.title}
              </h3>
              <p className="text-body leading-[1.35] text-neutral-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
