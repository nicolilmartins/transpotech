import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export function BackToCatalog() {
  return (
    <section className="bg-neutral-100">
      {/* pb compensa o -mt-6 (24px) do footer, que sobrepõe esta seção: assim o
          espaçamento visível em cima (pt-4) e embaixo (pb-10 − 24px) fica igual. */}
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-10 pt-4 sm:px-6 lg:px-16 2xl:px-30">
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
