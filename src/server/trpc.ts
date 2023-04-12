import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import type { Context } from './context';
import { FieldError } from './errors';

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    if (error.code === 'BAD_REQUEST' && error.cause instanceof ZodError) {
      const { fieldErrors, formErrors } = error.cause.flatten();
      return {
        ...shape,
        data: {
          ...shape.data,
          type: 'validation' as const,
          fieldErrors,
          formErrors,
        },
      };
    }

    if (error.cause instanceof FieldError) {
      return {
        ...shape,
        data: {
          ...shape.data,
          type: 'validation' as const,
          fieldErrors: (error.cause as FieldError).errors,
        },
      };
    }

    return { ...shape, data: { ...shape.data, type: 'other' as const } };
  },
});

export const router = t.router;
export const procedure = t.procedure;
