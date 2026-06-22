import Image from "next/image";
import novas from "@/assets/images/portfolio-novas.png";
import sparkling from "@/assets/icons/sparkling.svg";
import coins from "@/assets/icons/coins.svg";
import calendar from "@/assets/icons/calendar.svg";

export function PortfolioSection() {
  return (
    <section className="flex flex-col items-start gap-[67px] px-16 py-20">
      {/* Cabeçalho */}
      <div className="flex w-[641px] max-w-full flex-col gap-6">
        <div className="flex w-[535px] max-w-full flex-col gap-4">
          <p className="text-body font-semibold leading-[1.35] text-secondary-600">
            PORTFÓLIO
          </p>
          <h2 className="text-h2 font-normal text-neutral-800">
            Equipamentos novos, usados e locação de frota
          </h2>
        </div>
        <p className="text-body leading-6 text-neutral-600">
          Da aquisição e locação so suporte técnico e automação, a TranspoTech
          conecta as principais necessidades da movimentação e intralogística em
          uma estrutura integrada.
        </p>
      </div>

      {/* Cards */}
      <div className="flex w-full items-center gap-4">
        {/* Card destaque com imagem */}
        <div className="flex h-[373px] flex-1 items-center gap-[25px] rounded-xl bg-neutral-50 p-6">
          <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
            <Image src={sparkling} alt="" className="size-8" />
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-[28px] font-semibold leading-[1.3] text-neutral-800">
                Empilhadeiras novas
              </h3>
              <p className="text-body leading-[1.35] text-neutral-600">
                Equipamentos de marcas reconhecidas para operações que exigem
                desempenho, segurança e confiabilidade no longo prazo.
              </p>
            </div>
            <button className="text-left text-body font-semibold leading-[1.35] text-primary-500">
              Ver empilhadeiras novas
            </button>
          </div>
          <div className="h-[325px] w-[310px] shrink-0 overflow-hidden rounded-lg">
            <Image
              src={novas}
              alt="Empilhadeira nova"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Card usadas */}
        <div className="flex h-[373px] w-[315px] shrink-0 flex-col justify-between rounded-xl bg-neutral-50 p-6">
          <Image src={coins} alt="" className="size-8" />
          <div className="flex w-[267px] max-w-full flex-col gap-4">
            <h3 className="w-[224px] max-w-full font-heading text-[28px] font-semibold leading-[1.3] text-neutral-800">
              Empilhadeiras Usadas
            </h3>
            <p className="text-body leading-[1.35] text-neutral-600">
              Alternativo para quem busca disponibilidade rápida, revisão técnica
              e melhor adequação ao orçamento.
            </p>
          </div>
          <button className="text-left text-body font-semibold leading-[1.35] text-primary-500">
            Ver empilhadeiras usadas
          </button>
        </div>

        {/* Card locação */}
        <div className="flex h-[373px] w-[315px] shrink-0 flex-col justify-between rounded-xl bg-neutral-50 p-6">
          <Image src={calendar} alt="" className="size-8" />
          <div className="flex w-[267px] max-w-full flex-col gap-4">
            <h3 className="w-[224px] max-w-full font-heading text-[28px] font-semibold leading-[1.3] text-neutral-800">
              Locação de equipamentos
            </h3>
            <p className="text-body leading-[1.35] text-neutral-600">
              Solução para operações que precisam de flexibilidade,
              previsibilidade de custo e resposta rápida à demanda.
            </p>
          </div>
          <button className="text-left text-body font-semibold leading-[1.35] text-primary-500">
            Solicitar proposta
          </button>
        </div>
      </div>
    </section>
  );
}
