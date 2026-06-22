# Estrutura de Páginas — TranspoTech Website

Baseado no sitemap aprovado. Legenda do arquivo original:
- **Agrupamento (Menu)** — agrupador de navegação, sem página própria
- **Página** — rota com página dedicada
- **Template** — sub-página com layout reutilizável (ex: catálogo por categoria)
- **Seção** — bloco de conteúdo dentro de uma página, sem rota própria

---

## Estrutura de rotas

```
/                                          → Início
│
├── /produtos/                             → [Agrupamento de menu]
│   ├── /produtos/locacao-de-empilhadeiras → Locação de Empilhadeiras
│   ├── /produtos/empilhadeiras            → Venda de Empilhadeiras (Catálogo)
│   │   ├── /produtos/empilhadeiras/novas  → Novas [Template]
│   │   └── /produtos/empilhadeiras/usadas → Usadas [Template]
│   ├── /produtos/pneus                    → Pneus
│   ├── /produtos/baterias-e-carregadores  → Baterias e Carregadores
│   └── /produtos/pecas                    → Peças
│
├── /servicos                              → Serviços
│   ├── #manutencao-preventiva             → Planos de Manutenção Preventiva [Seção]
│   ├── #manutencao-corretiva              → Manutenção Corretiva [Seção]
│   └── #assistencia-multimarcas           → Assistência Multimarcas [Seção]
│
├── /automacao-intralogistica              → Automação Intralogística (Dematic)
│
├── /empresa/                              → [Agrupamento de menu]
│   ├── /empresa/quem-somos                → Quem Somos
│   ├── /empresa/esg/                      → ESG [Agrupamento de menu]
│   │   ├── /empresa/esg/sustentabilidade  → Sustentabilidade
│   │   ├── /empresa/esg/canal-da-transparencia → Canal da Transparência
│   │   └── /empresa/esg/ouvidoria-digital → Ouvidoria Digital
│   ├── /empresa/portal-de-conteudo        → Portal de Conteúdo (Blog)
│   └── /empresa/trabalhe-conosco          → Trabalhe Conosco
│
├── /contato                               → Contato
└── /orcamento                             → Orçamento
```

---

## Detalhamento por página

### Início
- **Rota:** `/`
- **Tipo:** Página
- **Prioridade SEO:** 1.0

---

### Produtos (Agrupamento)
Visível no menu como dropdown. Não tem página própria.

#### Locação de Empilhadeiras
- **Rota:** `/produtos/locacao-de-empilhadeiras`
- **Tipo:** Página
- **Prioridade SEO:** 0.9
- **KPI:** Principal gerador de leads — formulário de orçamento de locação

#### Venda de Empilhadeiras (Catálogo)
- **Rota:** `/produtos/empilhadeiras`
- **Tipo:** Página (listagem do catálogo)
- **Prioridade SEO:** 0.9

##### Novas
- **Rota:** `/produtos/empilhadeiras/novas`
- **Tipo:** Template (página filtrada do catálogo)
- **Prioridade SEO:** 0.8

##### Usadas
- **Rota:** `/produtos/empilhadeiras/usadas`
- **Tipo:** Template (página filtrada do catálogo)
- **Prioridade SEO:** 0.8

#### Pneus
- **Rota:** `/produtos/pneus`
- **Tipo:** Página
- **Prioridade SEO:** 0.7

#### Baterias e Carregadores
- **Rota:** `/produtos/baterias-e-carregadores`
- **Tipo:** Página
- **Prioridade SEO:** 0.7

#### Peças
- **Rota:** `/produtos/pecas`
- **Tipo:** Página
- **Prioridade SEO:** 0.7

---

### Serviços
- **Rota:** `/servicos`
- **Tipo:** Página (única, com seções internas)
- **Prioridade SEO:** 0.9

**Seções internas (sem rota própria, com âncora):**

