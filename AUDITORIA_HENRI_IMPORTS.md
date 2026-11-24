# AUDITORIA TÉCNICA — HENRI IMPORTS (Migração Supabase → Neon)

**Data da Auditoria:** 23 de Novembro de 2026  
**Diretório do Projeto Auditado:** `C:\Users\massa\Desktop\Projetos\loja_henri`  
**Arquivos de Backup Auditados:**
- **Banco de Dados (PostgreSQL Dump):** `db_cluster-23-11-2026@04-21-06.backup.gz` (`7.636.106 bytes` / ~7,28 MB comprimido | `10.741 linhas` descomprimidas)
- **Supabase Storage (ZIP):** `rqdphtewqozpoywuimog.storage.zip` (`88.581.292 bytes` / ~84,48 MB comprimido | `205 arquivos` = `89.709.000 bytes` / 85,55 MB descomprimidos)

**Modo de Execução:** 100% Somente Leitura / Não-destrutivo (Preservação integral dos dados, backups e configurações operacionais).

---

## 1. Análise Inicial e Estrutura Completa do Repositório

O projeto **Henri Imports** (`loja_henri@0.1.0`) é uma aplicação Full Stack de e-commerce B2C (Varejo) e B2B (Atacado) desenvolvida em **Next.js 16.2.11 (App Router + Turbopack)**, **React 19.2.3**, **TypeScript** e **Prisma ORM 7.9.0** sobre PostgreSQL (`@prisma/adapter-pg` + `pg`).

### 1.1 Árvore do Repositório (`C:\Users\massa\Desktop\Projetos\loja_henri`)

```text
loja_henri/
├── actions/                                    # Server Actions (Acesso direto via Prisma)
│   ├── categories.ts                           # Consulta de categorias ativas
│   ├── orders.ts                               # Checkout (createOrder), listagem e gestão de status
│   ├── products.ts                             # Catálogo, busca, destaques e duplicação de produto
│   ├── promotions.ts                           # Listagem de banners, cupons e regras promocionais
│   └── settings.ts                             # Leitura e atualização de StoreConfig
├── app/
│   ├── (shop)/                                 # Storefront (Varejo & Atacado B2B)
│   │   ├── atacado/page.tsx                    # Catálogo B2B protegido por cookie 'wholesale_auth'
│   │   ├── checkout/page.tsx                   # Checkout com cálculo de frete por CEP e envio WhatsApp
│   │   ├── order-success/page.tsx              # Página pós-pedido com link wa.me
│   │   ├── product/[slug]/page.tsx             # Página de produto e seleção de sabores (Flavors)
│   │   ├── promotions/page.tsx                 # Vitrine de promoções
│   │   ├── search/page.tsx                     # Busca de catálogo
│   │   └── page.tsx                            # Home page (SSR force-dynamic)
│   ├── admin/                                  # Painel Administrativo
│   │   ├── categories/page.tsx                 # CRUD de categorias
│   │   ├── clients/page.tsx                    # Histórico de clientes e pedidos
│   │   ├── login/page.tsx                      # Autenticação do painel admin
│   │   ├── orders/page.tsx                     # Gestão/edição de pedidos e impressão térmica 58mm
│   │   ├── products/page.tsx                   # CRUD de produtos e variações (Flavors)
│   │   ├── promotions/page.tsx                 # CRUD de banners, cupons e regras
│   │   ├── settings/page.tsx                   # Configurações White Label, endereço, faixas de frete e Pix
│   │   └── page.tsx                            # Dashboard gerencial (Recharts)
│   ├── api/                                    # Route Handlers (API REST interna)
│   │   ├── admin/                              # 21 rotas administrativas (/products, /orders, /flavors, etc.)
│   │   ├── atacado/                            # /api/atacado/login e /api/atacado/logout
│   │   ├── coupons/validate/route.ts           # Validação de cupom de desconto
│   │   └── settings/route.ts                   # Endpoint público de configurações da loja
│   ├── generated/prisma/                       # Cliente Prisma gerado localmente
│   └── layout.tsx                              # Root Layout (ConfigProvider + CartProvider)
├── components/
│   └── admin/
│       ├── ImageUploadInput.tsx                # Upload client-side para o Supabase Storage (bucket 'products')
│       └── ThermalPrintModal58mm.tsx           # Comprovante térmico 58mm compatível com Android/iOS/Desktop
├── contexts/
│   ├── CartContext.tsx                         # Estado do carrinho em localStorage
│   └── ConfigContext.tsx                       # Configurações globais hidratadas via /api/settings
├── lib/
│   ├── auth.ts                                 # Helper de leitura do cookie 'wholesale_auth'
│   ├── db.ts                                   # Instância singleton do PrismaClient com pg.Pool
│   ├── mockData.ts                             # Dados de fallback quando o banco está inacessível
│   ├── supabase.ts                             # Cliente @supabase/supabase-js e uploadImage() com fallback Base64
│   └── utils.ts                                # Helpers formatCurrency, formatDate e getCleanImageUrl
├── prisma/
│   ├── schema.prisma                           # Schema PostgreSQL com 15 models e 7 enums
│   └── seed.ts                                 # Seed inicial do banco
├── scripts/                                    # Scripts utilitários e de diagnóstico
├── services/
│   ├── cep.ts                                  # Consulta ViaCEP + fallback BrasilAPI
│   ├── distance.ts                             # Geocodificação em 5 camadas e cálculo de frete
│   └── whatsapp.ts                             # Formatação de pedido para WhatsApp
├── validators/                                 # Schemas Zod de validação
├── middleware.ts                               # Proteção de rotas /admin e /api/admin via cookie 'admin_auth'
├── setup_storage.ts / setup_storage.js         # Script SQL que provisionou o bucket 'products' no Supabase
├── db_cluster-23-11-2026@04-21-06.backup.gz    # Dump completo PostgreSQL exportado do Supabase
└── rqdphtewqozpoywuimog.storage.zip            # Arquivo ZIP com todos os 205 objetos do Supabase Storage
```

