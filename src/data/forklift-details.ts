import type { StaticImageData } from "next/image";
import { ROUTES } from "@/lib/routes";
import type { Forklift } from "@/types/forklift.types";
import imageEmp from "@/assets/images/empilhadeiras/image-emp.webp";
import mastDetail from "@/assets/images/empilhadeiras/mast-detail.webp";
import sideView from "@/assets/images/empilhadeiras/side-view.webp";
import warehouseWide from "@/assets/images/empilhadeiras/warehouse-wide.webp";
import egv16Horizontal from "@/assets/images/empilhadeiras/egv-16-horizontal1.webp";
import egv16Detalhe2 from "@/assets/images/empilhadeiras/egv-16-detalhe2.webp";
import egv16Detalhe3 from "@/assets/images/empilhadeiras/egv-16-detalhe3.webp";
import egv16Card1 from "@/assets/images/empilhadeiras/egv-16-1.webp";
import egv16Card2 from "@/assets/images/empilhadeiras/egv-16-2.webp";
import egv16Card3 from "@/assets/images/empilhadeiras/egv-16-3.webp";
import egv16Card4 from "@/assets/images/empilhadeiras/egv-16-4.webp";
import egv16Card5 from "@/assets/images/empilhadeiras/egv-16-5.webp";

// Chave de ícone (string serializável) — resolvida para o componente lucide no
// client. Necessário porque o conteúdo é consumido por um Client Component e
// funções/componentes não cruzam a fronteira server→client.
export type IconKey =
  | "gauge"
  | "shield"
  | "zap"
  | "shuffle"
  | "wifi"
  | "badge"
  | "sliders"
  | "wrench"
  | "pin";

export type DetailBlock = {
  title: string;
  description: string;
  icon: IconKey;
};

/** Imagem com texto alternativo (`alt: ""` = decorativa). */
export type DetailImage = { src: StaticImageData; alt: string };

/**
 * Imagens da página de detalhe — TODAS específicas por equipamento. Hoje
 * apontam para `defaultMedia` (placeholders compartilhados); no futuro, basta
 * preencher `media` no item de `detailById` do modelo para trocar por fotos
 * reais daquele equipamento, sem mexer nos componentes.
 */
export type ForkliftMedia = {
  /** Imagem grande do "palco" (zoom) na seção de experiência. */
  hero: DetailImage;
  /** Uma imagem por bloco de experiência, na mesma ordem de `blocks`. */
  cards: DetailImage[];
  /** Galeria: imagem ampla + par de imagens. */
  gallery: { wide: DetailImage; pair: [DetailImage, DetailImage] };
};

export type ForkliftDetail = {
  /** Subtítulo curto exibido no hero, abaixo do nome do produto. */
  tagline: string;
  /** Destaques rápidos do equipamento. */
  highlights: string[];
  /** Cabeçalho / propósito do modelo (título sobre a imagem da seção). */
  intro: { title: string; description: string };
  /** Blocos "Simplesmente ..." / atributos do modelo. */
  blocks: DetailBlock[];
  /**
   * Imagens específicas do equipamento. Parcial: cada chave (hero/cards/gallery)
   * não definida cai no `defaultMedia`.
   */
  media?: Partial<ForkliftMedia>;
  /** Link da ficha técnica (placeholder até existir o PDF real). */
  datasheetHref: string;
};

/** Detalhe já resolvido para consumo: `media` sempre presente. */
export type ResolvedForkliftDetail = ForkliftDetail & { media: ForkliftMedia };

// Imagens placeholder compartilhadas — default enquanto não há fotos por
// equipamento. Substituir definindo `media` no item de `detailById`.
const defaultMedia: ForkliftMedia = {
  hero: { src: imageEmp, alt: "" },
  cards: [
    { src: mastDetail, alt: "Detalhe do mastro e garfos da empilhadeira" },
    { src: sideView, alt: "Vista lateral da empilhadeira em operação" },
    { src: warehouseWide, alt: "Empilhadeira operando em armazém" },
    { src: imageEmp, alt: "Empilhadeira em ambiente industrial" },
    { src: mastDetail, alt: "Detalhe do conjunto de elevação da empilhadeira" },
  ],
  gallery: {
    wide: {
      src: warehouseWide,
      alt: "Empilhadeira elétrica em operação em centro de distribuição",
    },
    pair: [
      { src: mastDetail, alt: "Detalhe do mastro e garfos da empilhadeira" },
      { src: sideView, alt: "Vista lateral da empilhadeira em operação" },
    ],
  },
};

