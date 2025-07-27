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
    const exercises = await prisma.exercise.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            templateRefs: true,
            setLogs: true,
          },
        },
      },
    });

    return NextResponse.json({ exercises });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = getAuthCookie(req);
  
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || payload.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    const { name, category, muscleGroup, equipment, videoUrl } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Exercise name is required' }, { status: 400 });
    }

    const exercise = await prisma.exercise.create({
      data: {
        name,
        category,
        muscleGroup,
        equipment,
        videoUrl,
      },
    });

    return NextResponse.json({ exercise });
  } catch (error) {
    console.error('Error creating exercise:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}