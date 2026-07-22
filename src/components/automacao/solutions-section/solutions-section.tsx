"use client";

import { useEffect, useRef, useState } from "react";
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
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Item = { title: string; description: string; Icon: LucideIcon };

type Category = {
  name: string;
  Icon: LucideIcon;
  // Título do card em duas linhas (ao menos duas palavras em cada).
  headline: [string, string];
  // Descrição curta e atrativa da aba, abaixo do título.
  description: string;
  items: Item[];
};

const categories: Category[] = [
  {
    name: "Soluções",
    Icon: Boxes,
    headline: ["Soluções para atender pedidos", "com velocidade"],
    description:
      "Fluxos automatizados que aceleram o atendimento e entregam o pedido certo, na hora certa, sem retrabalho.",
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
    description:
      "Do recebimento à expedição, cada etapa conectada em um só fluxo: rastreável, integrado e pronto para escalar.",
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
    description:
      "Robôs e veículos autônomos que trabalham lado a lado com a sua equipe, elevando a produtividade e reduzindo o esforço manual.",
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

// A aba "Todos" (ativa por padrão) reúne os tópicos de todas as categorias;
// as demais filtram por categoria.
const tabs: { name: string; items: Item[] }[] = [
  { name: "Todos", items: categories.flatMap((c) => c.items) },
  ...categories.map((c) => ({ name: c.name, items: c.items })),
];

export function SolutionsSection() {
  const [active, setActive] = useState(0);
  const current = tabs[active];
  // Abas com poucos itens (ex.: Soluções, 2) são centralizadas; as demais usam
  // a grade de 4 colunas que preenche o container.
  const few = current.items.length <= 2;
  const listRef = useRef<HTMLUListElement>(null);

  // Sem barra de rolagem: os tópicos surgem no scroll (fade + slide por item)
  // enquanto a imagem fica fixa (sticky). Reexecuta ao trocar de aba para os
  // novos tópicos entrarem com a mesma animação. `data-reveal-skip` evita que o
  // ScrollReveal global também mexa nesses itens.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ul = listRef.current;
    if (!ul) return;
    const items = Array.from(ul.children) as HTMLElement[];
    gsap.set(items, { opacity: 0, y: 16 });
    const triggers = ScrollTrigger.batch(items, {
      start: "top 92%",
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          overwrite: "auto",
        }),
    });
    ScrollTrigger.refresh();
    return () => {
      triggers.forEach((t) => t.kill());
      gsap.set(items, { clearProps: "opacity,transform" });
    };
  }, [active]);

  return (
    <Section
      id="solucoes"
      data-reveal-skip
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

      {/* Tabs — estilo sublinhado (aba ativa em laranja) com divisor inferior */}
      <div
        role="tablist"
        aria-label="Categorias de solução"
        className="mx-auto flex w-full flex-col sm:w-fit sm:max-w-full sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 sm:border-b sm:border-neutral-200"
      >
        {tabs.map((tab, i) => {
          const isActive = i === active;
          return (
            <button
              key={tab.name}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`border-b-2 px-1 py-3 text-body font-semibold transition-colors sm:-mb-px sm:py-0 sm:pb-3 ${
                isActive
                  ? "border-primary-500 text-primary-500"
                  : "border-neutral-200 text-neutral-500 hover:text-neutral-800 sm:border-transparent"
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Tópicos — grade estilo "features": ícone + título e descrição abaixo.
          Itens surgem no scroll (fade + slide por item). */}
      {/* Colunas de largura fixa (não 1fr) com o BLOCO da grade centralizado
          (justify-center): as margens dos dois lados ficam iguais e não sobra
          o vão à direita da última coluna. O tópico que sobra fica nas colunas
          da esquerda. Aba com poucos itens (Soluções) usa 2 colunas. */}
      <ul
        ref={listRef}
        className={
          few
            ? "grid grid-cols-1 justify-center gap-x-10 gap-y-9 sm:grid-cols-[repeat(2,minmax(0,250px))]"
            : "grid grid-cols-1 justify-center gap-x-10 gap-y-9 sm:grid-cols-[repeat(2,minmax(0,250px))] lg:grid-cols-[repeat(4,minmax(0,250px))]"
        }
      >
        {current.items.map((item) => (
          <li key={item.title} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <item.Icon
                aria-hidden
                className="size-5 shrink-0 text-secondary-600"
              />
              <span className="text-body font-semibold leading-[1.3] text-neutral-800">
                {item.title}
              </span>
            </div>
            <p className="text-body-sm leading-[1.4] text-neutral-500">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
