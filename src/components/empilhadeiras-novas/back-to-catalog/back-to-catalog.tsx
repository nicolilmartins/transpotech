import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export function BackToCatalog() {
  return (
    <section className="bg-neutral-100">
      {/* 32px visíveis em cima e embaixo. pt-8 = 32px; pb-14 = 56px, sendo
          32px visíveis + 24px comidos pelo -mt-6 do footer, que sobrepõe esta
          seção. */}
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 pt-8 sm:px-6 lg:px-16">
        <Link
          href={ROUTES.EMPILHADEIRAS_NOVAS}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full text-body font-semibold text-neutral-500 transition-colors hover:text-primary-500"
        >
          <ArrowLeft aria-hidden className="size-5" />
          Voltar ao catálogo de empilhadeiras novas
        </Link>
      </div>
    </section>
  );
}