// Conteúdo genérico — usado por todos os produtos que ainda não têm conteúdo
// próprio. Mantém a página completa enquanto o conteúdo real é produzido.
const genericDetail: ForkliftDetail = {
  tagline: "Equipamento zero-hora com garantia de fábrica e configuração sob medida.",
  highlights: [
    "Garantia de fábrica e configuração sob medida",
    "Peças originais e assistência técnica TranspoTech",
    "Disponibilidade e logística em todo o Sul e Sudeste",
  ],
  intro: {
    title: "Tecnologia e suporte de ponta a ponta",
    description:
      "Equipamentos novos das marcas STILL, Linde e Baoli, com a estrutura técnica da TranspoTech por trás, da especificação ao pós-venda.",
  },
  blocks: [
    {
      title: "Qualidade de fábrica",
      description:
        "Equipamentos novos STILL, Linde e Baoli (grupo KION), com garantia de fábrica e padrão de engenharia premium.",
      icon: "badge",
    },
    {
      title: "Eficiência energética",
      description:
        "Opções elétricas e a combustão dimensionadas para reduzir custo operacional e elevar a produtividade.",
      icon: "zap",
    },
    {
      title: "Configuração sob medida",
      description:
        "Mastros, capacidades e acessórios escolhidos conforme carga, altura, ambiente e intensidade de uso.",
      icon: "sliders",
    },
    {
      title: "Pós-venda especializado",
      description:
        "Peças originais, pneus, baterias e assistência técnica para manter a frota sempre disponível.",
      icon: "wrench",
    },
    {
      title: "Estrutura regional",
      description:
        "Unidades e equipe técnica para atendimento próximo em todo o Sul e Sudeste.",
      icon: "pin",
    },
  ],
  datasheetHref: ROUTES.CONTATO,
};

// Conteúdo real por produto (sobrepõe o genérico). Hoje preenchido apenas para
// o EGV 16 NG, usado como exemplo do novo layout.
const detailById: Record<string, ForkliftDetail> = {
  "still-egv-16-ng": {
    tagline: "Empilhadeira elétrica com operador a pé.",
    highlights: [
      "Elevação até 5.997 mm com mastro triplex",
      "Retirada lateral da bateria, com mais segurança",
      "Direção leve e precisa para espaços reduzidos",
    ],
    intro: {
      title: "Simplesmente fácil de operar",
      description:
        "A EGV 16 NG da STILL foi projetada para movimentação vertical de cargas leves a moderadas, em alturas pequenas e médias, de forma econômica e intuitiva.",
    },
    blocks: [
      {
        title: "Simplesmente fácil",
        description:
          "Comandos concentrados no volante, layout ergonômico e ótima visibilidade através do mastro até as pontas dos garfos.",
        icon: "gauge",
      },
      {
        title: "Simplesmente seguro",
        description:
          "Chassi de baixa entrada com encosto de carga, sistema antiesmagamento, chave-mestre e redução de velocidade em espaços confinados.",
        icon: "shield",
      },
      {
        title: "Simplesmente poderoso",
        description:
          "Motor de tração AC de baixa manutenção e alta capacidade residual de carga, com chassi de quatro rodas para mais estabilidade.",
        icon: "zap",
      },
      {
        title: "Simplesmente flexível",
        description:
          "Dimensões compactas para corredores estreitos, múltiplos programas de condução e tecnologia opcional de bateria de íons de lítio.",
        icon: "shuffle",
      },
      {
        title: "Simplesmente conectado",
        description:
          "Compatível com o STILL FleetManager para gestão de frota, detecção de impactos e minimização de danos.",
        icon: "wifi",
      },
    ],
    media: {
      hero: {
        src: egv16Horizontal,
        alt: "Empilhadeira patolada STILL EGV 16 NG em operação",
      },
      cards: [
        { src: egv16Card1, alt: "Operação intuitiva da empilhadeira STILL EGV 16 NG" },
        { src: egv16Card2, alt: "Recursos de segurança da empilhadeira STILL EGV 16 NG" },
        { src: egv16Card3, alt: "Desempenho da empilhadeira STILL EGV 16 NG" },
        { src: egv16Card4, alt: "Versatilidade da empilhadeira STILL EGV 16 NG" },
        { src: egv16Card5, alt: "Conectividade da empilhadeira STILL EGV 16 NG" },
      ],
      gallery: {
        wide: {
          src: egv16Horizontal,
          alt: "Empilhadeira patolada STILL EGV 16 NG em operação",
        },
        pair: [
          {
            src: egv16Detalhe2,
            alt: "Detalhe da empilhadeira STILL EGV 16 NG",
          },
          {
            src: egv16Detalhe3,
            alt: "Detalhe da empilhadeira STILL EGV 16 NG",
          },
        ],
      },
    },
    datasheetHref: ROUTES.CONTATO,
  },
};

export function getForkliftDetail(forklift: Forklift): ResolvedForkliftDetail {
  const base = detailById[forklift.id] ?? genericDetail;
  // Merge por chave: hero/cards/gallery específicos sobrescrevem o default.
  return { ...base, media: { ...defaultMedia, ...base.media } };
}
