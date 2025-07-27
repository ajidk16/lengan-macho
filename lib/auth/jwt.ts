import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const expiresIn = Number(process.env.JWT_EXPIRES_IN) || 60 * 60 * 24 * 7; // default 7 days

export async function signToken(payload: object) {
  return await new SignJWT(payload as Record<string, any>)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(`${expiresIn}s`)
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; role: string };
  } catch {
    return null;
  }
}