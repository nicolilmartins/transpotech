import { ShoppingCart, MessageSquare, Wrench, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/lib/routes";

type Redirect = {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  Icon: LucideIcon;
};

const redirects: Redirect[] = [
  {
    title: "Orçamentos e vendas",
    description: "Para compra, locação ou peças, utilize o contato comercial.",
    linkLabel: "Ir para contato",
    href: ROUTES.CONTATO,
    Icon: ShoppingCart,
  },
  {
    title: "Reclamações ou sugestões",
    description:
      "Para manifestações gerais sobre atendimento, relacionamento ou serviços, use a Ouvidoria Digital.",
    linkLabel: "Acessar Ouvidoria",
    href: ROUTES.OUVIDORIA,
    Icon: MessageSquare,
  },
  {
    title: "Assistência técnica",
    description:
      "Para manutenção ou equipamento parado, solicite atendimento técnico.",
    linkLabel: "Solicitar assistência",
    href: ROUTES.SERVICOS,
    Icon: Wrench,
  },
];

export function RedirectSection() {
  return (
    <Section className="flex flex-col gap-10 lg:gap-14">
      <div className="flex max-w-[720px] flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Direcionamento
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          <span className="lg:block">Este não é o melhor canal</span>{" "}
          <span className="lg:block font-bold">para todos os assuntos</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Para temas comerciais, dúvidas, orçamento, reclamações de atendimento
          ou solicitações gerais, utilize a Ouvidoria Digital ou a página de
          Contato.
        </p>
      </div>

      {/* Cards no padrão da "Governança, escuta e transparência" */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        {redirects.map((item) => (
          <div
            key={item.title}
            className="flex flex-col overflow-hidden rounded-xl bg-primary-50 transition-shadow duration-300 hover:shadow-[0_16px_48px_0_rgba(245,130,32,0.3)]"
          >
            <div className="flex flex-1 flex-col gap-8 rounded-xl bg-[#fbfbfb] p-6 lg:p-8">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 lg:size-12">
                <item.Icon className="size-6 text-white lg:size-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-[20px] font-semibold leading-[1.3] text-neutral-800">
                  {item.title}
                </h3>
                <p className="text-body leading-[1.35] text-neutral-600">
                  {item.description}
                </p>
              </div>
            </div>
            <TextLink
              href={item.href}
              className="w-full px-6 py-4 text-left lg:px-8"
            >
              {item.linkLabel}
            </TextLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
