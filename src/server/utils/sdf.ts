import type { Molecule } from '@/ts/types';

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
