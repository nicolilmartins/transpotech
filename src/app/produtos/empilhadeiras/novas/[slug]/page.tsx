import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailSection } from "@/components/empilhadeiras-novas/product-detail/product-detail-section";
import { ModelExperienceSection } from "@/components/empilhadeiras-novas/model-experience-section/model-experience-section";
import { ModelGallerySection } from "@/components/empilhadeiras-novas/model-gallery-section/model-gallery-section";
import { RelatedProductsSection } from "@/components/empilhadeiras-novas/related-products/related-products-section";
import { BackToCatalog } from "@/components/empilhadeiras-novas/back-to-catalog/back-to-catalog";
import { MeshBackground } from "@/components/layout/mesh-background/mesh-background";
import {
  forkliftsNovas,
  getForkliftBySlug,
  getRelatedForklifts,
} from "@/data/forklifts-novas";
import { getForkliftDetail } from "@/data/forklift-details";
import { ROUTES } from "@/lib/routes";

type DetailPageProps = {
  params: Promise<{ slug: string }>;
};

// Catálogo é um conjunto fixo: slugs fora de generateStaticParams retornam 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return forkliftsNovas.map((forklift) => ({ slug: forklift.id }));
}

export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const forklift = getForkliftBySlug(slug);

  if (!forklift) {
    return { title: "Produto não encontrado" };
  }

  const detail = getForkliftDetail(forklift);

  return {
    title: forklift.name,
    description: `${forklift.name} — ${detail.tagline} ${forklift.application}. Solicite seu orçamento com a TranspoTech.`,
    alternates: { canonical: `${ROUTES.EMPILHADEIRAS_NOVAS}/${forklift.id}` },
    openGraph: {
      title: `${forklift.name} | TranspoTech`,
      description: `${forklift.name} — ${forklift.application}.`,
    },
  };
}

export default async function EmpilhadeiraNovaDetalhePage({
  params,
}: DetailPageProps) {
  const { slug } = await params;
  const forklift = getForkliftBySlug(slug);

  if (!forklift) notFound();

  const detail = getForkliftDetail(forklift);
  const related = getRelatedForklifts(forklift, 4);

  return (
    <main>
      {/* Grupo claro — hero (pt extra → clareira do header flutuante).
          Malha no topo, no mesmo tamanho da hero do catálogo de novas
          (MeshBackground: largura 100%, altura natural, ancorada no topo).
          data-header-hero → header laranja sobre a hero (igual à home). */}
      <div
        data-header-hero
        className="relative isolate bg-[#fdfdfd] pt-[96px]"
      >
        <MeshBackground className="pointer-events-none absolute inset-0 -z-10" />
        <ProductDetailSection forklift={forklift} />
      </div>

      {/* Experiência do modelo — gerencia o próprio fundo (claro → dark no scroll) */}
      <div className="relative isolate bg-[#fdfdfd]">
        <ModelExperienceSection detail={detail} />
      </div>

      {/* Grupo claro — galeria + relacionados */}
      <div className="relative isolate bg-[#f7f6f6]">
        <ModelGallerySection
          gallery={detail.media.gallery}
          datasheetHref={detail.datasheetHref}
        />
        <RelatedProductsSection items={related} />
      </div>

      <BackToCatalog />
    </main>
  );
}