| Seção | Âncora |
|---|---|
| Planos de Manutenção Preventiva | `#manutencao-preventiva` |
| Manutenção Corretiva | `#manutencao-corretiva` |
| Assistência Multimarcas | `#assistencia-multimarcas` |

---

### Automação Intralogística (Dematic)
- **Rota:** `/automacao-intralogistica`
- **Tipo:** Página
- **Prioridade SEO:** 0.8
- **Obs:** Parceria com a marca Dematic — tratar identidade visual com cuidado

---

### Empresa (Agrupamento)
Visível no menu como dropdown. Não tem página própria.

#### Quem Somos
- **Rota:** `/empresa/quem-somos`
- **Tipo:** Página
- **Prioridade SEO:** 0.8

#### ESG (Agrupamento)
Sub-dropdown dentro de Empresa. Não tem página própria.

##### Sustentabilidade
- **Rota:** `/empresa/esg/sustentabilidade`
- **Tipo:** Página
- **Prioridade SEO:** 0.6

##### Canal da Transparência
- **Rota:** `/empresa/esg/canal-da-transparencia`
- **Tipo:** Página
- **Prioridade SEO:** 0.5

##### Ouvidoria Digital
- **Rota:** `/empresa/esg/ouvidoria-digital`
- **Tipo:** Página
- **Prioridade SEO:** 0.5

#### Portal de Conteúdo
- **Rota:** `/empresa/portal-de-conteudo`
- **Tipo:** Página (blog / hub de conteúdo)
- **Prioridade SEO:** 0.7
- **Obs:** Potencial para SEO de cauda longa — artigos sobre empilhadeiras, logística, manutenção

#### Trabalhe Conosco
- **Rota:** `/empresa/trabalhe-conosco`
- **Tipo:** Página
- **Prioridade SEO:** 0.5

---

### Contato
- **Rota:** `/contato`
- **Tipo:** Página
- **Prioridade SEO:** 0.7
- **KPI:** Formulário de contato integrado com RD Station

---

### Orçamento
- **Rota:** `/orcamento`
- **Tipo:** Página
- **Prioridade SEO:** 0.8
- **KPI:** Principal CTA do site — formulário qualificado de orçamento integrado com RD Station

---

## Resumo de rotas para Next.js

```
app/
  page.tsx                                          → /
  sitemap.ts
  robots.ts
  (public)/
    produtos/
      locacao-de-empilhadeiras/
        page.tsx
      empilhadeiras/
        page.tsx
        novas/
          page.tsx
        usadas/
          page.tsx
      pneus/
        page.tsx
      baterias-e-carregadores/
        page.tsx
      pecas/
        page.tsx
    servicos/
      page.tsx
    automacao-intralogistica/
      page.tsx
    empresa/
      quem-somos/
        page.tsx
      esg/
        sustentabilidade/
          page.tsx
        canal-da-transparencia/
          page.tsx
        ouvidoria-digital/
          page.tsx
      portal-de-conteudo/
        page.tsx
    trabalhe-conosco/
      page.tsx
    contato/
      page.tsx
    orcamento/
      page.tsx
```

---

## Navegação principal (menu)

```
Início | Produtos ▾ | Serviços | Automação (Dematic) | Empresa ▾ | Contato | [Orçamento CTA]
```

**Dropdown Produtos:**
- Locação de Empilhadeiras
- Venda de Empilhadeiras
- Pneus
- Baterias e Carregadores
- Peças

**Dropdown Empresa:**
- Quem Somos
- ESG ▾
  - Sustentabilidade
  - Canal da Transparência
  - Ouvidoria Digital
- Portal de Conteúdo
- Trabalhe Conosco

---

## Total de páginas

| Tipo | Quantidade |
|---|---|
| Páginas | 18 |
| Agrupamentos de menu (sem rota) | 3 (Produtos, Empresa, ESG) |
| Seções âncora (sem rota própria) | 3 (dentro de /servicos) |
| **Total de rotas** | **18** |
