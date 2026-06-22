import Image from "next/image";
import industria from "@/assets/images/segmentos/industria.png";
import distribuicao from "@/assets/images/segmentos/distribuicao.png";
import logistica from "@/assets/images/segmentos/logistica.png";
import varejo from "@/assets/images/segmentos/varejo.png";

const segments = [
  {
    img: industria,
    title: "Indústria",
    description:
      "Suporte para abastecimento de linha, movimentação interna e continuidade de produção.",
  },
  {
    img: distribuicao,
    title: "Distribuição",
    description:
      "Soluções para armazenagem, fluxo, picking, expedição e produtividade operacional.",
  },
  {
    img: logistica,
    title: "Logística",
    description:
      "Estrutura para operações que precisam de disponibilidade, resposta rápida e previsibilidade.",
  },
  {
    img: varejo,
    title: "Varejo e atacado",
    description:
      "Apoio para movimentação eficiente em operações com alto giro e necessidade de ritmo constante.",
  },
];

export function SegmentsSection() {
  return (
    <section className="flex flex-col items-start gap-16 bg-[#fdfdfd] px-[61px] py-20">
      {/* Cabeçalho */}
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-[626px] max-w-full flex-col gap-4">
          <p className="text-body font-semibold leading-[1.35] text-primary-500">
            SEGMENTOS
          </p>
          <h2 className="w-[426px] max-w-full text-[40px] font-bold leading-[1.1] text-neutral-800">
            Aplicações por setor
          </h2>
        </div>
        <p className="w-[507px] max-w-full text-body leading-6 text-neutral-600">
          A TranspoTech apoia empresas com necessidades distintas de
          movimentação, abastecimento interno, armazenagem e suporte técnico.
        </p>
      </div>

      {/* Cards */}
      <div className="flex h-[297px] w-full items-center gap-4">
        {segments.map((s) => (
          <div
            key={s.title}
            className="relative flex h-full flex-1 flex-col justify-end gap-8 overflow-hidden rounded-xl bg-[#f9f9f9] p-6"
          >
            <Image
              src={s.img}
              alt=""
              className="pointer-events-none absolute left-0 top-0 h-auto w-[172px] select-none"
            />
            <div className="relative flex flex-col gap-4">
              <h3 className="font-heading text-[28px] font-bold leading-[1.1] text-neutral-800">
                {s.title}
              </h3>
              <p className="text-body leading-6 text-neutral-600">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
