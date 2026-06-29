import { Construction } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MeshBackground } from "@/components/layout/mesh-background/mesh-background";
import { ROUTES } from "@/lib/routes";

type UnderConstructionProps = {
  /** Nome da página (vira o h1). */
  title: string;
  /** Mensagem opcional; usa um texto padrão quando ausente. */
  description?: string;
};

export function UnderConstruction({ title, description }: UnderConstructionProps) {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center bg-[#fdfdfd]">
      <MeshBackground className="pointer-events-none absolute inset-0 -z-10" />

      <Section className="flex flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-body-sm font-semibold text-primary-600">
          <Construction aria-hidden className="size-4" />
          Em construção
        </span>

        <h1 className="text-h2 text-neutral-900">{title}</h1>

        <p className="max-w-[520px] text-body leading-[1.35] text-neutral-600">
          {description ??
            "Estamos preparando esta página. Em breve ela estará disponível com todo o conteúdo. Enquanto isso, explore o restante do site."}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" size="lg" href={ROUTES.HOME}>
            Voltar para o início
          </Button>
          <Button variant="gray" size="lg" href={ROUTES.EMPILHADEIRAS_NOVAS}>
            Ver empilhadeiras novas
          </Button>
        </div>
      </Section>
    </section>
  );
}
