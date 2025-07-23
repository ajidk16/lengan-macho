import { PrismaClient } from '@prisma/client'

// Gunakan connection pooling jika di serverless (Neon, Vercel, dsb)
const isServerless = typeof window === 'undefined'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL, // Pastikan ini connection string Neon
      },
    },
    // Neon: gunakan connection pooling (pgbouncer)
    ...(isServerless && {
      log: ['error'],
    }),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Catatan:
// 1. Set DATABASE_URL di .env ke connection string Neon (dengan pooling aktif)
// 2. Untuk Next.js API/serverless, PrismaClient tetap aman dengan pattern ini
// 3. Untuk edge runtime, gunakan driver native (bukan Prisma)