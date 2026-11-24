import { NextRequest, NextResponse } from 'next/server';
import { db, ensureNeonReady, isDatabaseConfigured } from '@/lib/db';
import { mockProducts } from '@/lib/mockData';
import { parseNumber, getCleanImageUrl } from '@/lib/utils';

export async function GET() {
  const getFallbackAdminProducts = () =>
    mockProducts.map((p) => ({
      ...p,
      mainImageUrl: getCleanImageUrl(p.mainImageUrl),
      category: { name: p.category?.name || 'Geral' },
      flavors: (p.flavors || []).map((f) => ({
        ...f,
        imageUrl: f.imageUrl ? getCleanImageUrl(f.imageUrl) : null,
      })),
    }));

  if (!isDatabaseConfigured) {
    return NextResponse.json(getFallbackAdminProducts());
  }
  try {
    await ensureNeonReady();
    const products = await db.product.findMany({
      include: {
        category: { select: { name: true } },
        flavors: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (products.length === 0) {
      return NextResponse.json(getFallbackAdminProducts());
    }

    const cleaned = products.map((p) => ({
      ...p,
      mainImageUrl: getCleanImageUrl(p.mainImageUrl),
      flavors: p.flavors.map((f) => ({
        ...f,
        imageUrl: f.imageUrl ? getCleanImageUrl(f.imageUrl) : null,
      })),
    }));

    return NextResponse.json(cleaned);
  } catch (error) {
    console.error('GET /api/admin/products error, using backup products:', error);
    return NextResponse.json(getFallbackAdminProducts());
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, slug, brand, categoryId, description, basePrice,
      basePromoPrice, wholesalePrice, minWholesaleQty, hasFlavors, baseStock, baseSku, internalCode,
      mainImageUrl, gallery, weight, active
    } = body;

    if (!name || !slug || !categoryId || basePrice === undefined || !baseSku || !mainImageUrl) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    const parsedPrice = parseNumber(basePrice);
    if (parsedPrice === null) {
      return NextResponse.json({ error: 'Preço base inválido' }, { status: 400 });
    }

    const product = await db.product.create({
      data: {
        name,
        slug,
        brand: brand || '',
        categoryId,
        description: description || '',
        basePrice: parsedPrice,
        basePromoPrice: parseNumber(basePromoPrice),
        wholesalePrice: parseNumber(wholesalePrice),
        minWholesaleQty: parseNumber(minWholesaleQty),
        hasFlavors: Boolean(hasFlavors),
        baseStock: parseNumber(baseStock) ?? 0,
        baseSku,
        internalCode: internalCode || null,
        mainImageUrl,
        gallery: gallery || [],
        weight: parseNumber(weight) ?? 0,
        active: active !== undefined ? Boolean(active) : true,
        flavors: {
          create: Array.isArray(body.flavors)
            ? body.flavors.map((f: any, idx: number) => ({
                name: f.name,
                imageUrl: f.imageUrl || null,
                price: parseNumber(f.price),
                wholesalePrice: parseNumber(f.wholesalePrice),
                stock: parseNumber(f.stock) ?? 0,
                sku: f.sku || `${slug}-sabor-${idx + 1}-${Math.floor(Math.random() * 1000)}`,
                description: f.description || null,
                displayOrder: f.displayOrder ?? idx,
                active: f.active !== undefined ? Boolean(f.active) : true,
              }))
            : [],
        },
      },
      include: {
        category: { select: { name: true } },
        flavors: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Slug ou SKU já está em uso' }, { status: 409 });
    }
    console.error('POST /api/admin/products error:', error);
    return NextResponse.json({ error: 'Erro ao criar produto: ' + (error.message || '') }, { status: 500 });
  }
}
