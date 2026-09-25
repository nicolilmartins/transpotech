import type { NextConfig } from "next";
import { SANITY_IMAGE_QUERY } from "./src/sanity/image";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const nextConfig: NextConfig = {
  experimental: {
    // CSS (Tailwind, ~20KB) vai em <style> no HTML em vez de <link>: tira a
    // espera pelos arquivos de CSS antes da primeira pintura. Troca: o CSS
    // deixa de ficar em cache entre páginas (vem em cada HTML).
    inlineCss: true,
  },
  images: {
    // AVIF primeiro (20–30% menor que WebP); navegador sem suporte recebe WebP.
    formats: ["image/avif", "image/webp"],
    // Padrão do Next + 512 e 576: sem eles, imagens com `sizes` entre ~385 e 576px
    // efetivos (cards de 400–420px em desktop 1x, fotos de card de produto em
    // DPR ~1,75) pulavam para 640/750. Fica abaixo do menor deviceSize (640),
    // como a doc de `imageSizes` pede.
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512, 576],
    // Padrão do Next + 2560: a arte da hero da home (sizes 160vw) desenha
    // ~2660px no desktop e pulava de 2048 direto para 3840.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    // Só as imagens do projeto do Sanity, com a query de src/sanity/image.ts,
    // passam pelo otimizador.
    remotePatterns: sanityProjectId
      ? [
          {
            protocol: "https",
            hostname: "cdn.sanity.io",
            pathname: `/images/${sanityProjectId}/**`,
            search: SANITY_IMAGE_QUERY,
          },
        ]
      : [],
  },
  async redirects() {
    return [
      // Rota antiga "usadas" → nova "seminovas" (rebrand do produto).
      {
        source: "/produtos/empilhadeiras/usadas",
        destination: "/produtos/empilhadeiras/seminovas",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
