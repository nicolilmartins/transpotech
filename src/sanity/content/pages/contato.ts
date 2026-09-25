import { definePage, defineSection, field } from "../fields";

const REQUIRED_HINT =
  "O asterisco de campo obrigatório é colocado automaticamente.";

export const contatoPage = definePage({
  key: "contato",
  title: "Contato",
  sections: {
    hero: defineSection("Banner com formulário", {
      eyebrow: field.string("Texto acima do título", "Contato"),
      titleTop: field.string("Título — primeira linha", "Entre em contato"),
      titleBottom: field.string(
        "Título — segunda linha (negrito)",
        "com a TranspoTech",
      ),
      description: field.text(
        "Texto de apoio",
        "Agende uma visita, proponha uma parceria, tire dúvidas ou fale com a nossa equipe de imprensa. Preencha o formulário ao lado e retornamos em até 2 dias úteis.",
      ),
      nameLabel: field.string("Campo nome — rótulo", "Nome", REQUIRED_HINT),
      namePlaceholder: field.string(
        "Campo nome — exemplo",
        "Digite seu nome completo.",
      ),
      companyLabel: field.string(
        "Campo empresa — rótulo",
        "Empresa",
        REQUIRED_HINT,
      ),
      companyPlaceholder: field.string(
        "Campo empresa — exemplo",
        "Informe o nome da empresa.",
      ),
      phoneLabel: field.string(
        "Campo telefone — rótulo",
        "Telefone",
        REQUIRED_HINT,
      ),
      phonePlaceholder: field.string(
        "Campo telefone — exemplo",
        "Telefone ou WhatsApp.",
      ),
      emailLabel: field.string(
        "Campo e-mail — rótulo",
        "E-mail",
        REQUIRED_HINT,
      ),
      emailPlaceholder: field.string(
        "Campo e-mail — exemplo",
        "nome@empresa.com.br",
      ),
      cityLabel: field.string(
        "Campo cidade — rótulo",
        "Cidade/UF",
        REQUIRED_HINT,
      ),
      cityPlaceholder: field.string(
        "Campo cidade — exemplo",
        "Informe onde sua operação está localizada",
      ),
      messageLabel: field.string(
        "Campo mensagem — rótulo",
        "Mensagem",
        REQUIRED_HINT,
      ),
      messagePlaceholder: field.string(
        "Campo mensagem — exemplo",
        "Descreva sua operação, equipamento, urgência, cidade ou o que você precisa resolver.",
      ),
      consentLabel: field.text(
        "Texto da caixa de consentimento",
        "Concordo com o tratamento dos meus dados conforme a Política de Privacidade da TranspoTech (LGPD).",
      ),
      submitLabel: field.string(
        "Texto do botão de envio",
        "Enviar solicitação",
      ),
      successMessage: field.text(
        "Mensagem após o envio",
        "Sua solicitação foi enviada! Em breve retornaremos com sua proposta.",
      ),
    }),
    help: defineSection("Escolha sua demanda", {
      eyebrow: field.string("Texto acima do título", "Atendimento"),
      titleTop: field.string("Título — primeira linha", "Escolha sua demanda"),
      titleBottom: field.string(
        "Título — segunda linha (negrito)",
        "e fale com o time certo",
      ),
      description: field.text(
        "Texto de apoio",
        "Cada necessidade tem um time dedicado na TranspoTech. Se você já sabe o que precisa, vá direto pelo canal correspondente e receba um atendimento mais rápido e especializado.",
      ),
      cards: field.list(
        "Cards",
        "Card",
        {
          title: field.string("Título", ""),
          description: field.text("Descrição", ""),
          ctaLabel: field.string("Texto do link", ""),
        },
        [
          {
            title: "Comprar empilhadeira",
            description:
              "Empilhadeiras novas e seminovas para diferentes aplicações, capacidades e ambientes operacionais.",
            ctaLabel: "Solicitar orçamento",
          },
          {
            title: "Locar empilhadeira",
            description:
              "Locação de empilhadeiras com contratos flexíveis, suporte técnico e orientação para escolher o equipamento ideal.",
            ctaLabel: "Quero locar",
          },
          {
            title: "Solicitar assistência técnica",
            description:
              "Manutenção preventiva, corretiva, serviços multimarcas e suporte técnico para sua frota.",
            ctaLabel: "Solicitar assistência",
          },
          {
            title: "Cotar peças, pneus, baterias ou carregadores",
            description:
              "Envie sua necessidade, modelo do equipamento ou uma foto para receber orientação e cotação.",
            ctaLabel: "Solicitar cotação",
          },
          {
            title: "Avaliar minha operação",
            description:
              "Para empresas que precisam melhorar fluxo, produtividade, armazenagem, movimentação ou automação intralogística.",
            ctaLabel: "Avaliar minha operação",
          },
        ],
        // Ícone e destino do link de cada card ficam no código, por posição.
        { fixed: true },
      ),
    }),
    units: defineSection("Unidades", {
      titleRegular: field.string(
        "Título — primeira linha",
        "Encontre a unidade",
      ),
      titleAccent: field.string(
        "Título — segunda linha (laranja)",
        "mais próxima",
      ),
      description: field.text(
        "Texto de apoio",
        "A TranspoTech conta com unidades e estrutura regional\npara atender empresas em diferentes localidades.",
        "Enter quebra a linha a partir de 640px de largura (tablet e desktop).",
      ),
      addressFallback: field.string(
        "Texto do card de unidade sem endereço",
        "Endereço completo disponível em breve.",
      ),
      buttonLabel: field.string(
        "Texto do botão",
        "Encontrar atendimento na minha região",
      ),
    }),
    faq: defineSection("Perguntas frequentes — título", {
      titleRegular: field.string("Título", "Perguntas "),
      titleAccent: field.string(
        "Título — final em destaque (laranja)",
        "frequentes",
      ),
    }),
  },
});
