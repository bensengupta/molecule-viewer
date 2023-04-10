import { scaleToViewer } from '@/server/utils/sdf';
import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { ReactNode } from 'react';

interface AtomCanvasProps {
  children: ReactNode;
  orbitControls?: boolean;
}

export default function AtomCanvas({
  children,
  orbitControls = false,
}: AtomCanvasProps) {
  return (
    <Canvas camera={{ position: [0, 0, scaleToViewer(100)], fov: 45 }}>
      <Stage shadows={false}>{children}</Stage>
      {orbitControls && <OrbitControls makeDefault />}
    </Canvas>
  );
}
