import { Section } from "@/components/ui/section";

export function PortalHeroSection() {
  return (
    <Section className="flex flex-col gap-4 pb-6 lg:pb-8">
      <h1 className="max-w-[720px] text-h2 font-bold text-neutral-800">
        Conhecimento para sua
        <br />
        <span className="text-primary-500">operação intralogística</span>
      </h1>
      <p className="max-w-[620px] text-body leading-[1.35] text-neutral-600">
        Artigos técnicos, guias decisórios, cases de clientes e tendências
        sobre locação,
        <br />
        manutenção, automação e ESG.
      </p>
    </Section>
  );
}
