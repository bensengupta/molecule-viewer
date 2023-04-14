import { Molecule, PopulatedMolecule } from '@/ts/types';
import { UNKNOWN_ELEMENT } from '@/utils/constants';
import { Prisma, PrismaClient } from '@prisma/client';
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

export async function createMolecule(prisma: PrismaClient, mol: Molecule) {
  const { id: moleculeId } = await prisma.molecule.create({
    data: { name: mol.name },
    select: { id: true },
  });

  for (const id in mol.atoms) {
    const { element, ...at } = mol.atoms[id];

    await prisma.atom.create({
      data: {
        ...at,
        id,
        molecule: {
          connect: { id: moleculeId },
        },
        element: {
          connectOrCreate: {
            where: { code: element },
            create: { ...UNKNOWN_ELEMENT, code: element },
          },
        },
      },
    });
  }

  for (const id in mol.bonds) {
    const { a1, a2, ...bo } = mol.bonds[id];

    await prisma.bond.create({
      data: {
        ...bo,
        id,
        molecule: {
          connect: { id: moleculeId },
        },
        atom1: {
          connect: { id: a1 },
        },
        atom2: {
          connect: { id: a2 },
        },
      },
    });
  }
}
