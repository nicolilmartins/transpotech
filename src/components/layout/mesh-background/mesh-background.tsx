import type { CSSProperties } from "react";
import malha from "@/assets/images/background-malha.webp";

// Máscara que apaga a malha de cima para baixo (topo visível → base transparente).
const FADE =
  "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.55) 35%, transparent 75%)";

/**
 * Malha estática de fundo (sem interação de cursor) usando a imagem
 * background-malha.webp, com gradiente vertical que some em direção à base.
 */
export function MeshBackground({ className }: { className?: string }) {
  const style: CSSProperties = {
    backgroundImage: `url(${malha.src})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    // Imagem inteira: largura completa do container, altura proporcional (sem repetir).
    backgroundSize: "100% auto",
    maskImage: FADE,
    WebkitMaskImage: FADE,
  };

  return <div aria-hidden className={className} style={style} />;
}
