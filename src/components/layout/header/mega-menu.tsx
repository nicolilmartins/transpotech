import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  Forklift,
  Sparkles,
  Tag,
  Wrench,
  BatteryCharging,
  CircleDot,
  Building2,
  BookOpen,
  Users,
  Leaf,
  Scale,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import automacao from "@/assets/images/automacao.png";
import esgTeam from "@/assets/images/esg-team.png";
import { ROUTES } from "@/lib/routes";

type MegaItem = {
  title: string;
  subtitle: string;
  href: string;
  Icon: LucideIcon;
};

type MegaColumn = { title: string; items: MegaItem[] };

export type MegaMenuConfig = {
  featured: {
    image: StaticImageData;
    title: string;
    description: string;
    href: string;
  };
  columns: MegaColumn[];
};

// Megamenus por item de navegação — espelham o sitemap do site.
export const megaMenus: Record<string, MegaMenuConfig> = {
  Produtos: {
    featured: {
      image: automacao,
      title: "Frota pronta para operar",
      description:
        "Locação de empilhadeiras STILL, Linde e Baoli com custo previsível e atendimento técnico 24h.",
      href: ROUTES.LOCACAO,
    },
    columns: [
      {
        title: "Equipamentos",
        items: [
          {
            title: "Locação de empilhadeiras",
            subtitle: "Frota pronta para operar",
            href: ROUTES.LOCACAO,
            Icon: Forklift,
          },
          {
            title: "Empilhadeiras novas",
            subtitle: "Linde, STILL e Baoli zero-km",
            href: ROUTES.EMPILHADEIRAS_NOVAS,
            Icon: Sparkles,
          },
          {
            title: "Empilhadeiras usadas",
            subtitle: "Seminovos revisados com garantia",
            href: ROUTES.EMPILHADEIRAS_USADAS,
            Icon: Tag,
          },
        ],
      },
      {
        title: "Peças & energia",
        items: [
          {
            title: "Peças e componentes",
            subtitle: "Originais e compatíveis em estoque",
            href: ROUTES.PECAS,
            Icon: Wrench,
          },
          {
            title: "Baterias e carregadores",
            subtitle: "Energia para frota elétrica",
            href: ROUTES.BATERIAS,
            Icon: BatteryCharging,
          },
          {
            title: "Pneus",
            subtitle: "Para todos os portes e aplicações",
            href: ROUTES.PNEUS,
            Icon: CircleDot,
          },
        ],
      },
    ],
  },

  Empresa: {
    featured: {
      image: esgTeam,
      title: "Quem é a TranspoTech",
      description:
        "25 anos de mercado, 11 unidades próprias e ~380 técnicos especializados em movimentação.",
      href: ROUTES.QUEM_SOMOS,
    },
    columns: [
      {
        title: "Institucional",
        items: [
          {
            title: "Quem somos",
            subtitle: "Nossa história e estrutura",
            href: ROUTES.QUEM_SOMOS,
            Icon: Building2,
          },
          {
            title: "Portal de conteúdo",
            subtitle: "Guias, notícias e tendências",
            href: ROUTES.PORTAL_CONTEUDO,
            Icon: BookOpen,
          },
          {
            title: "Trabalhe conosco",
            subtitle: "Faça parte do time",
            href: ROUTES.TRABALHE_CONOSCO,
            Icon: Users,
          },
        ],
      },
      {
        title: "ESG e governança",
        items: [
          {
            title: "Sustentabilidade",
            subtitle: "Eletrificação e compromisso ESG",
            href: ROUTES.SUSTENTABILIDADE,
            Icon: Leaf,
          },
          {
            title: "Canal da transparência",
            subtitle: "Compliance e ética",
            href: ROUTES.CANAL_TRANSPARENCIA,
            Icon: Scale,
          },
          {
            title: "Ouvidoria Digital",
            subtitle: "Fale com a ouvidoria",
            href: ROUTES.OUVIDORIA,
            Icon: MessageSquare,
          },
        ],
      },
    ],
  },
};

type MegaMenuProps = {
  open: boolean;
  id: string;
  config: MegaMenuConfig;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onNavigate: () => void;
};

export function MegaMenu({
  open,
  id,
  config,
  onPointerEnter,
  onPointerLeave,
  onNavigate,
}: MegaMenuProps) {
  const { featured, columns } = config;

  return (
    <div
      id={id}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
      className={[
        "absolute inset-x-0 top-full z-40 hidden pt-3 lg:block",
        "transition duration-200 ease-out",
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0",
      ].join(" ")}
    >
      <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
        <div className="flex gap-4">
          {/* Card em destaque */}
          <Link
            href={featured.href}
            onClick={onNavigate}
            className="group relative flex w-[300px] shrink-0 flex-col justify-end overflow-hidden rounded-2xl bg-neutral-900 p-6"
          >
            <Image
              src={featured.image}
              alt=""
              fill
              sizes="300px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"
            />
            <div className="relative flex flex-col gap-2">
              <h3 className="font-heading text-[20px] font-bold leading-[1.2] text-neutral-50">
                {featured.title}
              </h3>
              <p className="text-sm leading-[1.4] text-neutral-200">
                {featured.description}
              </p>
            </div>
          </Link>

          {/* Colunas de itens */}
          <div className="flex flex-1 flex-col justify-center p-2">
            <div
              className={[
                "grid gap-y-2",
                columns.length > 1 ? "grid-cols-2 gap-x-8" : "grid-cols-1",
              ].join(" ")}
            >
              {columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-1">
                  <p className="px-3 text-sm font-semibold leading-6 text-neutral-400">
                    {col.title}
                  </p>
                  <ul role="list" className="flex flex-col">
                    {col.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          className="group/item flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-neutral-50"
                        >
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-neutral-50 text-neutral-700 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-colors group-hover/item:bg-white group-hover/item:text-primary-500">
                            <item.Icon className="size-5" aria-hidden />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-body font-semibold leading-tight text-neutral-800">
                              {item.title}
                            </span>
                            <span className="text-sm leading-snug text-neutral-500">
                              {item.subtitle}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
