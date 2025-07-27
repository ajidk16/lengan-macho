import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth/jwt';
import { setAuthCookie } from '@/lib/auth/cookie';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();
  
  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      role: 'USER', // Default role
    },
  });

  // Create JWT token
  const token = await signToken({ 
    userId: user.id, 
    role: user.role,
    email: user.email,
    name: user.name 
  });

  const response = NextResponse.json({ 
    user: { 
      id: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role
    } 
  });

  // Set auth cookie
  setAuthCookie(response, token);

  return response;
}