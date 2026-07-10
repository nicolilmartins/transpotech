import { FileText, Wrench, Headset, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";

type Redirect = {
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

const redirects: Redirect[] = [
  {
    icon: FileText,
    title: "Solicitar orçamento",
    description:
      "Para compra, locação, peças, pneus, baterias ou carregadores.",
    linkLabel: "Ir para orçamento",
    href: ROUTES.ORCAMENTO,
  },
  {
    icon: Wrench,
    title: "Assistência técnica",
    description: "Para manutenção, equipamento parado ou suporte técnico.",
    linkLabel: "Solicitar assistência",
    href: ROUTES.SERVICOS,
  },
  {
    icon: Headset,
    title: "Falar com especialista",
    description: "Para dúvidas sobre a melhor solução para sua operação.",
    linkLabel: "Falar com especialista",
    href: ROUTES.CONTATO,
  },
];

export function CommercialRedirectSection() {
  return (
    <Section className="flex flex-col gap-10 lg:gap-14">
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Direcionamento comercial
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          Precisa de orçamento, locação ou assistência técnica?
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Se sua demanda for comercial ou técnica, use os canais abaixo para
          receber atendimento mais rápido.
        </p>
      </div>

      {/* Cards — mesmo estilo da seção "Manutenção preventiva..." da home */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {redirects.map((item) => (
          <div
            key={item.title}
            className="flex flex-1 flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-[#fbfbfb] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <item.icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                {/* Reserva 2 linhas de título e 2 de texto → cards uniformes */}
                <h3 className="min-h-[2.6em] font-heading text-h5 font-semibold leading-[1.3] text-neutral-800">
                  {item.title}
                </h3>
                <p className="line-clamp-2 min-h-[2.7em] text-body leading-[1.35] text-neutral-600">
                  {item.description}
                </p>
              </div>
            </div>
            <TextLink href={item.href} className="w-full px-6 py-4 text-left">
              {item.linkLabel}
            </TextLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
