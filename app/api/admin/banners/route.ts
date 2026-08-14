import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const banners = await db.banner.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json(banners);
  } catch (error) {
    console.error('GET /api/admin/banners error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, imageUrl, link, active, displayOrder } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ error: 'Título e Imagem são obrigatórios' }, { status: 400 });
    }

    const banner = await db.banner.create({
      data: {
        title,
        description: description || null,
        imageUrl,
        link: link || null,
        active: active !== undefined ? Boolean(active) : true,
        displayOrder: Number(displayOrder) || 0,
      },
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/admin/banners error:', error);
    return NextResponse.json({ error: 'Erro ao criar banner' }, { status: 500 });
  }
}
