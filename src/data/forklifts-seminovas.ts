import type { Forklift } from "@/types/forklift.types";
// Fotos de produto reaproveitadas do catálogo de novas (recortes com fundo
// transparente) até chegarem as fotos reais de cada equipamento do estoque.
import fmx from "@/assets/images/empilhadeiras/maq-fmx.webp";
import h50evo from "@/assets/images/empilhadeiras/maq-h50evo.webp";
import kbd35 from "@/assets/images/empilhadeiras/maq-kbd35.webp";
import rx20 from "@/assets/images/empilhadeiras/maq-rx20.webp";
// Fotos ambientadas dos mesmos modelos, usadas na galeria do detalhe.
import detFmx from "@/assets/images/empilhadeiras/det-fmx.webp";
import detHevo from "@/assets/images/empilhadeiras/det-hevo.webp";
import detKbd35 from "@/assets/images/empilhadeiras/det-kbd35.webp";
import detRx20 from "@/assets/images/empilhadeiras/det-rx20.webp";

// PLACEHOLDER — classificados de seminovas.
// Ano, horas trabalhadas, capacidade, localização e fotos são fictícios e
// precisam ser substituídos pelo inventário real assim que o comercial enviar.
// Os campos herdados de `Forklift` (energia, elevação, corredor) não aparecem
// nos cards de classificados, mas seguem preenchidos porque o modal de
// orçamento reaproveita o mesmo tipo.
export const forkliftsSeminovas: Forklift[] = [
  {
    id: "seminova-still-rx-20",
    name: "Empilhadeira Elétrica STILL RX 20",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Contrabalançada",
    application: "Carga, descarga e transporte interno",
    capacity: "2,0 t",
    energy: "Elétrica 48V",
    liftHeight: "4.700 mm",
    aisleWidth: "3.400 mm",
    availability: "Pronta entrega",
    location: "Curitiba - PR",
    year: "2020",
    workedHours: "6.400 h",
    image: rx20,
    gallery: [rx20, detRx20],
  },
  {
    id: "seminova-still-fm-x",
    name: "Empilhadeira Retrátil STILL FM-X",
    brand: "STILL",
    energyTag: "Elétrica",
    equipmentType: "Retrátil",
    application: "Armazenagem vertical e picking",
    capacity: "1,6 t",
    energy: "Elétrica",
    liftHeight: "8.500 mm",
    aisleWidth: "2.700 mm",
    availability: "Pronta entrega",
    location: "Joinville - SC",
    year: "2021",
    workedHours: "4.800 h",
    image: fmx,
    gallery: [fmx, detFmx],
  },
  {
    id: "seminova-linde-h50-evo",
    name: "Empilhadeira a Combustão Linde H50 EVO",
    brand: "Linde",
    energyTag: "Combustão",
    equipmentType: "Contrabalançada",
    application: "Operações externas e cargas pesadas",
    capacity: "5,0 t",
    energy: "Diesel",
    liftHeight: "4.500 mm",
    aisleWidth: "4.900 mm",
    availability: "Sob consulta",
    location: "São Paulo - SP",
    year: "2019",
    workedHours: "9.200 h",
    image: h50evo,
    gallery: [h50evo, detHevo],
  },
  {
    id: "seminova-baoli-kbd-35",
    name: "Empilhadeira a Combustão Baoli KBD 35",
    brand: "Baoli",
    energyTag: "Combustão",
    equipmentType: "Contrabalançada",
    application: "Carga, descarga e transporte interno",
    capacity: "3,5 t",
    energy: "Diesel",
    liftHeight: "3.000 mm",
    aisleWidth: "4.300 mm",
    availability: "Pronta entrega",
    location: "Porto Alegre - RS",
    year: "2022",
    workedHours: "3.100 h",
    image: kbd35,
    gallery: [kbd35, detKbd35],
  },
];

export function getSeminovaBySlug(slug: string): Forklift | undefined {
  return forkliftsSeminovas.find((forklift) => forklift.id === slug);
}

/** Demais classificados, para a seção "outras seminovas" do detalhe. */
export function getOtherSeminovas(current: Forklift, limit = 4): Forklift[] {
  return forkliftsSeminovas
    .filter((forklift) => forklift.id !== current.id)
    .slice(0, limit);
}
