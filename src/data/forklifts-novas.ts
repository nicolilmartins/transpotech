import type { Forklift } from "@/types/forklift.types";
// Fotos de produto (recortes com fundo transparente).
import egvNg from "@/assets/images/empilhadeiras/egv_ng_1.webp";
import egvSf from "@/assets/images/empilhadeiras/egv_sf_1.webp";
import rce from "@/assets/images/empilhadeiras/rce_1.webp";
import rc40 from "@/assets/images/empilhadeiras/rc_44_1.webp";
import ech15c from "@/assets/images/empilhadeiras/maq-ech15c.webp";
import erx from "@/assets/images/empilhadeiras/maq-erx.webp";
import exhSf from "@/assets/images/empilhadeiras/maq-exhsf.webp";
import exhSf25 from "@/assets/images/empilhadeiras/maq-exhsf25.webp";
import fmx from "@/assets/images/empilhadeiras/maq-fmx.webp";
import rx20 from "@/assets/images/empilhadeiras/maq-rx20.webp";
import t20 from "@/assets/images/empilhadeiras/maq-t20.webp";
import e50 from "@/assets/images/empilhadeiras/maq-e50.webp";
import h50evo from "@/assets/images/empilhadeiras/maq-h50evo.webp";
import h80evo from "@/assets/images/empilhadeiras/maq-h80evo.webp";
import kbd35 from "@/assets/images/empilhadeiras/maq-kbd35.webp";
import kbd70 from "@/assets/images/empilhadeiras/maq-kbd70.webp";

