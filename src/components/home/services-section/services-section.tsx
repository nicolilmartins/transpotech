import Image from "next/image";
import shield from "@/assets/icons/shield.svg";
import tools from "@/assets/icons/tools.svg";
import dashboard from "@/assets/icons/dashboard.svg";

const cards = [
  {
    icon: shield,
    title: "Planos de manutenção preventiva",
    description:
      "Cronograma de visitas técnicas para identificar falhas antes que parem sua frota.",
    cta: "Solicitar plano preventivo",
  },
  {
    icon: tools,
    title: "Manutenção corretiva",
    description:
      "Técnicas em campo com peças em estoque para retornar sua operação o quanto antes.",
    cta: "Solicitar atendimento urgente",
  },
  {
    icon: dashboard,
    title: "Assistência multimarcas",
    description:
      "Linde, Still, Baoli e outras marcas - um único contato para toda a frota.",
    cta: "Ver cobertura multimarcas",
  },
];

export function ServicesSection() {
  return (
    <section className="flex flex-col items-start gap-[67px] bg-[#fdfdfd] px-16 py-20">
      {/* Cabeçalho centralizado */}
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <div className="flex w-[535px] max-w-full flex-col items-center gap-4">
          <p className="text-body font-semibold leading-[1.35] text-primary-500">
            SERVIÇOS
          </p>
          <h2 className="text-h2 text-neutral-800">
            <span className="font-bold">Manutenção preventiva, </span>
            <span className="font-normal">corretiva e suporte 24h</span>
          </h2>
        </div>
        <p className="w-[507px] max-w-full text-body leading-[1.35] text-neutral-600">
          Além da venda e locação, a TranspoTech apoia o dia a dia da frota com
          manutenção e suporte técnico especializado.
        </p>
      </div>

      {/* Cards */}
      <div className="flex w-full items-start gap-[17px]">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-1 flex-col overflow-hidden rounded-xl bg-primary-50"
          >
            <div className="flex flex-col gap-8 rounded-xl bg-[#fbfbfb] p-6">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary-500">
                <Image src={card.icon} alt="" className="size-7" />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-[28px] font-semibold leading-[1.3] text-neutral-700">
                  {card.title}
                </h3>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {card.description}
                </p>
              </div>
            </div>
            <button className="px-6 py-4 text-left text-body font-semibold leading-[1.35] text-primary-500">
              {card.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
