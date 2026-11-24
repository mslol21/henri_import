# COMPARAÇÃO E AUDITORIA DE BANCO DE DADOS — SUPABASE vs. NEON

**Data da Auditoria:** 23 de Novembro de 2026  
**Fonte Primária Analisada:** `C:\Users\massa\Desktop\Projetos\loja_henri\db_cluster-23-11-2026@04-21-06.backup.gz`  
**Método:** Descompressão e análise estrutural em memória (100% somente-leitura; nenhuma importação automática ou alteração destrutiva executada).

---

## 1. Inventário Real de Tabelas, Registros e Volumetria (Backup Supabase)

A inspeção completa dos blocos `COPY ... FROM stdin` do arquivo `db_cluster-23-11-2026@04-21-06.backup.gz` (`10.741 linhas` SQL) revelou a seguinte volumetria exata:

### 1.1 Esquema `public` (Tabelas da Aplicação)

| # | Tabela (`public`) | Qtd. de Registros | Tamanho Bruto dos Dados | Chave Primária (PK) | Chaves Estrangeiras (FK) | Diagnóstico de Conteúdo |
| :- | :--- | :---: | :---: | :--- | :--- | :--- |
| 1 | `"StoreConfig"` | **1** | `0,60 KB` | `id` (`'default'`) | — | Registro singleton da loja (`CEP 18076352`, 7 faixas de frete, Pix e senha de atacado). |
| 2 | `"Category"` | **8** | **`2.681,85 KB` (~2,62 MB)** | `id` (UUID) | — | **100% das 8 categorias** possuem imagens embutidas em **Base64** na coluna `"imageUrl"`. |
| 3 | `"Product"` | **41** | **`1.714,15 KB` (~1,67 MB)** | `id` (UUID) | `"categoryId"` → `"Category"("id")` | 40 produtos usam URLs do Supabase Storage; **1 produto** (`DINNER LADY LUMA 20K`) possui **1.679,2 KB de Base64** em `"mainImageUrl"`. |
| 4 | `"Flavor"` | **144** | **`5.483,33 KB` (~5,35 MB)** | `id` (UUID) | `"productId"` → `"Product"("id")` (`CASCADE`) | 129 sabores usam URLs do Supabase Storage; 13 têm `"imageUrl" = NULL`; **2 sabores** possuem **5.446,4 KB de Base64**. |
| 5 | `"Client"` | **34** | `3,70 KB` | `id` (UUID) | — | 34 clientes únicos identificados por `"phone"` (`UNIQUE`). |
| 6 | `"Address"` | **46** | `8,91 KB` | `id` (UUID) | `"clientId"` → `"Client"("id")` | 46 endereços cadastrados (contém **8 linhas duplicadas** de clientes recorrentes). |
| 7 | `"Order"` | **34** | `6,38 KB` | `id` (UUID) | `"clientId"` → `"Client"("id")`<br>`"addressId"` → `"Address"("id")` | 34 pedidos (`number` de `#2` a `#46`). Receita total acumulada: **R\$ 3.973,00**. |
| 8 | `"OrderItem"` | **36** | `6,20 KB` | `id` (UUID) | `"orderId"` → `"Order"("id")` (`CASCADE`)<br>`"productId"` → `"Product"("id")`<br>`"flavorId"` → `"Flavor"("id")` | 36 itens vendidos distribuídos entre os 34 pedidos (**0 pedidos sem itens**). |
| 9 | `"OrderHistory"` | **61** | `9,43 KB` | `id` (UUID) | `"orderId"` → `"Order"("id")` (`CASCADE`) | 61 eventos de transição de status dos pedidos. |
| 10 | `"Banner"` | **0** | `0,00 KB` | `id` (UUID) | — | Tabela vazia (loja utiliza `StoreConfig.bannerUrl`). |
| 11 | `"Coupon"` | **0** | `0,00 KB` | `id` (UUID) | — | Tabela vazia. |
| 12 | `"Promotion"` | **0** | `0,00 KB` | `id` (UUID) | — | Tabela vazia. |
| 13 | `"PromotionRule"` | **0** | `0,00 KB` | `id` (UUID) | *(Sem FK formal)* | Tabela vazia. |
| 14 | `"StockMovement"` | **0** | `0,00 KB` | `id` (UUID) | `"productId"`, `"flavorId"` | Tabela vazia (movimentações anteriores à ativação do log de estoque). |
| 15 | `"User"` | **0** | `0,00 KB` | `id` (UUID) | — | Tabela vazia (login admin usa validação via rota/cookie). |
| — | **TOTAL `public`** | **405 registros** | **`9.914,55 KB` (~9,68 MB)** | — | — | **98,8% do volume em bytes (`9.796,5 KB`) corresponde a apenas 11 imagens Base64!** |

