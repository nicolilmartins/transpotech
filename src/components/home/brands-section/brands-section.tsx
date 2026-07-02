import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import still from "@/assets/Logos/Logo still.svg";
import linde from "@/assets/Logos/Logo Linde.svg";
import baoli from "@/assets/Logos/Logo Baoli.svg";
import dematic from "@/assets/Logos/Logo Dematic.svg";

export type Brand = {
  src: StaticImageData;
  alt: string;
  /** Quando false, não aplica o filtro monocromático no tom claro. Padrão: true. */
  mono?: boolean;
  /** Classes extras para ajuste fino do logo (ex.: escala). */
  className?: string;
};

const defaultBrands: Brand[] = [
  { src: still, alt: "STILL" },
  { src: linde, alt: "Linde" },
  { src: baoli, alt: "Baoli" },
  { src: dematic, alt: "Dematic" },
];

type BrandsSectionProps = {
  /** Primeira parte do título (home). */
  titleRegular?: string;
  /** Segunda parte do título em negrito (home). */
  titleAccent?: string;
  /** Quando definido, renderiza um rótulo curto centralizado no lugar do título. */
  eyebrow?: string;
  /** "dark" (home, padrão) ou "light" (páginas claras de produto). */
  tone?: "dark" | "light";
  /** Lista de marcas a exibir. Padrão = STILL, Linde, Baoli, Dematic. */
  brands?: Brand[];
};

export function BrandsSection({
  titleRegular = "Trabalhamos com as marcas ",
  titleAccent = "líderes globais",
  eyebrow,
  tone = "dark",
  brands = defaultBrands,
}: BrandsSectionProps = {}) {
  const isLight = tone === "light";

  return (
    <Section
      {...(isLight ? {} : { "data-header-dark": true })}
      className="flex flex-col items-center"
    >
      <div
        className={`flex w-full flex-col items-center ${
          eyebrow ? "gap-8" : "gap-10 lg:gap-16"
        }`}
      >
        {eyebrow ? (
          <h2 className="text-center text-body font-normal leading-[1.35] text-neutral-800">
            {eyebrow}
          </h2>
        ) : (
          <h2
            className={`w-[520px] max-w-full text-center text-h2 leading-[1.3] ${
              isLight ? "text-neutral-800" : "text-neutral-100"
            }`}
          >
            <span className="font-normal">{titleRegular}</span>
            <span className="font-bold">{titleAccent}</span>
          </h2>
        )}

        <div className="grid w-full grid-cols-2 place-items-center gap-x-8 gap-y-10 sm:gap-8 lg:flex lg:h-auto lg:flex-nowrap lg:items-center lg:justify-center lg:gap-[90px]">
          {brands.map((b) => (
            <Image
              key={b.alt}
              src={b.src}
              alt={b.alt}
              className={`h-10 w-auto sm:h-12 lg:h-[83px] ${
                isLight && b.mono !== false
                  ? "[filter:brightness(0)_invert(0.35)]"
                  : ""
              } ${b.className ?? ""}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
