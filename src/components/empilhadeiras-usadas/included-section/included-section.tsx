import { Section } from "@/components/ui/section";

type Item = { title: string; description: string };

const items: Item[] = [
  {
    title: "Garantia",
    description:
      "Cobertura de 6 a 12 meses conforme o equipamento, incluindo peças e mão de obra.",
  },
  {
    title: "Revisão técnica documentada",
    description:
      "Laudo TranspoTech e histórico de manutenção entregues junto ao equipamento.",
  },
  {
    title: "Suporte pós-venda",
    description:
      "Peças, manutenção preventiva e corretiva pela equipe técnica da TranspoTech.",
  },
  {
    title: "Treinamento operacional",
    description:
      "Orientação básica de operação e segurança ao operador no recebimento.",
  },
  {
    title: "Logística de entrega",
    description:
      "Transporte coordenado pela TranspoTech até a sua unidade, com hora marcada.",
  },
];

export function IncludedSection() {
  return (
    <Section
      data-header-dark
      className="flex flex-col items-start gap-10 lg:gap-14"
    >
      {/* Cabeçalho — alinhado à esquerda */}
      <div className="flex max-w-[640px] flex-col gap-4">
        <h2 className="text-h2 text-neutral-50">
          <span className="font-normal">O que está</span>
          <br />
          <span className="font-bold text-primary-500">incluso na compra</span>
        </h2>
        <p className="text-body leading-[1.5] text-neutral-400">
          Cada empilhadeira usada já vem com a estrutura da TranspoTech por trás,
          da garantia ao suporte pós-venda.
        </p>
      </div>

      {/* Itens — linhas divisórias + tick laranja por linha */}
      <div className="w-full">
        <ul className="flex flex-col border-t border-white/10">
          {items.map((item) => (
            <li
              key={item.title}
              className="group relative flex flex-col gap-3 border-b border-white/10 py-10 transition-colors lg:flex-row lg:gap-16 lg:py-12"
            >
              {/* Linha precisa à esquerda — fica laranja no hover */}
              <span
                aria-hidden
                className="absolute left-0 top-10 h-9 w-1 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-primary-500 lg:top-12"
              />

              <h3 className="pl-6 font-heading text-h4 font-normal text-neutral-100 transition-colors duration-300 group-hover:text-primary-500 lg:w-1/2 lg:pl-8">
                {item.title}
              </h3>

              <p className="pl-6 text-body leading-[1.5] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-50 lg:w-1/2 lg:pl-0">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
