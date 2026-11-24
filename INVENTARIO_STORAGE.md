# INVENTÁRIO E AUDITORIA DE ARMAZENAMENTO (STORAGE) — HENRI IMPORTS

**Data da Auditoria:** 23 de Novembro de 2026  
**Fontes Auditadas:**
- **Pacote do Supabase Storage:** `C:\Users\massa\Desktop\Projetos\loja_henri\rqdphtewqozpoywuimog.storage.zip` (`88.581.292 bytes` comprimido / `89.709.000 bytes` descomprimido)
- **Metadados `storage.objects` e Tabelas `public.*`:** `db_cluster-23-11-2026@04-21-06.backup.gz`
- **Diretório Local de Ativos Estáticos:** `C:\Users\massa\Desktop\Projetos\loja_henri\public`

**Modo de Execução:** 100% Somente Leitura (Nenhum arquivo de produção foi modificado ou sobrescrito).

---

## 1. Estrutura e Volumetria dos Arquivos Recuperados do Supabase Storage

O arquivo `rqdphtewqozpoywuimog.storage.zip` contém o backup físico integral do projeto Supabase `rqdphtewqozpoywuimog`.

### 1.1 Estrutura de Diretórios e Contagem de Arquivos no ZIP

```text
rqdphtewqozpoywuimog.storage.zip (88,58 MB)
└── rqdphtewqozpoywuimog/
    └── products/                  # Bucket único público ('products')
        ├── 0d6xn9cxj1xq-1786035711269.png
        ├── 0nhhzr3d51e-1785686345963.webp
        ├── ... (total: 205 arquivos de imagem na raiz do bucket)
        └── zw897upfq8-1785772365688.png
```

| Diretório no Backup ZIP | Qtd. de Arquivos | Tamanho Descomprimido | Conciliação com `storage.objects` (DB) |
| :--- | :---: | :---: | :---: |
| `rqdphtewqozpoywuimog/products/` | **205 arquivos** | **`89.709.000 bytes` (85,55 MB)** | **205 / 205 (100% de paridade exata)** |

### 1.2 Distribuição por Formato de Arquivo (Extensão e Peso)

| Extensão | Qtd. de Arquivos | % dos Arquivos | Tamanho Total (Bytes) | Tamanho Total (MB) | % do Volume (MB) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **`.png`** | 67 | 32,68% | `82.188.808` | **78,38 MB** | **91,62%** |
| **`.webp`** | 96 | 46,83% | `4.810.424` | **4,59 MB** | 5,36% |
| **`.jpeg`** | 39 | 19,02% | `2.341.872` | **2,23 MB** | 2,61% |
| **`.jpg`** | 3 | 1,46% | `367.896` | **0,35 MB** | 0,41% |
| **TOTAL** | **205** | **100,0%** | **`89.709.000`** | **85,55 MB** | **100,0%** |

> [!TIP]
> **Oportunidade de Otimização:** Os 67 arquivos `.png` (muitos entre 1,1 MB e 2,4 MB cada) representam **91,62% de todo o peso do Storage (78,38 MB)**. Convertê-los para `.webp` durante a migração de Storage reduzirá o volume total de 85,55 MB para menos de **12 MB** sem perda perceptível de qualidade visual.

---

## 2. Verificação de Integridade Física e Conciliação de Metadados

Todos os **205 arquivos** do pacote `rqdphtewqozpoywuimog.storage.zip` foram validados individualmente quanto ao tamanho em bytes e integridade:

1. **Paridade Físico × Metadados (`storage.objects`):**
   - Arquivos no `.zip` ausentes em `storage.objects`: **0**
   - Registros em `storage.objects` ausentes no `.zip`: **0**
   - Arquivos com tamanho em bytes idêntico entre o `.zip` e `storage.objects.metadata.size`: **205 / 205 (100%)**.
