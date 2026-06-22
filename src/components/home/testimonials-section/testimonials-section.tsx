import Image from "next/image";
import warehouse from "@/assets/images/depoimentos/warehouse.png";
import caseLogo1 from "@/assets/images/depoimentos/case-logo1.png";
import caseLogo2 from "@/assets/images/depoimentos/case-logo2.png";
import avatar from "@/assets/images/depoimentos/avatar.png";
import quote from "@/assets/icons/quote.svg";

const caseGradient =
  "bg-gradient-to-r from-[rgba(20,107,85,0.2)] to-[rgba(231,128,40,0)]";

export function TestimonialsSection() {
  return (
    <section className="flex flex-col items-center gap-16 bg-neutral-900 px-16 py-20">
      {/* Cabeçalho */}
      <div className="flex w-full flex-col items-start gap-4">
        <h2 className="text-h2 font-normal text-neutral-100">
          O que nossos clientes dizem
        </h2>
        <p className="w-[507px] max-w-full text-body leading-[1.35] text-neutral-200">
          A melhor prova de valor não está só no portfólio, mas na capacidade de
          responder à cenários reais com a solução certa.
        </p>
      </div>

      {/* Carrossel */}
      <div className="flex w-full items-center gap-4 overflow-hidden">
        {/* Imagem */}
        <div className="relative h-[381px] min-w-0 flex-1 overflow-hidden rounded-xl bg-neutral-300">
          <Image
            src={warehouse}
            alt="Operação em armazém"
            fill
            sizes="25vw"
            className="object-cover"
          />
        </div>

        {/* Case 1 */}
        <article
          className={`relative flex h-[381px] min-w-0 flex-1 items-center overflow-hidden rounded-xl border border-white/15 p-6 ${caseGradient}`}
        >
          <div className="flex h-full flex-1 flex-col justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-body-lg font-semibold leading-[1.35] text-neutral-100">
                Logística em escala
              </h3>
              <p className="text-body leading-[1.35] text-neutral-300">
                Como uma operação nacional reduziu gargalos e acelerou a tomada
                de decisão com uma estrutura digital mais clara.
              </p>
            </div>
            <Image src={caseLogo1} alt="" className="h-9 w-auto opacity-90" />
          </div>
        </article>

        {/* Case 2 */}
        <article
          className={`relative flex h-[381px] min-w-0 flex-1 items-center overflow-hidden rounded-xl border border-white/15 p-6 ${caseGradient}`}
        >
          <div className="flex h-full flex-1 flex-col justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-body-lg font-semibold leading-[1.35] text-neutral-100">
                Custos reduzidos
              </h3>
              <p className="text-body leading-[1.35] text-neutral-300">
                Como uma operação global reduziu custos de frete e otimizou
                prazos integrando sistemas de rastreamento inteligente.
              </p>
            </div>
            <Image src={caseLogo2} alt="" className="h-9 w-auto opacity-90" />
          </div>
        </article>

        {/* Depoimento */}
        <article
          className={`relative flex h-[381px] w-[316px] shrink-0 items-center overflow-hidden rounded-xl border border-secondary-600 p-6 ${caseGradient}`}
        >
          <div className="flex h-full flex-1 flex-col justify-between">
            <div className="flex flex-col gap-5">
              <Image src={quote} alt="" className="h-9 w-auto" />
              <div className="flex flex-col gap-2">
                <h3 className="text-body-lg font-semibold leading-[1.35] text-neutral-100">
                  Logística em escala
                </h3>
                <p className="text-body leading-[1.35] text-neutral-300">
                  A Transpotech nos ajudou a reorganizar toda a estrutura de
                  dados da operação. Em três meses, passamos a enxergar em tempo
                  real onde estava cada carga, onde estavam os atrasos e onde o
                  custo estava vazando.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Image
                src={avatar}
                alt="Joel Castro"
                className="size-[54px] rounded-full object-cover"
              />
              <div className="flex flex-col gap-1 text-body">
                <span className="font-semibold leading-[1.35] text-neutral-100">
                  Joel Castro
                </span>
                <span className="leading-[1.35] text-neutral-200">Meli</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Paginação */}
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-neutral-100" />
        <span className="size-2 rounded-full bg-neutral-600" />
        <span className="size-2 rounded-full bg-neutral-600" />
      </div>
    </section>
  );
}
