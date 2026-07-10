import type { Article } from "@/data/articles";

// Conteúdo editorial de demonstração (o texto final é publicado via CMS).
// Escrito com base em conhecimento consolidado do setor de intralogística sobre
// locação x compra de empilhadeiras (custo total de propriedade, CAPEX x OPEX,
// taxa de utilização e ponto de equilíbrio).
export function ArticleBody({ article }: { article: Article }) {
  return (
    <article className="flex max-w-[720px] flex-col gap-5 text-body leading-[1.7] text-neutral-700">
      {/* Lead — resumo do artigo */}
      <p className="text-lg font-medium leading-[1.6] text-neutral-800">
        {article.excerpt}
      </p>

      <p>
        A decisão entre <strong>locar ou comprar uma empilhadeira</strong> raramente
        se resolve olhando só o preço de aquisição. O que separa uma operação
        eficiente de uma frota cara e ociosa é o{" "}
        <strong>custo total de propriedade (TCO)</strong> — a soma de aquisição,
        manutenção, peças, energia, mão de obra técnica, tempo parado e o custo do
        capital imobilizado ao longo da vida útil do equipamento. É esse número, e
        não a etiqueta de preço, que revela a alternativa mais vantajosa.
      </p>

      <h2 className="mt-4 font-heading text-h5 font-semibold text-neutral-800">
        Locação ou compra: a pergunta certa não é o preço
      </h2>
      <p>
        Comprar transforma a empilhadeira em um ativo (CAPEX): há desembolso inicial
        alto, depreciação e a responsabilidade integral pela manutenção. Locar
        converte esse gasto em despesa operacional recorrente (OPEX), com valor
        previsível por mês e, na maioria dos contratos, manutenção, peças e
        assistência técnica inclusas. Na prática, a locação troca um grande
        investimento de uma vez por previsibilidade de custo e menos risco
        operacional.
      </p>

      <h2 className="mt-4 font-heading text-h5 font-semibold text-neutral-800">
        Cinco cenários em que a locação costuma vencer
      </h2>
      <ul className="flex flex-col gap-3 pl-1">
        {[
          "Demanda sazonal ou picos de produção: em safras, datas comerciais e projetos temporários, a locação dá capacidade extra sem inflar a frota o ano inteiro.",
          "Operações de curto e médio prazo: obras, contratos com prazo definido e novas unidades em maturação evitam imobilizar capital em um ativo que pode não ser necessário depois.",
          "Necessidade de flexibilidade tecnológica: quem quer testar eletrificação, lítio ou novos modelos migra de tecnologia ao renovar o contrato, sem ficar preso a um equipamento defasado.",
          "Preservação de caixa e CAPEX: manter o capital livre para o núcleo do negócio muitas vezes vale mais do que possuir o equipamento.",
          "Ausência de estrutura própria de manutenção: sem oficina, peças e técnicos dedicados, a manutenção inclusa na locação reduz paradas e custos ocultos.",
        ].map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden
              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary-500"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-4 font-heading text-h5 font-semibold text-neutral-800">
        Como calcular o ponto de virada
      </h2>
      <p>
        O fator decisivo é a <strong>taxa de utilização</strong>. Uma empilhadeira
        própria só dilui bem o investimento quando trabalha muitas horas por ano, de
        forma constante. Abaixo de um determinado volume de uso, o custo por hora de
        um ativo comprado — somando depreciação, manutenção e ociosidade — supera o
        da locação.
      </p>
      <p>
        Um caminho simples é comparar o{" "}
        <strong>custo por hora trabalhada</strong> nas duas hipóteses. Estime as
        horas anuais de operação, projete o TCO da compra (aquisição, manutenção,
        peças e parada) ao longo da vida útil e divida pelas horas previstas. Faça o
        mesmo com o valor mensal da locação. O ponto de virada aparece onde os dois
        custos por hora se cruzam: utilização alta e estável tende à compra; uso
        variável, sazonal ou incerto tende à locação.
      </p>

      <h2 className="mt-4 font-heading text-h5 font-semibold text-neutral-800">
        Quando a compra faz mais sentido
      </h2>
      <p>
        Comprar continua sendo a melhor escolha para operações com{" "}
        <strong>alta utilização e horizonte longo</strong>: uso intenso e
        previsível, rotina estável por vários anos e estrutura própria de manutenção
        (ou contrato de assistência bem dimensionado). Nesses casos, diluir o
        investimento por um volume grande de horas reduz o custo por hora e a posse
        do ativo passa a compensar.
      </p>

      <h2 className="mt-4 font-heading text-h5 font-semibold text-neutral-800">
        O custo que não aparece na proposta: disponibilidade
      </h2>
      <p>
        O item mais caro de uma frota raramente está na planilha inicial: é a{" "}
        <strong>empilhadeira parada</strong>. Tempo de máquina indisponível
        significa pedido atrasado, hora extra e produtividade perdida. Por isso,
        avaliar locação x compra exige olhar também para prazo de atendimento
        técnico, disponibilidade de peças e existência de equipamento reserva —
        variáveis que, no contrato de locação, costumam ser responsabilidade do
        fornecedor.
      </p>
      <p>
        Na dúvida, o melhor ponto de partida é mapear a rotina real da operação —
        turnos, horas por dia, sazonalidade e criticidade — e comparar o custo por
        hora de cada cenário. A equipe da TranspoTech ajuda a levantar esses números
        e a indicar a solução com o menor custo total para a sua operação.
      </p>
    </article>
  );
}
