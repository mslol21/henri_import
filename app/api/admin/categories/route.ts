import { NextRequest, NextResponse } from 'next/server';
import { db, ensureNeonReady, isDatabaseConfigured } from '@/lib/db';
import { mockCategories } from '@/lib/mockData';
import { getCleanImageUrl } from '@/lib/utils';

export async function GET() {
  const getFallbackAdminCategories = () =>
    mockCategories.map((c) => ({
      ...c,
      imageUrl: c.imageUrl ? getCleanImageUrl(c.imageUrl) : null,
      _count: { products: c.productCount ?? 0 },
    }));

  if (!isDatabaseConfigured) {
    return NextResponse.json(getFallbackAdminCategories());
  }
  try {
    await ensureNeonReady();
    const categories = await db.category.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    if (categories.length === 0) {
      return NextResponse.json(getFallbackAdminCategories());
    }

    return NextResponse.json(
      categories.map((c) => ({
        ...c,
        imageUrl: c.imageUrl ? getCleanImageUrl(c.imageUrl) : null,
      }))
    );
  } catch (error) {
    console.error('GET /api/admin/categories error, using backup categories:', error);
    return NextResponse.json(getFallbackAdminCategories(), { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, icon, imageUrl, color, active, displayOrder } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Nome e slug são obrigatórios' }, { status: 400 });
    }

    const category = await db.category.create({
      data: {
        name,
        slug,
        icon: icon || 'Package',
        imageUrl: imageUrl || null,
        color: color || '#7c3aed',
        active: active !== undefined ? active : true,
        displayOrder: displayOrder || 0,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Slug já está em uso' }, { status: 409 });
    }
    console.error('POST /api/admin/categories error:', error);
    return NextResponse.json({ error: 'Erro ao criar categoria' }, { status: 500 });
  }
}
