"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { TextLink } from "@/components/ui/text-link";
import { ParallaxFrame } from "@/components/layout/parallax-frame";
import { ROUTES } from "@/lib/routes";
import novas from "@/assets/images/portfolio-novas.png";
import egv165 from "@/assets/images/empilhadeiras/egv-16-5.webp";
import linde from "@/assets/images/empilhadeiras/linde.webp";
import iconNovas from "@/assets/images/stats/portfolio-icon-novas.webp";
import iconSeminovas from "@/assets/images/stats/portfolio-icon-seminovas.webp";
import iconLocacao from "@/assets/images/stats/portfolio-icon-locacao.webp";
import { gsap } from "@/lib/gsap";

// Ícone 3D (imagem) posicionado exatamente como no Figma (node 3593:3337):
// caixa transbordando o canto superior esquerdo do card, com máscara radial
// (mesma do SVG do Figma) desvanecendo as bordas para fundir no card.
type IconArt = {
  src: StaticImageData;
  width: number;
  height: number;
  left: number;
  top: number;
  maskX: number;
  maskY: number;
  /** Espelhamento horizontal (flip do export do Figma). Default: true. */
  flip?: boolean;
  /** Escala extra da arte (mantém o centro; útil pra equilibrar tamanhos). */
  scale?: number;
};

type PortfolioCard = {
  iconArt: IconArt;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: StaticImageData;
};

const MASK_IMAGE =
  "radial-gradient(74.7585px 66.9338px at 74.7585px 66.9338px, #000 0%, transparent 100%)";
const MASK_SIZE = "149.517px 133.868px";

const cards: PortfolioCard[] = [
  {
    iconArt: {
      src: iconNovas,
      width: 204.438,
      height: 153.328,
      left: -42,
      top: -12,
      maskX: 26.78,
      maskY: 4.819,
      flip: true,
      scale: 0.85,
    },
    title: "Empilhadeiras\nnovas",
    description:
      "Equipamentos de marcas reconhecidas para operações que exigem desempenho, segurança e confiabilidade no longo prazo.",
    cta: "Ver empilhadeiras novas",
    href: ROUTES.EMPILHADEIRAS_NOVAS,
    image: egv165,
  },
  {
    iconArt: {
      src: iconSeminovas,
      width: 204.438,
      height: 153.328,
      left: -47,
      top: -14,
      maskX: 27.655,
      maskY: 7.819,
      flip: false,
    },
    title: "Empilhadeiras\nseminovas",
    description:
      "Alternativo para quem busca disponibilidade rápida, revisão técnica e melhor adequação ao orçamento.",
    cta: "Ver empilhadeiras seminovas",
    href: ROUTES.EMPILHADEIRAS_SEMINOVAS,
    image: novas,
  },
  {
    iconArt: {
      src: iconLocacao,
      width: 204.438,
      height: 153.328,
      left: -40,
      top: -19,
      maskX: 26.78,
      maskY: 12.819,
      flip: true,
    },
    title: "Locação de\nequipamentos",
    description:
      "Solução para operações que precisam de flexibilidade, previsibilidade de custo e resposta rápida à demanda.",
    cta: "Solicitar proposta",
    href: ROUTES.LOCACAO,
    image: linde,
  },
];

function CardIcon({ art }: { art: IconArt }) {
  const mask = {
    maskImage: MASK_IMAGE,
    WebkitMaskImage: MASK_IMAGE,
    maskSize: MASK_SIZE,
    WebkitMaskSize: MASK_SIZE,
    maskPosition: `${art.maskX}px ${art.maskY}px`,
    WebkitMaskPosition: `${art.maskX}px ${art.maskY}px`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    // Chrome trata o gradiente como luminance por padrão (esconde o preto);
    // alpha faz o centro opaco aparecer e as bordas desvanecerem.
    maskMode: "alpha",
  } as const;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute select-none overflow-hidden [--icon-scale:0.7] xl:[--icon-scale:1]"
      style={{
        left: art.left,
        top: art.top,
        width: art.width,
        height: art.height,
        // scaleX(-1) = flip do Figma (opcional); scale(var) reduz no mobile.
        transform: `${art.flip === false ? "" : "scaleX(-1) "}scale(var(--icon-scale, 1))${
          art.scale ? ` scale(${art.scale})` : ""
        }`,
        ...mask,
      }}
    >
      <Image src={art.src} alt="" fill sizes="180px" className="object-cover" />
    </div>
  );
}

