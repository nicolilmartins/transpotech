import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export function BackToCatalog() {
  return (
    <section className="bg-neutral-100">
      {/* pb-[72px] = 48px visíveis + 24px comidos pelo -mt-6 do footer, que
          sobrepõe esta seção (padrão de 48px antes do footer em todo o site). */}
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-[72px] pt-4 sm:px-6 lg:px-16">
        <Link
          href={ROUTES.EMPILHADEIRAS_NOVAS}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full text-body font-semibold text-neutral-500 transition-colors hover:text-primary-500"
        >
          Voltar ao catálogo de empilhadeiras novas
          <ArrowRight aria-hidden className="size-5" />
        </Link>
      </div>
    </section>
  );
}
