import { ElementSchema } from '@/schemas/element';
import { Prisma } from '@prisma/client/edge';
import { z } from 'zod';
import {
  CodeAlreadyExistsError,
  CodeNotFoundError,
  ElementInUseError,
} from '../errors';
import { procedure, router } from '../trpc';

export const elementRouter = router({
  create: procedure.input(ElementSchema).mutation(async ({ input, ctx }) => {
    try {
      await ctx.prisma.element.create({ data: input });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new CodeAlreadyExistsError(input.code);
      }
      throw e;
    }
  }),
  update: procedure.input(ElementSchema).mutation(async ({ input, ctx }) => {
    try {
      await ctx.prisma.element.update({
        data: input,
        where: { code: input.code },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new CodeNotFoundError(input.code);
      }
      throw e;
    }
  }),
  delete: procedure.input(z.string()).mutation(async ({ input, ctx }) => {
    try {
      await ctx.prisma.element.delete({
        where: { code: input },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new CodeNotFoundError(input);
        } else if (e.code === 'P2003' || e.code === 'P2014') {
          const res = await ctx.prisma.molecule.findMany({
            select: { name: true },
            take: 3,
            where: { atoms: { some: { elementCode: input } } },
          });
          throw new ElementInUseError(
            input,
            res.map((m) => m.name)
          );
        }
      }
      throw e;
    }
  }),
  list: procedure.query(({ ctx }) => {
    return ctx.prisma.element.findMany();
  }),
});
