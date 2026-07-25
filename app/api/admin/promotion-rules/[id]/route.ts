import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, description, targetType, productId, categoryId, discountType, discountValue, freeShipping, badgeText, active } = body;

    const updateData: Record<string, any> = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (targetType !== undefined) updateData.targetType = targetType;
    if (productId !== undefined) updateData.productId = productId || null;
    if (categoryId !== undefined) updateData.categoryId = categoryId || null;
    if (discountType !== undefined) updateData.discountType = discountType;
    if (discountValue !== undefined) updateData.discountValue = Number(discountValue);
    if (freeShipping !== undefined) updateData.freeShipping = Boolean(freeShipping);
    if (badgeText !== undefined) updateData.badgeText = badgeText || null;
    if (active !== undefined) updateData.active = Boolean(active);

    const updated = await db.promotionRule.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('PATCH /api/admin/promotion-rules/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao atualizar regra de promoção' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.promotionRule.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/admin/promotion-rules/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao excluir promoção' }, { status: 500 });
  }
}
