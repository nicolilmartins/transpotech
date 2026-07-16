import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";

type Channel = {
  title: string;
  description: string;
  quotes: string[];
  ctaLabel: string;
  href: string;
  /** Cor de acento dos detalhes (glow, bullets e CTA). */
  accent: "primary" | "secondary";
};

const channels: Channel[] = [
  {
    title: "Ouvidoria Digital",
    description:
      "Use para reclamações, sugestões, elogios, dúvidas, solicitações e feedbacks gerais sobre atendimento ou relacionamento.",
    quotes: [
      "Quero registrar uma reclamação sobre atendimento",
      "Quero sugerir uma melhoria",
      "Quero elogiar uma equipe",
      "Tenho uma dúvida institucional",
    ],
    ctaLabel: "Enviar manifestação",
    href: "#manifestacao",
    accent: "primary",
  },
  {
    title: "Canal da Transparência",
    description:
      "Use para relatos relacionados a ética, integridade, assédio, discriminação, fraude, conflito de interesses ou descumprimento de políticas.",
    quotes: [
      "Quero relatar uma situação de assédio",
      "Quero relatar possível fraude",
      "Quero relatar conduta antiética",
      "Quero relatar discriminação",
    ],
    ctaLabel: "Acessar Canal da Transparência",
    href: ROUTES.CANAL_TRANSPARENCIA,
    accent: "secondary",
  },
];

function ChannelCard({
  title,
  description,
  quotes,
  ctaLabel,
  href,
  accent,
}: Channel) {
  const isGreen = accent === "secondary";
  const glowClass = isGreen ? "bg-secondary-500" : "bg-primary-500";
  const bulletClass = isGreen ? "bg-secondary-500" : "bg-primary-500";
  const linkClass = isGreen
    ? "!text-secondary-500 hover:!text-secondary-600"
    : "";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl">
      {/* Zona do título — glow bem suave que acende no hover */}
      <div className="relative overflow-hidden bg-white/5 px-6 pb-6 pt-6 lg:px-8 lg:pt-8">
        <div
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-[120px] transition-opacity duration-500 group-hover:opacity-[0.35] ${glowClass}`}
        />
        <h3 className="relative text-h6 font-semibold text-neutral-50">{title}</h3>
        <p className="relative mt-3 text-body leading-[1.35] text-neutral-300">
          {description}
        </p>
      </div>

      {/* Zona dos tópicos — bullets de acento + CTA com divisória sutil */}
      <div className="relative flex flex-1 flex-col gap-8 bg-white/[0.07] px-6 pb-8 pt-6 lg:px-8">
        <ul className="flex flex-1 flex-col gap-2.5">
          {quotes.map((quote) => (
            <li key={quote} className="flex items-start gap-3">
              <span
                aria-hidden
                className={`mt-2 size-1.5 shrink-0 rounded-full ${bulletClass}`}
              />
              <span className="text-body italic leading-[1.35] text-neutral-300">
                “{quote}”
              </span>
            </li>
          ))}
        </ul>

        <TextLink
          href={href}
          className={`w-full border-t border-white/10 pt-6 ${linkClass}`}
        >
          {ctaLabel}
        </TextLink>
      </div>
    </div>
  );
}

export function ChannelChoiceSection() {
  return (
    <Section data-header-dark className="flex flex-col gap-10 lg:gap-12">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h2 className="text-h3 font-normal text-neutral-50">
          Qual canal devo usar?
        </h2>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        {channels.map((channel) => (
          <ChannelCard key={channel.title} {...channel} />
        ))}
      </div>
    </Section>
  );
}
