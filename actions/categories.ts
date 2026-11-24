'use server';

import { db, ensureNeonReady, isDatabaseConfigured } from '@/lib/db';
import { mockCategories } from '@/lib/mockData';
import { CategoryData } from '@/types';
import { getCleanImageUrl } from '@/lib/utils';

export async function getCategories(): Promise<CategoryData[]> {
  if (!isDatabaseConfigured) {
    return mockCategories.filter((c) => c.active);
  }
  try {
    await ensureNeonReady();
    const categories = await db.category.findMany({
      where: { active: true },
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { displayOrder: 'asc' },
    });

    if (categories.length === 0) {
      return mockCategories.filter((c) => c.active);
    }

    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      icon: c.icon || 'Zap',
      imageUrl: c.imageUrl ? getCleanImageUrl(c.imageUrl) : null,
      color: c.color || '#0284c7',
      displayOrder: c.displayOrder,
      active: c.active,
      productCount: c._count.products,
    }));
  } catch (err) {
    console.error('Database query failed for categories, using backup categories:', err);
    return mockCategories.filter((c) => c.active);
  }
}
