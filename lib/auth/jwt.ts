import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!;

export const signToken = (payload: object) =>
  jwt.sign(payload, secret, { expiresIn: Number(process.env.JWT_EXPIRES_IN) });

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret) as { userId: string };
  } catch {
    return null;
  }
};