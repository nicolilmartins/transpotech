# CLAUDE.md — TranspoTech Website

Este arquivo define o contexto do projeto, os padrões obrigatórios de desenvolvimento e as diretrizes de qualidade para o redesign do website da TranspoTech.

---

## Contexto do Projeto

### O que é

A TranspoTech Peças e Serviços Ltda é uma empresa com 25 anos de mercado, 11 unidades próprias e ~380 técnicos especializados em empilhadeiras industriais. Representa oficialmente as marcas **STILL, Linde e Baoli** (grupo KION) e a **DEMATIC** para automação intralogística.

### Objetivo do site

O site precisa funcionar como um pré-vendedor que qualifica o lead antes de ele chegar ao time comercial. O ciclo de venda consultivo dura 8–10 meses.

**KPI principal:** Geração de leads qualificados via formulários integrados com RD Station.

### Audiências

1. **Decisores B2B** (comprador, supervisor de logística, gerente/diretor) — grandes indústrias, CDs, supermercados, 3PL
2. **Time comercial interno** — usa o site como ferramenta de vendas ativa
3. **Investidores e fundos** — vitrine institucional

### Stakeholders

| Quem | Papel |
|---|---|
| **Luan Rocha** (luan.s@transpotech.com.br) | Head de Marketing — aprovação de todas as entregas |
| **Ricardo** (CEO) | Decisão final sobre posicionamento e marca — envolver na fase de UI |
| **Samuel (Samuka)** | Analista de Marketing — suporte ao Luan |
| **Alan** | Especialista de tráfego externo — deve validar sitemap (SEO) |

### Identidade visual

- **Cor primária:** laranja TranspoTech (`#F26522`)
- **Cor complementar:** verde pontual — ESG, eletrificação, modernidade
- **Bases:** preto, cinza, branco
- **Estética:** premium, clean, alinhada ao grupo KION (Linde/STILL)
- **Ícone atual:** não usar como elemento decorativo — CEO não aprova
- **Nome:** sempre grafado como `TranspoTech` — nunca termos que remetam a transportadora

---

## Stack obrigatória — Website

Este é um website institucional com foco em SEO e geração de leads.

- **Next.js 16+**
- **TypeScript** (obrigatório em tudo)
- **Tailwind CSS 4+**
- **TanStack Query** — apenas quando houver consumo de API dinâmica no client
- **Axios** — apenas quando houver camada HTTP própria
- **Zustand** — apenas quando houver necessidade real de estado global
- **React Toastify** — ou biblioteca de toast padronizada no projeto
- **React Hook Form + Zod** — para formulários de captação de lead
- **SEO técnico** configurado desde o início
- **ESLint + Prettier** configurados

Avaliar e sugerir **internacionalização com i18n** — o site pode ter versão em inglês para atender investidores.

---

## Arquitetura de pastas

```txt
src/
  app/                          → SOMENTE rotas (App Router)
    layout.tsx                  → layout raiz com Header + Footer globais
    page.tsx                    → home
    <secao>/<pagina>/page.tsx   → uma pasta por rota, sem route groups
    api/<recurso>/route.ts      → rotas de API
    globals.css
    not-found.tsx
    error.tsx
    loading.tsx

  components/
    <nome-da-pagina>/           → componentes EXCLUSIVOS de cada página
      ex: home/hero-section/hero-section.tsx
      ex: servicos/planos-section/planos-section.tsx
    layout/                     → compartilhados de layout (Header, Footer, Cta)
      header/
      footer/
      cta/
    ui/                         → primitivos reutilizáveis (Button, Input, etc.)
      button/
        button.tsx
        button.types.ts
        index.ts

  assets/
    images/
    icons/

  lib/
    axios.ts
    query-client.ts
    env.ts
    routes.ts
    contact.schema.ts

  services/
    leads.service.ts

  hooks/
    use-submit-lead.ts

  middlewares/
    api-error.middleware.ts

  styles/
    theme.css
    tokens.css

  types/
    lead.types.ts
```

### Regras de separação (CRÍTICO)

1. Cada `page.tsx` NÃO contém UI complexa — importa e orquestra componentes.
2. Componentes específicos de uma página ficam em `src/components/<nome-da-pagina>/`.
   O nome da pasta = slug da página (ex: página "servicos" → `components/servicos/`).
3. O que se repete entre páginas vai em `ui/` (primitivo) ou `layout/` (estrutura).
4. Imports sempre via alias `@/`, ex: `import { Button } from "@/components/ui/button"`.
5. Não usar route groups `(public)` ou similares — todas as rotas ficam direto em `app/`.

