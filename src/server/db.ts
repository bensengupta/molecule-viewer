import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = global as Record<string, unknown>;

function createPrisma() {
  return new PrismaClient().$extends(withAccelerate())
}

export type PrismaClientType = ReturnType<typeof createPrisma>;

export const prisma = globalForPrisma.prisma as PrismaClientType | undefined ?? createPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
