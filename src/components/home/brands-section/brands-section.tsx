import Image from "next/image";
import still from "@/assets/images/brands/still.png";
import linde from "@/assets/images/brands/linde.png";
import baoli from "@/assets/images/brands/baoli.png";
import dematic from "@/assets/images/brands/dematic.png";

const brands = [
  { src: still, alt: "STILL", h: "h-12" },
  { src: linde, alt: "Linde", h: "h-12" },
  { src: baoli, alt: "Baoli", h: "h-[52px]" },
  { src: dematic, alt: "Dematic", h: "h-12" },
];

export function BrandsSection() {
  return (
    <section className="flex flex-col items-center px-16 py-20">
      <div className="flex w-full flex-col items-center gap-16">
        <h2 className="w-[520px] max-w-full text-center text-[32px] leading-[1.3] text-neutral-800">
          <span className="font-normal">Trabalhamos com as marcas </span>
          <span className="font-bold">líderes globais</span>
        </h2>

        <div className="flex h-[109px] w-full items-center justify-center gap-[90px] overflow-hidden">
          {brands.map((b) => (
            <div
              key={b.alt}
              className="flex h-[83px] items-center justify-center px-8"
            >
              <Image src={b.src} alt={b.alt} className={`${b.h} w-auto`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
