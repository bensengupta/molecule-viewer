import type { Molecule } from '@/ts/types';

export const SDF_FILE1 = `31260
  -OEChem-05121014433D

 18 17  0     0  0  0  0  0  0999 V2000
   -2.6099    0.0328   -0.0725 O   0  0  0  0  0  0  0  0  0  0  0  0
    1.1403    0.0081    0.4518 C   0  0  0  0  0  0  0  0  0  0  0  0
   -0.3650    0.0457    0.7612 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.4838   -1.2781   -0.3034 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.5989    1.2211   -0.3587 C   0  0  0  0  0  0  0  0  0  0  0  0
   -1.2482   -0.0297   -0.4784 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.6802    0.0071    1.4070 H   0  0  0  0  0  0  0  0  0  0  0  0
   -0.6007    0.9598    1.3215 H   0  0  0  0  0  0  0  0  0  0  0  0
   -0.6250   -0.7807    1.4355 H   0  0  0  0  0  0  0  0  0  0  0  0
    2.5714   -1.3911   -0.3765 H   0  0  0  0  0  0  0  0  0  0  0  0
    1.0916   -1.2808   -1.3253 H   0  0  0  0  0  0  0  0  0  0  0  0
    1.0965   -2.1585    0.2201 H   0  0  0  0  0  0  0  0  0  0  0  0
    1.1726    1.2312   -1.3666 H   0  0  0  0  0  0  0  0  0  0  0  0
    2.6895    1.2184   -0.4637 H   0  0  0  0  0  0  0  0  0  0  0  0
    1.3153    2.1523    0.1425 H   0  0  0  0  0  0  0  0  0  0  0  0
   -1.0657    0.7969   -1.1702 H   0  0  0  0  0  0  0  0  0  0  0  0
   -1.1181   -0.9718   -1.0165 H   0  0  0  0  0  0  0  0  0  0  0  0
   -2.7448    0.8868    0.3728 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  6  1  0  0  0  0
  1 18  1  0  0  0  0
  2  3  1  0  0  0  0
  2  4  1  0  0  0  0
  2  5  1  0  0  0  0
  2  7  1  0  0  0  0
  3  6  1  0  0  0  0
  3  8  1  0  0  0  0
  3  9  1  0  0  0  0
  4 10  1  0  0  0  0
  4 11  1  0  0  0  0
  4 12  1  0  0  0  0
  5 13  1  0  0  0  0
  5 14  1  0  0  0  0
  5 15  1  0  0  0  0
  6 16  1  0  0  0  0
  6 17  1  0  0  0  0
M  END
> <PUBCHEM_COMPOUND_CID>
31260

> <PUBCHEM_CONFORMER_RMSD>
0.4

> <PUBCHEM_MMFF94_PARTIAL_CHARGES>
3
1 -0.68
18 0.4
6 0.28

> <PUBCHEM_EFFECTIVE_ROTOR_COUNT>
2

> <PUBCHEM_PHARMACOPHORE_FEATURES>
3
1 1 acceptor
1 1 donor
3 2 4 5 hydrophobe

> <PUBCHEM_HEAVY_ATOM_COUNT>
6

> <PUBCHEM_ATOM_DEF_STEREO_COUNT>
0

> <PUBCHEM_ATOM_UDEF_STEREO_COUNT>
0

> <PUBCHEM_BOND_DEF_STEREO_COUNT>
0

> <PUBCHEM_BOND_UDEF_STEREO_COUNT>
0

> <PUBCHEM_ISOTOPIC_ATOM_COUNT>
0

> <PUBCHEM_COMPONENT_COUNT>
1

> <PUBCHEM_CACTVS_TAUTO_COUNT>
1

> <PUBCHEM_CONFORMER_ID>
00007A1C00000001

> <PUBCHEM_MMFF94_ENERGY>
4.571

> <PUBCHEM_FEATURE_SELFOVERLAP>
-3

> <PUBCHEM_SHAPE_MULTIPOLES>
117.61
2.79
1.15
0.82
0.92
-0.05
-0.48
0.87
-0.63
0
-0.36
-0.1
3.31
-0.25

> <PUBCHEM_SHAPE_SELFOVERLAP>
202.432

> <PUBCHEM_SHAPE_VOLUME>
79.5

> <PUBCHEM_COORDINATE_TYPE>
2
5
255

$$$$
`;

