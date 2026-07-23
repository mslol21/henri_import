import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@loja.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
    const adminToken = process.env.ADMIN_TOKEN || 'fallback_secret_token_123';

    if (email === adminEmail && password === adminPassword) {
      // Create response
      const response = NextResponse.json({ success: true });

      // Set HttpOnly cookie
      response.cookies.set({
        name: 'admin_token',
        value: adminToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'E-mail ou senha incorretos.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erro interno ao autenticar.' },
      { status: 500 }
    );
  }
}
