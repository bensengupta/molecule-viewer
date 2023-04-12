import { PrismaClient } from '@prisma/client/edge';
import * as trpc from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function createContext(opts: FetchCreateContextFnOptions) {
  return { prisma };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
