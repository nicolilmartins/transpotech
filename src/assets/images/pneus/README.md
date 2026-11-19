# Pneus — imagens das categorias

Artes dos cards da seção "Escolha a categoria mais próxima da sua necessidade"
(`src/components/pneus/categories-section/categories-section.tsx`).

São **recortes com fundo transparente** exportados do Figma (TPT01 — Website
Redesign, node `3705:3158`), um por card. No card, a máquina fica sobreposta e
sai pelo topo dele — por isso o fundo precisa ser transparente.

| Arquivo | Card | Origem no Figma |
|---|---|---|
| `pneu-empilhadeira.webp` | Pneus para Empilhadeiras | `RC-44 1` (recortado na vertical como no layout) |
| `pneu-otr.webp` | Pneus OTR (Off-The-Road) | `image 50` — duas camadas do nó mescladas em uma |
| `pneu-agricola.webp` | Pneus Agrícolas | `image 50` |
| `pneu-florestal.webp` | Pneus Florestais | `image 51` |
| `pneu-portuario.webp` | Pneus Portuários | `image 52` |

## Formato

- `.webp` com transparência, até 1000px de largura, q88. A maior exibição é
  ~300px de largura, então sobra resolução para telas 3x.
- A **proporção de cada arquivo precisa ser a da caixa da arte no Figma** — a
  posição e o tamanho no card estão no array `categories` da seção, em `cqw`
  (fração da largura do card de 426px do Figma). Trocar uma arte por outra de
  proporção diferente desalinha a composição.

## Para substituir uma arte

1. Exportar o recorte no Figma com fundo transparente, na mesma proporção.
2. Converter para `.webp` mantendo o alfa e sobrescrever o arquivo com o mesmo nome.
3. Se a caixa da arte mudar no Figma, atualizar `top` / `left` / `width` do card
   no array `categories`.