### 1.2 Esquemas Internos do Supabase (`auth`, `storage`, `realtime`)

| Esquema.Tabela | Qtd. de Registros | Tamanho Bruto | Observação para Migração Neon |
| :--- | :---: | :---: | :--- |
| `storage.buckets` | **1** | `0,11 KB` | Bucket único `'products'` (`public = true`). |
| `storage.objects` | **205** | `86,88 KB` | Metadados dos **205 arquivos** presentes em `rqdphtewqozpoywuimog.storage.zip`. |
| `auth.users` | **0** | `0,00 KB` | Confirma que **nenhum usuário utilizava o Supabase Auth**. |
| `auth.schema_migrations` | **84** | `1,14 KB` | Interno do Supabase GoTrue (ignorar na migração para o Neon). |
| `storage.migrations` | **81** | `7,61 KB` | Interno do Supabase Storage (ignorar na migração para o Neon). |
| `realtime.schema_migrations` | **89** | `1,20 KB` | Interno do Supabase Realtime (ignorar na migração para o Neon). |

---

## 2. Comparação entre o Backup Supabase, Banco Configurado e Neon

### 2.1 Estado do Banco Configurado em `.env` vs. Backup `.backup.gz`
- O arquivo `.env` local aponta para `aws-0-ca-central-1.pooler.supabase.com:5432` (projeto Supabase `rqdphtewqozpoywuimog`).
- O backup `db_cluster-23-11-2026@04-21-06.backup.gz` foi extraído diretamente desse cluster em **23/11/2026** e representa o snapshot integral e mais recente de produção (`StoreConfig.updatedAt = 2026-09-10 00:41:33.551`, último pedido `#46`).
- Nenhuma string de conexão `NEON_DATABASE_URL` foi encontrada nos arquivos `.env` ou `.env.local` de `loja_henri`, indicando que o banco **Neon** para a `loja_henri` ainda aguarda a execução controlada da restauração do schema `public`.

### 2.2 Matriz de Compatibilidade Técnica: Dump Supabase → Neon PostgreSQL

| Componente do Dump | Estado no Backup (`db_cluster-23-11-2026@04-21-06.backup.gz`) | Compatibilidade com Neon | Ação Necessária na Migração |
| :--- | :--- | :---: | :--- |
| **Schemas `auth`, `storage`, `realtime`, `pgsodium`, `vault`** | Presentes no dump completo do cluster Supabase. | **Incompatível / Desnecessário no Neon** | Restaurar no Neon **exclusivamente o schema `public`** (tabelas, enums, constraints, índices e a sequência `"Order_number_seq"`). |
| **Roles do Supabase (`anon`, `authenticated`, `service_role`, `supabase_admin`)** | Referenciadas nos comandos `GRANT` e `ALTER DEFAULT PRIVILEGES` do dump. | **Não existem por padrão no Neon** | Filtrar comandos `OWNER TO`, `GRANT ... TO anon/authenticated/service_role` (`--no-owner --no-acl`) ao importar para o Neon. |
| **Sequência `public."Order_number_seq"`** | `SELECT pg_catalog.setval('public."Order_number_seq"', 46, true);` | **100% Compatível** | Garantir que a chamada `setval(..., 46, true)` seja executada no Neon para que o próximo pedido receba `number = 47`. |
| **Row-Level Security (`ENABLE ROW LEVEL SECURITY`)** | Ativado nas **15 tabelas `public.*`**, porém com **0 políticas (`CREATE POLICY`)** no schema `public`. | **Atenção Crítica** | Como o Prisma conecta com o owner do banco (`neondb_owner`, que possui `BYPASSRLS`), o Prisma continuará funcionando. Contudo, se a **Neon Data API** for ativada, ela bloqueará todas as leituras enquanto não houver políticas RLS para as tabelas públicas. |

