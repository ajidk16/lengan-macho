import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth/jwt';
import { getAuthCookie } from '@/lib/auth/cookie';

export async function GET(req: NextRequest) {
  const token = getAuthCookie(req);
  
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || payload.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            workoutSessions: true,
            bodyLogs: true,
          },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const token = getAuthCookie(req);
  
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || payload.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}