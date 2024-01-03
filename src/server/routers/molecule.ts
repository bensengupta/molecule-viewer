import { MoleculeRenameSchema, MoleculeSchema } from '@/schemas/molecule';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import type { Molecule } from '../../ts/types';
import { unique } from '../../utils/helpers';
import {
    MoleculeAlreadyExistsError,
    MoleculeInvalidSDFError,
    MoleculeNotFoundError,
} from '../errors';
import { procedure, router } from '../trpc';
import {
    createMolecule,
    populateMolecule,
    prepopulateMoleculeArgs,
} from '../utils/db';
import { SDFParseError, parseSDF } from '../utils/sdf';

export const moleculeRouter = router({
  list: procedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.molecule.findMany(prepopulateMoleculeArgs());
    const molecules = res.map(populateMolecule);

    return molecules.map(({ name, previewUrl, atoms, bonds }) => ({
      name,
      previewUrl,
      numAtoms: Object.keys(atoms).length,
      numBonds: Object.keys(bonds).length,
      uniqueElements: unique(
        Object.values(atoms)
          .map((at) => at.element?.name)
          .filter(Boolean)
      ),
    }));
  }),
  getByName: procedure.input(z.string()).query(async ({ input, ctx }) => {
    const res = await ctx.prisma.molecule.findUnique({
      ...prepopulateMoleculeArgs(),
      where: { name: input },
    });

    if (!res) return null;

    return populateMolecule(res);
  }),
  add: procedure.input(MoleculeSchema).mutation(async ({ input, ctx }) => {
    let molecule: Molecule;

    try {
      molecule = parseSDF(input.fileContents, () => crypto.randomUUID(), input.name);
    } catch (err) {
      if (err instanceof SDFParseError) {
        throw new MoleculeInvalidSDFError(err);
      }
      throw err;
    }

    try {
      await createMolecule(ctx.prisma, molecule);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new MoleculeAlreadyExistsError(molecule.name);
      }
      console.log({ ...(e as Prisma.PrismaClientKnownRequestError) });
      throw e;
    }
  }),
  rename: procedure
    .input(MoleculeRenameSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.molecule.update({
          data: { name: input.to },
          where: { name: input.from },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2025') {
            throw new MoleculeNotFoundError(input.from);
          } else if (e.code === 'P2002') {
            throw new MoleculeAlreadyExistsError(input.to);
          }
        }
        throw e;
      }
    }),
  delete: procedure.input(z.string()).mutation(async ({ input, ctx }) => {
    try {
      await ctx.prisma.molecule.delete({
        where: { name: input },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new MoleculeNotFoundError(input);
      }
      throw e;
    }
  }),
});
