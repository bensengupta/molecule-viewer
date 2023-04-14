import * as trpc from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { prisma } from './db';

export async function createContext(opts: FetchCreateContextFnOptions) {
  return { prisma };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
