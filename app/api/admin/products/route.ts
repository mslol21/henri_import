import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        category: { select: { name: true } },
        flavors: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('GET /api/admin/products error:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, slug, brand, categoryId, description, basePrice,
      basePromoPrice, hasFlavors, baseStock, baseSku, internalCode,
      mainImageUrl, gallery, weight, active
    } = body;

    if (!name || !slug || !categoryId || basePrice === undefined || !baseSku || !mainImageUrl) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    const product = await db.product.create({
      data: {
        name,
        slug,
        brand: brand || '',
        categoryId,
        description: description || '',
        basePrice: Number(basePrice),
        basePromoPrice: basePromoPrice ? Number(basePromoPrice) : null,
        hasFlavors: Boolean(hasFlavors),
        baseStock: Number(baseStock || 0),
        baseSku,
        internalCode: internalCode || null,
        mainImageUrl,
        gallery: gallery || [],
        weight: Number(weight || 0),
        active: active !== undefined ? Boolean(active) : true,
      },
      include: {
        category: { select: { name: true } },
        flavors: true,
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Slug ou SKU já está em uso' }, { status: 409 });
    }
    console.error('POST /api/admin/products error:', error);
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 });
  }
}
