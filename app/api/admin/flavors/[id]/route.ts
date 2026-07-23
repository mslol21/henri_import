import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.price !== undefined) updateData.price = body.price === null ? null : Number(body.price);
    if (body.stock !== undefined) updateData.stock = Number(body.stock);
    if (body.sku !== undefined) updateData.sku = body.sku;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.displayOrder !== undefined) updateData.displayOrder = Number(body.displayOrder);
    if (body.active !== undefined) updateData.active = Boolean(body.active);

    const flavor = await db.flavor.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(flavor);
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'SKU já está em uso para sabor' }, { status: 409 });
    }
    console.error('PATCH /api/admin/flavors/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao atualizar sabor' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Check if flavor is in any orders
    const orderItemCount = await db.orderItem.count({
      where: { flavorId: id }
    });

    if (orderItemCount > 0) {
      return NextResponse.json(
        { error: `Não é possível excluir. Este sabor está presente em ${orderItemCount} item(ns) de pedidos.` },
        { status: 400 }
      );
    }

    await db.flavor.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/admin/flavors/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao excluir sabor' }, { status: 500 });
  }
}