2. **Padrão de Nomes e Caminhos Originais:**
   - Todos os 205 arquivos seguem o padrão gerado por `lib/supabase.ts:19`: `<hash_base36>-<timestamp_ms>.<ext>` (ou `<hash>_<timestamp>.<ext>`), armazenados diretamente na raiz do bucket `products` (`bucket_id = 'products'`).
   - As URLs completas registradas nas tabelas `public."Product"` e `public."Flavor"` possuem o prefixo:
     `https://rqdphtewqozpoywuimog.supabase.co/storage/v1/object/public/products/<filename>`

---

## 3. Cruzamento de Referências: Banco de Dados × Storage × Arquivos Locais

Foram auditadas todas as **182 referências de imagem** existentes nas 15 tabelas do schema `public` (`StoreConfig`, `Category`, `Product`, `Flavor`, `Banner`, `Promotion`):

### 3.1 Resumo Geral das Referências de Imagem no Banco

| Classificação da Referência | Qtd. de Referências no Banco | Tabelas Onde Ocorrem | Status de Integridade |
| :--- | :---: | :--- | :--- |
| **1. URLs do Supabase Storage (`rqdphtewqozpoywuimog`)** | **169** (169 arquivos únicos) | `"Product"."mainImageUrl"` (40)<br>`"Flavor"."imageUrl"` (129) | **100% encontrados no `.storage.zip` (0 arquivos quebrados)** |
| **2. Imagens Base64 Inline (`data:image/...;base64,...`)** | **11** (`9.796,5 KB` no banco) | `"Category"."imageUrl"` (8)<br>`"Product"."mainImageUrl"` (1)<br>`"Flavor"."imageUrl"` (2) | **Crítico (Bloat no PostgreSQL)** — Criadas pelo fallback de `lib/supabase.ts` |
| **3. Caminhos Locais (`/public`)** | **2** | `"StoreConfig"."logoUrl"` (`/logo.png`)<br>`"StoreConfig"."bannerUrl"` (`/images/hero-banner.png`) | **100% íntegros no diretório `/public`** |
| **4. URLs `blob:` corrompidas** | **0** | — | **0 ocorrências no backup atual** (já saneadas no banco) |
| **5. Referências a arquivos inexistentes no Storage** | **0** | — | **100% das 169 URLs possuem o arquivo correspondente no ZIP** |
| **TOTAL DE REFERÊNCIAS ATIVAS** | **182** | — | — |

*(Observação: Dos 144 sabores cadastrados em `"Flavor"`, 129 apontam para o Supabase Storage, 2 usam Base64 inline e **13 possuem `"imageUrl" = NULL`**, exibindo a imagem principal do produto pai).*

---

## 4. Arquivos Órfãos no Storage (Sem Referência no Banco de Dados)

Dos **205 arquivos** presentes em `rqdphtewqozpoywuimog.storage.zip` e `storage.objects`:
- **169 arquivos** estão vinculados ativamente a produtos (40) e sabores (129).
- **36 arquivos (`23,59 MB` / 27,6% do volume do ZIP) são ARQUIVOS ÓRFÃOS** — existem no Supabase Storage, mas não são referenciados por nenhum registro de `Product`, `Flavor`, `Category`, `Banner`, `Promotion` ou `StoreConfig` (gerados quando imagens foram substituídas ou produtos de teste foram excluídos sem remoção no bucket).

### 4.1 Lista Completa dos 36 Arquivos Órfãos Identificados (`23,59 MB`)

