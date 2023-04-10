// @/src/server/context.ts
import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  return { prisma };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
