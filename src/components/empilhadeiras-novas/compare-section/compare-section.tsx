import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import illoForklift from "@/assets/images/stats/illustration-emp.webp";
import illoCart from "@/assets/images/stats/illustration-transpalet.webp";

type CompareItem = {
  title: string;
  description: string;
  points: string[];
  image: StaticImageData;
  accent: "primary" | "secondary";
};

const items: CompareItem[] = [
  {
    title: "Empilhadeira",
    description:
      "Eleva e estoca em altura. Ideal para armazenagem vertical, carga/descarga em prateleiras e operações em CDs e indústrias.",
    points: [
      "Capacidade de 1,0 a 7,0 toneladas",
      "Eleva pallets em prateleiras de 3 a 13 metros",
      "Combustão (diesel/GLP) ou elétrica (chumbo-ácida ou lítio)",
      "Mastros standard, duplex ou triplex conforme a operação",
    ],
    image: illoForklift,
    accent: "primary",
  },
  {
    title: "Transpaleteira",
    description:
      "Movimenta pallet rente ao chão. Ideal para carga/descarga de caminhão, picking e transporte interno horizontal.",
    points: [
      "Capacidade de até 2,5 toneladas",
      "Eleva apenas o necessário para movimentar (pallet rasante)",
      "Versão elétrica ou manual",
      "Operação leve, geralmente indoor e em pisos planos",
    ],
    image: illoCart,
    accent: "secondary",
  },
];

function CompareCard({ title, description, points, image, accent }: CompareItem) {
  const isPrimary = accent === "primary";
  const accentText = isPrimary ? "text-primary-500" : "text-secondary-600";
  const glowBg = isPrimary ? "bg-primary-500" : "bg-secondary-600";
  const bulletBg = isPrimary ? "bg-primary-500" : "bg-secondary-600";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl">
      {/* Zona do título — fundo #F7F6F6 + blur de acento bem suave (acende no hover) */}
      <div className="relative overflow-hidden bg-[#f7f6f6] px-6 pb-6 pt-6 lg:px-8 lg:pt-8">
        <div
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full ${glowBg} opacity-[0.1] blur-[120px] transition-opacity duration-500 group-hover:opacity-[0.28]`}
        />
        <h3 className={`relative text-h6 font-semibold ${accentText}`}>
          {title}
        </h3>
        <p className="relative mt-3 max-w-[88%] text-body leading-[1.35] text-neutral-600">
          {description}
        </p>
      </div>

      {/* Zona dos tópicos — mesmo #F7F6F6 a 40% (divisão) + leve linha */}
      <div className="relative flex-1 border-t border-black/[0.04] bg-[#f7f6f6]/40 px-6 pb-8 pt-6 lg:px-8">
        {/* Ilustração — grande, no canto inferior direito */}
        <Image
          src={image}
          alt=""
          className="pointer-events-none absolute bottom-0 right-0 z-0 h-[200px] w-auto max-w-[48%] select-none object-contain object-right-bottom lg:h-[262px]"
        />
        <ul className="relative z-10 flex flex-col gap-4">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span
                aria-hidden
                className={`mt-2 size-1.5 shrink-0 rounded-full ${bulletBg}`}
              />
              <span className="max-w-[88%] text-body leading-[1.35] text-neutral-700">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CompareSection() {
  return (
    <Section className="flex flex-col items-center gap-12 lg:gap-16">
      <div className="flex max-w-[560px] flex-col gap-4 text-center">
        <h2 className="text-h2 text-neutral-800">
          <span className="font-normal">Empilhadeira ou transpaleteira: </span>
          <span className="font-bold text-primary-500">qual escolher?</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Os dois movimentam pallets, mas cobrem operações diferentes. Veja qual
          encaixa melhor na sua rotina antes de filtrar o catálogo.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <CompareCard key={item.title} {...item} />
        ))}
      </div>
    </Section>
  );
}
