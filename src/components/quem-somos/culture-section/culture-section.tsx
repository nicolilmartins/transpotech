import { Section } from "@/components/ui/section";

// Valores da cultura — os 8 originais condensados em 4 tópicos:
// "Fazemos acontecer" + "Um time de donos" + "Vestimos a camisa";
// "Não pegamos atalhos" + "Humildade, respeito e ética";
// "Pensamos no futuro, agindo agora" + "Atualização constante".
const values = [
  {
    title: "Fazemos acontecer",
    description:
      "Somos um time de donos que veste a camisa: assumimos a responsabilidade do começo ao fim e transformamos desafios em entrega.",
  },
  {
    title: "Amamos o negócio dos nossos clientes",
    description:
      "Atendimento próximo e compromisso real com a operação de cada cliente — o sucesso deles é o nosso.",
  },
  {
    title: "Não pegamos atalhos",
    description:
      "Agimos com ética, humildade e respeito em todas as relações — fazemos do jeito certo, mesmo quando é o caminho mais longo.",
  },
  {
    title: "Pensamos no futuro, agindo agora",
    description:
      "Atualização constante para evoluir sempre: antecipamos tendências e agimos hoje para construir o amanhã.",
  },
];

// Visual da "Informações que ajudam a encontrar a peça certa" (pecas/
// info-cards-section), adaptado para light mode.
export function CultureSection() {
  return (
    <Section className="flex flex-col items-start gap-10 lg:gap-14">
      {/* Cabeçalho — alinhado à esquerda */}
      <div className="flex max-w-[640px] flex-col gap-4">
        <h2 className="text-h2 font-normal text-neutral-800">
          Uma cultura feita por pessoas
          <br />
          que <span className="text-primary-500">fazem acontecer</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          A TranspoTech acredita em relações de longo prazo, atendimento próximo
          e responsabilidade na entrega. Nosso time atua com ética, humildade,
          respeito, atualização constante e compromisso com o negócio dos
          clientes.
        </p>
      </div>

      {/* Tópicos — linhas divisórias + barra de acento por linha */}
      <div className="w-full">
        <ul className="flex flex-col border-t border-neutral-200">
          {values.map((value) => (
            <li
              key={value.title}
              className="group relative flex flex-col gap-3 border-b border-neutral-200 py-10 transition-colors lg:flex-row lg:gap-16 lg:py-12"
            >
              {/* Linha precisa à esquerda — fica laranja no hover */}
              <span
                aria-hidden
                className="absolute left-0 top-10 h-9 w-1 rounded-full bg-neutral-300 transition-colors duration-300 group-hover:bg-primary-500 lg:top-12"
              />

              <h3 className="pl-6 font-heading text-h4 font-normal text-neutral-800 transition-colors duration-300 group-hover:text-primary-500 lg:w-1/2 lg:pl-8">
                {value.title}
              </h3>

              <p className="pl-6 text-body leading-[1.5] text-neutral-600 transition-colors duration-300 group-hover:text-neutral-800 lg:w-1/2 lg:pl-0">
                {value.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
