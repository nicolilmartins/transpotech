import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import type { ArticleCategory } from "@/data/articles";

type NextStep = { label: string; href: string };

// CTA contextual por categoria do artigo (conforme wireframe: Locação →
// "Quero locar uma empilhadeira").
const ctaByCategory: Record<ArticleCategory, NextStep> = {
  Locação: { label: "Quero locar uma empilhadeira", href: ROUTES.LOCACAO },
  "Empilhadeiras novas": {
    label: "Ver empilhadeiras novas",
    href: ROUTES.EMPILHADEIRAS_NOVAS,
  },
  Automação: { label: "Conhecer automação", href: ROUTES.AUTOMACAO },
  "Cases de cliente": {
    label: "Falar com especialista",
    href: ROUTES.CONTATO,
  },
};

export function NextStepSection({ category }: { category: ArticleCategory }) {
  const cta = ctaByCategory[category] ?? {
    label: "Falar com especialista",
    href: ROUTES.CONTATO,
  };

  return (
    <Section className="flex flex-col gap-6 rounded-2xl bg-neutral-50 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex max-w-[560px] flex-col gap-3">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Próximo passo
        </p>
        <h2 className="text-h4 font-bold text-neutral-800">Pronto pra avançar?</h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Fale com a equipe TranspoTech sobre o tema deste conteúdo, sem
          compromisso.
        </p>
      </div>

      <Button
        variant="primary"
        size="lg"
        href={cta.href}
        iconRight={<ArrowRight aria-hidden className="size-5" />}
        className="w-full justify-center sm:w-auto"
      >
        {cta.label}
      </Button>
    </Section>
  );
}
