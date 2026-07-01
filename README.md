# KHOROS Blog — Onda 0

Blog de saúde mental e psicologia em português do Brasil. Primeira fase de validação da plataforma KHOROS.

## Stack

- **Next.js 16** (App Router, SSG)
- **Tailwind CSS 4**
- **MDX** (artigos em `content/articles/`)
- **Supabase** (leads + eventos)
- **Plausible / GA4** (analytics)

## Desenvolvimento local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Deploy na Vercel

1. Conecte o repositório na [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente (veja `.env.example`)
3. Deploy automático a cada push

A região padrão está configurada para `gru1` (São Paulo) em `vercel.json`.

### Variáveis obrigatórias em produção

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL pública do site |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service role (API de leads) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Domínio para Plausible (opcional) |

## Supabase

Execute o SQL em `supabase/migrations/001_initial.sql` no editor SQL do Supabase para criar as tabelas `leads` e `analytics_events`.

## Estrutura

```
content/articles/     # Artigos MDX com frontmatter
src/app/              # Páginas (App Router)
src/components/       # Componentes reutilizáveis
src/lib/              # Utilitários, conteúdo, schema
```

## Métricas da Onda 0

Eventos rastreados:
- `validation_clarified` — leitor esclareceu dúvida
- `validation_needs_help` — ainda precisa de orientação
- `lead_form_submit` / `lead_form_success` — captura de lead

## Imagens

Fotos de categorias e seções via [Unsplash](https://unsplash.com), armazenadas localmente em `public/images/` para performance e estabilidade.

## Regra de ouro

> Toda funcionalidade nasce de uma hipótese, toda hipótese deve ser validada por dados, e o conteúdo entrega valor real antes de qualquer oferta. Acolher sempre vem antes de converter.
