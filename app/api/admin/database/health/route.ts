import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * Protected by the existing /api/admin middleware.
 * Read-only verification endpoint for the Supabase -> Neon rollout.
 * Never returns a connection string, database credentials or customer rows.
 */
export async function GET() {
  try {
    const [products, orders, flavors, database] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.flavor.count(),
      prisma.$queryRawUnsafe<Array<{ database_name: string }>>(
        'SELECT current_database() AS database_name'
      ),
    ]);

    return NextResponse.json(
      {
        ok: true,
        provider: database[0]?.database_name === 'henri_imports' ? 'neon' : 'other',
        products,
        orders,
        flavors,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Falha de conexão com o banco de dados.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
