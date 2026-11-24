/**
 * Script de Migração e Sincronização para o Banco Neon (Henri Imports)
 *
 * Executa a migration SQL limpa e idempotente (001_complete_clean_seed.sql)
 * diretamente no banco Neon configurado em DATABASE_URL / NEON_DATABASE_URL.
 *
 * USO:
 *   node scripts/migrate_to_neon.mjs
 */

import fs from 'fs';
import path from 'path';
import pg from 'pg';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^([^=#\s]+)\s*=\s*(.*)$/);
    if (m) {
      const k = m[1].trim();
      const v = m[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[k]) process.env[k] = v;
    }
  }
}

loadEnvFile(path.resolve('.env.local'));
loadEnvFile(path.resolve('.env'));

const candidates = [
  process.env.NEON_DATABASE_URL,
  process.env.POSTGRES_PRISMA_URL,
  process.env.POSTGRES_URL,
  process.env.DIRECT_URL,
  process.env.DATABASE_URL,
];

const connectionString = candidates.find(
  (u) => u && u.trim() !== '' && !u.includes('rqdphtewqozpoywuimog')
);

async function runMigration() {
  console.log('===============================================================');
  console.log('   MIGRAÇÃO SUPABASE → NEON — HENRI IMPORTS');
  console.log('===============================================================\n');

  const sqlPath = path.resolve('migrations', 'neon', '001_complete_clean_seed.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('[ERRO] Arquivo SQL não encontrado em:', sqlPath);
    process.exit(1);
  }

  if (!connectionString) {
    console.log('[INFO] Nenhuma URL ativa do Neon encontrada em .env / .env.local.');
    console.log('       O arquivo .env atual ainda aponta para o antigo cluster Supabase (rqdphtewqozpoywuimog).');
    console.log('       O site já está configurado para auto-popular o Neon automaticamente assim que a');
    console.log('       variável DATABASE_URL (ou NEON_DATABASE_URL / POSTGRES_URL) for definida na Vercel ou no .env.\n');
    console.log('       Para rodar manualmente via terminal contra o Neon:');
    console.log('         $env:NEON_DATABASE_URL="postgresql://neondb_owner:...@ep-xxx.aws.neon.tech/neondb?sslmode=require"');
    console.log('         node scripts/migrate_to_neon.mjs');
    return;
  }

  const safeHost = connectionString.split('@')[1]?.split('/')[0] || 'neon-host';
  console.log(`1. Conectando ao banco Neon (${safeHost})...`);

  const pool = new pg.Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  });

  try {
    const sql = fs.readFileSync(sqlPath, 'utf8');
    console.log('2. Aplicando schema e restaurando os 405 registros sanitizados...');
    await pool.query(sql);

    const verify = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM "StoreConfig") AS store_config,
        (SELECT COUNT(*) FROM "Category") AS categories,
        (SELECT COUNT(*) FROM "Product") AS products,
        (SELECT COUNT(*) FROM "Flavor") AS flavors,
        (SELECT COUNT(*) FROM "Client") AS clients,
        (SELECT COUNT(*) FROM "Address") AS addresses,
        (SELECT COUNT(*) FROM "Order") AS orders,
        (SELECT COUNT(*) FROM "OrderItem") AS order_items,
        (SELECT COUNT(*) FROM "OrderHistory") AS order_history
    `);

    console.log('\n3. MIGRAÇÃO CONCLUÍDA COM SUCESSO! Contagem verificada no Neon:');
    console.table(verify.rows[0]);
  } catch (err) {
    console.error('\n[ERRO] Falha durante a migração para o Neon:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

runMigration();
