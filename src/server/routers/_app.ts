import { router } from '../trpc';

import { elementRouter } from './element';
import { moleculeRouter } from './molecule';

export const appRouter = router({
  element: elementRouter,
  molecule: moleculeRouter,
});

export type AppRouter = typeof appRouter;
