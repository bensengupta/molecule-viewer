import { Element, PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

import crypto from 'crypto';
import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';

import { createMolecule } from '@/server/utils/db';
import { parseSDF } from '@/server/utils/sdf';

// From https://pubchem.ncbi.nlm.nih.gov/periodic-table
import json from './data/PubChemElements_all.json';

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  await prisma.molecule.deleteMany();
  await prisma.element.deleteMany();

  let elements: Element[] = json.Table.Row.map(({ Cell }) => {
    const code = Cell[1];
    const name = Cell[2];
    const color = `#${Cell[4] || '000000'}`;
    const radius = Math.floor(parseInt(Cell[7] || '100', 10) / 5);

    return { code, name, color, radius };
  });

  await prisma.element.createMany({ data: elements });

  const sdfFilenames = await glob(path.resolve(__dirname, 'data/*.sdf'));

  for (const sdfFilename of sdfFilenames) {
    const name = path.parse(sdfFilename).name;
    const file = await fs.readFile(sdfFilename, { encoding: 'utf-8' });

    const molecule = parseSDF(file, () => crypto.randomUUID(), name);

    await createMolecule(prisma, molecule);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
