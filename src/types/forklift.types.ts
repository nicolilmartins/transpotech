import type { StaticImageData } from "next/image";

export type ForkliftBrand = "STILL" | "Linde" | "Baoli";

export type Forklift = {
  /** Slug usado na futura rota de detalhe (ex.: "still-e20-litio-ion"). */
  id: string;
  /** Nome/modelo completo exibido no título do card. */
  name: string;
  /** Marca — tag laranja do card e facet "Marca". */
  brand: ForkliftBrand;
  /** Categoria de energia — tag cinza do card e facet "Energia". */
  energyTag: string;
  /** Tipo de equipamento — facet "Tipo de equipamento". */
  equipmentType: string;
  /** Aplicação — subtítulo do card e facet "Aplicação". */
  application: string;
  /** Spec "Capacidade" (placeholder até dados reais). */
  capacity: string;
  /** Spec "Energia" detalhada (placeholder até dados reais). */
  energy: string;
  /** Spec "Elevação" — altura máx. que a máquina levanta (PLACEHOLDER). */
  liftHeight: string;
  /** Spec "Corredor operacional" — largura mín. de corredor para operar/girar (PLACEHOLDER). */
  aisleWidth: string;
  /** Spec/facet "Disponibilidade" (placeholder). */
  availability: string;
  /** Facet "Localização" (placeholder). */
  location: string;
  /** Foto do produto. Placeholder still-E20 em todos por enquanto. */
  image: StaticImageData;
};
