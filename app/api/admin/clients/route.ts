import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/admin/clients — list all clients with order stats
export async function GET() {
  try {
    const clients = await db.client.findMany({
      include: {
        orders: { select: { total: true, createdAt: true } },
        addresses: { take: 1, orderBy: { createdAt: 'desc' } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const data = clients.map((c) => {
      const totalSpent = c.orders.reduce((sum, o) => sum + o.total, 0);
      const lastOrder = c.orders.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
      const addr = c.addresses[0];
      const addressStr = addr
        ? `${addr.street}, ${addr.number} - ${addr.neighborhood}, ${addr.city}/${addr.state}`
        : '';

      return {
        id: c.id,
        name: c.name,
        phone: c.phone,
        email: c.email ?? '',
        ordersCount: c.orders.length,
        totalSpent,
        lastPurchase: lastOrder?.createdAt ?? null,
        address: addressStr,
        createdAt: c.createdAt,
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('GET /api/admin/clients error:', error);
    return NextResponse.json({ error: 'Erro ao buscar clientes' }, { status: 500 });
  }
}

// POST /api/admin/clients — create new client
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Nome e telefone são obrigatórios' }, { status: 400 });
    }

    const client = await db.client.create({
      data: { name, phone, email: email || null },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Telefone já cadastrado' }, { status: 409 });
    }
    console.error('POST /api/admin/clients error:', error);
    return NextResponse.json({ error: 'Erro ao criar cliente' }, { status: 500 });
  }
}
