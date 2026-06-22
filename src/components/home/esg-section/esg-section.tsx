import Image from "next/image";
import { ArrowRight } from "@/components/ui/icons";
import team from "@/assets/images/esg-team.png";

const items = [
  {
    title: "Great Place To Work",
    description:
      "Pelo 4° ano consecutivo, a Transpotech foi reconhecida como Great Place To Work.",
    link: null,
    highlight: true,
  },
  {
    title: "Pessoas no centro da operação",
    description:
      "Programas de inclusão e desenvolvimento de talentos na área técnica.",
    link: "Canal de transparência",
    highlight: false,
  },
  {
    title: "Eficiência e operação mais limpa",
    description:
      "Foco em soluções e tecnologias que aumentam eficiência e reduzem impacto na operação.",
    link: "Saiba mais",
    highlight: false,
  },
  {
    title: "Ética, transparência e canais oficiais",
    description:
      "Canal de transparência para relatos e condutas (com seriedade e confidencialidade).",
    link: "Saiba mais",
    highlight: false,
  },
];

export function EsgSection() {
  return (
    <section className="flex flex-col items-start gap-[67px] px-16 py-20">
      {/* Cabeçalho */}
      <div className="flex w-[641px] max-w-full flex-col gap-6">
        <div className="flex w-[613px] max-w-full flex-col gap-4">
          <p className="text-body font-semibold leading-[1.35] text-secondary-600">
            ESG E GOVERNANÇA
          </p>
          <h2 className="text-h2 text-neutral-800">
            <span className="font-bold">ESG na prática,</span>{" "}
            <span className="font-normal">
              para uma intralogística mais responsável
            </span>
          </h2>
        </div>
        <p className="text-body leading-[1.35] text-neutral-600">
          Compromissos claros em Ambiental, Social e Governança com iniciativas
          alinhadas aos ODS da ONU e canais formais de transparência.
        </p>
      </div>

      {/* Conteúdo */}
      <div className="flex w-full items-start gap-20">
        <div className="h-[617px] w-[641px] shrink-0 overflow-hidden rounded-xl">
          <Image
            src={team}
            alt="Equipe TranspoTech"
            className="h-full w-full object-cover"
            placeholder="blur"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          {items.map((item) => (
            <div key={item.title} className="flex items-stretch gap-8">
              <div
                className={`w-0.5 shrink-0 rounded-full ${
                  item.highlight
                    ? "bg-gradient-to-b from-secondary-600 to-neutral-200"
                    : "bg-neutral-200"
                }`}
              />
              <div className="flex flex-col gap-5 py-3">
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-h6 font-semibold text-neutral-800">
                    {item.title}
                  </h3>
                  <p className="max-w-[401px] text-body leading-[1.35] text-neutral-600">
                    {item.description}
                  </p>
                </div>
                {item.link && (
                  <button className="flex items-center gap-2 text-body font-semibold leading-[1.35] text-neutral-500">
                    {item.link}
                    <ArrowRight className="size-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
