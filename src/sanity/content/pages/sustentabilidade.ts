import heroImage from "@/assets/images/hero-sustentabilidade.webp";
// PLACEHOLDER: imagens reaproveitadas — trocar por fotos reais das iniciativas.
import imgWomen from "@/assets/images/blog/post1.png";
import imgSocial from "@/assets/images/blog/post2.png";
import imgCitizen from "@/assets/images/blog/post3.jpg";
import imgEfficiency from "@/assets/images/blog/post4.png";
import { definePage, defineSection, field } from "../fields";

export const sustentabilidadePage = definePage({
  key: "sustentabilidade",
  title: "Sustentabilidade",
  sections: {
    hero: defineSection("Banner", {
      titleTop: field.string("Título — primeira linha", "Sustentabilidade, inclusão e"),
      titleAccent: field.string(
        "Título — segunda linha (laranja)",
        "responsabilidade na intralogística",
      ),
      description: field.text(
        "Texto de apoio",
        "Iniciativas de sustentabilidade, inclusão, comunidade e governança para um futuro mais responsável.",
      ),
      image: field.image("Imagem de fundo", heroImage),
      buttonLabel: field.string("Texto do botão", "Conhecer iniciativas ESG"),
    }),
    pillars: defineSection("Pilares ESG", {
      titleTop: field.string("Título — primeira linha", "Comprometidos com"),
      titleAccent: field.string("Título — segunda linha (laranja)", "um futuro mais sustentável"),
      description: field.text(
        "Texto de apoio",
        "Operações mais eficientes e de menor impacto, pessoas valorizadas e relações cada vez mais éticas e transparentes.",
      ),
      pillars: field.list(
        "Pilares",
        "Pilar",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          items: field.list("Tópicos", "Tópico", { label: field.string("Texto", "") }, []),
        },
        [
          {
            title: "Ambiental",
            description:
              "Práticas e soluções que apoiam operações mais eficientes, conscientes e alinhadas à redução de impactos.",
            items: [
              { label: "Eficiência operacional" },
              { label: "Soluções elétricas e baterias" },
              { label: "Uso responsável de recursos" },
              { label: "Apoio a operações mais sustentáveis" },
              { label: "Logística reversa, descarte correto de materiais e fluidos" },
              { label: "Produção de 172 mil kWh/ano" },
            ],
          },
          {
            title: "Social",
            description:
              "Iniciativas voltadas à inclusão, equidade, desenvolvimento de pessoas e impacto positivo na comunidade.",
            items: [
              { label: "Equidade social" },
              { label: "Mulheres Mecânicas" },
              { label: "Projetos comunitários" },
              { label: "Desenvolvimento de talentos" },
            ],
          },
          {
            title: "Governança",
            description:
              "Práticas e canais que reforçam ética, transparência, escuta e responsabilidade corporativa.",
            items: [
              { label: "Canal da Transparência" },
              { label: "Ouvidoria Digital" },
              { label: "Conduta ética" },
              { label: "Relações responsáveis" },
            ],
          },
        ],
        // O ícone de cada pilar fica no código, por posição.
        { fixed: true },
      ),
    }),
    initiatives: defineSection("Inclusão (iniciativas)", {
      eyebrow: field.string("Texto acima do título", "Inclusão"),
      titleRegular: field.string("Título — início", "Inclusão que"),
      titleAccent: field.string("Título — final em destaque (laranja)", "movimenta o futuro"),
      description: field.text(
        "Texto de apoio",
        "A TranspoTech acredita no desenvolvimento de pessoas e na construção de oportunidades. Inclusão, formação e valorização profissional fazem parte da nossa cultura.",
      ),
      items: field.list(
        "Iniciativas",
        "Iniciativa",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          image: field.image("Foto", imgWomen),
        },
        [
          {
            title: "Mulheres Mecânicas",
            description:
              "Iniciativa voltada à inclusão e valorização de mulheres em áreas técnicas do setor.",
            image: imgWomen,
          },
          {
            title: "Projetos sociais e comunitários",
            description:
              "Apoio a iniciativas ligadas a esporte, educação, inclusão e desenvolvimento da comunidade.",
            image: imgSocial,
          },
          {
            title: "Empresa cidadã",
            description:
              "Ações que fortalecem a conexão da empresa com a comunidade e ampliam o impacto positivo.",
            image: imgCitizen,
          },
          {
            title: "Soluções mais eficientes",
            description:
              "Atuação em tecnologias, equipamentos e serviços que apoiam operações intralogísticas mais eficientes.",
            image: imgEfficiency,
          },
        ],
      ),
    }),
    projects: defineSection("Projetos que apoiamos — título", {
      eyebrow: field.string("Texto acima do título", "Apoio"),
      title: field.string("Título", "Projetos que apoiamos"),
      description: field.text(
        "Texto de apoio",
        "A TranspoTech apoia iniciativas com impacto social, comunitário, esportivo, educacional e ambiental.",
      ),
    }),
    sdg: defineSection("ODS da ONU", {
      eyebrow: field.string("Texto acima do título", "ODS, ONU"),
      titleRegular: field.string("Título — início", "Compromisso com "),
      titleAccent: field.string("Título — final em negrito", "impacto positivo"),
      description: field.text(
        "Texto de apoio",
        "A TranspoTech contribui com 11 dos 17 Objetivos de Desenvolvimento Sustentável (ODS) da ONU, conectando suas iniciativas e práticas internas à agenda 2030.",
      ),
    }),
    governance: defineSection("Governança", {
      eyebrow: field.string("Texto acima do título", "Governança"),
      title: field.string("Título", "Governança, escuta e transparência"),
      description: field.text(
        "Texto de apoio",
        "Disponibilizamos canais para receber manifestações, relatos e solicitações de forma responsável, direcionando cada tema ao fluxo adequado.",
      ),
      channels: field.list(
        "Canais",
        "Canal",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          ctaLabel: field.string("Texto do link", ""),
        },
        [
          {
            title: "Canal da Transparência",
            description:
              "Para relatos relacionados a ética, integridade, conduta, assédio, discriminação, conflito de interesses ou descumprimento de políticas.",
            ctaLabel: "Acessar Canal da Transparência",
          },
          {
            title: "Ouvidoria Digital",
            description:
              "Para reclamações, sugestões, elogios, dúvidas ou manifestações gerais sobre relacionamento com a TranspoTech.",
            ctaLabel: "Acessar Ouvidoria",
          },
        ],
        // Ícone e destino de cada canal ficam no código, por posição.
        { fixed: true },
      ),
    }),
  },
});
