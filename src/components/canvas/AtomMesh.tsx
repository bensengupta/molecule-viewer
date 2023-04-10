import type { AtomWithElement, Element } from '../../ts/types';
import SphereMesh from './SphereMesh';

export const UNKNOWN_ELEMENT: Element = {
  code: 'Unk',
  name: 'Unknown',
  color: '#000000',
  radius: 40,
};

// type PointerEvent = { stopPropagation: () => unknown };

// function useHover() {
//   const [isHover, setHover] = useState(false);

//   const onPointerOver = (ev: PointerEvent) => {
//     ev.stopPropagation();
//     setHover(true);
//   };
//   const onPointerOut = (ev: PointerEvent) => {
//     ev.stopPropagation();
//     setHover(false);
//   };

//   return { isHover, onPointerOver, onPointerOut };
// }

export default function AtomMesh({ element, x, y, z }: AtomWithElement) {
  const { radius, color } = element ?? UNKNOWN_ELEMENT;

  return <SphereMesh position={[x, y, z]} radius={radius} color={color} />;
}
