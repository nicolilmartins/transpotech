import Image from "next/image";
import flagBr from "@/assets/images/flags/br.svg";

export type MadeInBrazilBadgeProps = {
  /**
   * Largura do selo: número em px ou qualquer medida CSS (ex.: "22%" para
   * acompanhar a largura da foto). A altura segue a proporção 4:3 da bandeira.
   */
  width?: number | string;
  /** Classes extras — normalmente o posicionamento sobre a imagem. */
  className?: string;
};

/**
 * Selo "Produzido no Brasil" — mesma sinalização que a STILL usa nos modelos
 * de fabricação nacional (bandeira no canto superior esquerdo da foto). O
 * rótulo fica no `title`/`alt` porque a bandeira sozinha não comunica o
 * significado para leitores de tela.
 */
export function MadeInBrazilBadge({
  width = "22%",
  className = "",
}: MadeInBrazilBadgeProps) {
  return (
    // A largura fica no style do wrapper e a altura vem do aspect-ratio: sem
    // largura própria, um span em absoluto esticaria a bandeira até a largura
    // do container.
    <span
      title="Produzido no Brasil"
      style={{ width, aspectRatio: "4 / 3" }}
      className={`pointer-events-none block overflow-hidden rounded-[3px] ring-1 ring-black/10 ${className}`}
    >
      <Image
        src={flagBr}
        alt="Produzido no Brasil"
        fill
        sizes="120px"
        className="object-cover"
      />
    </span>
  );
}