---

## 2. Dependências Instaladas e Acoplamento ao Supabase (`package.json`)

| Dependência | Versão | Uso Identificado no Código | Diagnóstico para Migração Neon |
| :--- | :--- | :--- | :--- |
| `@supabase/supabase-js` | `^2.100.0` | Importado **apenas em `lib/supabase.ts`** para inicializar o cliente Storage (`supabase.storage.from('products')`). Não é utilizado para consultas SQL nem para Supabase Auth. | **Manter até migrar o Storage.** O Neon é exclusivamente um banco PostgreSQL Serverless e não possui Object Storage nativo. |
| `prisma` / `@prisma/client` | `^7.9.0` | ORM principal de toda a aplicação (`lib/db.ts`, `actions/*`, `app/api/*`). | **100% Compatível com Neon.** Requer atualização da `DATABASE_URL` para o host `-pooler` do Neon e adição de `DIRECT_URL`. |
| `@prisma/adapter-pg` / `pg` | `^7.9.0` / `^8.20.0` | Driver TCP PostgreSQL (`pg.Pool`) acoplado ao Prisma 7 em `lib/db.ts`. | **Compatível via PgBouncer do Neon.** Para ambientes Serverless na Vercel, pode-se usar o endpoint pooled do Neon ou evoluir para `@prisma/adapter-neon` + `@neondatabase/serverless`. |
| `next` | `16.2.11` | Framework React Full Stack (App Router, Server Actions, Route Handlers). | **Compatível.** Nota: `middleware.ts` deve ser complementado por validação de sessão server-side nos handlers. |
| `zod` / `react-hook-form` | `^4.3.6` / `^7.72.0` | Validação de formulários e payloads. | **Sem impacto.** |

---

## 3. Configuração de Variáveis de Ambiente (`.env` e `.env.local`)

A inspeção das chaves configuradas em `.env` e `.env.local` (sem expor valores secretos) revelou a seguinte topologia:

| Variável | Host / Escopo Atual | Papel | Diagnóstico para Migração Neon |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | `aws-0-ca-central-1.pooler.supabase.com` (Servidor) | Conexão PostgreSQL do Prisma (`lib/db.ts`). Configurada na porta `5432` (Session Mode do Supavisor). | **Substituir no Cutover** pela connection string **Pooled** do Neon (`ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require&pgbouncer=true`). |
| `DIRECT_URL` | *(Não configurada)* | Conexão direta sem PgBouncer para DDL/migrations (`prisma migrate`). | **Adicionar no Cutover** apontando para o host direto do Neon (sem `-pooler`). |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://rqdphtewqozpoywuimog.supabase.co` (Público) | Endpoint HTTP do projeto Supabase usado em `lib/supabase.ts` e nas 169 URLs de imagens do banco. | **Acoplamento Crítico de Mídia.** Quando o projeto `rqdphtewqozpoywuimog` for desligado, as 169 URLs salvas no banco deixarão de carregar se não forem migradas para o novo Storage. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | JWT público (`len=210`) (Público) | Chave anônima usada pelo browser para fazer upload direto no bucket `'products'`. | **Risco de Segurança.** Combinada com a política `products_public_all` (`FOR ALL`), permite que qualquer visitante exclua ou sobrescreva arquivos no bucket `'products'`. |

---

## 4. Diagnóstico de Conexão com o Banco de Dados (`lib/db.ts`)

### Evidência (`lib/db.ts:13-24`)
```typescript
const connectionString = process.env.DATABASE_URL || '';
const needsSsl = connectionString.includes('supabase.co') || connectionString.includes('pooler.supabase.com') || process.env.NODE_ENV === 'production';

const pool = globalForPrisma.pool || new Pool({ 
  connectionString,
  ssl: needsSsl ? { rejectUnauthorized: false } : false,
  max: process.env.NODE_ENV === 'production' ? 2 : 5,
  idleTimeoutMillis: 15000,
  connectionTimeoutMillis: 5000,
});
```

