# Image generation — referências para as páginas de detalhe

Renders de exemplo (gerados via IA) que definem os **cenários, ângulos e luz** desejados
para as imagens das páginas de detalhe de empilhadeiras novas
(`/produtos/empilhadeiras/novas/[slug]`). **Nada desta pasta é importado pelo código** —
ela é insumo para gerar as imagens finais (Magnific), que são salvas em `.webp` em
`src/assets/images/empilhadeiras/` e ligadas via campo `media` em
`src/data/forklift-details.ts`.

## Cenários por seção da página de detalhe

| Seção (slot de `media`) | Cenário desejado | Formato |
|---|---|---|
| `hero` (palco da experiência) | Equipamento em ambiente real (galpão/CD), enquadramento horizontal | ~3:2 |
| `cards[0]` Qualidade de fábrica | 3/4 em armazém com porta-paletes | 4:3 |
| `cards[1]` Eficiência energética | Close no compartimento de bateria Li-Ion / carregamento | 4:3 |
| `cards[2]` Configuração sob medida | 3/4 em pátio de doca com paletes | 4:3 |
| `cards[3]` Pós-venda especializado | Close do timão/comandos (detalhe técnico) | 4:3 |
| `cards[4]` Estrutura regional | Frontal em pátio externo (céu aberto) | 4:3 |
| `gallery.wide` | Plano aberto horizontal em CD com prateleiras | 16:9 |
| `gallery.pair[0]` | Detalhe dos garfos/rolos de carga | 4:3 |
| `gallery.pair[1]` | Detalhe traseiro/rodado ou punho em outro ângulo | 4:3 |

## Subpastas (uma por equipamento)

- `exh-20/` — Transpaleteira Elétrica EXH 20 (Lítio-Íon) · `still-exh-20-litio-ion`
- `ech-15c/` — Transpaleteira ECH 15C · pendente de integração
- `ecv-16-s6/` — Empilhadeira patolada ECV 16 S6 · pendente de integração

Nome dos arquivos: `<equipamento>-<cenario>.png` (ex.: `exh-20-lateral-galpao.png`).

## Processo (repetir por equipamento)

1. Referências no Magnific: foto de catálogo do equipamento (identidade) + renders desta pasta (cenário/luz).
2. Gerar os slots faltantes com modelo de alta fidelidade a referência (ex.: Nano Banana Pro), mantendo design e branding STILL exatos.
3. Converter tudo para `.webp` (~1500px, q80, via `sharp`) em `src/assets/images/empilhadeiras/`.
4. Preencher `media` do equipamento em `detailById` (`src/data/forklift-details.ts`).