export function PortfolioSection() {
  const [active, setActive] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Inicializa: card ativo com imagem aberta (gap fixo de 40px), demais fechadas.
  // A LARGURA da imagem é controlada por flex (preenche o espaço restante do
  // card, adaptando-se ao tamanho da tela); aqui só animamos o gap e a opacidade.
  useEffect(() => {
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, i === active
        ? { marginLeft: 40, opacity: 1 }
        : { marginLeft: 0, opacity: 0 }
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Anima ao mudar o card ativo
  useEffect(() => {
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        gsap.to(el, { marginLeft: 40, opacity: 1, duration: 0.3, ease: "power1.out", overwrite: "auto" });
      } else {
        gsap.to(el, { marginLeft: 0, opacity: 0, duration: 0.3, ease: "power1.out", overwrite: "auto" });
      }
    });
  }, [active]);

  return (
    <section
      data-header-dark
      className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 px-5 py-12 sm:px-6 lg:gap-[67px] lg:px-16 lg:py-20"
    >
      {/* Cabeçalho */}
      <div className="flex w-[641px] max-w-full flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-body font-semibold leading-[1.35] text-primary-400">
            PORTFÓLIO
          </p>
          {/* Duas linhas fixas: "Equipamentos novos," / "seminovos e locação
              de frota" (nowrap só no desktop; no mobile flui natural) */}
          <h2 className="text-h2 font-normal text-neutral-100">
            <span className="lg:block">Equipamentos novos,</span>{" "}
            <span className="lg:block font-bold lg:whitespace-nowrap">
              seminovos e locação de frota
            </span>
          </h2>
        </div>
        <p className="text-body leading-6 text-neutral-300">
          Da aquisição e locação ao suporte técnico e automação, a TranspoTech
          conecta as principais necessidades da movimentação e intralogística em
          uma estrutura integrada.
        </p>
      </div>

      {/* Cards — apenas um aberto por vez. Layout horizontal a partir de xl
          (≥1280px), onde cabe o texto fixo + imagem sem sobrepor; abaixo disso
          os cards empilham. */}
      <div className="flex w-full flex-col gap-4 xl:flex-row xl:items-stretch">
        {cards.map((card, index) => {
          const open = index === active;
          return (
            <div
              key={card.title}
              onMouseEnter={() => setActive(index)}
              onFocusCapture={() => setActive(index)}
              className={`relative flex items-start overflow-hidden rounded-xl bg-[#222221] p-6 transition-[flex-grow] duration-300 ease-out xl:h-[400px] xl:items-center ${
                open ? "xl:flex-[1_1_315px]" : "xl:flex-[0_0_315px]"
              }`}
            >
              {/* Ícone 3D do Figma — transborda o canto superior esquerdo */}
              <CardIcon art={card.iconArt} />

              {/* Coluna de texto com largura fixa (267px) no desktop: abre igual
                  a fechada, e a imagem entra sempre a 40px dela. overflow-hidden
                  como trava para o texto nunca invadir a imagem. */}
              <div className="relative flex flex-1 flex-col gap-5 overflow-hidden xl:h-full xl:w-[267px] xl:flex-none xl:justify-between xl:gap-0">
                {/* Espaçador — reserva o espaço do ícone (absoluto que
                    transborda). Alto no mobile p/ o título não sobrepor o
                    ícone; no desktop empurra o texto um pouco mais para baixo. */}
                <div aria-hidden className="h-24 shrink-0 xl:h-14" />
                <div className="flex flex-col gap-4">
                  <h3 className="min-h-[2.6em] font-heading text-[20px] font-semibold leading-[1.3] text-neutral-100 lg:text-[24px]">
                    {card.title.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  {/* Altura mínima da maior descrição (4 linhas) no desktop,
                      para os blocos ficarem iguais e os títulos alinhados. */}
                  <p className="text-body leading-[1.35] text-neutral-300 xl:min-h-[5.4em]">
                    {card.description}
                  </p>
                </div>
                {/* pb-1.5 evita que o overflow-hidden da coluna corte a
                    linhazinha do hover (que fica logo abaixo do texto). */}
                <TextLink
                  href={card.href}
                  className="whitespace-nowrap pb-1.5 text-left"
                >
                  {card.cta}
                </TextLink>
              </div>

              {/* Imagem — apenas no desktop largo. flex-1 preenche o espaço
                  restante do card (fica maior em telas grandes, menor nas
                  menores); o gap de 40px é o marginLeft animado por GSAP. */}
              <ParallaxFrame
                ref={(node) => { imageRefs.current[index] = node; }}
                aria-hidden={!open}
                noParallax={index === 2}
                className="hidden h-[325px] min-w-0 rounded-lg xl:block xl:flex-1"
                style={{ opacity: 0 }}
              >
                {index === 2 ? (
                  // Card 3 (Locação): imagem retrato. Caixa de largura FIXA
                  // (≈ largura final do frame) para o object-cover não reescalar
                  // enquanto o card abre — a moldura só "revela" a imagem
                  // (sem zoom), preenchendo e mantendo os cantos arredondados.
                  <div className="absolute inset-y-0 left-1/2 w-[300px] max-w-none -translate-x-1/2">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  // Demais cards: preenche a largura do card, com parallax.
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1280px) 40vw, 100vw"
                    className="rounded-lg object-cover"
                  />
                )}
              </ParallaxFrame>
            </div>
          );
        })}
      </div>
    </section>
  );
}
