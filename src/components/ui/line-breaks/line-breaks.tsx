import { Fragment } from "react";

type LineBreaksProps = {
  /** Texto do CMS; cada Enter vira uma quebra de linha. */
  text: string;
  /** Classes do <br> — a quebra do layout costuma valer só em uma faixa de tela (ex.: "hidden lg:block"). */
  brClassName?: string;
};

/**
 * Renderiza as quebras de linha digitadas no Studio com o mesmo <br> que o
 * layout usava. Cada linha termina em espaço: onde o <br> fica oculto, as
 * palavras dos dois lados não grudam.
 */
export function LineBreaks({ text, brClassName }: LineBreaksProps) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br className={brClassName} />}
      {i < lines.length - 1 ? `${line.trimEnd()} ` : line}
    </Fragment>
  ));
}
