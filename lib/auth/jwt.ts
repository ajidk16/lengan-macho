import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!;

export const signToken = (payload: object) =>
  jwt.sign(payload, secret, { expiresIn: `${process.env.JWT_EXPIRES_IN}s` });

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret) as { userId: string; role: string };
  } catch {
    return null;
  }
};