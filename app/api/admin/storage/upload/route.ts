import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToNeon } from '@/lib/neon-storage';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const expectedToken = process.env.ADMIN_TOKEN;
  const actualToken = request.cookies.get('admin_token')?.value;
  if (!expectedToken || !actualToken || actualToken !== expectedToken) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const body = await request.formData();
    const file = body.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Selecione uma imagem.' }, { status: 400 });
    }

    const url = await uploadImageToNeon(file);
    return NextResponse.json({ url }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Falha no envio.';
    const badInput = message.includes('Arquivo inválido');
    return NextResponse.json(
      { error: badInput ? message : 'Não foi possível armazenar a imagem.' },
      { status: badInput ? 400 : 503 },
    );
  }
}
