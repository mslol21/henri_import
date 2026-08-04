import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const banner = await db.banner.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
        ...(body.link !== undefined && { link: body.link }),
        ...(body.active !== undefined && { active: Boolean(body.active) }),
        ...(body.displayOrder !== undefined && { displayOrder: Number(body.displayOrder) }),
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    console.error('PATCH /api/admin/banners/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao atualizar banner' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.banner.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/admin/banners/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao excluir banner' }, { status: 500 });
  }
}
