import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - List all coupons
export async function GET() {
  try {
    const coupons = await db.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(coupons);
  } catch (error) {
    console.error('GET /api/admin/coupons error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Create a new coupon
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, discountType, discountValue, minOrderValue, freeShipping, maxUses, active, expiresAt } = body;

    if (!code) {
      return NextResponse.json({ error: 'Código do cupom é obrigatório' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();

    const existing = await db.coupon.findUnique({ where: { code: cleanCode } });
    if (existing) {
      return NextResponse.json({ error: 'Já existe um cupom com este código' }, { status: 409 });
    }

    const coupon = await db.coupon.create({
      data: {
        code: cleanCode,
        discountType: discountType || 'PERCENTAGE',
        discountValue: discountValue ? Number(discountValue) : 10,
        minOrderValue: minOrderValue ? Number(minOrderValue) : 0,
        freeShipping: Boolean(freeShipping),
        maxUses: maxUses ? Number(maxUses) : null,
        active: active !== undefined ? Boolean(active) : true,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/admin/coupons error:', error);
    return NextResponse.json({ error: error.message || 'Erro ao criar cupom' }, { status: 500 });
  }
}
