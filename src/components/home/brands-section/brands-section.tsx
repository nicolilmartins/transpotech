import Image from "next/image";
import still from "@/assets/Logos/Logo still.svg";
import linde from "@/assets/Logos/Logo Linde.svg";
import baoli from "@/assets/Logos/Logo Baoli.svg";
import dematic from "@/assets/Logos/Logo Dematic.svg";

const brands = [
  { src: still, alt: "STILL" },
  { src: linde, alt: "Linde" },
  { src: baoli, alt: "Baoli" },
  { src: dematic, alt: "Dematic" },
];

export function BrandsSection() {
  return (
    <section
      data-header-dark
      className="flex flex-col items-center px-4 py-16 sm:px-8 lg:px-16 lg:py-20"
    >
      <div className="flex w-full flex-col items-center gap-16">
        <h2 className="w-[520px] max-w-full text-center text-[32px] leading-[1.3] text-neutral-100">
          <span className="font-normal">Trabalhamos com as marcas </span>
          <span className="font-bold">líderes globais</span>
        </h2>

        <div className="flex h-auto w-full flex-wrap items-center justify-center gap-8 lg:flex-nowrap lg:gap-[90px]">
          {brands.map((b) => (
            <Image key={b.alt} src={b.src} alt={b.alt} className="h-12 w-auto lg:h-[83px]" />
          ))}
        </div>
      </div>
    </section>
  );
}