---

## TypeScript

TypeScript é obrigatório em todos os arquivos.

Regras:
- Não usar `any` sem justificativa clara
- Criar tipos e interfaces para respostas de API
- Tipar props de todos os componentes
- Tipar funções utilitárias
- Tipar payloads de formulários e leads

---

## Estilos e Design System

Nunca usar cores, tamanhos ou espaçamentos diretamente no código sem padronização.

### Tokens obrigatórios

```css
/* src/styles/tokens.css */
:root {
  /* Cores TranspoTech */
  --color-primary: #F26522;
  --color-primary-hover: #d94f0a;
  --color-primary-foreground: #ffffff;

  --color-secondary: #1a1a1a;
  --color-secondary-foreground: #ffffff;

  --color-background: #ffffff;
  --color-foreground: #111827;

  --color-muted: #f9fafb;
  --color-muted-foreground: #6b7280;

  --color-border: #e5e7eb;
  --color-error: #dc2626;
  --color-success: #16a34a;
  --color-warning: #d97706;

  /* Cor complementar — ESG/eletrificação */
  --color-accent: #22c55e;

  /* Tipografia */
  --heading-h1: clamp(2rem, 5vw, 4rem);
  --heading-h2: clamp(1.75rem, 4vw, 3rem);
  --heading-h3: clamp(1.5rem, 3vw, 2.25rem);
  --heading-h4: clamp(1.25rem, 2.5vw, 1.75rem);

  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  /* Bordas */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* Sombras */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Z-index */
  --z-header: 100;
  --z-modal: 200;
  --z-toast: 300;
}
```

### Regras de uso

Não fazer:
```tsx
<div className="bg-[#F26522] text-[37px] rounded-[13px]">
```

Fazer:
```tsx
<div className="bg-primary text-heading-md rounded-lg">
```

---

## Tailwind CSS

Tailwind CSS 4+ é obrigatório.

Regras:
- Usar Tailwind de forma consistente
- Evitar classes arbitrárias sem necessidade
- Não espalhar cores hexadecimais diretamente no JSX
- Usar tokens e variáveis CSS
- Criar padrões reutilizáveis para botões, inputs, cards, containers e seções
- Manter responsividade desde o início (mobile-first)

---

## Componentização

### Componentes de UI

Em `src/components/ui/`. Devem ser:
- Reutilizáveis
- Sem regra de negócio
- Com props bem tipadas
- Com variações controladas
- Com tratamento de estados disabled, loading, error e focus

### Componentes de seção

Cada seção da página é um componente isolado em `src/features/website/sections/` ou `src/components/sections/`.

Não fazer:
```tsx
export default function HomePage() {
  return <main>{/* centenas de linhas */}</main>;
}
```

Fazer:
```tsx
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
```

---

## SEO e HTML semântico

Regras obrigatórias:
- Um único `h1` por página
- Hierarquia correta: `h1` → `h2` → `h3`
- Tags semânticas: `header`, `main`, `section`, `article`, `aside`, `footer`, `nav`
- `alt` descritivo em imagens relevantes
- Criar metadados com a Metadata API do Next.js em cada página
- Configurar Open Graph (título, descrição, imagem)
- Configurar sitemap.xml e robots.txt
- URLs amigáveis e descritivas
- Performance em Core Web Vitals
- Usar `next/image` para todas as imagens
- Usar Server Components sempre que possível

Exemplo de metadados:
```tsx
export const metadata: Metadata = {
  title: 'Locação de Empilhadeiras | TranspoTech',
  description: '...',
  openGraph: {
    title: 'Locação de Empilhadeiras | TranspoTech',
    description: '...',
    images: ['/og/locacao.jpg'],
  },
};
```

---

## Acessibilidade

Regras obrigatórias:
- Todo input deve ter label associado
- Elementos clicáveis acessíveis por teclado
- Estados de foco visíveis
- `aria-*` apenas quando necessário
- Não remover outline sem substituir por foco acessível
- Ícones clicáveis devem ter `aria-label`
- Imagens decorativas usam `alt=""`
- Contraste adequado (mínimo WCAG AA)
- Não depender apenas de cor para indicar estado

---

## Formulários de Lead

Usar React Hook Form + Zod para todos os formulários de captação.

Regras:
- Mostrar erros próximos aos campos
- Desabilitar botão durante envio
- Prevenir duplo submit
- Tratar sucesso e erro com toast
- Labels acessíveis
- `autoComplete` correto
- Integração com RD Station via API ou script