| # | Nome do Arquivo no Bucket `products` | Tamanho | # | Nome do Arquivo no Bucket `products` | Tamanho |
| :- | :--- | :---: | :- | :--- | :---: |
| 1 | `2aagsyy47ci-1785771453532.webp` | 38,1 KB | 19 | `fx8j2fix866-1785336557865.jpeg` | 79,3 KB |
| 2 | `2quxnz0u1e5-1785688257160.png` | 1.351,0 KB | 20 | `g6eg7y04vh-1785688510737.webp` | 51,2 KB |
| 3 | `3bfb1xxvn77-1786035505700.png` | 1.234,4 KB | 21 | `gc4yjsgjd6c-1784852384386.jpeg` | 45,1 KB |
| 4 | `4ilm6qfjje-1784853176572.jpeg` | 45,1 KB | 22 | `ijw8tzobpyk-1785598368649.jpeg` | 74,1 KB |
| 5 | `5cykbi3cxum-1785598052572.webp` | 69,5 KB | 23 | `ilx9qofxm0o-1784852833580.jpeg` | 45,1 KB |
| 6 | `5ndg03xi6fh-1784849179637.jpeg` | 45,1 KB | 24 | `n78qfuhfdbr-1785598212411.webp` | 22,8 KB |
| 7 | `63h93fa878p-1785276759875.jpg` | 119,8 KB | 25 | `nqfwxh7f8-1784852678588.jpeg` | 45,1 KB |
| 8 | `78tfyg5jum5-1785337141290.png` | 1.657,5 KB | 26 | `ofj2ccen2-1784847913219.jpg` | 119,8 KB |
| 9 | `7uwq7kmlso-1784852542774.jpg` | 119,8 KB | 27 | `q9zzx5ytd4f-1785552963215.png` | 2.017,9 KB |
| 10 | `868i6xuw0zn-1784852653150.png` | 566,5 KB | 28 | `qwy535xr5rl-1785597788599.webp` | 73,3 KB |
| 11 | `99qgcs14k1l-1785576954087.jpeg` | 60,1 KB | 29 | `r7hbipqv0ye-1784853010629.jpeg` | 45,1 KB |
| 12 | `aix3hxfzsk4-1785462397503.png` | 2.283,4 KB | 30 | `sk15xi3i1u9-1785688152515.png` | 1.351,0 KB |
| 13 | `bhnw041xj4a-1785772119322.png` | 1.712,7 KB | 31 | `ug71ubqxca-1785552959417.png` | 2.197,5 KB |
| 14 | `d1o3nz4e3vj-1785773391961.webp` | 17,6 KB | 32 | `ugyz317afep-1785687451777.png` | 1.259,4 KB |
| 15 | `d97onsbc3f5-1785857259417.png` | 2.372,1 KB | 33 | `ymmetudzvph-1785289769344.webp` | 16,6 KB |
| 16 | `df27elqmgve-1785772689285.png` | 2.473,8 KB | 34 | `yotb7mibnr-1785772678246.png` | 412,0 KB |
| 17 | `dhe0cdgku7h-1785598306049.webp` | 13,1 KB | 35 | `yy1quchxcr-1785687928045.png` | 1.691,9 KB |
| 18 | `dtem8j6w2u-1785289799294.webp` | 16,6 KB | 36 | `zw897upfq8-1785772365688.png` | 412,0 KB |

---

## 5. Recomendações e Plano de Migração de Arquivos para o Ambiente Neon

1. **Preservar os 205 Arquivos no Backup Local, Migrar os 169 Ativos + 11 Base64 Extraídos (Total: 180 imagens ativas):**
   - Extrair as **11 imagens Base64** (8 categorias, 1 produto `DINNER LADY LUMA 20K` e 2 sabores `Icy mint` e `Frozen laranja vermelha`) do banco para arquivos físicos `.webp`/`.png`, reduzindo o tamanho do banco PostgreSQL no Neon de **9,91 MB para apenas ~118 KB (redução de 98,8%)**.
2. **Atualização das 169 URLs Legadas (`rqdphtewqozpoywuimog.supabase.co`):**
   - Ao hospedar os arquivos no novo Object Storage (Cloudflare R2, Vercel Blob ou diretório estático servido por CDN), executar um `UPDATE` atômico substituindo o prefixo `https://rqdphtewqozpoywuimog.supabase.co/storage/v1/object/public/products/` pela nova URL base de mídia.
3. **Eliminação do Upload Anônimo Client-Side (`lib/supabase.ts` e `setup_storage.ts`):**
   - Substituir o upload direto do navegador por uma rota autenticada no servidor (`POST /api/admin/upload`) e desativar o fallback `fileToBase64(file)` para impedir novo bloat no banco Neon.
