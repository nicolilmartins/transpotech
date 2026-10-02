export const ROUTES = {
  HOME: "/",

  // Produtos
  LOCACAO: "/produtos/locacao-de-empilhadeiras",
  EMPILHADEIRAS: "/produtos/empilhadeiras",
  EMPILHADEIRAS_NOVAS: "/produtos/empilhadeiras/novas",
  EMPILHADEIRAS_SEMINOVAS: "/produtos/empilhadeiras/seminovas",
  PNEUS: "/produtos/pneus",
  BATERIAS: "/produtos/baterias-e-carregadores",
  PECAS: "/produtos/pecas",
  ACESSORIOS: "/produtos/acessorios",

  // Serviços
  SERVICOS: "/servicos",
  SERVICOS_PREVENTIVA: "/servicos/manutencao-preventiva",
  SERVICOS_CORRETIVA: "/servicos/manutencao-corretiva",
  SERVICOS_MULTIMARCAS: "/servicos/assistencia-multimarcas",

  // Automação
  AUTOMACAO: "/automacao-intralogistica",

  // Empresa
  QUEM_SOMOS: "/empresa/quem-somos",
  SUSTENTABILIDADE: "/empresa/esg/sustentabilidade",
  CANAL_TRANSPARENCIA: "/empresa/esg/canal-da-transparencia",
  OUVIDORIA: "/empresa/esg/ouvidoria-digital",
  PORTAL_CONTEUDO: "/empresa/portal-de-conteudo",
  TRABALHE_CONOSCO: "/empresa/trabalhe-conosco",

  // Conversão
  CONTATO: "/contato",
  SIMULADOR: "/simular-economia",

  // Externos
  // PLACEHOLDER: confirmar a URL real do portal de carreiras (Gupy).
  GUPY: "https://transpotech.gupy.io/",
  OUVIDOR_DIGITAL: "https://canal.ouvidordigital.com.br/transpotech",
} as const;

export const NAV_PRODUTOS = [
  { label: "Locação de Empilhadeiras", href: ROUTES.LOCACAO },
  { label: "Venda de Empilhadeiras", href: ROUTES.EMPILHADEIRAS },
  { label: "Pneus", href: ROUTES.PNEUS },
  { label: "Baterias e Carregadores", href: ROUTES.BATERIAS },
  { label: "Peças", href: ROUTES.PECAS },
  { label: "Acessórios", href: ROUTES.ACESSORIOS },
] as const;

export const NAV_EMPRESA = [
  { label: "Quem Somos", href: ROUTES.QUEM_SOMOS },
  {
    label: "ESG",
    children: [
      { label: "Sustentabilidade", href: ROUTES.SUSTENTABILIDADE },
      { label: "Canal da Transparência", href: ROUTES.CANAL_TRANSPARENCIA },
      { label: "Ouvidoria Digital", href: ROUTES.OUVIDORIA },
    ],
  },
  { label: "Portal de Conteúdo", href: ROUTES.PORTAL_CONTEUDO },
  { label: "Trabalhe Conosco", href: ROUTES.GUPY },
] as const;
