export interface Element {
  code: string;
  name: string;
  color: string;
  radius: number;
}

export interface Atom {
  element: string;
  x: number;
  y: number;
  z: number;
}

export interface AtomWithElement {
  element: Element | null;
  x: number;
  y: number;
  z: number;
}

export interface Bond {
  a1: string;
  a2: string;
  epairs: number;
}

export interface Molecule {
  name: string;
  atoms: Record<string, Atom>;
  bonds: Record<string, Bond>;
}

export interface PopulatedMolecule {
  name: string;
  previewUrl: string;
  atoms: Record<string, AtomWithElement>;
  bonds: Record<string, Bond>;
}
