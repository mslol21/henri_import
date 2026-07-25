import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// PATCH - Update coupon status or details
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { code, discountType, discountValue, minOrderValue, freeShipping, maxUses, active, expiresAt } = body;

    const updateData: Record<string, any> = {};

    if (code !== undefined) updateData.code = code.trim().toUpperCase();
    if (discountType !== undefined) updateData.discountType = discountType;
    if (discountValue !== undefined) updateData.discountValue = Number(discountValue);
    if (minOrderValue !== undefined) updateData.minOrderValue = minOrderValue ? Number(minOrderValue) : 0;
    if (freeShipping !== undefined) updateData.freeShipping = Boolean(freeShipping);
    if (maxUses !== undefined) updateData.maxUses = maxUses ? Number(maxUses) : null;
    if (active !== undefined) updateData.active = Boolean(active);
    if (expiresAt !== undefined) updateData.expiresAt = expiresAt ? new Date(expiresAt) : null;

    const updated = await db.coupon.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('PATCH /api/admin/coupons/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao atualizar cupom' }, { status: 500 });
  }
}

// DELETE - Remove a coupon
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.coupon.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/admin/coupons/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao excluir cupom' }, { status: 500 });
  }
}
