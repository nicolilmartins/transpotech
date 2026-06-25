import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "@/components/ui/icons";
import { FooterGlow } from "./footer-glow";
import logoLight from "@/assets/images/logo-transpotech-light.svg";
import gptw from "@/assets/images/gptw-badge.png";
import atomsix from "@/assets/images/atomsix-symbol.svg";

const logoWatermark = logoLight;

const linkGroups = [
  {
    title: "Produtos",
    links: [
      "Locação de empilhadeiras",
      "Empilhadeiras novas",
      "Empilhadeiras usadas",
      "Pneus",
      "Baterias e carregadores",
      "Peças",
    ],
  },
  {
    title: "Serviços",
    links: ["Automação intralogística", "Assistência técnica multimarcas"],
  },
  {
    title: "Empresa",
    links: ["Quem somos", "Portal de conteúdo", "Trabalhe conosco", "Contato"],
  },
  {
    title: "ESG",
    links: ["Sustentabilidade", "Canal de transparência", "Ouvidoria digital"],
  },
];

const units = [
  { city: "Blumenau - SC", note: " (Hub Técnico e Seminovas)", phone: "(47) 3331-4900" },
  { city: "Chapecó - SC", phone: "(49) 3981-9975" },
  { city: "Itajaí - SC", phone: "(47) 3331-4901" },
  { city: "Joinville - SC", phone: "(47) 3419-0033" },
  { city: "Curitiba - PR", phone: "(41) 3377-3303" },
  { city: "Caxias do Sul - RS", phone: "(54) 3771-4129" },
  { city: "Nova Santa Rita - RS", phone: "(51) 3479-6740" },
  { city: "Indaiatuba - SP", phone: "(19) 3825-3370" },
  { city: "Aparecida de Goiânia - PR", phone: "(62) 3413-8334" },
  { city: "Maringá - PR", phone: "(44) 3200-0414" },
];

const socials = [Facebook, Instagram, Linkedin, Youtube];

export function Footer() {
  return (
    <footer
      data-header-dark
      data-reveal-skip
      className="relative overflow-hidden rounded-t-2xl bg-neutral-800 px-4 pb-10 pt-14 text-body sm:px-8 lg:px-16 lg:pb-16 lg:pt-20"
    >
      {/* Watermark */}
      <Image
        src={logoWatermark}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 w-[1200px] max-w-none -translate-x-1/2 opacity-[0.03] blur-2xl"
      />

      {/* Blur radial verde no rodapé (#218F73) — acompanha o cursor na horizontal */}
      <FooterGlow />

      <div className="relative flex flex-col gap-8">
        {/* Topo: logo + social + links + selo */}
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-9">
            <Image src={logoLight} alt="TranspoTech" className="h-8 w-[174px]" />
            <div className="flex items-center gap-5">
              {socials.map((Social, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-neutral-300 transition-colors hover:text-neutral-50"
                >
                  <Social className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:flex lg:gap-16">
            {linkGroups.map((group) => (
              <div
                key={group.title}
                className="flex w-full flex-col gap-2 lg:w-fit lg:max-w-[184px] lg:shrink-0"
              >
                <p className="font-semibold leading-[1.35] text-neutral-100">
                  {group.title}
                </p>
                {group.links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="leading-[1.35] text-neutral-300 transition-colors hover:text-neutral-50"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <Image
            src={gptw}
            alt="Great Place To Work Certificada"
            className="h-[90px] w-auto shrink-0 self-start lg:h-[115px] lg:self-auto"
          />
        </div>

        {/* Divisor */}
        <div className="h-px w-full bg-white/10" />

        {/* Unidades */}
        <div className="flex flex-col gap-8">
          <h3 className="font-heading text-h6 font-semibold text-neutral-100">
            Nossas unidades
          </h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-[100px]">
            {units.map((unit) => (
              <div key={unit.city} className="flex flex-col gap-[5px] text-body-sm">
                <p className="leading-[1.35] text-neutral-300">
                  <span className="font-semibold">{unit.city}</span>
                  {unit.note && <span className="font-normal">{unit.note}</span>}
                </p>
                <p className="font-normal leading-[1.35] text-neutral-100">
                  {unit.phone}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div className="h-px w-full bg-white/10" />

        {/* Base */}
        <div className="flex items-center justify-between">
          <p className="text-body-sm leading-[1.35] text-neutral-100">
            © 2026 Transpotech todos os direitos reservados.
          </p>
          <Link
            href="https://www.atom6studio.com/pt-br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-neutral-300 transition-colors hover:text-neutral-50"
          >
            <span className="text-[8px] font-medium uppercase tracking-[0.1em]">
              Criado por
            </span>
            <Image src={atomsix} alt="Atom6 Studio" className="size-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
