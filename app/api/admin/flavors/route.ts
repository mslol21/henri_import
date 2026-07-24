import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, name, imageUrl, price, wholesalePrice, stock, sku, description, displayOrder, active } = body;

    if (!productId || !name || !sku) {
      return NextResponse.json({ error: 'Produto, nome e SKU são obrigatórios' }, { status: 400 });
    }

    const flavor = await db.flavor.create({
      data: {
        productId,
        name,
        imageUrl: imageUrl || null,
        price: price ? Number(price) : null,
        wholesalePrice: wholesalePrice ? Number(wholesalePrice) : null,
        stock: Number(stock || 0),
        sku,
        description: description || null,
        displayOrder: displayOrder || 0,
        active: active !== undefined ? Boolean(active) : true,
      },
    });

    return NextResponse.json(flavor, { status: 201 });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'SKU já está em uso para sabor' }, { status: 409 });
    }
    console.error('POST /api/admin/flavors error:', error);
    return NextResponse.json({ error: 'Erro ao criar sabor' }, { status: 500 });
  }
}
