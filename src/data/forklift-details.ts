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
import exh20Hero from "@/assets/images/empilhadeiras/exh-20-hero.webp";
import exh20Card1 from "@/assets/images/empilhadeiras/exh-20-1.webp";
import exh20Card2 from "@/assets/images/empilhadeiras/exh-20-2.webp";
import exh20Card3 from "@/assets/images/empilhadeiras/exh-20-3.webp";
import exh20Card4 from "@/assets/images/empilhadeiras/exh-20-4.webp";
import exh20Card5 from "@/assets/images/empilhadeiras/exh-20-5.webp";
import exh20GaleriaWide from "@/assets/images/empilhadeiras/exh-20-galeria-wide.webp";
import exh20Detalhe1 from "@/assets/images/empilhadeiras/exh-20-detalhe1.webp";
import exh20Detalhe2 from "@/assets/images/empilhadeiras/exh-20-detalhe2.webp";
import rceWarehouse from "@/assets/images/empilhadeiras/rce-warehouse.webp";
import rceLineup from "@/assets/images/empilhadeiras/rce-lineup.webp";
import rceSingle from "@/assets/images/empilhadeiras/rce-single.webp";
// Palco (seção 2) por equipamento — fotos ambientadas de cada máquina.
import detErx from "@/assets/images/empilhadeiras/det-erx.webp";
import detRx20 from "@/assets/images/empilhadeiras/det-rx20.webp";
import detRc44 from "@/assets/images/empilhadeiras/det-rc44.webp";
import detEch15c from "@/assets/images/empilhadeiras/det-ech15c.webp";
import detEgvsf from "@/assets/images/empilhadeiras/det-egvsf.webp";
import detRce from "@/assets/images/empilhadeiras/det-rce.webp";
import detExhsf from "@/assets/images/empilhadeiras/det-exhsf.webp";
import detFmx from "@/assets/images/empilhadeiras/det-fmx.webp";
import detT20 from "@/assets/images/empilhadeiras/det-t20.webp";
import detE50 from "@/assets/images/empilhadeiras/det-e50.webp";
import detHevo from "@/assets/images/empilhadeiras/det-hevo.webp";
import detH80 from "@/assets/images/empilhadeiras/det-h80.webp";
import detKbd35 from "@/assets/images/empilhadeiras/det-kbd35.webp";
import detKbd70 from "@/assets/images/empilhadeiras/det-kbd70.webp";

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
export type DetailImage = {
  src: StaticImageData;
  alt: string;
  /** object-fit no "palco" da experiência. Default "cover" (fotos de ambiente).
      Use "contain" para recortes de produto com fundo transparente, que devem
      aparecer inteiros (sem crop) sobre o fundo claro do palco. */
  fit?: "cover" | "contain";
};

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
  intro: { titleTop: string; titleBottom: string; description: string };
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
    titleTop: "Tecnologia e suporte",
    titleBottom: "de ponta a ponta",
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

