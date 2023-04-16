import { prisma } from '@/server/db';
import { populateMolecule, prepopulateMoleculeArgs } from '@/server/utils/db';
import { getMoleculeSVGPreview } from '@/server/utils/preview';
import { clamp } from '@/utils/helpers';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

function notFoundResponse(width: number) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Not Found!
      </div>
    ),
    {
      width,
      height: width,
    }
  );
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  const width = clamp(
    parseInt(searchParams.get('width') ?? '800', 10),
    64,
    1000
  );

  if (!name) return notFoundResponse(width);

  const dbResult = await prisma.molecule.findFirst({
    ...prepopulateMoleculeArgs(),
    where: { name },
  });

  if (!dbResult) return notFoundResponse(width);

  const molecule = populateMolecule(dbResult);

  return new ImageResponse(getMoleculeSVGPreview(molecule, width), {
    width,
    height: width,
    headers: {
      'cache-control': 'max-age=60',
    },
  });
}
