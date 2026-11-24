'use server';

import { db, ensureNeonReady, isDatabaseConfigured } from '@/lib/db';
import { mockProducts } from '@/lib/mockData';
import { ProductData, FlavorData } from '@/types';
import { slugify, getCleanImageUrl } from '@/lib/utils';

function filterMockProducts(params?: {
  categorySlug?: string;
  search?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  promoOnly?: boolean;
  inStockOnly?: boolean;
}): ProductData[] {
  let list = mockProducts.filter((p) => p.active);
  if (params?.categorySlug) {
    list = list.filter((p) => p.category?.slug === params.categorySlug);
  }
  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.flavors && p.flavors.some((f) => f.name.toLowerCase().includes(q)))
    );
  }
  if (params?.brand) {
    const b = params.brand.toLowerCase();
    list = list.filter((p) => p.brand.toLowerCase() === b);
  }
  if (params?.promoOnly) {
    list = list.filter((p) => p.basePromoPrice !== null && p.basePromoPrice !== undefined);
  }
  return list;
}

export async function getProducts(params?: {
  categorySlug?: string;
  search?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  promoOnly?: boolean;
  inStockOnly?: boolean;
}): Promise<ProductData[]> {
  if (!isDatabaseConfigured) {
    return filterMockProducts(params);
  }
  try {
    await ensureNeonReady();
    let whereClause: any = { active: true };

    if (params?.categorySlug) {
      whereClause.category = { slug: params.categorySlug };
    }

    if (params?.search) {
      const search = params.search.toLowerCase();
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { flavors: { some: { name: { contains: search, mode: 'insensitive' } } } },
      ];
    }

    if (params?.brand) {
      whereClause.brand = { equals: params.brand, mode: 'insensitive' };
    }

    if (params?.promoOnly) {
      whereClause.basePromoPrice = { not: null };
    }

    const dbProducts = await db.product.findMany({
      where: whereClause,
      include: {
        category: true,
        flavors: {
          where: { active: true },
          orderBy: { displayOrder: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (dbProducts.length === 0 && !params?.search && !params?.categorySlug && !params?.brand && !params?.promoOnly) {
      return filterMockProducts(params);
    }

    return dbProducts.map((p) => ({
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
            icon: p.category.icon || 'Zap',
            imageUrl: p.category.imageUrl,
            color: p.category.color || '#0284c7',
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
      mainImageUrl: getCleanImageUrl(p.mainImageUrl),
      gallery: Array.isArray(p.gallery) ? (p.gallery as string[]).map((u) => getCleanImageUrl(u)) : [],
      weight: p.weight,
      active: p.active,
      flavors: p.flavors.map((f) => ({
        id: f.id,
        productId: f.productId,
        name: f.name,
        imageUrl: f.imageUrl ? getCleanImageUrl(f.imageUrl) : null,
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
    console.error('Database query failed for products, using backup catalog:', err);
    return filterMockProducts(params);
  }
}

export async function getProductBySlug(slug: string): Promise<ProductData | null> {
  if (!isDatabaseConfigured) {
    return mockProducts.find((p) => p.slug === slug) || null;
  }
  try {
    await ensureNeonReady();
    const dbProduct = await db.product.findUnique({
      where: { slug },
      include: {
        category: true,
        flavors: {
          where: { active: true },
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    if (dbProduct) {
      return {
        id: dbProduct.id,
        name: dbProduct.name,
        slug: dbProduct.slug,
        brand: dbProduct.brand,
        categoryId: dbProduct.categoryId,
        category: dbProduct.category
          ? {
              id: dbProduct.category.id,
              name: dbProduct.category.name,
              slug: dbProduct.category.slug,
              icon: dbProduct.category.icon || 'Zap',
              imageUrl: dbProduct.category.imageUrl,
              color: dbProduct.category.color || '#0284c7',
              displayOrder: dbProduct.category.displayOrder,
              active: dbProduct.category.active,
            }
          : undefined,
        description: dbProduct.description,
        basePrice: dbProduct.basePrice,
        basePromoPrice: dbProduct.basePromoPrice,
        wholesalePrice: dbProduct.wholesalePrice,
        minWholesaleQty: dbProduct.minWholesaleQty,
        hasFlavors: dbProduct.hasFlavors,
        baseStock: dbProduct.baseStock,
        baseSku: dbProduct.baseSku,
        internalCode: dbProduct.internalCode,
        mainImageUrl: getCleanImageUrl(dbProduct.mainImageUrl),
        gallery: Array.isArray(dbProduct.gallery) ? (dbProduct.gallery as string[]).map((u) => getCleanImageUrl(u)) : [],
        weight: dbProduct.weight,
        active: dbProduct.active,
        flavors: dbProduct.flavors.map((f) => ({
          id: f.id,
          productId: f.productId,
          name: f.name,
          imageUrl: f.imageUrl ? getCleanImageUrl(f.imageUrl) : null,
          price: f.price,
          wholesalePrice: f.wholesalePrice,
          stock: f.stock,
          sku: f.sku,
          description: f.description,
          displayOrder: f.displayOrder,
          active: f.active,
        })),
      };
    }
    return mockProducts.find((p) => p.slug === slug) || null;
  } catch (err) {
    console.error('Database query failed for slug, using backup catalog:', err);
    return mockProducts.find((p) => p.slug === slug) || null;
  }
}

export async function duplicateProduct(productId: string) {
  try {
    const original = await db.product.findUnique({
      where: { id: productId },
      include: { flavors: true },
    });

    if (!original) {
      throw new Error('Produto não encontrado');
    }

    const newSlug = `${original.slug}-copia-${Date.now()}`;
    const newSku = `${original.baseSku}-COPY-${Math.floor(Math.random() * 1000)}`;

    const duplicated = await db.product.create({
      data: {
        name: `${original.name} (Cópia)`,
        slug: newSlug,
        brand: original.brand,
        categoryId: original.categoryId,
        description: original.description,
        basePrice: original.basePrice,
        basePromoPrice: original.basePromoPrice,
        wholesalePrice: original.wholesalePrice,
        minWholesaleQty: original.minWholesaleQty,
        hasFlavors: original.hasFlavors,
        baseStock: original.baseStock,
        baseSku: newSku,
        internalCode: original.internalCode ? `${original.internalCode}-C` : null,
        mainImageUrl: original.mainImageUrl,
        gallery: original.gallery || [],
        weight: original.weight,
        active: false, // Created as draft
        flavors: {
          create: original.flavors.map((f) => ({
            name: `${f.name} (Cópia)`,
            imageUrl: f.imageUrl,
            price: f.price,
            wholesalePrice: f.wholesalePrice,
            stock: f.stock,
            sku: `${f.sku}-COPY-${Math.floor(Math.random() * 1000)}`,
            description: f.description,
            displayOrder: f.displayOrder,
            active: f.active,
          })),
        },
      },
    });

    return { success: true, product: duplicated };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function duplicateFlavor(flavorId: string) {
  try {
    const original = await db.flavor.findUnique({
      where: { id: flavorId },
    });

    if (!original) throw new Error('Sabor não encontrado');

    const duplicated = await db.flavor.create({
      data: {
        productId: original.productId,
        name: `${original.name} (Cópia)`,
        imageUrl: original.imageUrl,
        price: original.price,
        wholesalePrice: original.wholesalePrice,
        stock: original.stock,
        sku: `${original.sku}-COPY-${Math.floor(Math.random() * 1000)}`,
        description: original.description,
        displayOrder: original.displayOrder + 1,
        active: original.active,
      },
    });

    return { success: true, flavor: duplicated };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
