import type { StaticImageData } from "next/image";

// Imagens geradas para cada projeto (tema alinhado ao nome do projeto).
import projPescar from "@/assets/images/esg-projects/proj-pescar.webp";
import projParadesporto from "@/assets/images/esg-projects/proj-paradesporto.webp";
import projRally from "@/assets/images/esg-projects/proj-rally-inclusao.webp";
import projBunekas from "@/assets/images/esg-projects/proj-bunekas.webp";
import projRotaria from "@/assets/images/esg-projects/proj-fundacao-rotaria.webp";
import projAnimais from "@/assets/images/esg-projects/proj-empresa-amiga-animais.webp";

export type EsgProject = {
  title: string;
  category: string;
  description: string;
  image: StaticImageData;
};

/** Projetos apoiados pela TranspoTech — conteúdo editável no CMS. */
export const esgProjects: EsgProject[] = [
  {
    title: "Projeto Pescar",
    category: "Educação e juventude",
    description:
      "Formação profissional e cidadã de jovens em situação de vulnerabilidade, preparando-os para o primeiro emprego.",
    image: projPescar,
  },
  {
    title: "Paradesporto",
    category: "Esporte e inclusão",
    description:
      "Incentivo ao esporte adaptado, apoiando atletas e a inclusão de pessoas com deficiência por meio do esporte.",
    image: projParadesporto,
  },
  {
    title: "Rally da Inclusão",
    category: "Inclusão",
    description:
      "Evento que promove a inclusão, a autonomia e a convivência de pessoas com deficiência com toda a comunidade.",
    image: projRally,
  },
  {
    title: "Projeto Bunekas",
    category: "Comunidade",
    description:
      "Confecção artesanal de bonecas que gera renda e fortalece os laços de mulheres e famílias da comunidade.",
    image: projBunekas,
  },
  {
    title: "Fundação Rotária",
    category: "Humanitário",
    description:
      "Apoio à realização de projetos humanitários e ações sociais em parceria com a Fundação Rotária.",
    image: projRotaria,
  },
  {
    title: "Empresa Amiga dos Animais",
    category: "Comunidade",
    description:
      "Adoção dos elefantes e girafas do Zoológico de Pomerode, apoiando o cuidado e a preservação animal.",
    image: projAnimais,
  },
];
