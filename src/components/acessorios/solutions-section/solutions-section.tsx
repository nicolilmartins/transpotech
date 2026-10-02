import { Section } from "@/components/ui/section";
import { TopicCard, type TopicCardProps } from "@/components/layout/topic-card";

const CTA_HREF = "#solicitar-acessorios";

// Cada dado vem explicitamente dos materiais em inputs/Acessórios:
// - E-Check List: "Apresentação E-Check List_v1.pdf".
// - Serralog: "Apresentação Serralog Tptech.pdf".
// - FleetManager: "Apresentação do Fleetmanager.pdf" (Funções, Aplicação —
//   "gerir grande parque de máquinas" —, Segurança operacional, Impactos e
//   Comunicação via app STILL DataShuttle).
// Descrições curtas (2 linhas) e 5 tópicos curtos (1 linha) por card, para alinhar a
// leitura entre os três. Pendente de revisão técnica do gerente de produto.
const solutions: TopicCardProps[] = [
  {
    title: "KION E-Check List",
    description:
      "Check list eletrônico: a máquina só liga após identificação e inspeção.",
    items: [
      "Liberação por cartão RFID ou senha",
      "Perguntas customizadas pelo cliente",
      "Bloqueio em respostas negativas",
      "Funciona em rede local, sem internet",
      "Software de gestão sem anuidade",
    ],
  },
  {
    title: "Telemetria TranspoTech | Serralog",
    description:
      "Telemetria online: informações da operação a qualquer hora e lugar.",
    items: [
      "Operador identificado por cartão RFID",
      "Check list e sensor de impacto",
      "Bloqueio remoto da máquina",
      "Alertas de manutenção por e-mail",
      "Sistema web com dados via 4G",
    ],
  },
  {
    title: "STILL FleetManager 4.x",
    description:
      "Telemetria STILL: segurança, otimização do uso e menos danos por impactos.",
    items: [
      "Até 999 operadores por máquina",
      "Velocidade por tipo de habilitação",
      "Acesso pela validade da habilitação",
      "Bloqueio e alerta após impacto",
      "Dados via app no celular (Bluetooth)",
    ],
  },
].map((solution) => ({
  ...solution,
  ctaLabel: "Solicitar avaliação",
  ctaHref: CTA_HREF,
}));

export function SolutionsSection() {
  return (
    <Section data-header-dark className="flex flex-col gap-10 lg:gap-12">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-50">
          Qual solução para{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">a sua frota?</span>
        </h2>
        <p className="text-balance text-body leading-[1.35] text-neutral-300">
          Do check list eletrônico à telemetria completa: a TranspoTech indica a
          solução conforme o tamanho da frota, o nível de controle desejado e a
          rotina da operação.
        </p>
      </div>

      {/* 3 colunas só a partir de xl: abaixo disso o card fica estreito demais
          para manter descrição em 2 linhas e tópicos em 1 linha. */}
      <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-3">
        {solutions.map((solution) => (
          <TopicCard key={solution.title} {...solution} />
        ))}
      </div>
    </Section>
  );
}
