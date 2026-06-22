import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="overflow-hidden rounded-t-2xl bg-neutral-50">
      <div className="relative flex h-[419px] flex-col items-center justify-center gap-10 overflow-hidden px-16 py-20">
        <div className="pointer-events-none absolute -right-32 -top-40 size-[700px] -rotate-45 rounded-full bg-primary-500/15 blur-[120px]" />
        <div className="pointer-events-none absolute -left-40 top-0 size-[700px] -rotate-45 rounded-full bg-secondary-600/15 blur-[120px]" />

        <div className="relative flex flex-col items-center gap-4 text-center">
          <h2 className="w-[465px] max-w-full text-h2 text-neutral-800">
            <span className="font-normal">Qual é o maior gargalo </span>
            <span className="font-bold text-primary-500">da sua operação?</span>
          </h2>
          <p className="w-[386px] max-w-full text-body leading-[1.35] text-neutral-600">
            Um especialista analisa seu cenário e apresenta a opção mais
            adequada, sem compromisso.
          </p>
        </div>
        <Button variant="primary" size="lg" className="relative">
          Falar com especialistas
        </Button>
      </div>
    </section>
  );
}
