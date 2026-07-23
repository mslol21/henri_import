import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// PATCH /api/admin/clients/[id] — update client
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, phone, email } = body;

    const client = await db.client.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        email: email !== undefined ? (email || null) : undefined,
      },
    });

    return NextResponse.json(client);
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Telefone já cadastrado' }, { status: 409 });
    }
    console.error('PATCH /api/admin/clients/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao atualizar cliente' }, { status: 500 });
  }
}

// DELETE /api/admin/clients/[id] — delete client
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.client.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/admin/clients/[id] error:', error);
    return NextResponse.json({ error: 'Erro ao excluir cliente' }, { status: 500 });
  }
}
