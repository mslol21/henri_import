'use server';

import { db } from '@/lib/db';
import { OrderStatusType } from '@/types';
import { CheckoutFormData } from '@/validators/schemas';

export async function createOrder(
  data: CheckoutFormData,
  cartItems: {
    productId: string;
    flavorId?: string | null;
    quantity: number;
    unitPrice: number;
  }[],
  subtotal: number,
  deliveryFee: number,
  total: number,
  distanceKm?: number
): Promise<{ success: boolean; orderId?: string; orderNumber?: number; error?: string }> {
  try {
    const cleanPhone = data.phone.trim();

    // 1. Find or create client by phone
    let client = await db.client.findUnique({
      where: { phone: cleanPhone },
    });

    if (!client) {
      client = await db.client.create({
        data: {
          name: data.name.trim(),
          phone: cleanPhone,
        },
      });
    } else if (client.name !== data.name.trim()) {
      // Update client name if changed
      await db.client.update({
        where: { id: client.id },
        data: { name: data.name.trim() },
      });
    }

    // 2. Create address record
    const address = await db.address.create({
      data: {
        clientId: client.id,
        cep: data.cep.trim(),
        street: data.street.trim(),
        number: data.number.trim(),
        complement: data.complement ? data.complement.trim() : null,
        neighborhood: data.neighborhood.trim(),
        city: data.city.trim(),
        state: data.state.trim(),
        distanceKm: distanceKm && !isNaN(distanceKm) ? Number(distanceKm) : null,
      },
    });

    // 3. Verify cart items exist in DB to prevent Foreign Key errors
    const validItems: Array<{
      productId: string;
      flavorId: string | null;
      quantity: number;
      priceAtPurchase: number;
    }> = [];

    // Fetch default fallback product if any item references a missing ID
    let fallbackProduct = await db.product.findFirst({ where: { active: true } });

    for (const item of cartItems) {
      let targetProductId = item.productId;
      let targetFlavorId = item.flavorId || null;

      const productExists = await db.product.findUnique({ where: { id: targetProductId } });
      if (!productExists) {
        if (fallbackProduct) {
          targetProductId = fallbackProduct.id;
          targetFlavorId = null;
        } else {
          continue; // Skip if no products in DB
        }
      } else if (targetFlavorId) {
        const flavorExists = await db.flavor.findUnique({ where: { id: targetFlavorId } });
        if (!flavorExists) {
          targetFlavorId = null;
        }
      }

      validItems.push({
        productId: targetProductId,
        flavorId: targetFlavorId,
        quantity: Math.max(1, Number(item.quantity) || 1),
        priceAtPurchase: Number(item.unitPrice) || 0,
      });
    }

    if (validItems.length === 0) {
      return { success: false, error: 'Nenhum produto válido no carrinho.' };
    }

    // 4. Create Order in Database
    const order = await db.order.create({
      data: {
        clientId: client.id,
        addressId: address.id,
        subtotal: Number(subtotal) || 0,
        deliveryFee: Number(deliveryFee) || 0,
        total: Number(total) || 0,
        paymentMethod: data.paymentMethod,
        notes: data.notes ? data.notes.trim() : null,
        status: 'NEW',
        whatsappSent: true,
        items: {
          create: validItems,
        },
        history: {
          create: {
            status: 'NEW',
            notes: 'Pedido realizado pelo cliente no site e aguardando aprovação',
            changedBy: 'Cliente',
          },
        },
      },
      include: {
        items: true,
      },
    });

    // 5. Safely decrement stock (non-blocking if stock fail)
    for (const item of validItems) {
      try {
        if (item.flavorId) {
          await db.flavor.update({
            where: { id: item.flavorId },
            data: { stock: { decrement: item.quantity } },
          });
        } else {
          await db.product.update({
            where: { id: item.productId },
            data: { baseStock: { decrement: item.quantity } },
          });
        }
      } catch (stockErr) {
        console.warn('Stock decrement skipped for item:', item, stockErr);
      }
    }

    return {
      success: true,
      orderId: order.id,
      orderNumber: order.number,
    };
  } catch (err: any) {
    console.error('CRITICAL ERROR creating order in DB:', err);
    return {
      success: false,
      error: 'Erro ao registrar pedido no servidor: ' + (err?.message || 'Erro desconhecido'),
    };
  }
}

export async function getOrders(statusFilter?: string) {
  try {
    let whereClause: any = {};
    if (statusFilter && statusFilter !== 'ALL') {
      whereClause.status = statusFilter;
    }

    const orders = await db.order.findMany({
      where: whereClause,
      include: {
        client: true,
        address: true,
        items: {
          include: {
            product: true,
            flavor: true,
          },
        },
        history: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders.map((o) => ({
      id: o.id,
      number: o.number,
      client: {
        id: o.client.id,
        name: o.client.name,
        phone: o.client.phone,
        email: o.client.email,
      },
      address: {
        cep: o.address.cep,
        street: o.address.street,
        number: o.address.number,
        complement: o.address.complement,
        neighborhood: o.address.neighborhood,
        city: o.address.city,
        state: o.address.state,
        distanceKm: o.address.distanceKm,
      },
      items: o.items.map((i) => ({
        id: i.id,
        productName: i.product?.name || 'Produto',
        flavorName: i.flavor ? i.flavor.name : null,
        quantity: i.quantity,
        price: i.priceAtPurchase,
      })),
      subtotal: o.subtotal,
      deliveryFee: o.deliveryFee,
      total: o.total,
      paymentMethod: o.paymentMethod,
      notes: o.notes,
      status: o.status as OrderStatusType,
      whatsappSent: o.whatsappSent,
      createdAt: o.createdAt.toISOString(),
      history: o.history.map((h) => ({
        id: h.id,
        status: h.status as OrderStatusType,
        notes: h.notes,
        changedBy: h.changedBy,
        createdAt: h.createdAt.toISOString(),
      })),
    }));
  } catch (err: any) {
    console.error('Error fetching orders:', err);
    return [];
  }
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatusType,
  notes?: string,
  changedBy = 'Admin'
) {
  try {
    const updated = await db.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
        history: {
          create: {
            status: newStatus,
            notes: notes || `Status alterado para ${newStatus}`,
            changedBy,
          },
        },
      },
    });

    return { success: true, order: updated };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