### Problemas Identificados
1. **Gargalo do Session Pooler no Supabase (`aws-0-ca-central-1.pooler.supabase.com:5432`):**
   - A conexão na porta `5432` do pooler do Supabase opera em *Session Mode* (limite estrito de 15 conexões simultâneas), o que causou os erros `(EMAXCONNSESSION) max clients reached in session mode` (`P2039`) em produção e forçou a redução de `max: 2` no `pg.Pool`.
2. **Incompatibilidade de Detecção de SSL em Ambiente Local com Neon (`lib/db.ts:15`):**
   - Em ambiente de desenvolvimento (`NODE_ENV !== 'production'`), `needsSsl` só ativa SSL se a URL contiver `'supabase.co'` ou `'pooler.supabase.com'`. Ao apontar `DATABASE_URL` para um host Neon (`*.neon.tech`) localmente, `needsSsl` será `false` e a conexão falhará, pois o Neon exige TLS obrigatório.
   - **Recomendação:** Incluir `connectionString.includes('neon.tech') || connectionString.includes('sslmode=require')` na condição `needsSsl`.
3. **Timeout Curto para Cold Start Serverless (`connectionTimeoutMillis: 5000`):**
   - Caso o compute do Neon entre em suspensão (*scale-to-zero* após 5 minutos de inatividade), a primeira conexão pode levar de 500 ms a 2 s adicionais. Recomenda-se elevar `connectionTimeoutMillis` para `15000` (15 segundos).

---

## 5. Diagnóstico do Sistema de Autenticação (`middleware.ts`, `lib/auth.ts` e Rotas de Login)

A inspeção de `middleware.ts`, `app/api/admin/login/route.ts` e `app/api/atacado/login/route.ts` confirma que:
- **Supabase Auth NÃO é utilizado:** A tabela `auth.users` no backup `db_cluster-23-11-2026@04-21-06.backup.gz` possui **0 registros**, e a tabela `public."User"` também possui **0 registros**.
- **Autenticação Admin (`app/api/admin/login/route.ts` e `middleware.ts`):**
  - Valida credenciais contra valores estáticos/configurados e define um cookie simples `admin_auth=true`.
  - O `middleware.ts` verifica apenas `request.cookies.get('admin_auth')?.value === 'true'`. Qualquer cliente que envie o cabeçalho `Cookie: admin_auth=true` obtém acesso total a todas as rotas `/admin/*` e `/api/admin/*`!
- **Autenticação Atacado B2B (`app/api/atacado/login/route.ts` e `lib/auth.ts`):**
  - Compara a senha digitada com `StoreConfig.wholesalePassword` e define `wholesale_auth=true`.

---

## 6. Matriz Consolidada de Problemas, Evidências, Riscos e Recomendações

| ID | Problema Identificado | Evidência Empírica | Risco | Recomendação |
| :--- | :--- | :--- | :--- | :--- |
| **AUD-01** | **98,8% do tamanho do banco** no backup é ocupado por apenas **11 imagens em Base64** | `Category` (8 linhas = 2,68 MB), `Product` (1 linha Base64 = 1,68 MB) e `Flavor` (2 linhas Base64 = 5,45 MB) somam **9,80 MB** de um banco total de **9,91 MB**. | Lentidão extrema ao carregar a Home e crash de memória no Safari/iOS; alto consumo de I/O e egress no Neon. | Extrair as 11 imagens Base64 para arquivos `.webp`/`.png` no Storage e substituir pelas respectivas URLs antes/durante a migração para o Neon. |
| **AUD-02** | `needsSsl` em `lib/db.ts` só reconhece domínios `supabase.co` / `pooler.supabase.com` em dev | `lib/db.ts:15` | Falha de conexão TLS ao rodar o projeto localmente conectado ao Neon (`*.neon.tech`). | Atualizar `needsSsl` para incluir `connectionString.includes('neon.tech') \|\| connectionString.includes('sslmode=require')`. |
| **AUD-03** | Todas as 15 tabelas `public.*` estão com `ENABLE ROW LEVEL SECURITY` ativo e **0 políticas criadas** | Dump `db_cluster-23-11-2026@04-21-06.backup.gz` (linhas de `ALTER TABLE public.* ENABLE ROW LEVEL SECURITY`) | Se a aplicação usar Neon Data API ou uma role sem `BYPASSRLS`, todas as tabelas retornarão erro ou 0 linhas. | No Neon via Prisma (role `neondb_owner`), o acesso funciona normalmente; se ativar Neon Data API, criar políticas explícitas de `SELECT` para o catálogo público. |
| **AUD-04** | Bypass de autenticação Admin e Atacado por cookies não assinados (`admin_auth=true` e `wholesale_auth=true`) | `middleware.ts:10`, `lib/auth.ts:5` | Acesso não autorizado ao painel administrativo e aos preços de atacado forjando um cookie simples. | Migrar autenticação para **Neon Auth** ou tokens JWT assinados via `HMAC-SHA256` (`jose`) em cookies `HttpOnly`. |
| **AUD-05** | Vazamento público de `wholesalePassword` em `GET /api/settings` | `app/api/settings/route.ts:36` | Senha do atacado exposta em texto plano para todos os visitantes da loja e cacheada na CDN. | Remover `wholesalePassword` do retorno de `GET /api/settings`. |
