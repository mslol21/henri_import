import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // We want to protect all /admin and /api/admin routes
  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminApiRoute = pathname.startsWith('/api/admin');

  // Except for the login pages/apis themselves
  const isLoginPage = pathname === '/admin/login';
  const isLoginApi = pathname === '/api/admin/login';

  if ((isAdminRoute && !isLoginPage) || (isAdminApiRoute && !isLoginApi)) {
    const adminToken = request.cookies.get('admin_token')?.value;
    const expectedToken = process.env.ADMIN_TOKEN || 'fallback_secret_token_123';

    if (!adminToken || adminToken !== expectedToken) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
      } else {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
