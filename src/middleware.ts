import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/auth', '/auth/questionario', '/auth/planos', '/auth/cadastro-profissional'];
  
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  // Se é rota pública, permite acesso
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Verificar se tem token de autenticação (simulado por enquanto)
  const token = request.cookies.get('auth-token');

  // Se não tem token e não é rota pública, redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|lasy-bridge.js).*)',
  ],
};
