"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";

type ProductGalleryProps = {
  images: StaticImageData[];
  alt: string;
};

const MAX_THUMBS = 4;

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const thumbs = images.slice(0, MAX_THUMBS);
  const extraCount = images.length - MAX_THUMBS;

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
      {/* Coluna de miniaturas */}
      {thumbs.length > 1 && (
        <ul className="flex gap-3 sm:w-[100px] sm:flex-col sm:gap-4">
          {thumbs.map((image, i) => {
            const isOverflow = i === MAX_THUMBS - 1 && extraCount > 0;
            const isActive = selected === i;
            return (
              <li key={i} className="flex-1 sm:flex-none">
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-label={`Ver imagem ${i + 1} de ${images.length}`}
                  aria-current={isActive}
                  className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border bg-neutral-50 transition-colors ${
                    isActive
                      ? "border-primary-500"
                      : "border-transparent hover:border-neutral-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    className="size-full object-contain p-2"
                  />
                  {isOverflow && (
                    <span className="absolute inset-0 flex items-center justify-center bg-neutral-900/55 text-h5 font-semibold text-neutral-50">
                      +{extraCount}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Imagem principal — no mobile a altura fixa vale (sem flex-1, que zeraria
          a base e colapsaria a imagem); do sm+ o flex-1 preenche a linha. */}
      <div className="relative h-[300px] overflow-hidden rounded-2xl bg-neutral-50 sm:h-[440px] sm:flex-1 lg:h-[504px]">
        <Image
          src={images[selected]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 590px, 100vw"
          className="object-contain p-6"
        />
      </div>
    </div>
  );
}
