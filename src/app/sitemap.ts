import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://transpotech.com.br";

const url = (path: string) => `${BASE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: url(ROUTES.HOME), lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },

    // Produtos
    { url: url(ROUTES.LOCACAO), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: url(ROUTES.EMPILHADEIRAS), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: url(ROUTES.EMPILHADEIRAS_NOVAS), lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: url(ROUTES.EMPILHADEIRAS_USADAS), lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: url(ROUTES.PNEUS), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: url(ROUTES.BATERIAS), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: url(ROUTES.PECAS), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // Serviços
    { url: url(ROUTES.SERVICOS), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },

    // Automação
    { url: url(ROUTES.AUTOMACAO), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Empresa
    { url: url(ROUTES.QUEM_SOMOS), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: url(ROUTES.SUSTENTABILIDADE), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: url(ROUTES.CANAL_TRANSPARENCIA), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: url(ROUTES.OUVIDORIA), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: url(ROUTES.PORTAL_CONTEUDO), lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: url(ROUTES.TRABALHE_CONOSCO), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },

    // Conversão
    { url: url(ROUTES.CONTATO), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: url(ROUTES.ORCAMENTO), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