Estrutura:
```txt
src/features/leads/
  hooks/
    use-submit-lead.ts
  schemas/
    contact.schema.ts
    budget-request.schema.ts
  services/
    leads.service.ts
  types/
    lead.types.ts
```

---

## Camada HTTP (quando necessário)

```ts
// src/lib/axios.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
```

Interceptor de erros em `src/middlewares/api-error.middleware.ts`.

---

## Performance

Regras:
- Usar `next/image` sempre
- Usar Server Components por padrão — `'use client'` apenas quando necessário
- Lazy loading para componentes pesados
- Formatos modernos de imagem (WebP, AVIF)
- Code splitting automático do Next.js
- Medir Core Web Vitals nas páginas principais

---

## Segurança contra XSS

- Nunca usar `dangerouslySetInnerHTML` sem sanitização
- Sanitizar conteúdo do CMS com DOMPurify quando necessário
- Validar e escapar dados de APIs externas

---

## Variáveis de ambiente

Criar `.env.example`:
```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_RD_STATION_TOKEN=
NEXT_PUBLIC_GA_ID=
```

Regras:
- Nunca commitar `.env`
- Centralizar leitura em `src/config/env.ts`
- Validar variáveis obrigatórias ao iniciar

---

## Internacionalização

Avaliar i18n desde o início — o site pode ter versão em inglês para investidores.

Estrutura sugerida se implementado:
```txt
/pt  → versão em português (padrão)
/en  → versão em inglês
```

Evitar textos fixos espalhados nos componentes. Centralizar mensagens.

---

## Tratamento de erros

Criar em `app/`:
- `not-found.tsx` — página 404
- `error.tsx` — erro global
- `loading.tsx` — skeleton de carregamento

---

## Convenções de nomes

Arquivos:
```txt
button.tsx / button.types.ts / index.ts
hero-section.tsx
use-submit-lead.ts
leads.service.ts
lead.types.ts
contact.schema.ts
```

Componentes: `PascalCase` — `HeroSection`, `SubmitButton`
Hooks: `camelCase` — `useSubmitLead`, `useProducts`
Services: `camelCase` — `leadsService`

---

## Checklist inicial

- [ ] Next.js 16+ com TypeScript configurado
- [ ] Tailwind CSS 4+ configurado
- [ ] Tokens de estilo criados (`tokens.css`, `theme.css`)
- [ ] Arquitetura de pastas criada
- [ ] ESLint + Prettier configurados
- [ ] `.env.example` criado
- [ ] SEO e metadados configurados desde o início
- [ ] Sitemap e robots.txt planejados
- [ ] Axios configurado (se houver API)
- [ ] TanStack Query configurado (se houver API dinâmica)
- [ ] React Hook Form + Zod para formulários
- [ ] `not-found.tsx`, `error.tsx`, `loading.tsx` criados
- [ ] Acessibilidade considerada desde o início
- [ ] i18n avaliado

---

## Checklist antes de finalizar uma tarefa

- [ ] Código está tipado (sem `any` desnecessário)
- [ ] Não existem cores hexadecimais hardcoded no JSX
- [ ] Componentes estão reutilizáveis e componentizados
- [ ] Seções foram componentizadas
- [ ] Loading, error e empty states foram tratados
- [ ] Formulários têm labels e erros acessíveis
- [ ] HTML está semântico
- [ ] SEO foi considerado (metadados, h1 único, alt em imagens)
- [ ] Acessibilidade foi considerada
- [ ] Segurança contra XSS foi considerada
- [ ] `use client` foi usado apenas onde necessário
- [ ] `next/image` foi usado para todas as imagens
- [ ] Código segue a arquitetura definida neste arquivo

---

## Git — branches por fluxo

Sempre que iniciar um novo fluxo de trabalho (nova feature, página, refactor ou correção), criar uma branch separada antes de qualquer alteração:

```bash
git checkout -b <tipo>/<descricao-curta>
# exemplos:
# feat/pagina-servicos
# feat/hero-section-redesign
# fix/formulario-contato
# refactor/estrutura-pastas
```

Só commitar na `main` via merge/PR após revisão. Nunca trabalhar diretamente na `main`.

---

## Regras finais

- Não criar padrões novos sem necessidade
- Não misturar regra de negócio com componentes de UI
- Não duplicar código
- Não criar componentes gigantes
- Não usar valores visuais soltos
- Sempre pensar em SEO, performance e acessibilidade
- `use client` é exceção, não regra — Server Components por padrão
- `TranspoTech` — sempre grafado assim, nunca referência a transportadora
