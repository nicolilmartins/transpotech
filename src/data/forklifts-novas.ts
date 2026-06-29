import type { Forklift } from "@/types/forklift.types";
import stillE20 from "@/assets/images/empilhadeiras/e20_1.webp";
import egv16Ng from "@/assets/images/empilhadeiras/egv_ng_1.webp";
import egv16Sf from "@/assets/images/empilhadeiras/egv_sf_1.webp";
import ech15c from "@/assets/images/empilhadeiras/ech-15c.webp";
import exh20 from "@/assets/images/empilhadeiras/exh_1.webp";
import exhSf from "@/assets/images/empilhadeiras/exh_sf_1.webp";
import erx from "@/assets/images/empilhadeiras/erx_1.webp";
import rce25 from "@/assets/images/empilhadeiras/rce_1.webp";
import rx2020p from "@/assets/images/empilhadeiras/rx_1.webp";
import rc4425 from "@/assets/images/empilhadeiras/rc_44_1.webp";
import fmx from "@/assets/images/empilhadeiras/fmx_1.webp";
import lindeH50H80 from "@/assets/images/empilhadeiras/H50-H80 EVO.webp";
import lindeH20H35 from "@/assets/images/empilhadeiras/h_20_35_1_1.webp";
import lindeT20T25 from "@/assets/images/empilhadeiras/T20-T25 FP.webp";

// Produtos reais do catálogo atual da TranspoTech (11 STILL + 3 Linde).
// Specs (capacity/energy/availability/location) são PLACEHOLDER — serão
// ajustados produto a produto. Imagem específica por modelo.
export const forkliftsNovas: Forklift[] = [
  {
    id: "still-egv-16-ng",
    name: "Empilhadeira Patolada EGV 16 NG",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Patolada",
    application: "Armazenagem vertical e picking",
    capacity: "1,6 t",
    energy: "Elétrica",
    availability: "Sob consulta",
    location: "Curitiba - PR",
    image: egv16Ng,
  },
  {
    id: "still-egv-16-sf",
    name: "Empilhadeira Elétrica Patolada EGV 16 SF",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Patolada",
    application: "Armazenagem vertical e picking",
    capacity: "1,6 t",
    energy: "Elétrica",
    availability: "Pronta entrega",
    location: "São Paulo - SP",
    image: egv16Sf,
  },
  {
    id: "still-ech-15c",
    name: "Transpaleteira Elétrica ECH 15C",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Transpaleteira",
    application: "Movimentação horizontal e abastecimento",
    capacity: "1,5 t",
    energy: "Elétrica",
    availability: "Sob consulta",
    location: "Porto Alegre - RS",
    image: ech15c,
  },
  {
    id: "still-exh-20-litio-ion",
    name: "Transpaleteira Elétrica EXH 20 (Lítio-Íon)",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Transpaleteira",
    application: "Movimentação horizontal e abastecimento",
    capacity: "2,0 t",
    energy: "Lítio-Íon",
    availability: "Pronta entrega",
    location: "Curitiba - PR",
    image: exh20,
  },
  {
    id: "still-exh-sf-16c-20c",
    name: "Transpaleteira Elétrica EXH-SF 16C/20C",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Transpaleteira",
    application: "Carga e descarga de veículos",
    capacity: "2,0 t",
    energy: "Elétrica",
    availability: "Sob consulta",
    location: "Joinville - SC",
    image: exhSf,
  },
  {
    id: "still-erx",
    name: "Transpaleteira Elétrica ERX",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Transpaleteira",
    application: "Movimentação horizontal e abastecimento",
    capacity: "2,0 t",
    energy: "Elétrica",
    availability: "Sob consulta",
    location: "São Paulo - SP",
    image: erx,
  },
  {
    id: "still-rce-25-litio-ion",
    name: "Empilhadeira Elétrica RCE 25 (Lítio-Íon)",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Contrabalançada",
    application: "Carga, descarga e transporte interno",
    capacity: "2,5 t",
    energy: "Lítio-Íon",
    availability: "Pronta entrega",
    location: "Curitiba - PR",
    image: rce25,
  },
  {
    id: "still-e20-litio-ion",
    name: "Empilhadeira Elétrica E20 (Lítio-Íon)",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Contrabalançada",
    application: "Carga, descarga e transporte interno",
    capacity: "2,0 t",
    energy: "Lítio-Íon",
    availability: "Sob consulta",
    location: "Porto Alegre - RS",
    image: stillE20,
  },
  {
    id: "still-rx20-20p",
    name: "Empilhadeira Elétrica RX20-20P",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Contrabalançada",
    application: "Carga, descarga e transporte interno",
    capacity: "2,0 t",
    energy: "Elétrica",
    availability: "Sob consulta",
    location: "São Paulo - SP",
    image: rx2020p,
  },
  {
    id: "still-rc-44-25-c",
    name: "Empilhadeira Contrabalançada a Combustão RC 44-25 C",
    brand: "STILL",
    energyTag: "Combustão",
    equipmentType: "Contrabalançada",
    application: "Operações externas e cargas pesadas",
    capacity: "2,5 t",
    energy: "Diesel/GLP",
    availability: "Sob consulta",
    location: "Joinville - SC",
    image: rc4425,
  },
  {
    id: "still-fm-x-17-20",
    name: "Empilhadeira Retrátil FM-X 17/20",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Retrátil",
    application: "Armazenagem vertical e picking",
    capacity: "2,0 t",
    energy: "Elétrica",
    availability: "Pronta entrega",
    location: "Curitiba - PR",
    image: fmx,
  },
  {
    id: "linde-h50-h80-evo",
    name: "Empilhadeira Linde H50 – H80 EVO",
    brand: "Linde",
    energyTag: "Combustão",
    equipmentType: "Contrabalançada",
    application: "Operações externas e cargas pesadas",
    capacity: "8,0 t",
    energy: "Diesel/GLP",
    availability: "Sob consulta",
    location: "São Paulo - SP",
    image: lindeH50H80,
  },
  {
    id: "linde-h20-h35",
    name: "Empilhadeira Linde H20 – H35",
    brand: "Linde",
    energyTag: "Combustão",
    equipmentType: "Contrabalançada",
    application: "Carga, descarga e transporte interno",
    capacity: "3,5 t",
    energy: "Diesel/GLP",
    availability: "Pronta entrega",
    location: "Curitiba - PR",
    image: lindeH20H35,
  },
  {
    id: "linde-t20-t25-fp",
    name: "Paleteira Linde T20 – T25 FP",
    brand: "Linde",
    energyTag: "Elétrica",
    equipmentType: "Transpaleteira",
    application: "Movimentação horizontal e abastecimento",
    capacity: "2,5 t",
    energy: "Elétrica",
    availability: "Sob consulta",
    location: "Porto Alegre - RS",
    image: lindeT20T25,
  },
];

