import { Minus } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ScrollHintBox } from "@/components/ui/scroll-hint-box";
import { LineBreaks } from "@/components/ui/line-breaks";
import type { SectionContent } from "@/sanity/content/fields";
import type { acessoriosPage } from "@/sanity/content/pages/acessorios";

type ComparisonContent = SectionContent<typeof acessoriosPage.sections.comparison>;

/** Célula com "-" (ou vazia): recurso não presente na solução. */
function isUnavailable(cell: string) {
  const value = cell.trim();
  return value === "" || value === "-";
}

export function ComparisonSection({ content }: { content: ComparisonContent }) {
  return (
    <Section
      data-header-dark
      className="flex flex-col items-start gap-10 lg:gap-14"
    >
      <div className="flex max-w-[640px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-50">
          {content.title}{" "}
          <span className="font-bold text-primary-500">{content.titleAccent}</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-400">
          <LineBreaks text={content.description} brClassName="hidden lg:inline" />
        </p>
      </div>

      {/* No mobile a tabela rola na horizontal dentro do próprio bloco, com a
          dica de arrastar ao entrar na tela */}
      <ScrollHintBox className="-mx-5 w-[calc(100%+2.5rem)] overflow-x-auto px-5 sm:mx-0 sm:w-full sm:px-0">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">{content.tableCaption}</caption>
          <thead>
            <tr className="border-b border-white/10">
              <th scope="col" className="w-1/4 py-8 pr-10 lg:py-10 lg:pr-12">
                <span className="sr-only">Recurso</span>
              </th>
              {content.columns.map(({ title }, i) => (
                <th
                  key={i}
                  scope="col"
                  className="w-1/4 py-8 pr-6 align-bottom font-heading text-h6 font-normal text-neutral-100 lg:py-10"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row) => (
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
                {[row.cell1, row.cell2, row.cell3].map((cell, i) => (
                  <td
                    key={i}
                    className="py-8 pr-6 align-top text-body leading-[1.35] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-50 lg:py-10"
                  >
                    {isUnavailable(cell) ? (
                      <>
                        <Minus className="size-5 text-neutral-500" aria-hidden />
                        <span className="sr-only">Não disponível</span>
                      </>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollHintBox>

      <Button variant="primary" size="lg" href="#solicitar-acessorios">
        {content.buttonLabel}
      </Button>
    </Section>
  );
}