// Catálogo atual da TranspoTech (10 STILL + 4 Linde + 2 Baoli).
// Specs técnicas baseadas nos dados oficiais STILL, Linde e Baoli (grupo KION);
// liftHeight = altura máx. de elevação, aisleWidth = corredor operacional (Ast,
// varia conforme o mastro). Disponibilidade/localização são dados comerciais.
export const forkliftsNovas: Forklift[] = [
  {
    id: "still-ech-15c",
    name: "Transpaleteira Elétrica STILL ECH 15C",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Transpaleteira",
    application: "Movimentação horizontal e abastecimento",
    capacity: "1,5 t",
    energy: "Elétrica (Li-Ion)",
    liftHeight: "135 mm",
    aisleWidth: "2.000 mm",
    availability: "Pronta entrega",
    location: "Curitiba - PR",
    image: ech15c,
  },
  {
    id: "still-egv-16-ng",
    name: "Empilhadeira Elétrica Patolada STILL EGV NG",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Patolada",
    application: "Armazenagem vertical e picking",
    capacity: "1,6 t",
    energy: "Elétrica",
    liftHeight: "6.000 mm",
    aisleWidth: "2.400 mm",
    availability: "Sob consulta",
    location: "Curitiba - PR",
    image: egvNg,
  },
  {
    id: "still-egv-16-sf",
    name: "Empilhadeira Elétrica Patolada STILL EGV SF",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Patolada",
    application: "Armazenagem vertical e picking",
    capacity: "1,6 t",
    energy: "Elétrica",
    liftHeight: "6.000 mm",
    aisleWidth: "2.400 mm",
    availability: "Pronta entrega",
    location: "São Paulo - SP",
    image: egvSf,
  },
  {
    id: "still-rce-25-litio-ion",
    name: "Empilhadeira Elétrica STILL RCE 25/35",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Contrabalançada",
    application: "Carga, descarga e transporte interno",
    capacity: "2,5 – 3,5 t",
    energy: "Elétrica 80V (Li-Ion)",
    liftHeight: "6.500 mm",
    aisleWidth: "3.700 mm",
    availability: "Pronta entrega",
    location: "Curitiba - PR",
    image: rce,
  },
  {
    id: "still-rc-44-25-c",
    name: "Empilhadeira a Combustão STILL RC 44-25 C",
    brand: "STILL",
    energyTag: "Combustão",
    equipmentType: "Contrabalançada",
    application: "Operações externas e cargas pesadas",
    capacity: "2,5 t",
    energy: "Diesel/GLP",
    liftHeight: "5.000 mm",
    aisleWidth: "3.900 mm",
    availability: "Sob consulta",
    location: "Joinville - SC",
    image: rc40,
  },
  {
    id: "still-exh-sf-16c-20c",
    name: "Transpaleteira Elétrica STILL EXH-SF 20C",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Transpaleteira",
    application: "Carga e descarga de veículos",
    capacity: "2,0 t",
    energy: "Elétrica (Li-Ion)",
    liftHeight: "135 mm",
    aisleWidth: "2.300 mm",
    availability: "Sob consulta",
    location: "Joinville - SC",
    image: exhSf,
  },
  {
    id: "still-exh-sf-25",
    name: "Transpaleteira Elétrica STILL EXH-SF 25",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Transpaleteira",
    application: "Carga e descarga de veículos",
    capacity: "2,5 t",
    energy: "Elétrica (Li-Ion)",
    liftHeight: "125 mm",
    aisleWidth: "2.926 mm",
    availability: "Sob consulta",
    location: "Joinville - SC",
    image: exhSf25,
  },
  {
    id: "still-erx",
    name: "Transpaleteira Elétrica STILL ERX",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Transpaleteira",
    application: "Movimentação horizontal e abastecimento",
    capacity: "2,5 t",
    energy: "Elétrica",
    liftHeight: "135 mm",
    aisleWidth: "2.300 mm",
    availability: "Sob consulta",
    location: "São Paulo - SP",
    image: erx,
  },
  {
    id: "still-fm-x-17-20",
    name: "Empilhadeira Retrátil STILL FM-X",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Retrátil",
    application: "Armazenagem vertical e picking",
    capacity: "1,4 – 2,5 t",
    energy: "Elétrica",
    liftHeight: "13.000 mm",
    aisleWidth: "2.700 mm",
    availability: "Pronta entrega",
    location: "Curitiba - PR",
    image: fmx,
  },
  {
    id: "still-rx20-20p",
    name: "Empilhadeira Elétrica STILL RX 20",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Contrabalançada",
    application: "Carga, descarga e transporte interno",
    capacity: "1,4 – 2,0 t",
    energy: "Elétrica 48V",
    liftHeight: "7.900 mm",
    aisleWidth: "3.400 mm",
    availability: "Sob consulta",
    location: "São Paulo - SP",
    image: rx20,
  },
  {
    id: "linde-t20-t25-fp",
    name: "Paleteira Elétrica Linde T20 – T25",
    brand: "Linde",
    energyTag: "Elétrica",
    equipmentType: "Transpaleteira",
    application: "Movimentação horizontal e abastecimento",
    capacity: "2,0 – 2,5 t",
    energy: "Elétrica (Li-Ion)",
    liftHeight: "135 mm",
    aisleWidth: "2.300 mm",
    availability: "Sob consulta",
    location: "Porto Alegre - RS",
    image: t20,
  },
  {
    id: "linde-e35-e50",
    name: "Empilhadeira Elétrica Linde E35 – E50",
    brand: "Linde",
    energyTag: "Elétrica",
    equipmentType: "Contrabalançada",
    application: "Carga, descarga e transporte interno",
    capacity: "3,5 – 5,0 t",
    energy: "Elétrica 80V (Li-Ion)",
    liftHeight: "7.000 mm",
    aisleWidth: "4.000 mm",
    availability: "Sob consulta",
    location: "São Paulo - SP",
    image: e50,
  },
  {
    id: "linde-h50-evo",
    name: "Empilhadeira a Combustão Linde H50 EVO",
    brand: "Linde",
    energyTag: "Combustão",
    equipmentType: "Contrabalançada",
    application: "Operações externas e cargas pesadas",
    capacity: "5,0 t",
    energy: "Diesel",
    liftHeight: "5.000 mm",
    aisleWidth: "4.600 mm",
    availability: "Sob consulta",
    location: "Curitiba - PR",
    image: h50evo,
  },
  {
    id: "linde-h80-evo",
    name: "Empilhadeira a Combustão Linde H80 EVO",
    brand: "Linde",
    energyTag: "Combustão",
    equipmentType: "Contrabalançada",
    application: "Operações externas e cargas pesadas",
    capacity: "8,0 t",
    energy: "Diesel",
    liftHeight: "5.000 mm",
    aisleWidth: "5.100 mm",
    availability: "Sob consulta",
    location: "São Paulo - SP",
    image: h80evo,
  },
  {
    id: "baoli-kbd-35",
    name: "Empilhadeira a Diesel Baoli KBD 35",
    brand: "Baoli",
    energyTag: "Combustão",
    equipmentType: "Contrabalançada",
    application: "Operações externas e cargas pesadas",
    capacity: "3,5 t",
    energy: "Diesel",
    liftHeight: "6.000 mm",
    aisleWidth: "4.000 mm",
    availability: "Sob consulta",
    location: "Curitiba - PR",
    image: kbd35,
  },
  {
    id: "baoli-kbd-70",
    name: "Empilhadeira a Diesel Baoli KBD 70",
    brand: "Baoli",
    energyTag: "Combustão",
    equipmentType: "Contrabalançada",
    application: "Operações externas e cargas pesadas",
    capacity: "7,0 t",
    energy: "Diesel",
    liftHeight: "6.000 mm",
    aisleWidth: "5.000 mm",
    availability: "Sob consulta",
    location: "Joinville - SC",
    image: kbd70,
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
