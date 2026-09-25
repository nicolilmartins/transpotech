import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";
import { notFound } from "next/navigation";

import { SeminovaDetailSection } from "@/components/empilhadeiras-seminovas/detail-section/seminova-detail-section";
import { ClassifiedsSection } from "@/components/empilhadeiras-seminovas/classifieds-section/classifieds-section";
import { DriftMesh } from "@/components/layout/drift-mesh";
import {
  getForkliftSeminovaBySlug,
  getForkliftSeminovaSlugs,
  getForkliftsSeminovas,
  getOtherSeminovas,
} from "@/sanity/queries/forklifts";
import { getPage } from "@/sanity/queries/pages";
import { seminovasPage } from "@/sanity/content/pages/seminovas";
import { ROUTES } from "@/lib/routes";

type DetailPageProps = {
  params: Promise<{ slug: string }>;
};

// Modelos publicados no CMS depois do build são gerados na primeira visita
// (dynamicParams padrão); slug inexistente cai no notFound() da página.

export async function generateStaticParams() {
  const slugs = await getForkliftSeminovaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const forklift = await getForkliftSeminovaBySlug(slug);

  if (!forklift) {
    return { title: "Equipamento não encontrado" };
  }

  const description = `${forklift.name} seminova, ano ${forklift.year ?? "-"}, ${forklift.capacity} de capacidade, disponível em ${forklift.location}. Solicite seu orçamento com a TranspoTech.`;

  return {
    title: `${forklift.name} seminova`,
    description,
    alternates: {
      canonical: `${ROUTES.EMPILHADEIRAS_SEMINOVAS}/${forklift.id}`,
    },
    openGraph: {
      ...baseOpenGraph,
      title: `${forklift.name} seminova | TranspoTech`,
      description,
    },
  };
}

export default async function EmpilhadeiraSeminovaDetalhePage({
  params,
}: DetailPageProps) {
  const { slug } = await params;
  const [forklifts, { detail: content, classifieds }] = await Promise.all([
    getForkliftsSeminovas(),
    getPage(seminovasPage),
  ]);
  const forklift = forklifts.find((f) => f.id === slug);

  if (!forklift) notFound();

  const others = getOtherSeminovas(forklifts, forklift);

  return (
    <main>
      {/* Grupo claro — galeria + informações (pt extra → clareira do header
          flutuante). Mesma malha animada da hero do detalhe de novas.
          data-header-hero → header laranja sobre a hero (igual à home). */}
      <div data-header-hero className="relative isolate bg-background pt-[96px]">
        <DriftMesh
          fade
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-svh"
        />
        <SeminovaDetailSection
          forklift={forklift}
          forklifts={forklifts}
          content={content}
        />
      </div>

      {/* Outros classificados — mesmo carrossel da página de seminovas */}
      <div className="relative isolate bg-neutral-50">
        <ClassifiedsSection
          items={others}
          quoteOptions={forklifts}
          eyebrow={content.othersEyebrow}
          title={content.othersTitle}
          labelYear={classifieds.labelYear}
          labelHours={classifieds.labelHours}
          labelCapacity={classifieds.labelCapacity}
          labelLocation={classifieds.labelLocation}
        />
      </div>
    </main>
  );
}
