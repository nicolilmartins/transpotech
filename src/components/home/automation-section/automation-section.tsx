import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "@/components/ui/icons";
import automacao from "@/assets/images/automacao.png";

const bullets = [
  "Menos gargalos entre o recebimento, armazenagem e expedição",
  "Mais pedidos processados com a mesma equipe",
  "Ociosidade reduzida e melhor aproveitamento do espaço",
  "Evolução por etapas - do básico à automacão completa",
];

export function AutomationSection() {
  return (
    <section className="flex flex-col items-start bg-[#fdfdfd] px-16 py-20">
      <div className="flex w-full items-center gap-16">
        {/* Coluna de texto */}
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-10">
            <div className="flex w-[600px] max-w-full flex-col gap-4">
              <h2 className="w-[542px] max-w-full text-h2 text-neutral-800">
                <span className="font-normal">
                  Automação intralogística para{" "}
                </span>
                <span className="font-bold text-primary-500">
                  alta produtividade
                </span>
              </h2>
              <p className="w-[512px] max-w-full text-body leading-[1.35] text-neutral-600">
                Para empresas que precisam evoluir o fluxo intralogístico, a
                TranspoTech também atua com soluções de automação voltadas à
                eficiência operacional.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <CheckCircle className="size-5 shrink-0 text-neutral-400" />
                  <span className="text-body leading-[1.35] text-neutral-600">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Button variant="primary" size="lg" className="self-start">
            Locar empilhadeira
          </Button>
        </div>

        {/* Imagem */}
        <div className="relative min-w-0 flex-1 self-stretch overflow-hidden rounded-xl">
          <Image
            src={automacao}
            alt="Empilhadeira em operação"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
