'use server';

import { db } from '@/lib/db';
import { mockCategories } from '@/lib/mockData';
import { CategoryData } from '@/types';

export async function getCategories(): Promise<CategoryData[]> {
  try {
    const categories = await db.category.findMany({
      where: { active: true },
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { displayOrder: 'asc' },
    });

    if (categories && categories.length > 0) {
      return categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        icon: c.icon,
        imageUrl: c.imageUrl,
        color: c.color,
        displayOrder: c.displayOrder,
        active: c.active,
        productCount: c._count.products,
      }));
    }
  } catch (err) {
    console.warn('Database query failed for categories, using mock categories fallback');
  }

  return mockCategories;
}