/** Ordem de exibição das marcas no grid agrupado. */
export const brandOrder: Forklift["brand"][] = ["STILL", "Linde", "Baoli"];

/** Busca um produto pelo slug (id) da rota de detalhe. */
export function getForkliftBySlug(slug: string): Forklift | undefined {
  return forkliftsNovas.find((f) => f.id === slug);
}

/**
 * Produtos relacionados: prioriza a mesma marca, depois o mesmo tipo de
 * equipamento, completando até `count` (excluindo o produto atual).
 */
export function getRelatedForklifts(current: Forklift, count = 4): Forklift[] {
  const others = forkliftsNovas.filter((f) => f.id !== current.id);
  const score = (f: Forklift) =>
    (f.brand === current.brand ? 2 : 0) +
    (f.equipmentType === current.equipmentType ? 1 : 0);
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, count);
}

/** UFs presentes nos dados → nome do estado (para o texto de disponibilidade). */
const ufToState: Record<string, string> = {
  PR: "Paraná",
  SP: "São Paulo",
  RS: "Rio Grande do Sul",
  SC: "Santa Catarina",
};

/** Extrai o nome do estado a partir do campo `location` (ex.: "Joinville - SC"). */
export function stateFromLocation(location: string): string {
  const uf = location.split(" - ")[1]?.trim() ?? "";
  return ufToState[uf] ?? location;
}
