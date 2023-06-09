import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../server/routers/_app';

// Also change in next.config.js
export function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: true,
});

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type MoleculeListOutput = RouterOutput['molecule']['list'];
