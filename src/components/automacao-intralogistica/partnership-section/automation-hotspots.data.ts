// Pontos interativos sobre a ilustração da parceria — mesmo padrão do mapa
// interativo da Dematic (dematic.com/pt-br): um botão "+" sobre cada etapa da
// operação que abre um pop-up ancorado no próprio botão.
//
// Posições: `x`/`y` são percentuais da CAIXA DA ILUSTRAÇÃO (não da seção), com
// o botão centralizado no ponto. A ordem e as etapas seguem o mapa da Dematic;
// as coordenadas foram trazidas de lá e ajustadas para cair sobre o elemento
// correspondente da nossa arte, que é um fluxo diferente do desenho deles.
//
// Título, descrição e foto de cada ponto ficam em
// src/sanity/content/pages/automacao.ts (seção "hotspots"), na mesma ordem.
//
// `side` define para que lado o pop-up abre a partir do botão, para não sair
// da ilustração nem cobrir o bloco de texto à esquerda.

export type AutomationHotspot = {
  id: string;
  x: number;
  y: number;
  side: "left" | "right";
};

export const automationHotspots: AutomationHotspot[] = [
  {
    id: "recebimento",
    // Círculo azul de edição 2.png. Abre para a esquerda: está na borda
    // direita da ilustração.
    x: 78.4,
    y: 50.9,
    side: "left",
  },
  {
    id: "transporte",
    // Estradinha da área verde marcada em inputs/Referência de localização
    // soluções/edição 1.png (faixa cinza de asfalto dentro dela).
    x: 37.5,
    y: 57.8,
    side: "right",
  },
  {
    id: "armazenagem",
    // No galpão (posição que era da separação).
    x: 52,
    y: 78.8,
    side: "right",
  },
  {
    id: "separacao",
    // Círculo verde de edição 2.png. Abre para a esquerda pelo mesmo motivo.
    x: 65.4,
    y: 76.2,
    side: "left",
  },
  {
    id: "envio",
    // Centro da área vermelha marcada em edição 1.png. Abre para a esquerda:
    // à direita o card sairia da ilustração.
    x: 67.7,
    y: 22.4,
    side: "left",
  },
  {
    id: "software",
    // Bolinha central — ponto marcado em inputs/Referência de localização
    // soluções/edição 3.png.
    x: 53.8,
    y: 42.4,
    side: "right",
  },
  {
    id: "manutencao",
    // Círculo vermelho de edição 2.png (torre ao fundo).
    x: 20.7,
    y: 19.8,
    side: "right",
  },
];
