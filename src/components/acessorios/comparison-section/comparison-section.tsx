import { Minus } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

const columns = [
  "KION E-Check List",
  "Telemetria TranspoTech",
  "STILL FleetManager 4.x",
] as const;

/** `null` = recurso não presente na solução. */
type Cell = string | null;

type Row = { label: string; cells: [Cell, Cell, Cell] };

// Comparativo factual a partir dos materiais de cada solução. Pendente de
// revisão técnica do gerente de produto.
const rows: Row[] = [
  {
    label: "Indicada para",
    cells: [
      "Frotas com poucas máquinas",
      "A solução mais aplicada",
      "Gestão de grande parque de máquinas",
    ],
  },
  {
    label: "Identificação do operador",
    cells: ["Cartão RFID ou senha", "Cartão RFID", "Cartão ou senha"],
  },
  {
    label: "Check list com bloqueio\nda máquina",
    cells: [
      "Sim, com perguntas customizadas",
      "Sim, check list eletrônico",
      "Integra com o E-Check List (mesmo cartão)",
    ],
  },
  {
    label: "Transmissão de dados",
    cells: [
      "Rede local, sem internet",
      "4G, sistema web",
      "Aplicativo via Bluetooth e plataforma web",
    ],
  },
  {
    label: "Detecção de impactos",
    cells: [
      null,
      "Sensor de impacto",
      "Sim, com redução de velocidade, bloqueio e alertas",
    ],
  },
  {
    label: "Relatórios e alertas",
    cells: [
      "Histórico de respostas exportável",
      "Produtividade, horímetro, tempo com carga e alertas por e-mail",
      "Uso simultâneo, energia, acessos e impactos por operador",
    ],
  },
];

export function ComparisonSection() {
  return (
    <Section
      data-header-dark
      className="flex flex-col items-start gap-10 lg:gap-14"
    >
      <div className="flex max-w-[640px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-50">
          Compare as <span className="font-bold text-primary-500">soluções</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          Cada nível adiciona mais controle sobre acesso, uso e segurança.{" "}
          <br className="hidden lg:inline" />
          As funções podem variar conforme o modelo do equipamento.
        </p>
      </div>

      {/* No mobile a tabela rola na horizontal dentro do próprio bloco */}
      <div className="-mx-5 w-[calc(100%+2.5rem)] overflow-x-auto px-5 sm:mx-0 sm:w-full sm:px-0">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">
            Comparativo entre E-Check List, Telemetria TranspoTech e STILL
            FleetManager
          </caption>
          <thead>
            <tr className="border-b border-white/10">
              <th scope="col" className="w-1/4 py-8 pr-10 lg:py-10 lg:pr-12">
                <span className="sr-only">Recurso</span>
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="w-1/4 py-8 pr-6 align-bottom font-heading text-h6 font-normal text-neutral-100 lg:py-10"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="group border-b border-white/10 transition-colors"
              >
                {/* Mesma composição dos "Planos de locação": risquinho à
                    esquerda, que fica laranja no hover da linha. */}
                <th
                  scope="row"
                  className="relative whitespace-pre-line py-8 pl-6 pr-10 align-top font-heading text-h6 font-normal leading-[1.3] text-neutral-100 transition-colors duration-300 group-hover:text-primary-500 lg:py-10 lg:pl-8 lg:pr-12"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-8 h-9 w-1 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-primary-500 lg:top-10"
                  />
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={columns[i]}
                    className="py-8 pr-6 align-top text-body leading-[1.35] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-50 lg:py-10"
                  >
                    {cell ?? (
                      <>
                        <Minus className="size-5 text-neutral-500" aria-hidden />
                        <span className="sr-only">Não disponível</span>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button variant="primary" size="lg" href="#solicitar-acessorios">
        Receber indicação da solução
      </Button>
    </Section>
  );
}
