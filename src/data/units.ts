export type Unit = {
  /** Cidade + UF (ex.: "Curitiba - PR"). */
  city: string;
  /** Complemento opcional da unidade (ex.: "Hub Técnico"). */
  note?: string;
  /** Telefone de contato da unidade. */
  phone: string;
  /** Endereço completo (rua, número, bairro). PENDÊNCIA: preencher com o
   *  endereço real de cada unidade. Enquanto ausente, o card exibe um aviso. */
  address?: string;
};

/** Unidades TranspoTech (11) — mesma fonte do rodapé, ordenadas por estado
 *  (SC > PR > RS > SP > GO). Fonte para a seção Estrutura. */
export const units: Unit[] = [
  {
    city: "Blumenau - SC",
    note: "Hub Técnico",
    phone: "(47) 3331-4900",
    address: "Via Expressa Paul Fritz Kuehnrich, 2.377",
  },
  {
    city: "Blumenau - SC",
    note: "Seminovas",
    phone: "(47) 3331-4900",
    address: "Rua Bahia, 2291 - Salto",
  },
  {
    city: "Chapecó - SC",
    phone: "(49) 3981-9975",
    address: "Rua Marino Finco, 110 - Bom Retiro",
  },
  {
    city: "Itajaí - SC",
    phone: "(47) 3331-4901",
    address: "Rua José Rosa, 1401 - Cordeiros",
  },
  {
    city: "Joinville - SC",
    phone: "(47) 3419-0033",
    address: "Rua Eugênio Ernesto Kunde, 710",
  },
  {
    city: "Curitiba - PR",
    phone: "(41) 3377-3303",
    address: "Estrada do Ganchinho, 640 - BR 376, Contorno Leste (Saída 114)",
  },
  {
    city: "Maringá - PR",
    phone: "(44) 3200-0414",
    address: "BR-376, 989 - Zona 19",
  },
  {
    city: "Caxias do Sul - RS",
    phone: "(54) 3771-4129",
    address: "Rua Frei Pacífico, 1325",
  },
  {
    city: "Nova Santa Rita - RS",
    phone: "(51) 3479-6740",
    address: "BR 386 - Acesso Berto Cirio, 1.351",
  },
  {
    city: "Indaiatuba - SP",
    phone: "(19) 3825-3370",
    address: "Rua Alberto Guizo, 739 - Distrito Industrial",
  },
  {
    city: "Aparecida de Goiânia - GO",
    phone: "(62) 3413-8334",
    address: "Rua dos Cajueiros, Qd.46 - Lt. 09 - Retiro do Bosque",
  },
];
