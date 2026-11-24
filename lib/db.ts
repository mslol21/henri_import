import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import fs from 'fs';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  pool: pg.Pool;
  neonSeedPromise?: Promise<void>;
};

export function resolveDatabaseUrl(): string | undefined {
  const candidates = [
    process.env.NEON_DATABASE_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.POSTGRES_URL,
    process.env.DATABASE_URL,
    process.env.DIRECT_URL,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.POSTGRES_URL_NON_POOLING,
  ];

  // Prefer any configured connection string that is NOT the decommissioned Supabase instance (rqdphtewqozpoywuimog)
  const activeUrl = candidates.find(
    (u) => typeof u === 'string' && u.trim() !== '' && !u.includes('rqdphtewqozpoywuimog')
  );

  return activeUrl?.trim();
}

export const isDatabaseConfigured = Boolean(resolveDatabaseUrl());

async function bootstrapNeonIfEmpty(pool: pg.Pool): Promise<void> {
  try {
    const check = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'Product'
      ) AS has_table;
    `);
    const hasTable = check.rows?.[0]?.has_table === true;

    if (hasTable) {
      const countRes = await pool.query('SELECT COUNT(*)::int AS cnt FROM "Product"');
      if ((countRes.rows?.[0]?.cnt ?? 0) > 0) {
        return; // Already seeded
      }
    }

    const sqlPath = path.join(process.cwd(), 'migrations', 'neon', '001_complete_clean_seed.sql');
    if (fs.existsSync(sqlPath)) {
      console.log('[Neon Bootstrap] Inicializando tabelas e dados do backup no banco Neon...');
      const sql = fs.readFileSync(sqlPath, 'utf8');
      await pool.query(sql);
      console.log('[Neon Bootstrap] Migração concluída com sucesso no Neon!');
    }
  } catch (err: any) {
    console.warn('[Neon Bootstrap] Aviso ao verificar/inicializar schema no Neon:', err?.message || err);
  }
}

export async function ensureNeonReady(): Promise<boolean> {
  if (!isDatabaseConfigured) return false;
  if (!globalForPrisma.neonSeedPromise && globalForPrisma.pool) {
    globalForPrisma.neonSeedPromise = bootstrapNeonIfEmpty(globalForPrisma.pool);
  }
  if (globalForPrisma.neonSeedPromise) {
    await globalForPrisma.neonSeedPromise;
  }
  return true;
}

function createPrismaClient() {
  const activeUrl = resolveDatabaseUrl();
  // If no valid Neon/Postgres URL is active yet, use fast-fail localhost port so fallback data loads in <10ms instead of hanging 5s
  const connectionString = activeUrl || 'postgresql://offline:offline@127.0.0.1:54321/offline?connect_timeout=1';

  const isLocalhost =
    connectionString.includes('localhost') ||
    connectionString.includes('127.0.0.1');

  const needsSsl =
    !isLocalhost &&
    (connectionString.includes('neon.tech') ||
      connectionString.includes('sslmode=require') ||
      connectionString.includes('supabase.co') ||
      connectionString.includes('pooler.supabase.com') ||
      process.env.NODE_ENV === 'production');

  const pool =
    globalForPrisma.pool ||
    new pg.Pool({
      connectionString,
      ssl: needsSsl ? { rejectUnauthorized: false } : false,
      max: process.env.NODE_ENV === 'production' ? 5 : 5,
      idleTimeoutMillis: 15000,
      connectionTimeoutMillis: activeUrl ? 12000 : 100,
    });

  globalForPrisma.pool = pool;

  if (activeUrl && !globalForPrisma.neonSeedPromise) {
    globalForPrisma.neonSeedPromise = bootstrapNeonIfEmpty(pool);
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();
export const db = prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
