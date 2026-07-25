import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Código de cupom não informado' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();

    // Find coupon in database
    const coupon = await db.coupon.findUnique({
      where: { code: cleanCode },
    });

    if (!coupon) {
      return NextResponse.json({ error: 'Cupom inválido ou não encontrado' }, { status: 404 });
    }

    // Check if active
    if (!coupon.active) {
      return NextResponse.json({ error: 'Este cupom foi inativado' }, { status: 400 });
    }

    // Check expiration date
    if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt)) {
      return NextResponse.json({ error: 'Este cupom já expirou' }, { status: 400 });
    }

    // Check max uses
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ error: 'Este cupom atingiu o limite máximo de utilizações' }, { status: 400 });
    }

    // Check minimum order subtotal
    const cartSubtotal = Number(subtotal) || 0;
    if (coupon.minOrderValue && cartSubtotal < coupon.minOrderValue) {
      return NextResponse.json(
        {
          error: `Este cupom requer um pedido mínimo de R$ ${coupon.minOrderValue.toFixed(2)} (atual: R$ ${cartSubtotal.toFixed(2)})`,
        },
        { status: 400 }
      );
    }

    // Calculate discount
    let calculatedDiscount = 0;

    if (coupon.discountType === 'PERCENTAGE') {
      calculatedDiscount = (cartSubtotal * coupon.discountValue) / 100;
    } else if (coupon.discountType === 'FIXED_AMOUNT') {
      calculatedDiscount = Math.min(cartSubtotal, coupon.discountValue);
    }

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      calculatedDiscount,
      freeShipping: coupon.freeShipping,
      message: coupon.freeShipping
        ? 'Cupom de Frete Grátis aplicado com sucesso!'
        : `Cupom aplicado! Desconto de ${
            coupon.discountType === 'PERCENTAGE'
              ? `${coupon.discountValue}%`
              : `R$ ${coupon.discountValue.toFixed(2)}`
          }`,
    });
  } catch (error: any) {
    console.error('POST /api/coupons/validate error:', error);
    return NextResponse.json({ error: 'Erro ao validar cupom' }, { status: 500 });
  }
}
