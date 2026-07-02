import { Section } from "@/components/ui/section";

export function PortalHeroSection() {
  return (
    <section
      data-header-hero
      className="relative isolate bg-[#181616] pt-[72px]"
    >
      <Section className="flex flex-col gap-4">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-primary-500">
          Portal de conteúdo
        </p>
        <h1 className="max-w-[720px] text-h2 font-bold text-neutral-50">
          Conhecimento para sua operação intralogística
        </h1>
        <p className="max-w-[620px] text-body leading-[1.35] text-neutral-400">
          Artigos técnicos, guias decisórios, cases de clientes e tendências
          sobre locação, manutenção, automação e ESG. Sem enrolação.
        </p>
      </Section>
    </section>
  );
}
