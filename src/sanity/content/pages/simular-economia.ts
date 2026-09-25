import { definePage, defineSection, field } from "../fields";

export const simularEconomiaPage = definePage({
  key: "simular-economia",
  title: "Simular economia",
  sections: {
    hero: defineSection("Banner", {
      eyebrow: field.string("Texto acima do título", "Simulador de economia"),
      titleTop: field.string(
        "Título — primeira linha",
        "Empilhadeira GLP ou elétrica:",
      ),
      titleAccent: field.string(
        "Título — segunda linha (laranja)",
        "quanto sua operação economiza?",
      ),
      description: field.text(
        "Texto de apoio",
        "Ajuste os turnos, o preço do cilindro de gás e o kWh e compare o custo de energia de uma empilhadeira a GLP com uma elétrica a lítio e em quantos meses ela se paga.",
      ),
    }),
    simulator: defineSection("Simulador", {
      filtersTitle: field.string(
        "Painel de valores — título",
        "Ajuste os valores",
      ),
      filtersDescription: field.text(
        "Painel de valores — texto de apoio",
        "Partem de médias de referência no Brasil.\nArraste para a sua operação.",
        "Enter quebra a linha.",
      ),
      inputLabels: field.list(
        "Painel de valores — nome de cada controle",
        "Controle",
        { label: field.string("Nome", "") },
        [
          { label: "Nr. de turnos de trabalho" },
          { label: "Valor do cilindro de gás P20" },
          { label: "Valor do kWh" },
        ],
        // Faixa, passo e formato de cada controle ficam no código, por posição.
        { fixed: true },
      ),
      resetLabel: field.string(
        "Painel de valores — botão de restaurar",
        "Restaurar médias",
      ),
      mobileFiltersLabel: field.string(
        "Celular — botão e título do painel de valores",
        "Ajustar valores",
      ),
      mobileApplyLabel: field.string(
        "Celular — botão de fechar o painel",
        "Ver comparação",
      ),
      tableTitle: field.text(
        "Tabela — título",
        "Comparar\nmáquinas",
        "Enter quebra a linha.",
      ),
      metricLabels: field.list(
        "Tabela — nome de cada linha",
        "Linha",
        { label: field.string("Nome", "") },
        [
          { label: "Custo por hora" },
          { label: "Custo por mês" },
          { label: "Custo por ano" },
          { label: "Custo em 5 anos" },
          { label: "Preço / retorno do investimento" },
        ],
        // O valor de cada linha é calculado no código, por posição.
        { fixed: true },
      ),
      noteLabel: field.string(
        "Nota de rodapé — início em negrito",
        "Importante:",
      ),
      note: field.text(
        "Nota de rodapé — texto",
        "o retorno do investimento (pay-back) considera apenas a economia energética. Não entram no cálculo fatores que ampliam ainda mais a vantagem do lítio, como MTBF (tempo entre falhas), custo de manutenção, intervalo de manutenção (250h no GLP × 1.000h na elétrica) e custo de peças. Valores de referência para os modelos RC4425C (GLP) e RCE25-35 (elétrica lítio).",
      ),
    }),
    cta: defineSection("Chamada final (CTA)", {
      titleRegular: field.string("Título", "Quer o número exato para "),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "a sua operação?",
      ),
      description: field.text(
        "Texto de apoio",
        "Um especialista da TranspoTech dimensiona o equipamento certo e apresenta a proposta mais vantajosa, sem compromisso.",
      ),
      ctaLabel: field.string("Texto do botão", "Falar com especialista"),
    }),
  },
});
