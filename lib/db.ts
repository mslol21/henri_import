import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/loja_henri';
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
