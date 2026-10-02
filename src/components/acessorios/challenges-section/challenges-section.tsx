import { Section } from "@/components/ui/section";
import { IconCard, type IconCardProps } from "@/components/acessorios/icon-card/icon-card";
import artFolder from "@/assets/images/stats/illustration-folder.webp";
import artBalanca from "@/assets/images/stats/card-balanca.webp";
import artAlerta from "@/assets/images/stats/card-alerta.webp";
import artPessoa from "@/assets/images/stats/card-person.webp";
import artCadeado from "@/assets/images/stats/card-cadeado.webp";
import artGrafico from "@/assets/images/stats/illustration-chart-2.webp";

// Dores levantadas nos materiais do cliente (E-Check List, FleetManager e ADAS).
const challenges: IconCardProps[] = [
  {
    title: "Check list em papel",
    description:
      "Preenchimento manual, documentos ilegíveis, perda do histórico e custo com papel e armazenamento.",
    art: artFolder,
  },
  {
    title: "Indisciplina operacional",
    description:
      "Check list não preenchido e máquinas usadas por operadores sem autorização ou habilitação.",
    art: artBalanca,
  },
  {
    title: "Impactos e avarias",
    description:
      "Batidas em estruturas, em outros equipamentos e em imperfeições do piso geram alto custo operacional.",
    art: artAlerta,
  },
  {
    title: "Risco a pedestres",
    description:
      "Pontos cegos e circulação de pessoas próximas às máquinas aumentam o risco de acidentes.",
    art: artPessoa,
  },
  {
    title: "Processos trabalhistas",
    description:
      "Sem registro confiável, fica difícil comprovar inspeções, uso e responsabilidades.",
    art: artCadeado,
  },
  {
    title: "Pouca visibilidade da frota",
    description:
      "Sem dados de uso, tempo com carga e produtividade, as decisões sobre a frota ficam sem base.",
    art: artGrafico,
  },
];

export function ChallengesSection() {
  return (
    <Section className="flex flex-col gap-12 lg:gap-16">
      <div className="flex max-w-[720px] flex-col gap-4">
        {/* Duas linhas fixas no desktop: "Os desafios de uma" / "frota sem
            controle". No mobile o título flui natural. */}
        <h2 className="text-h2 font-normal text-neutral-800">
          Os desafios de uma{" "}
          <br className="hidden lg:inline" />
          frota <span className="font-bold text-primary-500">sem controle</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Quando não há registro de quem opera, como opera e em que estado{" "}
          <br className="hidden lg:inline" />
          está a máquina, o custo aparece em avarias, paradas e riscos à equipe.
        </p>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-4">
        {challenges.map((item) => (
          <IconCard key={item.title} {...item} />
        ))}
      </div>
    </Section>
  );
}
