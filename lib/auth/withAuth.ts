import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './jwt';
import { getAuthCookie } from './cookie';
import { PUBLIC_ROUTES, API_PUBLIC_PREFIX } from '@/constants/auth';

export function withAuth(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Izinkan API auth & file statik
  if (pathname.startsWith(API_PUBLIC_PREFIX) || pathname.startsWith('/_next'))
    return NextResponse.next();

  const token = getAuthCookie(req);
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  // Jika punya token & akses halaman publik → redirect ke dashboard
  if (token && verifyToken(token) && isPublic)
    return NextResponse.redirect(new URL('/dashboard', req.url));

  // Jika tidak punya token & akses halaman privat → redirect login
  if (!token || !verifyToken(token))
    return NextResponse.redirect(new URL('/login', req.url));

  return NextResponse.next();
}