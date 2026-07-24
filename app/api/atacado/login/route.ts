import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const config = await db.storeConfig.findUnique({
      where: { id: 'default' },
      select: { wholesalePassword: true }
    });

    if (!config || !config.wholesalePassword) {
      return NextResponse.json(
        { error: 'Acesso ao atacado não está configurado nesta loja.' },
        { status: 403 }
      );
    }

    if (password === config.wholesalePassword) {
      const response = NextResponse.json({ success: true });

      response.cookies.set({
        name: 'wholesale_auth',
        value: 'true',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Senha incorreta.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Wholesale login error:', error);
    return NextResponse.json(
      { error: 'Erro interno ao autenticar.' },
      { status: 500 }
    );
  }
}
