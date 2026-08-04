'use server';

import { db } from '@/lib/db';
import { ProductData } from '@/types';

export interface ActivePromoData {
  rules: Array<{
    id: string;
    title: string;
    description: string | null;
    discountType: string;
    discountValue: number;
    freeShipping: boolean;
    badgeText: string | null;
  }>;
  coupons: Array<{
    id: string;
    code: string;
    discountType: string;
    discountValue: number;
    minOrderValue: number | null;
    freeShipping: boolean;
  }>;
  banners: Array<{
    id: string;
    title: string;
    description: string | null;
    imageUrl: string;
    link: string | null;
  }>;
}

export async function getActivePromotions(): Promise<ActivePromoData> {
  try {
    const [rules, coupons, banners] = await Promise.all([
      db.promotionRule.findMany({
        where: { active: true },
        orderBy: { createdAt: 'desc' },
      }),
      db.coupon.findMany({
        where: { active: true },
        select: {
          id: true,
          code: true,
          discountType: true,
          discountValue: true,
          minOrderValue: true,
          freeShipping: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      db.banner.findMany({
        where: { active: true },
        orderBy: { displayOrder: 'asc' },
      }),
    ]);

    return { rules, coupons, banners };
  } catch (err) {
    console.error('Error fetching active promotions:', err);
    return { rules: [], coupons: [], banners: [] };
  }
}

export async function getPromoProducts(): Promise<ProductData[]> {
  try {
    const products = await db.product.findMany({
      where: {
        active: true,
        basePromoPrice: { not: null },
      },
      include: {
        category: true,
        flavors: {
          where: { active: true },
          orderBy: { displayOrder: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return products
      .filter((p) => p.basePromoPrice && p.basePromoPrice < p.basePrice)
      .map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        brand: p.brand,
        categoryId: p.categoryId,
        category: p.category
          ? {
              id: p.category.id,
              name: p.category.name,
              slug: p.category.slug,
              icon: p.category.icon,
              imageUrl: p.category.imageUrl,
              color: p.category.color,
              displayOrder: p.category.displayOrder,
              active: p.category.active,
            }
          : undefined,
        description: p.description,
        basePrice: p.basePrice,
        basePromoPrice: p.basePromoPrice,
        wholesalePrice: p.wholesalePrice,
        minWholesaleQty: p.minWholesaleQty,
        hasFlavors: p.hasFlavors,
        baseStock: p.baseStock,
        baseSku: p.baseSku,
        internalCode: p.internalCode,
        mainImageUrl: p.mainImageUrl,
        gallery: (p.gallery as string[]) || [],
        weight: p.weight,
        active: p.active,
        flavors: p.flavors.map((f) => ({
          id: f.id,
          productId: f.productId,
          name: f.name,
          imageUrl: f.imageUrl,
          price: f.price,
          wholesalePrice: f.wholesalePrice,
          stock: f.stock,
          sku: f.sku,
          description: f.description,
          displayOrder: f.displayOrder,
          active: f.active,
        })),
      }));
  } catch (err) {
    console.error('Error fetching promo products:', err);
    return [];
  }
}