export const SDF_FILE2 = `CT1001987571


 24 25  0  3  0               999 V2000
   -0.0171    1.4073    0.0098 C   0 00  0  0  0  0  0  0  0  0  0  0
    0.0021   -0.0041    0.0020 C   0 00  0  0  0  0  0  0  0  0  0  0
    1.1868    2.1007    0.0020 C   0 00  0  0  0  0  0  0  0  0  0  0
   -1.0133    2.3630    0.0190 N   0 00  0  0  0  0  0  0  0  0  0  0
    2.3717    1.3829   -0.0136 N   0 00  0  0  0  0  0  0  0  0  0  0
    0.8932    3.4034    0.0118 N   0 00  0  0  0  0  0  0  0  0  0  0
    1.1884   -0.6467   -0.0128 N   0 00  0  0  0  0  0  0  0  0  0  0
   -1.0401   -0.6344    0.0090 O   0  0  0  0  0  0  0  0  0  0  0  0
    2.3458    0.0368   -0.0214 C   0 00  0  0  0  0  0  0  0  0  0  0
    3.6549    2.0897   -0.0220 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.2155   -2.1115   -0.0209 C   0  0  0  0  0  0  0  0  0  0  0  0
    3.3959   -0.5761   -0.0355 O   0  0  0  0  0  0  0  0  0  0  0  0
   -0.4053    3.5654    0.0231 C   0 00  0  0  0  0  0  0  0  0  0  0
   -2.4574    2.1166    0.0226 C   0  0  0  0  0  0  0  0  0  0  0  0
    3.9831    2.2592    1.0035 H   0  0  0  0  0  0  0  0  0  0  0  0
    4.3975    1.4884   -0.5465 H   0  0  0  0  0  0  0  0  0  0  0  0
    3.5388    3.0475   -0.5293 H   0  0  0  0  0  0  0  0  0  0  0  0
    1.2124   -2.4692   -1.0505 H   0  0  0  0  0  0  0  0  0  0  0  0
    2.1169   -2.4610    0.4825 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.3373   -2.4940    0.4993 H   0  0  0  0  0  0  0  0  0  0  0  0
   -0.9129    4.5186    0.0303 H   0  0  0  0  0  0  0  0  0  0  0  0
   -2.8119    2.0494    1.0512 H   0  0  0  0  0  0  0  0  0  0  0  0
   -2.9671    2.9358   -0.4846 H   0  0  0  0  0  0  0  0  0  0  0  0
   -2.6677    1.1812   -0.4960 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2 01  0  1  0  0
  1  3 02  0  2  0  0
  1  4 01  0  1  0  0
  2  7 01  0  1  0  0
  2  8  2  0  0  0  0
  3  5 01  0  1  0  0
  3  6 01  0  1  0  0
  4 13 01  0  1  0  0
  4 14  1  0  0  0  0
  5  9 01  0  1  0  0
  5 10  1  0  0  0  0
  6 13 02  0  1  0  0
  7  9 01  0  1  0  0
  7 11  1  0  0  0  0
  9 12  2  0  0  0  0
 10 15  1  0  0  0  0
 10 16  1  0  0  0  0
 10 17  1  0  0  0  0
 11 18  1  0  0  0  0
 11 19  1  0  0  0  0
 11 20  1  0  0  0  0
 13 21  1  0  0  0  0
 14 22  1  0  0  0  0
 14 23  1  0  0  0  0
 14 24  1  0  0  0  0
M  END
$$$$
`;

export const scaleToViewer = (x: number) => x / 80;

function lineParts(line: string) {
  return line.trim().split(' ').filter(Boolean);
}

export class SDFParseError extends Error {
  constructor(msg: string, line: number) {
    super(`Invalid SDF file: at line ${line}: ${msg}`);
  }
}

function parseSDFInt(str: string, line: number) {
  if (/^\d+$/.test(str)) {
    return parseInt(str, 10);
  }
  throw new SDFParseError(`invalid integer "${str}"`, line);
}

function parseSDFFloat(str: string, line: number) {
  const val = parseFloat(str);
  if (isNaN(val)) {
    throw new SDFParseError(`invalid number "${str}"`, line);
  }
  return val;
}

function createId() {
  return crypto.randomUUID();
}

export function parseSDF(sdf: string, moleculeName?: string) {
  const lines = sdf.split('\n');

  let lineCounter = 0;

  // Not enough lines for file metadata
  if (lines.length < 4) {
    throw new SDFParseError('not enough lines', 0);
  }

  const name = moleculeName || lines[0].trim() || 'Undefined molecule';
  const countsLine = lineParts(lines[3]);

  lineCounter += 4;

  // Not enough numbers in counts line
  if (countsLine.length < 2) {
    throw new SDFParseError('invalid counts line', lineCounter);
  }

  const numAtoms = parseSDFInt(countsLine[0], lineCounter);
  const numBonds = parseSDFInt(countsLine[1], lineCounter);

  // Not enough lines for all atoms and bonds
  if (lines.length < 4 + numAtoms + numBonds) {
    throw new SDFParseError('not enough lines', lineCounter);
  }

  const mol: Molecule = { name, atoms: {}, bonds: {} };

  const atomIds: string[] = [];

  for (let i = 0; i < numAtoms; i++) {
    // Not enough lines for all atoms and bonds
    if (lineCounter >= lines.length) {
      throw new SDFParseError('not enough lines', lineCounter);
    }

    const atomId = createId();
    const atomLine = lineParts(lines[lineCounter]);

    // Not enough data on line
    if (atomLine.length < 4) {
      throw new SDFParseError('invalid atom line', lineCounter);
    }

    mol.atoms[atomId] = {
      x: parseSDFFloat(atomLine[0], lineCounter),
      y: parseSDFFloat(atomLine[1], lineCounter),
      z: parseSDFFloat(atomLine[2], lineCounter),
      element: atomLine[3],
    };
    atomIds.push(atomId);

    lineCounter++;
  }

  for (let i = 0; i < numBonds; i++) {
    // Not enough lines for all atoms and bonds
    if (lineCounter >= lines.length) {
      throw new SDFParseError('not enough lines', lineCounter);
    }

    const bondLine = lineParts(lines[lineCounter]);

    // Not enough data on line
    if (bondLine.length < 3) {
      throw new SDFParseError('invalid bond line', lineCounter);
    }

    const atom1Idx = parseSDFInt(bondLine[0], lineCounter) - 1;
    const atom2Idx = parseSDFInt(bondLine[1], lineCounter) - 1;

    if (atom1Idx >= atomIds.length || atom2Idx >= atomIds.length) {
      throw new SDFParseError('bond references invalid atom', lineCounter);
    }

    mol.bonds[createId()] = {
      a1: atomIds[atom1Idx],
      a2: atomIds[atom2Idx],
      epairs: parseSDFInt(bondLine[2], lineCounter),
    };
    lineCounter++;
  }

  return mol;
}
