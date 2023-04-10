import { scaleToViewer } from '@/server/utils/sdf';
import type { Color, MeshProps } from '@react-three/fiber';

interface SphereMeshProps extends MeshProps {
  radius: number;
  color: Color;
}

export default function SphereMesh({
  radius,
  color,
  ...props
}: SphereMeshProps) {
  return (
    <mesh {...props}>
      <sphereGeometry args={[scaleToViewer(radius)]} />
      <meshPhongMaterial color={color} shininess={50} />
    </mesh>
  );
}
