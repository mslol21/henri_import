import { NextResponse } from 'next/server';
import { db, ensureNeonReady, isDatabaseConfigured } from '@/lib/db';
import { mockOrders } from '@/lib/mockData';

function computeFallbackDashboard() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const validStatuses = new Set(['CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED', 'NEW']);

  const ordersToday = mockOrders.filter((o) => new Date(o.createdAt) >= startOfDay).length;
  const paidOrders = mockOrders.filter((o) => validStatuses.has(o.status));
  const monthOrders = paidOrders.filter((o) => new Date(o.createdAt) >= startOfMonth);
  const revenueMonth = monthOrders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
  const totalRevenue = paidOrders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
  const avgTicket = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

  const clientOrderCounts: Record<string, number> = {};
  for (const o of mockOrders) {
    clientOrderCounts[o.clientId] = (clientOrderCounts[o.clientId] || 0) + 1;
  }
  const recurringClients = Object.values(clientOrderCounts).filter((c) => c >= 2).length;

  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const chartData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
    const vendas = paidOrders
      .filter((o) => {
        const dt = new Date(o.createdAt);
        return dt >= start && dt <= end;
      })
      .reduce((acc, o) => acc + (Number(o.total) || 0), 0);
    chartData.push({ month: monthNames[d.getMonth()], vendas });
  }

  const prodStats: Record<string, { name: string; total: number; revenue: number }> = {};
  const flavStats: Record<string, { flavor: string; total: number }> = {};

  for (const o of mockOrders) {
    for (const it of o.items || []) {
      const pKey = it.productId;
      if (!prodStats[pKey]) {
        prodStats[pKey] = { name: it.productName || 'Produto', total: 0, revenue: 0 };
      }
      prodStats[pKey].total += Number(it.quantity) || 0;
      prodStats[pKey].revenue += (Number(it.quantity) || 0) * (Number(it.priceAtPurchase) || 0);

      if (it.flavorId && it.flavorName) {
        const fKey = it.flavorId;
        if (!flavStats[fKey]) {
          flavStats[fKey] = { flavor: `${it.flavorName} (${it.productName || ''})`, total: 0 };
        }
        flavStats[fKey].total += Number(it.quantity) || 0;
      }
    }
  }

  const topProducts = Object.values(prodStats)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
  const topFlavors = Object.values(flavStats)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return {
    ordersToday,
    revenueMonth,
    avgTicket,
    recurringClients,
    chartData,
    topProducts,
    topFlavors,
  };
}

export async function GET() {
  if (!isDatabaseConfigured) {
    return NextResponse.json(computeFallbackDashboard());
  }
  try {
    await ensureNeonReady();
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalOrdersCheck = await db.order.count();
    if (totalOrdersCheck === 0) {
      return NextResponse.json(computeFallbackDashboard());
    }

    const ordersToday = await db.order.count({
      where: { createdAt: { gte: startOfDay } },
    });

    const monthOrders = await db.order.findMany({
      where: {
        createdAt: { gte: startOfMonth },
        status: { in: ['CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED'] },
      },
      select: { total: true },
    });
    const revenueMonth = monthOrders.reduce((acc, o) => acc + o.total, 0);

    const totalOrders = await db.order.count({
      where: { status: { in: ['CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED'] } },
    });
    const allRevenue = await db.order.aggregate({
      where: { status: { in: ['CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED'] } },
      _sum: { total: true },
    });
    const avgTicket = totalOrders > 0 ? (allRevenue._sum.total ?? 0) / totalOrders : 0;

    const clientCounts = await db.order.groupBy({
      by: ['clientId'],
      _count: { clientId: true },
      having: { clientId: { _count: { gte: 2 } } },
    });
    const recurringClients = clientCounts.length;

    const chartData = [];
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
      const agg = await db.order.aggregate({
        where: {
          createdAt: { gte: start, lte: end },
          status: { in: ['CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED'] },
        },
        _sum: { total: true },
      });
      chartData.push({ month: monthNames[d.getMonth()], vendas: agg._sum.total ?? 0 });
    }

    const topProductsRaw = await db.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, priceAtPurchase: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });
    const topProducts = await Promise.all(
      topProductsRaw.map(async (item) => {
        const product = await db.product.findUnique({
          where: { id: item.productId },
          select: { name: true },
        });
        const qty = item._sum.quantity ?? 0;
        const unitPrice = item._sum.priceAtPurchase ?? 0;
        return {
          name: product?.name ?? 'Produto removido',
          total: qty,
          revenue: unitPrice * qty,
        };
      })
    );

    const topFlavorsRaw = await db.orderItem.groupBy({
      by: ['flavorId'],
      where: { flavorId: { not: null } },
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });
    const topFlavors = await Promise.all(
      topFlavorsRaw.map(async (item) => {
        const flavor = item.flavorId
          ? await db.flavor.findUnique({
              where: { id: item.flavorId },
              select: { name: true, product: { select: { name: true } } },
            })
          : null;
        return {
          flavor: flavor
            ? `${flavor.name} (${flavor.product?.name ?? ''})`
            : 'Sabor removido',
          total: item._sum.quantity ?? 0,
        };
      })
    );

    return NextResponse.json({
      ordersToday,
      revenueMonth,
      avgTicket,
      recurringClients,
      chartData,
      topProducts,
      topFlavors,
    });
  } catch (error) {
    console.error('Dashboard API error, using backup stats:', error);
    return NextResponse.json(computeFallbackDashboard(), { status: 200 });
  }
}
