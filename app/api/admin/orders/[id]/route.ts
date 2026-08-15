import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { updateOrderStatus } from '@/actions/orders';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const existingOrder = await db.order.findUnique({
      where: { id },
      include: { address: true, client: true },
    });

    if (!existingOrder) {
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 });
    }

    // 1. Update Client info if provided
    if (body.clientName || body.clientPhone) {
      await db.client.update({
        where: { id: existingOrder.clientId },
        data: {
          ...(body.clientName && { name: body.clientName.trim() }),
          ...(body.clientPhone && { phone: body.clientPhone.trim() }),
        },
      });
    }

    // 2. Update Address info if provided
    if (body.address) {
      await db.address.update({
        where: { id: existingOrder.addressId },
        data: {
          ...(body.address.street !== undefined && { street: body.address.street.trim() }),
          ...(body.address.number !== undefined && { number: body.address.number.trim() }),
          ...(body.address.complement !== undefined && { complement: body.address.complement?.trim() || null }),
          ...(body.address.neighborhood !== undefined && { neighborhood: body.address.neighborhood.trim() }),
          ...(body.address.city !== undefined && { city: body.address.city.trim() }),
          ...(body.address.state !== undefined && { state: body.address.state.trim() }),
          ...(body.address.cep !== undefined && { cep: body.address.cep.trim() }),
        },
      });
    }

    // 3. Update Order items if provided
    if (Array.isArray(body.items)) {
      // Delete existing order items
      await db.orderItem.deleteMany({ where: { orderId: id } });

      // Find fallback product
      const fallbackProd = await db.product.findFirst({ where: { active: true } });

      for (const item of body.items) {
        if (!item.productName) continue;
        let prodId = item.productId;
        if (prodId) {
          const pExists = await db.product.findUnique({ where: { id: prodId } });
          if (!pExists) prodId = fallbackProd?.id || null;
        } else {
          prodId = fallbackProd?.id || null;
        }

        if (prodId) {
          await db.orderItem.create({
            data: {
              orderId: id,
              productId: prodId,
              flavorId: item.flavorId || null,
              quantity: Math.max(1, Number(item.quantity) || 1),
              priceAtPurchase: Number(item.price) || 0,
            },
          });
        }
      }
    }

    // 4. Update Main Order details
    const updatedOrder = await db.order.update({
      where: { id },
      data: {
        ...(body.paymentMethod && { paymentMethod: body.paymentMethod }),
        ...(body.deliveryFee !== undefined && { deliveryFee: Number(body.deliveryFee) || 0 }),
        ...(body.subtotal !== undefined && { subtotal: Number(body.subtotal) || 0 }),
        ...(body.total !== undefined && { total: Number(body.total) || 0 }),
        ...(body.notes !== undefined && { notes: body.notes ? body.notes.trim() : null }),
        ...(body.status && {
          status: body.status,
          history: {
            create: {
              status: body.status,
              notes: body.statusNotes || `Pedido atualizado pelo administrador`,
              changedBy: 'Admin',
            },
          },
        }),
      },
      include: {
        client: true,
        address: true,
        items: { include: { product: true, flavor: true } },
        history: true,
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    console.error('PATCH /api/admin/orders/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao atualizar pedido: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Delete items and history first
    await db.orderItem.deleteMany({ where: { orderId: id } });
    await db.orderHistory.deleteMany({ where: { orderId: id } });

    // Delete order
    await db.order.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE /api/admin/orders/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao excluir pedido: ' + error.message }, { status: 500 });
  }
}
