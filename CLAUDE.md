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

## Ícones

A biblioteca de ícones obrigatória é **lucide-react** (`lucide-react@latest`).

Regras:
- Sempre importar ícones direto de `lucide-react` — nunca criar SVGs manuais para ícones que já existem na lib.
- Nunca usar arquivos `.svg` em `src/assets/icons/` para ícones de UI — usar Lucide.
- Usar a prop `aria-hidden` em ícones decorativos.
- Usar `aria-label` ou texto visível em ícones clicáveis (sem `aria-hidden`).
- Dimensionar com classes Tailwind: `size-4`, `size-5`, `size-6`, etc.

Exceção — `src/components/ui/icons.tsx`:
- Contém apenas **ícones de redes sociais** (Facebook, Instagram, LinkedIn, YouTube, Spotify) que o Lucide não inclui por serem brand icons.
- Para qualquer outro ícone, sempre usar `lucide-react`.

Não fazer:
```tsx
import shield from "@/assets/icons/shield.svg";
<Image src={shield} alt="" className="size-6" />
```

Fazer:
```tsx
import { ShieldCheck } from "lucide-react";
<ShieldCheck className="size-6" aria-hidden />
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

## Responsividade

Toda implementação deve ser **mobile-first**. Proibido criar layouts desktop-only sem breakpoints.

### Breakpoints (padrão Tailwind CSS 4)

| Prefixo | Largura mínima | Uso |
|---|---|---|
| (base) | 0px | Mobile portrait |
| `sm:` | 640px | Mobile landscape |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Desktop largo |

### Padrões obrigatórios

**Container padding:**
```tsx
// Não fazer:
<section className="px-16">
// Fazer:
<section className="px-4 sm:px-8 lg:px-16">
```

**Layout de seção com duas colunas:**
```tsx
// Não fazer:
<div className="flex items-center gap-16">
// Fazer:
<div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
```

**Grid de cards:**
```tsx
// Não fazer:
<div className="flex gap-4"> {/* cards em linha sem stacking */}
// Fazer:
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

**Larguras fixas:**
```tsx
// Não fazer:
<div className="w-[600px]">
// Fazer:
<div className="w-full lg:max-w-[600px]">
```

**Alturas fixas:**
```tsx
// Não fazer:
<div className="h-[373px]">
// Fazer:
<div className="min-h-[240px] lg:h-[373px]">
```

### Regras

- Testar sempre em 375px (iPhone SE), 768px (tablet) e 1440px (desktop)
- Header sempre deve ter menu hambúrguer para mobile (`lg:hidden` / `lg:flex`)
- Grids começam em 1 coluna e expandem com breakpoints
- Tipografia usa `clamp()` via tokens — não sobrescrever com tamanhos fixos em px
- Carrosséis complexos (3D, órbita) devem ter fallback simples em mobile (grid ou scroll horizontal)
- Nunca usar `overflow-hidden` em container externo sem testar scroll lateral no mobile

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

---

## Construção de Páginas Novas — Fluxo Wireframe-Driven

> A partir de agora, **toda página nova nasce de um wireframe**. Um prompt curto
> (ex.: *"monte a página de Peças a partir do wireframe X, na rota /produtos/pecas"*)
> já deve acionar TODO o processo descrito abaixo automaticamente.

### 1. Fontes de verdade

| Fonte | É verdade de… | NÃO é fonte de… |
|---|---|---|
| **Wireframe** | **Estrutura e copy**: ordem das seções, hierarquia, blocos e textos exatos | Estilo visual — o wireframe é esquemático/cru |
| **Páginas já construídas** (Home + todas as demais) | **Visual, componentes e interações**: cores, tipografia, espaçamentos, raios, sombras, animações e convenções de código | Estrutura/copy da página nova |

**Regra de ouro:** o *"o quê e em que ordem"* vem do **wireframe**; o *"como se parece e se comporta"* vem das **páginas já construídas**. **Nunca** copiar o estilo cru do wireframe.

### 2. Regras de fidelidade (não-negociáveis)

