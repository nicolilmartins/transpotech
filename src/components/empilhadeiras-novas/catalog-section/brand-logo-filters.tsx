"use client";

import { useSyncExternalStore } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  EMPTY_BRANDS,
  readBrands,
  subscribeBrands,
  writeBrands,
} from "@/components/empilhadeiras-novas/catalog-section/catalog/brand-filter";
import type { ForkliftBrand } from "@/types/forklift.types";
import still from "@/assets/Logos/Logo still.svg";
import linde from "@/assets/Logos/Logo Linde.svg";
import baoli from "@/assets/Logos/Logo Baoli.svg";

const brandLogos: { brand: ForkliftBrand; src: StaticImageData }[] = [
  { brand: "STILL", src: still },
  { brand: "Linde", src: linde },
  { brand: "Baoli", src: baoli },
];

// Logos do cabeçalho como atalho do filtro "Marca" do catálogo logo abaixo.
// Escrevem na mesma fonte que os checkboxes da barra lateral (a query string),
// então os dois controles nunca divergem.
//
// Por decisão de design, o logo NÃO muda de aparência quando está filtrando —
// o estado aparece no filtro lateral e nos resultados. O `aria-pressed` existe
// mesmo assim: sem pista visual, é a única forma de um leitor de tela saber o
// que está ativo. O anel de foco é de teclado (focus-visible), não é estado.
export function BrandLogoFilters() {
  const brands = useSyncExternalStore(
    subscribeBrands,
    readBrands,
    () => EMPTY_BRANDS
  );

  const toggle = (brand: ForkliftBrand) => {
    // Clicar troca a marca filtrada; clicar na que já está sozinha, limpa.
    const isOnlyActive = brands.length === 1 && brands[0] === brand;
    writeBrands(isOnlyActive ? [] : [brand]);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:gap-x-12 lg:gap-16">
      {brandLogos.map((logo) => (
        <button
          key={logo.brand}
          type="button"
          onClick={() => toggle(logo.brand)}
          aria-pressed={brands.includes(logo.brand)}
          aria-label={`Filtrar catálogo por ${logo.brand}`}
          className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
        >
          <Image
            src={logo.src}
            alt=""
            className="h-10 w-auto [filter:brightness(0)_invert(0.35)] sm:h-12"
          />
        </button>
      ))}
    </div>
  );
}
