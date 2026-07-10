import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/ui/section";
import logoYale from "@/assets/Logos/logo-yale.webp";
import logoClark from "@/assets/Logos/logo-clark.webp";
import logoHyster from "@/assets/Logos/logo-hyster.webp";
import logoToyota from "@/assets/Logos/logo-toyota.webp";
import logoLinde from "@/assets/Logos/logo-linde.webp";
import logoPaletrans from "@/assets/Logos/logo-paletrans.webp";
import logoJungheinrich from "@/assets/Logos/logo-jungheinrich.webp";
import logoCrown from "@/assets/Logos/logo-crown.webp";

type Brand = { name: string; logo: StaticImageData; heightClass?: string };

// Altura padrão dos logos = h-9. Yale e Crown vêm com menos margem interna, então
// aparentam maiores — reduzimos a altura para equilibrar visualmente.
const brands: Brand[] = [
  { name: "Yale", logo: logoYale, heightClass: "h-7" },
  { name: "Clark", logo: logoClark },
  { name: "Hyster", logo: logoHyster },
  { name: "Toyota", logo: logoToyota },
  { name: "Linde", logo: logoLinde },
  { name: "Paletrans", logo: logoPaletrans },
  { name: "Jungheinrich", logo: logoJungheinrich },
  { name: "Crown", logo: logoCrown, heightClass: "h-7" },
];

export function MultibrandSection() {
  return (
    <Section className="flex flex-col gap-10 lg:gap-12">
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 text-center">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Assistência multimarcas
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          Manutenção para empilhadeiras de{" "}
          <span className="font-bold text-primary-500">todas as marcas</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          Nossa equipe conectada ao departamento de peças garante agilidade no
          atendimento e o menor custo para sua operação.
        </p>
      </div>

      {/* Cards de marca — logos em tom de cinza (fallback: nome em texto) */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex min-h-[112px] items-center justify-center rounded-xl bg-[#fbfbfc] px-4 py-8 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_32px_0_rgba(33,143,115,0.18)]"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                className={`${brand.heightClass ?? "h-9"} w-auto max-w-[150px] object-contain`}
              />
            </div>
          ))}
        </div>
        <p className="text-center text-body-sm leading-[1.35] text-neutral-500">
          Também atendemos equipamentos importados e chineses — todas as marcas e
          modelos, elétricos e a combustão.
        </p>
      </div>
    </Section>
  );
}
