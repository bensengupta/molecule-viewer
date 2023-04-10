import { scaleToViewer } from '@/server/utils/sdf';
import { useMemo } from 'react';
import * as THREE from 'three';
import type { AtomWithElement } from '../../ts/types';

const BOND_RADIUS = scaleToViewer(10);
const BOND_COLOR = '#737373';

interface BondMeshProps {
  atom1: AtomWithElement;
  atom2: AtomWithElement;
}

export default function BondMesh({ atom1, atom2 }: BondMeshProps) {
  const pos1 = [atom1.x, atom1.y, atom1.z];
  const pos2 = [atom2.x, atom2.y, atom2.z];

  const { midpoint, rotation, length } = useMemo(() => {
    const pointA = new THREE.Vector3(...pos1);
    const pointB = new THREE.Vector3(...pos2);

    const vecAtoB = new THREE.Vector3().subVectors(pointB, pointA);
    const length = vecAtoB.length();
    // Unit vector
    const direction = vecAtoB.clone().normalize();
    const arrow = new THREE.ArrowHelper(direction, pointA);

    const midpoint = new THREE.Vector3().addVectors(
      pointA,
      vecAtoB.multiplyScalar(0.5)
    );
    const rotation = arrow.rotation.clone();

    return { midpoint, rotation, length };
  }, [pos1, pos2]);

  return (
    <mesh position={midpoint} rotation={rotation}>
      <cylinderGeometry args={[BOND_RADIUS, BOND_RADIUS, length]} />
      <meshStandardMaterial color={BOND_COLOR} />
    </mesh>
  );
}
