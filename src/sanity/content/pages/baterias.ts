import heroImage from "@/assets/images/hero-image-baterias.webp";
import { definePage, defineSection, field } from "../fields";

export const bateriasPage = definePage({
  key: "baterias",
  title: "Baterias e carregadores",
  sections: {
    hero: defineSection("Banner", {
      titleTop: field.string("Título — primeira linha", "Energia para"),
      titleAccent: field.string("Título — segunda linha (laranja)", "equipamentos elétricos"),
      description: field.text(
        "Texto de apoio",
        "Baterias e carregadores conforme compatibilidade, autonomia e rotina de uso.",
      ),
      image: field.image("Imagem de fundo", heroImage),
      buttonLabel: field.string("Texto do botão", "Solicitar cotação"),
    }),
    tech: defineSection("Tecnologia (números)", {
      eyebrow: field.string("Texto acima do título", "Tecnologia"),
      titleRegular: field.string("Título — primeira linha", "Especialistas em baterias"),
      titleAccent: field.string("Título — segunda linha (laranja)", "de Íons de Lítio"),
      description: field.text(
        "Texto de apoio",
        "Distribuidores autorizados das marcas líderes em carregadores e baterias tracionárias e de arranque. Tecnologia que reduz custo, libera espaço e elimina paradas para troca de bateria.",
      ),
      stats: field.list(
        "Números",
        "Número",
        {
          value: field.string(
            "Número",
            "",
            "O primeiro número do texto é animado ao aparecer na tela.",
          ),
          label: field.string("Legenda", ""),
        },
        [
          { value: "3x mais", label: "Mais vida útil do que baterias chumbo-ácidas" },
          { value: "30%", label: "Redução no consumo de energia" },
          { value: "0", label: "Salas de baterias necessárias" },
        ],
        // Ilustração, largura da legenda e animação de cada card ficam no código, por posição.
        { fixed: true },
      ),
    }),
    leadForm: defineSection("Formulário de cotação", {
      titleTop: field.string("Título — primeira linha", "Energia para a frota"),
      titleBottom: field.string("Título — segunda linha (laranja)", "trabalhar sem parar"),
      description: field.text(
        "Texto de apoio",
        "Baterias de lítio e carregadores para manter sua frota operando em todos os turnos. Conte sobre a sua operação e a TranspoTech recomenda a solução ideal, com cotação.",
      ),
      messagePlaceholder: field.string(
        "Exemplo no campo de mensagem",
        "Modelo do equipamento, turnos de trabalho e tipo de bateria/carregador.",
      ),
      submitLabel: field.string("Texto do botão de envio", "Solicitar cotação"),
    }),
    needs: defineSection("O que sua operação precisa", {
      title: field.string("Título", "O que sua operação precisa?"),
      items: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          cta: field.string("Texto do link", ""),
        },
        [
          {
            title: "Baterias para equipamentos",
            description:
              "Para reposição, substituição ou avaliação conforme equipamento, autonomia e intensidade de uso.",
            cta: "Solicitar bateria",
          },
          {
            title: "Carregadores",
            description:
              "Para operações que precisam carregar equipamentos com segurança, compatibilidade e rotina adequada.",
            cta: "Solicitar carregador",
          },
          {
            title: "Análise de autonomia",
            description:
              "Para entender se a bateria atual atende aos turnos, picos e rotina operacional.",
            cta: "Avaliar autonomia",
          },
          {
            title: "Troca ou modernização",
            description:
              "Para avaliar alternativas de energia, redução de paradas ou melhor aproveitamento dos equipamentos.",
            cta: "Avaliar modernização",
          },
          {
            title: "Não sei o que preciso",
            description:
              "Informe o equipamento, rotina de carregamento, turnos e problema encontrado para receber orientação.",
            cta: "Receber orientação",
          },
        ],
        // O ícone de cada card fica no código, por posição.
        { fixed: true },
      ),
    }),
    batteryTypes: defineSection("Tipos de baterias", {
      titleRegular: field.string("Título — primeira linha", "Tipos de baterias"),
      titleAccent: field.string("Título — segunda linha (laranja)", "para empilhadeiras"),
      description: field.text(
        "Texto de apoio",
        "A escolha entre tecnologias depende da rotina de uso, turnos, espaço operacional e investimento. A TranspoTech ajuda a indicar a alternativa certa para sua operação.",
      ),
      types: field.list(
        "Tipos",
        "Tipo",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          fits: field.list("Indicado para", "Item", { text: field.string("Texto", "") }, []),
          cta: field.string("Texto do link", ""),
        },
        [
          {
            title: "Chumbo-ácida",
            description: "Tecnologia tradicional, amplamente usada em empilhadeiras elétricas.",
            fits: [
              { text: "Operações de 1 turno" },
              { text: "Investimento inicial menor" },
              { text: "Estrutura com sala de baterias e equipe de manutenção" },
            ],
            cta: "Solicitar avaliação",
          },
          {
            title: "Íons de lítio (Li-ion)",
            description: "Tecnologia moderna, com carga rápida e por oportunidade.",
            fits: [
              { text: "Operações 24/7 ou multi-turno" },
              { text: "Operações sem sala de baterias dedicada" },
              { text: "Quem busca ganho de produtividade e disponibilidade" },
            ],
            cta: "Avaliar migração para lítio",
          },
          {
            title: "Tração e demais tecnologias",
            description:
              "Outras configurações ou tecnologias específicas conforme equipamento, autonomia e aplicação.",
            fits: [
              { text: "Equipamentos com requisito técnico específico" },
              { text: "Substituição direta com compatibilidade validada" },
              { text: "Operações que precisam preservar a tecnologia atual" },
            ],
            cta: "Falar com especialista",
          },
        ],
        // O destino do link de cada card fica no código, por posição.
        { fixed: true },
      ),
      bannerText: field.text(
        "Faixa — texto",
        "Em dúvida entre tecnologias? A equipe TranspoTech avalia rotina, turnos e disponibilidade pra recomendar a melhor opção.",
      ),
      bannerButtonLabel: field.string("Faixa — texto do botão", "Avaliar tecnologia ideal"),
    }),
    requestSteps: defineSection("Como funciona a solicitação", {
      titleRegular: field.string("Título — primeira linha", "Como funciona"),
      titleAccent: field.string("Título — segunda linha (laranja)", "a solicitação"),
      description: field.text(
        "Texto de apoio",
        "Um processo simples e rápido, você informa a necessidade e a equipe da TranspoTech indica a melhor solução de energia para a sua operação.",
      ),
      steps: field.list(
        "Etapas",
        "Etapa",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Você informa a necessidade",
            description: "Bateria, carregador, autonomia, modernização ou dúvida técnica.",
          },
          {
            title: "A equipe entende a operação",
            description: "Equipamento, rotina de uso, turnos e necessidade de disponibilidade.",
          },
          {
            title: "A compatibilidade é analisada",
            description:
              "A solicitação é direcionada conforme equipamento, aplicação e disponibilidade.",
          },
          {
            title: "Você recebe orientação ou cotação",
            description: "O time retorna com informações e próximos passos.",
          },
        ],
        // A ilustração de cada etapa fica no código, por posição.
        { fixed: true },
      ),
    }),
    whyTranspotech: defineSection("Por que a TranspoTech", {
      titleRegular: field.string(
        "Título — primeira linha",
        "Por que solicitar baterias e carregadores",
      ),
      titleAccent: field.string("Título — segunda linha (laranja)", "com a TranspoTech?"),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
        },
        [
          {
            title: "Orientação para compatibilidade",
            description:
              "Indicamos a bateria e o carregador certos para o seu equipamento e tipo de operação.",
          },
          {
            title: "Avaliação da rotina de uso",
            description:
              "Analisamos turnos, autonomia e frequência de carga para dimensionar corretamente.",
          },
          {
            title: "Apoio para reduzir paradas por energia",
            description:
              "Soluções que evitam interrupções e mantêm a operação sempre disponível.",
          },
          {
            title: "Suporte técnico conectado à manutenção",
            description:
              "A solicitação segue direto para manutenção e assistência quando necessário.",
          },
          {
            title: "Direcionamento conforme necessidade da operação",
            description:
              "Recomendações alinhadas ao contexto, ao ambiente e às metas da sua operação.",
          },
          {
            title: "Cotação com dados mais precisos",
            description:
              "Quanto mais informações do equipamento, mais precisa fica a cotação.",
          },
        ],
        // A arte de cada card fica no código, por posição.
        { fixed: true },
      ),
      buttonLabel: field.string("Texto do botão", "Falar com especialista"),
    }),
    faq: defineSection("Perguntas frequentes — título", {
      titleRegular: field.string("Título", "Dúvidas frequentes sobre "),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "baterias e carregadores",
      ),
    }),
    cta: defineSection("Chamada final (CTA)", {
      titleRegular: field.string("Título", "Precisa melhorar a disponibilidade dos seus "),
      titleAccent: field.string("Título — final em destaque (laranja)", "equipamentos elétricos?"),
      description: field.text(
        "Texto de apoio",
        "Fale com a TranspoTech e receba orientação para cotar baterias, carregadores ou avaliar a rotina de energia da operação.",
      ),
      ctaLabel: field.string("Texto do botão", "Solicitar cotação"),
    }),
  },
});
