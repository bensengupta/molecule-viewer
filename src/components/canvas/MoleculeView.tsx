import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef } from 'react';
import { Group } from 'three';
import type { PopulatedMolecule } from '../../ts/types';
import AtomCanvas from './AtomCanvas';
import AtomMesh from './AtomMesh';
import BondMesh from './BondMesh';

interface MoleculeViewProps {
  molecule: PopulatedMolecule;
}

const ROTATION_MULTIPLIER = -0.4;

function MoleculeGroup({ molecule }: MoleculeViewProps) {
  const ref = useRef<Group>(null);

  const { spin } = useControls({
    name: { value: molecule.name, editable: false },
    spin: false,
  });

  useFrame((state, delta) => {
    if (spin) {
      ref.current!.rotation.y += ROTATION_MULTIPLIER * delta;
    }
  });

  return (
    <group ref={ref}>
      {Object.entries(molecule.atoms).map(([atomId, atom]) => (
        <AtomMesh
          key={'molecule_' + molecule.name + '_atom_' + atomId}
          {...atom}
        />
      ))}
      {Object.entries(molecule.bonds).map(([bondId, bond]) => (
        <BondMesh
          key={'molecule_' + molecule.name + '_bond_' + bondId}
          atom1={molecule.atoms[bond.a1]}
          atom2={molecule.atoms[bond.a2]}
        />
      ))}
    </group>
  );
}

export default function MoleculeView(props: MoleculeViewProps) {
  return (
    <AtomCanvas orbitControls>
      <MoleculeGroup {...props} />
    </AtomCanvas>
  );
}
