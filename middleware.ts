import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuth = Boolean(request.cookies.get('user-token'));
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard') && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
