import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
