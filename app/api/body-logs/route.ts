import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 });
  }
  const logs = await prisma.bodyLog.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
  });
  return NextResponse.json(logs);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const created = await prisma.bodyLog.create({ data });
  return NextResponse.json(created, { status: 201 });
}