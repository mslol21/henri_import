import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - List all promotion rules
export async function GET() {
  try {
    const rules = await db.promotionRule.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(rules);
  } catch (error) {
    console.error('GET /api/admin/promotion-rules error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Create promotion rule
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, targetType, productId, categoryId, discountType, discountValue, freeShipping, badgeText, active } = body;

    if (!title) {
      return NextResponse.json({ error: 'Título da promoção é obrigatório' }, { status: 400 });
    }

    const rule = await db.promotionRule.create({
      data: {
        title,
        description: description || null,
        targetType: targetType || 'PRODUCT',
        productId: productId || null,
        categoryId: categoryId || null,
        discountType: discountType || 'PERCENTAGE',
        discountValue: discountValue ? Number(discountValue) : 0,
        freeShipping: Boolean(freeShipping),
        badgeText: badgeText || null,
        active: active !== undefined ? Boolean(active) : true,
      },
    });

    return NextResponse.json(rule, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/admin/promotion-rules error:', error);
    return NextResponse.json({ error: 'Erro ao criar regra de promoção' }, { status: 500 });
  }
}
