import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  const isLocalhost = Boolean(
    !connectionString ||
    connectionString.includes('localhost') ||
    connectionString.includes('127.0.0.1')
  );
  const needsSsl = !isLocalhost;

  // Serverless functions on Vercel must use low max pool size (max: 2) to avoid EMAXCONNSESSION
  const pool = new pg.Pool({
    connectionString,
    ssl: needsSsl ? { rejectUnauthorized: false } : false,
    max: process.env.NODE_ENV === 'production' ? 2 : 5,
    idleTimeoutMillis: 15000,
    connectionTimeoutMillis: 5000,
  });

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();
export const db = prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
