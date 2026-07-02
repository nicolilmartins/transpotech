import Image, { type StaticImageData } from "next/image";
import { Package, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import logoYale from "@/assets/Logos/logo-yale.webp";
import logoClark from "@/assets/Logos/logo-clark.webp";
import logoHyster from "@/assets/Logos/logo-hyster.webp";
import logoToyota from "@/assets/Logos/logo-toyota.webp";
import logoLinde from "@/assets/Logos/logo-linde.webp";
import logoPaletrans from "@/assets/Logos/logo-paletrans.webp";
import logoJungheinrich from "@/assets/Logos/logo-jungheinrich.webp";
import logoCrown from "@/assets/Logos/logo-crown.webp";
import illoToolBox from "@/assets/images/stats/illustration-tool-box.webp";

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

const perks = [
  "Estoque de peças originais e multimarcas",
  "Diagnóstico e cotação em uma única conversa",
  "Menos tempo de equipamento parado",
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
          A TranspoTech presta serviços para empilhadeiras elétricas e a
          combustão de diferentes fabricantes — equipamentos nacionais,
          importados e chineses, todas as marcas e modelos.
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

      {/* Banner claro — conectados ao departamento de peças.
          Visual inspirado nos cards de números da home: fundo claro, leve glow
          laranja + ilustração no canto direito com zoom sutil no hover. */}
      <div className="group relative isolate flex flex-col gap-6 overflow-hidden rounded-2xl bg-[#f9f9f9] p-6 lg:flex-row lg:p-8">
        {/* Glow laranja suave à direita */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-1/2 h-[260px] w-[400px] -translate-y-1/2 rounded-full bg-primary-500/15 blur-[120px]"
        />
        {/* Ilustração no canto direito */}
        <Image
          src={illoToolBox}
          alt=""
          className="pointer-events-none absolute -bottom-6 right-0 hidden h-[170px] w-auto origin-bottom-right select-none object-contain transition-transform duration-500 ease-out group-hover:scale-105 sm:block lg:right-4 lg:h-[210px]"
        />

        <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500">
          <Package aria-hidden className="size-6" />
        </span>
        <div className="relative flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="font-heading text-h6 font-semibold text-neutral-800">
              Conectados ao departamento de peças
            </h3>
            <p className="max-w-[760px] text-body leading-[1.35] text-neutral-600">
              Nossa equipe de assistência multimarcas e mecânicos trabalha
              integrada ao departamento de peças. Resultado: mais agilidade no
              atendimento e soluções com custo menor para sua operação.
            </p>
          </div>
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2.5">
                <Check aria-hidden className="size-5 shrink-0 text-primary-500" />
                <span className="text-body-sm text-neutral-700">{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
