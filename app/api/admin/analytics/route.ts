import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth/jwt';
import { getAuthCookie } from '@/lib/auth/cookie';

export async function GET(req: NextRequest) {
  const token = getAuthCookie(req);
  
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload || payload.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    const analytics = await Promise.all([
      prisma.user.count(),
      prisma.workoutSession.count(),
      prisma.exercise.count(),
      prisma.badge.count(),
      prisma.workoutSession.findMany({
        take: 10,
        orderBy: { startTime: 'desc' },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),
      prisma.exercise.findMany({
        include: {
          _count: {
            select: { setLogs: true },
          },
        },
        orderBy: {
          setLogs: { _count: 'desc' },
        },
        take: 5,
      }),
    ]);

    const [
      totalUsers,
      totalWorkouts,
      totalExercises,
      totalBadges,
      recentActivity,
      popularExercises,
    ] = analytics;

    return NextResponse.json({
      metrics: {
        totalUsers,
        totalWorkouts,
        totalExercises,
        totalBadges,
      },
      recentActivity,
      popularExercises,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}