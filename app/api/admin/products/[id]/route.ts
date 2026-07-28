import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseNumber } from '@/lib/utils';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.brand !== undefined) updateData.brand = body.brand;
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.basePrice !== undefined) updateData.basePrice = parseNumber(body.basePrice) ?? 0;
    if (body.basePromoPrice !== undefined) updateData.basePromoPrice = parseNumber(body.basePromoPrice);
    if (body.wholesalePrice !== undefined) updateData.wholesalePrice = parseNumber(body.wholesalePrice);
    if (body.minWholesaleQty !== undefined) updateData.minWholesaleQty = parseNumber(body.minWholesaleQty);
    if (body.hasFlavors !== undefined) updateData.hasFlavors = Boolean(body.hasFlavors);
    if (body.baseStock !== undefined) updateData.baseStock = parseNumber(body.baseStock) ?? 0;
    if (body.baseSku !== undefined) updateData.baseSku = body.baseSku;
    if (body.internalCode !== undefined) updateData.internalCode = body.internalCode;
    if (body.mainImageUrl !== undefined) updateData.mainImageUrl = body.mainImageUrl;
    if (body.gallery !== undefined) updateData.gallery = body.gallery;
    if (body.weight !== undefined) updateData.weight = parseNumber(body.weight) ?? 0;
    if (body.active !== undefined) updateData.active = Boolean(body.active);

    // Batch update flavors if provided in body
    if (Array.isArray(body.flavors) && body.flavors.length > 0) {
      for (const f of body.flavors) {
        if (f.id) {
          await db.flavor.update({
            where: { id: f.id },
            data: {
              ...(f.name && { name: f.name }),
              ...(f.sku && { sku: f.sku }),
              ...(f.price !== undefined && { price: parseNumber(f.price) }),
              ...(f.wholesalePrice !== undefined && { wholesalePrice: parseNumber(f.wholesalePrice) }),
              ...(f.stock !== undefined && { stock: parseNumber(f.stock) ?? 0 }),
              ...(f.active !== undefined && { active: Boolean(f.active) }),
            },
          });
        }
      }
    }

    const product = await db.product.update({
      where: { id },
      data: updateData,
      include: {
        category: { select: { name: true } },
        flavors: true,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Slug ou SKU já está em uso' }, { status: 409 });
    }
    console.error('PATCH /api/admin/products/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao atualizar produto: ' + (error.message || '') }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Check if product is in any orders
    const orderItemCount = await db.orderItem.count({
      where: { productId: id },
    });

    if (orderItemCount > 0) {
      return NextResponse.json(
        { error: `Não é possível excluir. Este produto está presente em ${orderItemCount} item(ns) de pedidos.` },
        { status: 400 }
      );
    }

    await db.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/admin/products/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao excluir produto' }, { status: 500 });
  }
}
