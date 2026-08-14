import { NextRequest, NextResponse } from 'next/server';
import { getOrders } from '@/actions/orders';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get('status') || 'ALL';
    const orders = await getOrders(statusFilter);
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('GET /api/admin/orders error:', error);
    return NextResponse.json({ error: 'Erro ao buscar pedidos' }, { status: 500 });
  }
}
