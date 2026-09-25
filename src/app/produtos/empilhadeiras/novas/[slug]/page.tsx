import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";
import { notFound } from "next/navigation";

import { ProductDetailSection } from "@/components/empilhadeiras-novas/product-detail/product-detail-section";
import { ModelExperienceSection } from "@/components/empilhadeiras-novas/model-experience-section/model-experience-section";
import { ModelHighlightsSection } from "@/components/empilhadeiras-novas/model-highlights-section/model-highlights-section";
import { RelatedProductsSection } from "@/components/empilhadeiras-novas/related-products/related-products-section";
import { BackToCatalog } from "@/components/empilhadeiras-novas/back-to-catalog/back-to-catalog";
import { DriftMesh } from "@/components/layout/drift-mesh";
import {
  getForkliftDetail,
  getForkliftNovaBySlug,
  getForkliftNovaSlugs,
  getForkliftsNovas,
  getRelatedForklifts,
} from "@/sanity/queries/forklifts";
import { getPage } from "@/sanity/queries/pages";
import { empilhadeirasNovasPage } from "@/sanity/content/pages/empilhadeiras-novas";
import { ROUTES } from "@/lib/routes";

type DetailPageProps = {
  params: Promise<{ slug: string }>;
};

// Modelos publicados no CMS depois do build são gerados na primeira visita
// (dynamicParams padrão); slug inexistente cai no notFound() da página.

export async function generateStaticParams() {
  const slugs = await getForkliftNovaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const forklift = await getForkliftNovaBySlug(slug);

  if (!forklift) {
    return { title: "Produto não encontrado" };
  }

  const detail = await getForkliftDetail(forklift);

  return {
    title: forklift.name,
    description: `${forklift.name}: ${detail.tagline} ${forklift.application}. Solicite seu orçamento com a TranspoTech.`,
    alternates: { canonical: `${ROUTES.EMPILHADEIRAS_NOVAS}/${forklift.id}` },
    openGraph: {
      ...baseOpenGraph,
      title: `${forklift.name} | TranspoTech`,
      description: `${forklift.name}: ${forklift.application}.`,
    },
  };
}

export default async function EmpilhadeiraNovaDetalhePage({
  params,
}: DetailPageProps) {
  const { slug } = await params;
  const [forklifts, { detail: content }] = await Promise.all([
    getForkliftsNovas(),
    getPage(empilhadeirasNovasPage),
  ]);
  const forklift = forklifts.find((f) => f.id === slug);

  if (!forklift) notFound();

  const detail = await getForkliftDetail(forklift);
  const related = getRelatedForklifts(forklifts, forklift, 4);

  return (
    <main>
      {/* Grupo claro — hero (pt extra → clareira do header flutuante).
          Malha animada no topo (DriftMesh, como na hero do Canal da
          Transparência), no mesmo tamanho da hero do catálogo de novas:
          altura de viewport + fade na base.
          data-header-hero → header laranja sobre a hero (igual à home). */}
      <div
        data-header-hero
        className="relative isolate bg-background pt-[96px]"
      >
        <DriftMesh
          fade
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-svh"
        />
        <ProductDetailSection
          forklift={forklift}
          forklifts={forklifts}
          content={content}
        />
      </div>

      {/* Palco do modelo — imagem full-bleed com zoom (fundo claro) */}
      <div className="relative isolate bg-background">
        <ModelExperienceSection detail={detail} />
      </div>

      {/* Destaques do modelo — layout de lista (Planos de locação), dark mode,
          com o botão "Ver ficha técnica" no cabeçalho */}
      <ModelHighlightsSection
        detail={detail}
        datasheetLabel={content.datasheetLabel}
      />

      {/* Relacionados */}
      <div className="relative isolate bg-neutral-50">
        <RelatedProductsSection
          items={related}
          forklifts={forklifts}
          content={content}
        />
      </div>

      <BackToCatalog label={content.backLabel} />
    </main>
  );
}
