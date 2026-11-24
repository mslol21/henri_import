# DIAGNÓSTICO DE SEGURANÇA E AUDITORIA DE INTEGRAÇÃO NEON — HENRI IMPORTS

**Data da Auditoria:** 23 de Novembro de 2026  
**Escopo:** Auditoria de segurança da aplicação, políticas RLS no backup `db_cluster-23-11-2026@04-21-06.backup.gz`, permissões do Supabase Storage (`setup_storage.ts`), variáveis de ambiente e plano de integração segura com **Neon Database**, **Neon Data API** e **Neon Auth**.  
**Modo de Execução:** 100% Somente Leitura (Sem exposição de segredos ou alterações em produção).

---

## 1. Matriz de Vulnerabilidades Identificadas (Código + Banco + Storage)

| ID | Severidade | Vulnerabilidade Identificada | Evidência Técnica |
| :--- | :---: | :--- | :--- |
| **SEC-01** | **CRÍTICA** | Exposição pública da senha de Atacado (`wholesalePassword`, 13 caracteres) em endpoint público cacheado na CDN | `app/api/settings/route.ts:36` (`GET /api/settings` retorna `wholesalePassword` com `Cache-Control: public, s-maxage=60`) |
| **SEC-02** | **CRÍTICA** | Política RLS permissiva `FOR ALL` no bucket `products` combinada com `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `setup_storage.ts:25-30` e dump SQL (`CREATE POLICY products_public_all ON storage.objects FOR ALL USING (bucket_id = 'products')`) |
| **SEC-03** | **CRÍTICA** | Autenticação Admin e Atacado baseada em cookies booleanos não assinados (`admin_auth=true` e `wholesale_auth=true`) | `middleware.ts:10`, `lib/auth.ts:5` e `app/(shop)/checkout/page.tsx:50` (`?atacado=true`) |
| **SEC-04** | **ALTA** | Manipulação de preços no Checkout (`createOrder` grava `item.unitPrice`, `subtotal`, `deliveryFee` e `total` enviados pelo cliente) | `actions/orders.ts:62-75` |
| **SEC-05** | **ALTA** | Server Actions administrativas sem verificação interna de autenticação (`updateOrderStatus`, `deleteOrder`, `updateStoreConfig`, `duplicateProduct`) | `actions/orders.ts:183-242`, `actions/settings.ts:44`, `actions/products.ts:138` (O `middleware.ts` só intercepta `/admin` e `/api/admin`, não Server Actions invocadas via POST na raiz!) |
| **SEC-06** | **ALTA** | Endpoint `GET /api/admin/audit-prices` executa mutação em massa de preços via verbo HTTP `GET` | `app/api/admin/audit-prices/route.ts:5-38` |
| **SEC-07** | **ALTA** | Ausência de verificação etária (`18+`) e de trava de checkout comercial para produtos sujeitos a restrição etária | `app/(shop)/checkout/page.tsx` |
| **SEC-08** | **MÉDIA** | Desativação de verificação de certificado TLS (`rejectUnauthorized: false`) e filtro `needsSsl` restrito a domínios Supabase | `lib/db.ts:15-19` |

---

## 2. Detalhamento Técnico das Evidências Críticas

### 2.1 [SEC-01] Vazamento Público da Senha de Atacado (`app/api/settings/route.ts:36`)
No backup de produção `db_cluster-23-11-2026@04-21-06.backup.gz`, a tabela `public."StoreConfig"` armazena uma senha de atacado personalizada de 13 caracteres na coluna `"wholesalePassword"`. O endpoint público `GET /api/settings` retorna esse campo sem filtro para todos os clientes que acessam a loja.
- **Recomendação:** Remover `wholesalePassword` do JSON retornado por `GET /api/settings` imediatamente.

### 2.2 [SEC-02] Permissão Pública Irrestrita de Escrita/Exclusão no Storage (`setup_storage.ts`)
O script `setup_storage.ts` (e a linha correspondente no dump `db_cluster-23-11-2026@04-21-06.backup.gz`) criou a seguinte política no PostgreSQL:
```sql
CREATE POLICY "products_public_all" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'products') 
WITH CHECK (bucket_id = 'products');
```
- **Risco:** Como a cláusula é `FOR ALL` (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) para qualquer role (incluindo `anon`), qualquer usuário externo de posse da `NEXT_PUBLIC_SUPABASE_ANON_KEY` (exposta no frontend) pode listar, sobrescrever ou apagar todos os 205 arquivos do bucket `'products'`.
- **Recomendação na Migração:** O novo Storage jamais deve aceitar uploads ou deleções com chave pública no navegador; o upload deve passar exclusivamente por um endpoint de servidor autenticado (`POST /api/admin/upload`).

### 2.3 [SEC-03 & SEC-05] Fragilidade dos Cookies `admin_auth` / `wholesale_auth` e Server Actions Desprotegidas
1. **No `middleware.ts`:**
   ```typescript
   const adminAuth = request.cookies.get('admin_auth')?.value === 'true';
   ```
   Como o valor é literalmente a string `'true'` (sem assinatura criptográfica JWT/HMAC), qualquer requisição HTTP com o header `Cookie: admin_auth=true` atravessa o `middleware.ts` e acessa `/admin` e `/api/admin/*`.
2. **Nas Server Actions (`actions/orders.ts`, `actions/settings.ts`, `actions/products.ts`):**
   O `matcher` do `middleware.ts` cobre apenas `['/admin/:path*', '/api/admin/:path*']`. No Next.js App Router, Server Actions podem ser invocadas via `POST` em qualquer rota pública (como `/`), passando o header `Next-Action`. Como `deleteOrder`, `updateOrderStatus`, `updateStoreConfig` e `duplicateProduct` não validam o cookie/sessão dentro da própria função, elas podem ser acionadas sem passar pelo `middleware.ts`!

---

## 3. Auditoria das Políticas RLS no Backup e Impacto no Neon

A análise do arquivo `db_cluster-23-11-2026@04-21-06.backup.gz` revelou um fato crucial sobre **Row-Level Security (RLS)** nas 15 tabelas do schema `public`:

### 3.1 Estado Atual no Dump SQL
Todas as 15 tabelas públicas possuem RLS habilitado no dump:
```sql
ALTER TABLE public."Address" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Banner" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Client" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Coupon" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Flavor" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."OrderHistory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."OrderItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Promotion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."PromotionRule" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."StockMovement" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."StoreConfig" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;
```
Porém, **não existe nenhuma política `CREATE POLICY` para nenhuma das 15 tabelas `public.*`** (a única policy do dump é `products_public_all` em `storage.objects`).

### 3.2 O que isso significa na migração para o Neon?
1. **Com Prisma ORM (Arquitetura Atual Next.js):**
   - O Prisma conecta-se usando o usuário proprietário das tabelas (`neondb_owner`). No PostgreSQL, o owner da tabela (ou role com atributo `BYPASSRLS`) ignora o RLS por padrão. Portanto, o Prisma continuará lendo e gravando normalmente nas 15 tabelas.
   - Enquanto o RLS está ativo com 0 políticas, qualquer acesso externo não-owner (como roles `anon` ou `authenticated`) fica **100% bloqueado por padrão (Deny-All)**, o que na prática protegeu o banco no Supabase contra leituras diretas via PostgREST usando a `NEXT_PUBLIC_SUPABASE_ANON_KEY`!
2. **Caso a equipe ative a Neon Data API:**
   - Se a **Neon Data API** for habilitada para consultas diretas do frontend, as roles `anonymous` e `authenticated` **não terão `BYPASSRLS`** e receberão 0 linhas em todas as tabelas até que políticas explícitas de leitura (ex.: `CREATE POLICY "public_read_products" ON public."Product" FOR SELECT USING ("active" = true);`) sejam criadas.
   - **Recomendação:** Manter todas as queries centralizadas no servidor Next.js via Prisma (sem expor a Neon Data API diretamente ao navegador), ou criar políticas RLS granulares vinculadas ao `auth.user_id()` do **Neon Auth** apenas para as tabelas estritamente necessárias.

---

## 4. Diretrizes para Configuração do Neon Database e Neon Auth

### 4.1 Variáveis de Ambiente Seguras no Servidor (`.env` / Vercel)
```ini
# Conexão Pooled (PgBouncer do Neon) — Uso exclusivo no servidor (Prisma Runtime)
DATABASE_URL="postgresql://neondb_owner:<SENHA>@ep-xxxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=15"

# Conexão Direta (Sem Pooler) — Uso exclusivo no servidor (Prisma Migrate)
DIRECT_URL="postgresql://neondb_owner:<SENHA>@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```
- **Regra Obrigatória:** Jamais prefixar `DATABASE_URL`, `DIRECT_URL` ou chaves secretas de API com `NEXT_PUBLIC_`.

### 4.2 Ajuste de Conexão TLS em `lib/db.ts` para o Neon
```typescript
const connectionString = process.env.DATABASE_URL || '';
const needsSsl =
  connectionString.includes('neon.tech') ||
  connectionString.includes('sslmode=require') ||
  connectionString.includes('supabase.co') ||
  connectionString.includes('pooler.supabase.com') ||
  process.env.NODE_ENV === 'production';

const pool = globalForPrisma.pool || new Pool({
  connectionString,
  ssl: needsSsl ? true : false, // Validação de certificado CA padrão no Neon
  max: process.env.NODE_ENV === 'production' ? 5 : 5, // Neon PgBouncer suporta alta concorrência
  idleTimeoutMillis: 15000,
  connectionTimeoutMillis: 15000, // Absorve cold start do compute serverless
});
```

### 4.3 Integração com Neon Auth
1. Substituir os cookies estáticos `admin_auth=true` e `wholesale_auth=true` por sessões autenticadas via **Neon Auth** (Stack Auth) ou JWT assinado no servidor (`HttpOnly`, `Secure`, `SameSite=Lax`).
2. Validar a sessão obrigatoriamente dentro de cada Route Handler `/api/admin/*` e dentro das Server Actions de mutação (`actions/orders.ts`, `actions/products.ts`, `actions/settings.ts`).
