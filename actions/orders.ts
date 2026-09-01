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
): Promise<{ success: boolean; orderId?: string; orderNumber?: number; deliveryFee?: number; total?: number; error?: string }> {
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

    // 2. Recalculate delivery fee server-side if 0 and CEP is provided
    let finalSubtotal = Number(subtotal) || 0;
    let finalDeliveryFee = Number(deliveryFee) || 0;
    let finalDistanceKm = distanceKm && !isNaN(distanceKm) ? Number(distanceKm) : null;

    if (finalDeliveryFee === 0 && data.cep) {
      try {
        const storeConfig = await db.storeConfig.findUnique({ where: { id: 'default' } });
        if (storeConfig) {
          const { getCoordsForAddress, calculateDeliveryFee } = await import('@/services/distance');
          const coords = await getCoordsForAddress({
            cep: data.cep.trim(),
            street: data.street.trim(),
            neighborhood: data.neighborhood.trim(),
            city: data.city.trim(),
            state: data.state.trim(),
            storeLat: storeConfig.latitude,
            storeLon: storeConfig.longitude,
            storeCep: storeConfig.cep,
          });

          const feeResult = await calculateDeliveryFee({
            storeLat: storeConfig.latitude,
            storeLon: storeConfig.longitude,
            clientLat: coords.lat,
            clientLon: coords.lon,
            mode: storeConfig.deliveryMode as any,
            kmRate: storeConfig.deliveryKmRate,
            ranges: (storeConfig.deliveryRanges as any) || [],
          });

          if (feeResult && feeResult.deliveryFee > 0) {
            finalDeliveryFee = feeResult.deliveryFee;
            finalDistanceKm = feeResult.distanceKm;
          }
        }
      } catch (calcErr) {
        console.warn('Server-side delivery fee calculation fallback error:', calcErr);
      }
    }

    const finalTotal = finalSubtotal + finalDeliveryFee;

    // 3. Create address record
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
        distanceKm: finalDistanceKm,
      },
    });

    // 4. Verify cart items exist in DB to prevent Foreign Key errors
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

    // 5. Create Order in Database
    const order = await db.order.create({
      data: {
        clientId: client.id,
        addressId: address.id,
        subtotal: finalSubtotal,
        deliveryFee: finalDeliveryFee,
        total: finalTotal,
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

    // 6. Safely decrement stock (non-blocking if stock fail)
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
      deliveryFee: order.deliveryFee,
      total: order.total,
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
        client: {
          include: {
            addresses: {
              orderBy: { createdAt: 'desc' },
              take: 1,
            },
          },
        },
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

    return orders.map((o) => {
      const clientFallbackAddr = (o.client as any)?.addresses?.[0] || null;
      const activeAddr = o.address || clientFallbackAddr;

      return {
        id: o.id,
        number: o.number,
        client: {
          id: o.client.id,
          name: o.client.name,
          phone: o.client.phone,
          email: o.client.email,
        },
        address: activeAddr
          ? {
              cep: activeAddr.cep || '',
              street: activeAddr.street || '',
              number: activeAddr.number || '',
              complement: activeAddr.complement || null,
              neighborhood: activeAddr.neighborhood || '',
              city: activeAddr.city || '',
              state: activeAddr.state || '',
              distanceKm: activeAddr.distanceKm || null,
            }
          : {
              cep: '',
              street: 'Endereço não informado',
              number: 'S/N',
              complement: null,
              neighborhood: '',
              city: '',
              state: '',
              distanceKm: null,
            },
      items: o.items.map((i) => ({
        id: i.id,
        productId: i.productId,
        flavorId: i.flavorId,
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
      })),
      };
    });
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

export async function deleteOrder(orderId: string) {
  try {
    await db.order.delete({ where: { id: orderId } });
    return { success: true };
  } catch (err: any) {
    console.error('Error deleting order (attempt 1):', err);
    try {
      // Retry once after 200ms delay in case of connection pool glitch
      await new Promise((res) => setTimeout(res, 200));
      await db.order.delete({ where: { id: orderId } });
      return { success: true };
    } catch (retryErr: any) {
      console.error('Error deleting order (retry):', retryErr);
      return { success: false, error: retryErr.message || 'Erro de conexão no banco de dados' };
    }
  }
}
