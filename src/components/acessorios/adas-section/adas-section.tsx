import { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import { CardImageIcon } from "@/components/ui/card-image-icon";
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

type Feature = { title: string; description: string; art: Art };

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

// Funções do KION ADAS conforme a apresentação "KION ADAS Sistema de
// Assistência". Pendente de revisão técnica do gerente de produto.
const features: Feature[] = [
  {
    title: "Detecção de pedestres",
    description:
      "Visão computacional e inteligência artificial reconhecem alvos parados e em movimento.",
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
    title: "Monitoramento de ponto cego",
    description:
      "4 câmeras com 100° de ângulo de visão cobrem o entorno da máquina, com imagem no display.",
    art: {
      src: iconEmpilhadeira,
      width: 194.667,
      height: 146,
      maskX: 22.575,
      maskY: 6,
      left: -33,
      top: -18,
      flip: false,
    },
  },
  {
    title: "Alarme de voz e limite de velocidade",
    description:
      "Alerta sonoro ao operador e zona de limite de velocidade quando há risco por perto.",
    art: { ...ADAS_ART, src: iconVelocimetro },
  },
  {
    title: "Zona de alarme personalizável",
    description:
      "Área de alerta configurada conforme o layout e a rotina da operação.",
    art: { ...ADAS_ART, src: iconAlerta },
  },
  {
    title: "Gravação da operação",
    description:
      "Vídeos salvos automaticamente por 14 dias, para consulta e exportação.",
    art: { ...ADAS_ART, src: iconCamera },
  },
  {
    title: "GPS e cerca eletrônica",
    description:
      "Posicionamento, trajeto e cerca eletrônica para delimitar áreas da operação.",
    art: { ...BIG, src: iconPin, maskX: 27.265, maskY: 7.819, left: -38, top: -20, flip: true },
  },
];

export function AdasSection() {
  return (
    <Section data-header-dark className="flex flex-col gap-12 lg:gap-16">
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body font-semibold uppercase tracking-wide text-primary-400">
          Assistência ao operador
        </p>
        {/* Duas linhas fixas no desktop: "Segurança ativa" / "com KION ADAS". */}
        <h2 className="text-h2 font-normal text-neutral-50">
          Segurança ativa{" "}
          <br className="hidden lg:inline" />
          com <span className="font-bold text-primary-500">KION ADAS</span>
        </h2>
        {/* Quebra fixa no desktop antes de "pedestres próximos…". */}
        <p className="text-body leading-[1.35] text-neutral-400">
          Sistema avançado de assistência que usa câmeras e inteligência
          artificial para detectar{" "}
          <br className="hidden lg:inline" />
          pedestres próximos à empilhadeira e alertar o operador em tempo real.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-[#222221] p-6 transition-shadow duration-300 hover:z-10 hover:shadow-[0_16px_48px_0_rgba(33,143,115,0.35)] lg:min-h-[299px]"
          >
            <CardImageIcon
              src={feature.art.src}
              width={feature.art.width}
              height={feature.art.height}
              left={feature.art.left}
              top={feature.art.top}
              maskX={feature.art.maskX}
              maskY={feature.art.maskY}
              flip={feature.art.flip}
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
