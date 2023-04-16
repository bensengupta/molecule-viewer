import { Element, PrismaClient } from '@prisma/client/edge';

// From https://pubchem.ncbi.nlm.nih.gov/periodic-table
import json from './PubChemElements_all.json';

const prisma = new PrismaClient();

async function main() {
  let elements: Element[] = json.Table.Row.map(({ Cell }) => {
    const code = Cell[1];
    const name = Cell[2];
    const color = `#${Cell[4] || '000000'}`;
    const radius = Math.floor(parseInt(Cell[7] || '100', 10) / 5);

    return { code, name, color, radius };
  });

  await prisma.molecule.deleteMany();
  await prisma.element.deleteMany();
  await prisma.element.createMany({ data: elements });
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