- **Estrutura:** replicar a ordem e a composição das seções **exatamente** como no wireframe. Não adicionar, remover nem reordenar seções sem perguntar.
- **Copy:** usar o texto do wireframe **exatamente como está** — não reescrever, resumir nem "melhorar". Texto que pareça placeholder (ex.: *lorem ipsum*) vira **pendência** para o usuário confirmar.
- **Visual:** cores, tipografia, espaçamentos, raios, sombras e interações **exatamente** como nas páginas já construídas. Não aproximar nem inventar valores.
- **Componentes:** reutilizar componentes já existentes — da Home **e de qualquer outra página** (cards, seções, blocos, primitivos como `Button`, `Section`, etc.). Antes de criar algo, **procurar um equivalente em todo o projeto**. Só criar novo se realmente não houver equivalente — e **justificar**.
- **Ícones:** **sempre** da biblioteca **Lucide** (`lucide-react`). Nenhuma outra fonte. Se o wireframe indicar um ícone, mapear para o nome Lucide; se não indicar, usar o padrão equivalente das páginas já construídas. (Exceção: brand icons de redes sociais em `ui/icons.tsx`.)
- **Imagens:** usar **somente** os caminhos fornecidos pelo usuário. Nunca inventar caminhos nem gerar imagens. Sempre via `next/image`. Falta de caminho vira **pendência**.
- **Dependências novas:** **nunca** adicionar sem consultar o usuário.

### 3. Mapeamento Wireframe → Componentes existentes (passo crítico)

Para **cada** seção/bloco do wireframe, identificar o componente correspondente **já existente** no projeto que será usado para renderizá-lo. Onde o wireframe pedir algo **sem equivalente em nenhuma página**, descrever a lacuna e **perguntar antes** de criar algo novo.

### 4. Navegação e rotas

- O usuário **sempre** fornece o **caminho exato** de cada página.
- Toda página deve ser acessível pelo caminho indicado (App Router: `src/app/<caminho>/page.tsx`, sem route groups — conforme a arquitetura deste arquivo).
- Páginas **"em construção"** devem ser substituídas pela versão final **sem quebrar** o roteamento nem o link no header.
- Seguir **sempre** o padrão de roteamento e navegação já existente no projeto.

### 5. Fluxo obrigatório — PLANO antes de código

Para **qualquer** página nova, primeiro entregar um **PLANO** e só codar **após aprovação**. O plano deve conter:

1. **Inventário das seções do wireframe**, na ordem exata, com a copy de cada uma referenciada.
2. **Mapeamento Wireframe → componentes existentes:** para cada seção, qual componente/estilo (da Home ou de outra página) será usado. Marcar **[reutiliza]** ou **[criar novo + justificativa]**.
3. **Design tokens herdados:** cores (hex/tokens), fontes, tamanhos, pesos, line-heights, espaçamentos, raios, sombras e interações.
4. **Mapeamento de ícones → nomes em Lucide.**
5. **Lista de imagens necessárias** (placeholders aguardando os caminhos).
6. **Plano de rota/navegação:** onde a página vai morar (caminho fornecido), como será acessada pelo header e, se aplicável, qual página "em construção" será substituída.
7. **Dúvidas e ambiguidades** (perguntar antes de prosseguir).
8. **Autoavaliação de confiança em %**, com **meta mínima de 95%**; se abaixo, listar o que falta e perguntar.

### 6. Política de dúvidas

Sempre que algo estiver ambíguo — copy que parece placeholder, seção sem equivalente em nenhuma página, comportamento não definido, qual componente reutilizar, caminho de imagem, ou onde a página deve ficar — **perguntar antes de assumir**. Preferir perguntar a errar. **Nunca** inventar textos, valores, caminhos ou componentes.

### 7. Template por página (preencher a cada página nova)

```txt
- Nome da página:
- Caminho/rota (sempre fornecido pelo usuário) e local de acesso no header:
- Caminho do wireframe: inputs/wireframes/[arquivo]
- Caminho atual "em construção" a ser substituído (se houver):
- Pasta de imagens:
- Observações específicas (se houver):
```
