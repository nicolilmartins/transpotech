import { articles } from "@/data/articles";
import { articleSections } from "@/components/portal-de-conteudo/article-sections";
import { seedImage, seedKey, type SeedDocument } from "./helpers";

// Corpo de demonstração de ArticleBody (article-body.tsx) em Portable Text.
// O texto só existe em JSX lá, então é repetido aqui; os títulos de seção vêm
// de articleSections. Como no site hoje, todo artigo recebe o mesmo corpo.

type Run = string | { strong: string };

type SeedBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2";
  markDefs: [];
  children: { _type: "span"; _key: string; text: string; marks: string[] }[];
  listItem?: "bullet";
  level?: number;
};

function block(
  key: string,
  runs: Run[],
  style: SeedBlock["style"] = "normal"
): SeedBlock {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: runs.map((run, i) => ({
      _type: "span",
      _key: seedKey(i, `${key}-span`),
      text: typeof run === "string" ? run : run.strong,
      marks: typeof run === "string" ? [] : ["strong"],
    })),
  };
}

const heading = (index: number) =>
  block(`h2-${index}`, [articleSections[index].title], "h2");

const bullet = (key: string, text: string): SeedBlock => ({
  ...block(key, [text]),
  listItem: "bullet",
  level: 1,
});

function demoBody(): SeedBlock[] {
  return [
    block("p-1", [
      "A decisão entre ",
      { strong: "locar ou comprar uma empilhadeira" },
      " raramente se resolve olhando só o preço de aquisição. O que separa uma operação eficiente de uma frota cara e ociosa é o ",
      { strong: "custo total de propriedade (TCO)" },
      ": a soma de aquisição, manutenção, peças, energia, mão de obra técnica, tempo parado e o custo do capital imobilizado ao longo da vida útil do equipamento. É esse número, e não a etiqueta de preço, que revela a alternativa mais vantajosa.",
    ]),
    heading(0),
    block("p-2", [
      "Comprar transforma a empilhadeira em um ativo (CAPEX): há desembolso inicial alto, depreciação e a responsabilidade integral pela manutenção. Locar converte esse gasto em despesa operacional recorrente (OPEX), com valor previsível por mês e, na maioria dos contratos, manutenção, peças e assistência técnica inclusas. Na prática, a locação troca um grande investimento de uma vez por previsibilidade de custo e menos risco operacional.",
    ]),
    heading(1),
    bullet(
      "li-1",
      "Demanda sazonal ou picos de produção: em safras, datas comerciais e projetos temporários, a locação dá capacidade extra sem inflar a frota o ano inteiro."
    ),
    bullet(
      "li-2",
      "Operações de curto e médio prazo: obras, contratos com prazo definido e novas unidades em maturação evitam imobilizar capital em um ativo que pode não ser necessário depois."
    ),
    bullet(
      "li-3",
      "Necessidade de flexibilidade tecnológica: quem quer testar eletrificação, lítio ou novos modelos migra de tecnologia ao renovar o contrato, sem ficar preso a um equipamento defasado."
    ),
    bullet(
      "li-4",
      "Preservação de caixa e CAPEX: manter o capital livre para o núcleo do negócio muitas vezes vale mais do que possuir o equipamento."
    ),
    bullet(
      "li-5",
      "Ausência de estrutura própria de manutenção: sem oficina, peças e técnicos dedicados, a manutenção inclusa na locação reduz paradas e custos ocultos."
    ),
    heading(2),
    block("p-3", [
      "O fator decisivo é a ",
      { strong: "taxa de utilização" },
      ". Uma empilhadeira própria só dilui bem o investimento quando trabalha muitas horas por ano, de forma constante. Abaixo de um determinado volume de uso, o custo por hora de um ativo comprado, somando depreciação, manutenção e ociosidade, supera o da locação.",
    ]),
    block("p-4", [
      "Um caminho simples é comparar o ",
      { strong: "custo por hora trabalhada" },
      " nas duas hipóteses. Estime as horas anuais de operação, projete o TCO da compra (aquisição, manutenção, peças e parada) ao longo da vida útil e divida pelas horas previstas. Faça o mesmo com o valor mensal da locação. O ponto de virada aparece onde os dois custos por hora se cruzam: utilização alta e estável tende à compra; uso variável, sazonal ou incerto tende à locação.",
    ]),
    heading(3),
    block("p-5", [
      "Comprar continua sendo a melhor escolha para operações com ",
      { strong: "alta utilização e horizonte longo" },
      ": uso intenso e previsível, rotina estável por vários anos e estrutura própria de manutenção (ou contrato de assistência bem dimensionado). Nesses casos, diluir o investimento por um volume grande de horas reduz o custo por hora e a posse do ativo passa a compensar.",
    ]),
    heading(4),
    block("p-6", [
      "O item mais caro de uma frota raramente está na planilha inicial: é a ",
      { strong: "empilhadeira parada" },
      ". Tempo de máquina indisponível significa pedido atrasado, hora extra e produtividade perdida. Por isso, avaliar locação x compra exige olhar também para prazo de atendimento técnico, disponibilidade de peças e existência de equipamento reserva, variáveis que, no contrato de locação, costumam ser responsabilidade do fornecedor.",
    ]),
    block("p-7", [
      "Na dúvida, o melhor ponto de partida é mapear a rotina real da operação, turnos, horas por dia, sazonalidade e criticidade, e comparar o custo por hora de cada cenário. A equipe da TranspoTech ajuda a levantar esses números e a indicar a solução com o menor custo total para a sua operação.",
    ]),
  ];
}

export function documents(): SeedDocument[] {
  return articles.map((article, i) => ({
    _id: `article-${article.id}`,
    _type: "article",
    title: article.title,
    slug: { _type: "slug", current: article.id },
    category: article.category,
    type: article.type,
    excerpt: article.excerpt,
    date: article.dateISO,
    readTime: Number.parseInt(article.readTime, 10),
    author: article.author,
    image: seedImage(article.image),
    body: demoBody(),
    order: i,
  }));
}
