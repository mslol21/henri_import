import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Orders today
    const ordersToday = await db.order.count({
      where: { createdAt: { gte: startOfDay } },
    });

    // Revenue this month (only completed/delivered/paid orders)
    const monthOrders = await db.order.findMany({
      where: {
        createdAt: { gte: startOfMonth },
        status: { in: ['CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED'] },
      },
      select: { total: true },
    });
    const revenueMonth = monthOrders.reduce((acc, o) => acc + o.total, 0);

    // Avg ticket
    const totalOrders = await db.order.count({
      where: { status: { in: ['CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED'] } },
    });
    const allRevenue = await db.order.aggregate({
      where: { status: { in: ['CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED'] } },
      _sum: { total: true },
    });
    const avgTicket = totalOrders > 0 ? (allRevenue._sum.total ?? 0) / totalOrders : 0;

    // Recurring clients (2+ orders)
    const clientCounts = await db.order.groupBy({
      by: ['clientId'],
      _count: { clientId: true },
      having: { clientId: { _count: { gte: 2 } } },
    });
    const recurringClients = clientCounts.length;

    // Monthly chart data (last 7 months)
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

    // Top 5 products
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

    // Top 5 flavors
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
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      {
        ordersToday: 0,
        revenueMonth: 0,
        avgTicket: 0,
        recurringClients: 0,
        chartData: [],
        topProducts: [],
        topFlavors: [],
      },
      { status: 200 }
    );
  }
}
