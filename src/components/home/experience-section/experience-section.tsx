import Image from "next/image";
import { Button } from "@/components/ui/button";
import card1 from "@/assets/images/stats/card1.png";
import card2 from "@/assets/images/stats/card2.png";
import card3 from "@/assets/images/stats/card3.png";
import card4 from "@/assets/images/stats/card4.png";

const stats = [
  {
    img: card1,
    value: "+3500",
    label: "Empilhadeiras locadas operando ativamente em diversos segmentos",
  },
  {
    img: card2,
    value: "24/7",
    label: "Atendimento com manutenção preventiva e corretiva",
  },
  {
    img: card3,
    value: "34%",
    label: "Na redução do Imposto de Renda com modelo de locação",
  },
  {
    img: card4,
    value: "+24",
    label: "Anos de mercado com experiência consolidada no setor.",
  },
];

export function ExperienceSection() {
  return (
    <section className="flex flex-col items-start gap-16 bg-[#fdfdfd] px-[61px] py-20">
      {/* Cabeçalho */}
      <div className="flex w-[641px] max-w-full flex-col gap-6">
        <div className="flex w-[400px] max-w-full flex-col gap-4">
          <p className="text-body font-semibold leading-[1.35] text-secondary-600">
            EXPERIÊNCIA
          </p>
          <h2 className="text-h2 font-normal text-neutral-800">
            Frota, equipe e cobertura nacional
          </h2>
        </div>
        <p className="w-[510px] max-w-full text-body leading-[1.35] text-neutral-600">
          Escala, equipe e infraestrutura para garantir disponibilidade,
          agilidade e suporte técnico em todo o Sul e Sudeste.
        </p>
      </div>

      {/* Cards */}
      <div className="flex w-full gap-4">
        {stats.map((s) => (
          <div
            key={s.value}
            className="relative flex h-[172px] flex-1 flex-col justify-end gap-1 overflow-hidden rounded-3xl bg-[#f9f9f9] p-5"
          >
            <Image
              src={s.img}
              alt=""
              className="pointer-events-none absolute right-0 top-0 h-full w-auto select-none object-contain object-right"
            />
            <div className="relative flex flex-col gap-2">
              <span className="font-heading text-[40px] font-bold leading-[1.3] text-primary-500">
                {s.value}
              </span>
              <span className="max-w-[178px] text-body leading-[1.35] text-neutral-600">
                {s.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button variant="primary" size="lg">
        Quero reduzir meus custos
      </Button>
    </section>
  );
}
