import type { NextConfig } from "next";
import { SANITY_IMAGE_QUERY } from "./src/sanity/image";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const nextConfig: NextConfig = {
  images: {
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
