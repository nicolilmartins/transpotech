import { Section } from "@/components/ui/section";

export function AboutSection() {
  return (
    <Section data-header-dark className="flex flex-col gap-6">
      <h2 className="max-w-[820px] text-h2 text-neutral-50">
        <span className="font-normal">O que sua operação de</span>{" "}
        <br className="hidden lg:inline" />
        <span className="font-bold text-primary-500">
          intralogística precisa
        </span>
      </h2>
      <div className="flex max-w-[720px] flex-col gap-4 text-body leading-[1.35] text-neutral-400">
        <p>
          A TranspoTech é uma empresa especializada em soluções para
          intralogística, com atuação em equipamentos de movimentação, locação,
          manutenção, peças e suporte técnico.
        </p>
        <p>
          Mais do que fornecer empilhadeiras, atuamos como parceira de empresas
          que precisam reduzir paradas, aumentar produtividade e manter suas
          operações funcionando com segurança.
        </p>
      </div>
    </Section>
  );
}