---

## 3. Validação de Chaves, Integridade Referencial e Checksum Financeiro

Todas as **405 linhas** das 15 tabelas do schema `public` foram submetidas a validação cruzada de chaves primárias e estrangeiras:

### 3.1 Resultado da Validação de Integridade Referencial (0 Órfãos!)

| Relação Auditada (Filho → Pai) | Registros Analisados | Registros Órfãos Encontrados | Status |
| :--- | :---: | :---: | :---: |
| `"Product"."categoryId"` → `"Category"."id"` | 41 produtos | **0** | **100% Íntegro** |
| `"Flavor"."productId"` → `"Product"."id"` | 144 sabores | **0** | **100% Íntegro** |
| `"Address"."clientId"` → `"Client"."id"` | 46 endereços | **0** | **100% Íntegro** |
| `"Order"."clientId"` → `"Client"."id"` | 34 pedidos | **0** | **100% Íntegro** |
| `"Order"."addressId"` → `"Address"."id"` | 34 pedidos | **0** | **100% Íntegro** |
| `"OrderItem"."orderId"` → `"Order"."id"` | 36 itens de pedido | **0** | **100% Íntegro** |
| `"OrderItem"."productId"` → `"Product"."id"` | 36 itens de pedido | **0** | **100% Íntegro** |
| `"OrderItem"."flavorId"` → `"Flavor"."id"` | 36 itens de pedido | **0** | **100% Íntegro** |
| `"OrderItem"."productId"` == `"Flavor"."productId"` | 36 itens de pedido | **0 divergências** | **100% Íntegro** |
| `"OrderHistory"."orderId"` → `"Order"."id"` | 61 históricos | **0** | **100% Íntegro** |

### 3.2 Checksum Financeiro e Consistência dos 34 Pedidos

- **Total de Pedidos:** `34` (`min(number) = 2`, `max(number) = 46`).
- **Números de Pedido Existentes:** `2, 4, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46`.
- **Lacunas na Numeração (`number`):** Os números `[1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15]` correspondem a pedidos de teste excluídos no painel admin durante a implantação inicial.
- **Pedidos sem Itens (`0 OrderItems`):** **0** (todos os 34 pedidos possuem pelo menos 1 item válido em `"OrderItem"`).
- **Divergência entre `Order.subtotal` e `SUM(OrderItem.quantity * priceAtPurchase)`:** **0 divergências** (100% de precisão aritmética em todos os 34 pedidos).
- **Divergência entre `Order.total` e `(Order.subtotal + Order.deliveryFee)`:** **0 divergências**.
- **Totais Financeiros para Reconciliação Pós-Migração no Neon:**
  - `SUM("subtotal")`: **R\$ 3.750,00**
  - `SUM("deliveryFee")`: **R\$ 223,00**
  - `SUM("total")`: **R\$ 3.973,00**

---

## 4. Detecção de Duplicações e Inconsistências Encontradas

### 4.1 Duplicação de Endereços na Tabela `"Address"` (8 Linhas Redundantes)
Como `createOrder` (`actions/orders.ts:34`) executa `db.address.create` a cada pedido sem verificar se o endereço já existe para aquele `clientId`, foram encontrados **5 clientes com registros de endereço duplicados** (totalizando **14 linhas para apenas 5 endereços reais**, ou seja, **9 linhas extras/8 redundantes com mesmo CEP e número**):

| Cliente | Telefone | CEP | Número | Qtd. de Linhas Idênticas em `"Address"` | IDs dos Registros `"Address"` |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **Henrique Rian** | `15996204540` | `18076352` | `537` | **4 linhas** | `8d9da634...`, `c30a2d66...`, `caa2b93c...`, `4bb3eaab...` |
| **Massami Shitara** | `16991551200` | `08473-005` | `26` | **4 linhas** | `465d1e4a...`, `fd74d89b...`, `7f29c5e3...`, `58388183...` |
| **eric** | `15996490256` | `18055745` | `350` | **2 linhas** | `25bcc0f7...`, `8eabebb5...` |
| **Hilary** | `1599237500` | `18117090` | `46` | **2 linhas** | `7988e809...`, `7ad54236...` |
| **Vitor Heidmann** | `13997023013` | `18072395` | `10` | **2 linhas** | `6a417ef5...`, `22780107...` |

