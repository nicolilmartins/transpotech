import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle } from "@/components/ui/icons";
import bg from "@/assets/images/solucoes-bg.svg";

const cards = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  title: "Planos de manutenção preventiva",
  description:
    "Equipamentos de marcas reconhecidas para operações que exigem desempenho, segurança e confiabilidade no longo prazo.",
  cta: "Solicitar atendimento urgente",
}));

export function SolutionsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#181616]">
      <Image
        src={bg}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover"
      />

      <div className="relative flex flex-col gap-16 px-16 py-20">
        {/* Cabeçalho */}
        <div className="flex w-[1312px] max-w-full flex-col gap-6">
          <p className="font-heading text-[16px] font-medium uppercase leading-[1.1] text-primary-300">
            solução 360°
          </p>
          <h2 className="w-[521px] max-w-full text-[40px] leading-[1.1] text-neutral-100">
            <span className="font-normal">Soluções em </span>
            <span className="font-bold">movimentação de cargas</span>
          </h2>
          <p className="w-[474px] max-w-full text-body leading-6 text-neutral-200">
            Escolha a necessidade mais próxima do seu momento e encontre a
            solução adequada com rapidez
          </p>
        </div>

        {/* Carrossel de cards */}
        <div className="flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {cards.map((card) => (
            <article
              key={card.id}
              className="flex h-[397px] w-[427px] shrink-0 flex-col justify-between rounded-xl bg-[rgba(30,30,31,0.8)] p-6"
            >
              <CheckCircle className="size-8 text-neutral-200" />
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 text-neutral-200">
                  <h3 className="w-[379px] max-w-full font-heading text-[28px] font-bold leading-[1.1]">
                    {card.title}
                  </h3>
                  <p className="w-[352px] max-w-full text-body leading-6">
                    {card.description}
                  </p>
                </div>
                <div className="h-px w-[379px] max-w-full bg-white/15" />
                <button className="text-left text-body font-semibold leading-6 text-primary-500">
                  {card.cta}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Navegação */}
        <div className="flex justify-end gap-2">
          <button
            aria-label="Anterior"
            className="flex size-12 items-center justify-center rounded-full bg-white/10 text-primary-500 transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="size-7" />
          </button>
          <button
            aria-label="Próximo"
            className="flex size-12 items-center justify-center rounded-full bg-white/10 text-primary-500 transition-colors hover:bg-white/20"
          >
            <ArrowRight className="size-7" />
          </button>
        </div>
      </div>
    </section>
  );
}
