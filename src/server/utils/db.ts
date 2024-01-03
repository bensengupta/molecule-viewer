import { Molecule, PopulatedMolecule } from '@/ts/types';
import { UNKNOWN_ELEMENT } from '@/utils/constants';
import { unique } from '@/utils/helpers';
import { Prisma } from '@prisma/client';
import { PrismaClientType } from '../db';
import { getMoleculePreviewUrl } from './molecule';

export function prepopulateMoleculeArgs() {
  return {
    include: {
      atoms: { include: { element: true } },
      bonds: true,
    },
  };
}

export function populateMolecule(
  mol: Prisma.MoleculeGetPayload<ReturnType<typeof prepopulateMoleculeArgs>>
): PopulatedMolecule {
  return {
    name: mol.name,
    previewUrl: getMoleculePreviewUrl(mol.name),
    atoms: Object.fromEntries(
      mol.atoms.map((at) => [
        at.id,
        {
          ...at,
          x: at.x.toNumber(),
          y: at.y.toNumber(),
          z: at.z.toNumber(),
        },
      ])
    ),
    bonds: Object.fromEntries(mol.bonds.map((bo) => [bo.id, bo])),
  };
}

export async function createMolecule(prisma: PrismaClientType, mol: Molecule) {
  const uniqueElements = unique(
    Object.values(mol.atoms).map((at) => at.element)
  );

  for (const element of uniqueElements) {
    await prisma.element.upsert({
      where: { code: element },
      update: {},
      create: {
        ...UNKNOWN_ELEMENT,
        code: element,
      },
    });
  }

  const { id: moleculeId } = await prisma.molecule.create({
    data: {
      name: mol.name,
      atoms: {
        createMany: {
          data: Object.entries(mol.atoms).map(([id, { element, ...at }]) => ({
            ...at,
            id,
            elementCode: element,
          })),
        },
      },
      bonds: {
        createMany: {
          data: Object.entries(mol.bonds).map(([id, bo]) => ({
            ...bo,
            id,
          }))
        }
      }
    },
    select: { id: true },
  });
}