> [!NOTE]
> **Por que não excluir essas linhas agora?** Cada uma dessas linhas duplicadas de `"Address"` está vinculada por Foreign Key (`"Order"."addressId"`) a um pedido histórico diferente daquele cliente. Portanto, elas **devem ser preservadas na migração** para manter a integridade referencial dos 34 pedidos, corrigindo-se apenas a função `createOrder` para que futuros pedidos reutilizem o `Address` existente.

### 4.2 Bloat Crítico por Imagens Base64 Embutidas em `"Category"`, `"Product"` e `"Flavor"`
A auditoria revelou que **11 registros** armazenam imagens inteiras codificadas em Base64 (`data:image/...;base64,...`) dentro de colunas `TEXT`:

| Tabela.Coluna | Nome do Registro | Tamanho da String Base64 |
| :--- | :--- | :---: |
| `"Flavor"."imageUrl"` | `Icy mint ` | **`3.162,8 KB` (~3,09 MB)** |
| `"Flavor"."imageUrl"` | `Frozen laranja vermelha ` | **`2.283,6 KB` (~2,23 MB)** |
| `"Product"."mainImageUrl"` | `DINNER LADY LUMA 20K-20 ML PUFS ` | **`1.679,2 KB` (~1,64 MB)** |
| `"Category"."imageUrl"` | `DINNER LADY` | **`1.603,1 KB` (~1,57 MB)** |
| `"Category"."imageUrl"` | `OUTROS` | **`909,0 KB` (~0,89 MB)** |
| `"Category"."imageUrl"` | `BLACK SHEEP ` | `65,9 KB` |
| `"Category"."imageUrl"` | `NIK BAR` | `35,3 KB` |
| `"Category"."imageUrl"` | `ELFBAR ` | `23,5 KB` |
| `"Category"."imageUrl"` | `IGNITE` | `22,5 KB` |
| `"Category"."imageUrl"` | `OXBAR` | `11,7 KB` |
| `"Category"."imageUrl"` | `WAKA ` | `9,9 KB` |
| **TOTAL (11 registros)** | — | **`9.796,5 KB` (98,8% de todo o banco!)** |

### 4.3 Heterogeneidade no JSON `StoreConfig.deliveryRanges`
No registro `"StoreConfig"` (`id = 'default'`), o campo `"deliveryRanges"` contém 7 faixas, porém as 5 primeiras faixas possuem apenas `{"maxKm", "price"}` e as 2 últimas possuem `{"maxKm", "minKm", "price"}`:
```json
[
  {"maxKm": 3, "price": 0},
  {"maxKm": 5, "price": 5},
  {"maxKm": 7, "price": 8},
  {"maxKm": 10, "price": 10},
  {"maxKm": 15, "price": 15},
  {"maxKm": 18, "minKm": 15, "price": 20},
  {"maxKm": 25, "minKm": 18, "price": 23}
]
```
O código atual em `services/distance.ts` ordena por `Number(a.maxKm) - Number(b.maxKm)` e encontra a primeira faixa onde `distanceKm <= Number(r.maxKm)`, portanto funciona corretamente com ambos os formatos, mas recomenda-se normalizar todas as faixas com `id`, `minKm`, `maxKm` e `price`.

---

## 5. Checklist de Validação Pós-Importação no Neon (Somente-Leitura)

Após restaurar o schema `public` no banco Neon, o resultado da query de conferência deverá bater **exatamente** com o gabarito abaixo:

| Métrica de Controle | Valor Esperado no Neon |
| :--- | :--- |
| Total de tabelas em `public` (exceto `_prisma_migrations`) | **15 tabelas** |
| `"StoreConfig"` | **1 registro** (`id = 'default'`, `cep = '18076352'`) |
| `"Category"` | **8 registros** |
| `"Product"` | **41 registros** |
| `"Flavor"` | **144 registros** |
| `"Client"` | **34 registros** |
| `"Address"` | **46 registros** |
| `"Order"` | **34 registros** (`SUM(total) = 3973.00`) |
| `"OrderItem"` | **36 registros** |
| `"OrderHistory"` | **61 registros** |
| `currval / last_value` de `"Order_number_seq"` | **`46` (`is_called = true`)** |