// Conteúdo real por produto (sobrepõe o genérico).
const detailById: Record<string, ForkliftDetail> = {
  "still-egv-16-ng": {
    tagline: "Empilhadeira elétrica com operador a pé.",
    highlights: [
      "Elevação até 5.997 mm com mastro triplex",
      "Retirada lateral da bateria, com mais segurança",
      "Direção leve e precisa para espaços reduzidos",
    ],
    intro: {
      titleTop: "Simplesmente",
      titleBottom: "fácil de operar",
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
  // EXH 20 — mantém o conteúdo genérico, com imagens específicas do equipamento
  // em todas as seções (palco, cards e galeria). Fontes: renders de referência em
  // `assets/images/Image generation/exh-20` + gerações Magnific a partir da capa.
  "still-exh-20-litio-ion": {
    ...genericDetail,
    media: {
      hero: {
        src: exh20Hero,
        alt: "Transpaleteira elétrica STILL EXH 20 em galpão logístico",
      },
      cards: [
        {
          src: exh20Card1,
          alt: "Transpaleteira STILL EXH 20 em armazém com porta-paletes",
        },
        {
          src: exh20Card2,
          alt: "Compartimento de bateria Li-Ion da transpaleteira STILL EXH 20 em carregamento",
        },
        {
          src: exh20Card3,
          alt: "Transpaleteira STILL EXH 20 em pátio de doca com paletes",
        },
        {
          src: exh20Card4,
          alt: "Timão e comandos ergonômicos da transpaleteira STILL EXH 20",
        },
        {
          src: exh20Card5,
          alt: "Transpaleteira STILL EXH 20 em pátio externo",
        },
      ],
      gallery: {
        wide: {
          src: exh20GaleriaWide,
          alt: "Transpaleteira STILL EXH 20 transportando palete em centro de distribuição",
        },
        pair: [
          {
            src: exh20Detalhe1,
            alt: "Detalhe dos garfos e rolos de carga da transpaleteira STILL EXH 20",
          },
          {
            src: exh20Detalhe2,
            alt: "Detalhe traseiro do chassi da transpaleteira STILL EXH 20",
          },
        ],
      },
    },
  },
  // RCE 25 — mantém o conteúdo genérico, mas com fotos reais da linha RCE nos
  // cards e na galeria (o hero/palco segue o recorte do próprio modelo).
  "still-rce-25-litio-ion": {
    ...genericDetail,
    media: {
      hero: {
        src: detRce,
        alt: "Empilhadeira Elétrica STILL RCE 25/35 em pátio",
        fit: "cover",
      },
      cards: [
        { src: rceWarehouse, alt: "Empilhadeira STILL RCE em operação em armazém" },
        { src: rceSingle, alt: "Empilhadeira elétrica STILL RCE em detalhe" },
        { src: rceLineup, alt: "Linha de empilhadeiras elétricas STILL RCE" },
      ],
      gallery: {
        wide: {
          src: rceLineup,
          alt: "Linha de empilhadeiras elétricas STILL RCE",
        },
        pair: [
          { src: rceWarehouse, alt: "Empilhadeira STILL RCE em operação em armazém" },
          { src: rceSingle, alt: "Empilhadeira elétrica STILL RCE em detalhe" },
        ],
      },
    },
  },
  // Demais modelos: conteúdo genérico + foto ambientada própria no palco (seção 2).
  "still-ech-15c": {
    ...genericDetail,
    media: {
      hero: { src: detEch15c, alt: "Transpaleteira Elétrica STILL ECH 15C em operação", fit: "cover" },
    },
  },
  "still-egv-16-sf": {
    ...genericDetail,
    media: {
      hero: { src: detEgvsf, alt: "Empilhadeira Elétrica Patolada STILL EGV SF em operação", fit: "cover" },
    },
  },
  "still-rc-44-25-c": {
    ...genericDetail,
    media: {
      hero: { src: detRc44, alt: "Empilhadeira a Combustão STILL RC 44-25 C em pátio", fit: "cover" },
    },
  },
  "still-exh-sf-16c-20c": {
    ...genericDetail,
    media: {
      hero: { src: detExhsf, alt: "Transpaleteira Elétrica STILL EXH-SF 20C em operação", fit: "cover" },
    },
  },
  "still-exh-sf-25": {
    ...genericDetail,
    media: {
      hero: { src: detExhsf, alt: "Transpaleteira Elétrica STILL EXH-SF 25 em operação", fit: "cover" },
    },
  },
  "still-erx": {
    ...genericDetail,
    media: {
      hero: { src: detErx, alt: "Transpaleteira Elétrica STILL ERX em armazém", fit: "cover" },
    },
  },
  "still-fm-x-17-20": {
    ...genericDetail,
    media: {
      hero: { src: detFmx, alt: "Empilhadeira Retrátil STILL FM-X em armazém", fit: "cover" },
    },
  },
  "still-rx20-20p": {
    ...genericDetail,
    media: {
      hero: { src: detRx20, alt: "Empilhadeira Elétrica STILL RX 20 em pátio", fit: "cover" },
    },
  },
  "linde-t20-t25-fp": {
    ...genericDetail,
    media: {
      hero: { src: detT20, alt: "Paleteira Elétrica Linde T20–T25 em operação", fit: "cover" },
    },
  },
  "linde-e35-e50": {
    ...genericDetail,
    media: {
      hero: { src: detE50, alt: "Empilhadeira Elétrica Linde E35–E50 em pátio", fit: "cover" },
    },
  },
  "linde-h50-evo": {
    ...genericDetail,
    media: {
      hero: { src: detHevo, alt: "Empilhadeira a Combustão Linde H50 EVO em pátio", fit: "cover" },
    },
  },
  "linde-h80-evo": {
    ...genericDetail,
    media: {
      hero: { src: detH80, alt: "Empilhadeira a Combustão Linde H80 EVO em pátio", fit: "cover" },
    },
  },
  "baoli-kbd-35": {
    ...genericDetail,
    media: {
      hero: { src: detKbd35, alt: "Empilhadeira a Diesel Baoli KBD 35 em pátio", fit: "cover" },
    },
  },
  "baoli-kbd-70": {
    ...genericDetail,
    media: {
      hero: { src: detKbd70, alt: "Empilhadeira a Diesel Baoli KBD 70 em operação", fit: "cover" },
    },
  },
};

export function getForkliftDetail(forklift: Forklift): ResolvedForkliftDetail {
  const base = detailById[forklift.id] ?? genericDetail;
  // Palco da experiência: por padrão usa o recorte do próprio modelo (fundo
  // transparente → object-contain). Modelos com fotos próprias (ex.: EGV 16)
  // definem `media.hero` em `detailById` e sobrescrevem isso.
  const heroDefault: DetailImage = {
    src: forklift.image,
    alt: forklift.name,
    fit: "contain",
  };
  // Merge por chave: hero/cards/gallery específicos sobrescrevem o default.
  return {
    ...base,
    media: { ...defaultMedia, hero: heroDefault, ...base.media },
  };
}
