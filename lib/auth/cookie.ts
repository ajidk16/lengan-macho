import type { NextRequest, NextResponse } from 'next/server';

export const setAuthCookie = (res: NextResponse, token: string) => {
  res.cookies.set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: Number(process.env.JWT_EXPIRES_IN),
    path: '/',
  });
};

export const clearAuthCookie = (res: NextResponse) => {
  res.cookies.set('authToken', '', { maxAge: 0, path: '/' });
};

export const getAuthCookie = (req: NextRequest) =>
  req.cookies.get('authToken')?.value;