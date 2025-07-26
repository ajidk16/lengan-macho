import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth/jwt';
import { setAuthCookie } from '@/lib/auth/cookie';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    console.log('=== LOGIN API CALLED ===');
    
    // Test database connection first
    try {
      await prisma.$connect();
      console.log('Database connection successful');
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
      console.log('Request body parsed:', { email: body?.email, hasPassword: !!body?.password });
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    const { email, password } = body;
    
    // Validate required fields
    if (!email || !password) {
      console.log('Missing fields:', { email: !!email, password: !!password });
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    console.log('Looking for user with email:', email);
    
    // Find user in database
    const user = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase().trim() } 
    });
    
    if (!user) {
      console.log('User not found for email:', email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User found:', { id: user.id, email: user.email, role: user.role });

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      console.log('Invalid password for user:', email);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Password verification successful');

    // Create JWT token
    const tokenPayload = { 
      userId: user.id, 
      role: user.role,
      email: user.email,
      name: user.name 
    };
    
    console.log('Creating token with payload:', tokenPayload);
    const token = signToken(tokenPayload);
    console.log('Token created successfully');

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
    console.log('Auth cookie set, login successful');

    return response;

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}