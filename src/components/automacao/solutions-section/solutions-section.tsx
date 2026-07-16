"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  Boxes,
  Workflow,
  Bot,
  Zap,
  Inbox,
  Route,
  Warehouse,
  PackageSearch,
  Send,
  Navigation,
  Grid3x3,
  MoveRight,
  Layers,
  Shuffle,
  Cpu,
  GitBranch,
  LayoutPanelTop,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import imgSolucoes from "@/assets/images/image-solucoes.webp";
import imgSistemas from "@/assets/images/image_sistemas.webp";
import imgAgv from "@/assets/images/image_agv.webp";

type Item = { title: string; description: string; Icon: LucideIcon };

type Category = {
  name: string;
  Icon: LucideIcon;
  // Título do card em duas linhas (ao menos duas palavras em cada).
  headline: [string, string];
  image: StaticImageData;
  // Ancoragem do crop da imagem (object-position). Default: center.
  imagePosition?: string;
  items: Item[];
};

const categories: Category[] = [
  {
    name: "Soluções",
    Icon: Boxes,
    headline: ["Soluções para atender pedidos", "com velocidade"],
    image: imgSolucoes,
    items: [
      {
        Icon: Zap,
        title: "Microatendimento",
        description: "Fulfillment rápido perto do consumidor.",
      },
      {
        Icon: Boxes,
        title: "Atendimento em caixas mistas",
        description: "Paletes e caixas montados por pedido.",
      },
    ],
  },
  {
    name: "Sistemas",
    Icon: Workflow,
    headline: ["Sistemas que cobrem", "toda a operação"],
    image: imgSistemas,
    items: [
      {
        Icon: Inbox,
        title: "Recebimento",
        description: "Conferência e alocação automatizadas.",
      },
      {
        Icon: Route,
        title: "Transporte",
        description: "Movimentação interna entre etapas.",
      },
      {
        Icon: Warehouse,
        title: "Armazenagem",
        description: "Estocagem densa automatizada (AS/RS).",
      },
      {
        Icon: PackageSearch,
        title: "Separação",
        description: "Picking assistido, rápido e preciso.",
      },
      {
        Icon: Send,
        title: "Envio",
        description: "Embalagem e expedição no prazo.",
      },
    ],
  },
  {
    name: "AGV & Robótica",
    Icon: Bot,
    headline: ["AGV e robótica", "para operações autônomas"],
    image: imgAgv,
    imagePosition: "70% center",
    items: [
      {
        Icon: Navigation,
        title: "AGV",
        description: "Transporte de cargas sem operador.",
      },
      {
        Icon: Bot,
        title: "Robôs móveis autônomos (AMR)",
        description: "Navegação autônoma pelo layout.",
      },
      {
        Icon: Grid3x3,
        title: "AutoStore",
        description: "Armazenagem ultracompacta em cubos.",
      },
      {
        Icon: PackageSearch,
        title: "Separação de caixas e peças",
        description: "Picking automatizado de caixas e peças.",
      },
      {
        Icon: MoveRight,
        title: "Esteiras",
        description: "Transportadores entre cada etapa.",
      },
      {
        Icon: Layers,
        title: "Paletização e despaletização",
        description: "Montagem e desmontagem de paletes.",
      },
      {
        Icon: Shuffle,
        title: "Sorter de bolsas",
        description: "Classificação em bolsas, alta cadência.",
      },
      {
        Icon: Cpu,
        title: "Robótica",
        description: "Braços e células de manuseio.",
      },
      {
        Icon: GitBranch,
        title: "Sistemas de classificação",
        description: "Sorters de alto volume ao destino.",
      },
      {
        Icon: LayoutPanelTop,
        title: "Estações de trabalho",
        description: "Postos goods-to-person, ergonômicos.",
      },
    ],
  },
];

export function SolutionsSection() {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <Section
      id="solucoes"
      className="flex scroll-mt-24 flex-col gap-10 lg:gap-12"
    >
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 text-center">
        <p className="text-body-sm font-semibold uppercase tracking-wide text-secondary-600">
          Soluções em automação
        </p>
        <h2 className="text-h3 font-normal text-neutral-800">
          Automação de ponta a ponta para{" "}
          <br className="hidden lg:inline" />
          <span className="font-bold text-primary-500">sua intralogística</span>
        </h2>
        <p className="text-body leading-[1.35] text-neutral-600">
          O portfólio Dematic cobre a operação de ponta a ponta, do recebimento
          à expedição, combinando equipamentos, software e robótica.
        </p>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Categorias de solução"
        className="flex flex-wrap justify-center gap-2"
      >
        {categories.map((category, i) => {
          const isActive = i === active;
          return (
            <button
              key={category.name}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-body font-semibold transition-colors ${
                isActive
                  ? "bg-primary-500 text-neutral-50"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              <category.Icon aria-hidden className="size-5" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Banner no estilo do card de referência: tópicos com ícone (título +
          descrição) em duas colunas à esquerda e a imagem à direita, ocupando
          toda a altura do card — como o bloco escuro da referência. */}
      <div className="grid grid-cols-1 gap-8 rounded-2xl bg-neutral-50 p-6 lg:grid-cols-[1.55fr_1fr] lg:min-h-[334px] lg:items-stretch lg:gap-10 lg:p-8">
        {/* Tópicos — cada um com ícone em caixa, título e descrição.
            No card "Soluções" o título fica no topo e os 2 tópicos lado a lado. */}
        <div
          className={`flex flex-col gap-8 ${
            current.name === "Soluções" ? "lg:justify-start" : "lg:justify-center"
          }`}
        >
          <h3 className="text-center font-heading text-[20px] font-semibold leading-[1.2] text-neutral-800">
            {current.headline[0]}
            <br />
            {current.headline[1]}
          </h3>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

            {current.items.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white text-primary-500">
                  <item.Icon aria-hidden className="size-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-body font-semibold leading-[1.3] text-neutral-800">
                    {item.title}
                  </span>
                  <span className="text-body-sm leading-[1.35] text-neutral-600">
                    {item.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Imagem à direita — altura total do card, com bordinha (padding + cantos). */}
        <ParallaxFrame className="order-first min-h-[240px] w-full rounded-xl bg-neutral-100 lg:order-none lg:min-h-full">
          <Image
            key={current.name}
            src={current.image}
            alt={`${current.headline[0]} ${current.headline[1]}`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            style={{ objectPosition: current.imagePosition ?? "center" }}
          />
        </ParallaxFrame>
      </div>

      {/* Botão fora do card, centralizado */}
      <Button
        variant="primary"
        size="lg"
        href={ROUTES.ORCAMENTO}
        className="self-center"
      >
        Avaliar minha operação
      </Button>
    </Section>
  );
}
