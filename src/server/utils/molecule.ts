import { PopulatedMolecule } from '@/ts/types';

const scaleCoord = (x: number) => 100 * x + 500;
const scaleSize = (x: number) => 1.5 * x;

export function generateSVGPreview(molecule: PopulatedMolecule) {
  const objects = [
    ...Object.values(molecule.atoms).map((atom) => {
      const [x, y] = [scaleCoord(atom.x), scaleCoord(atom.y)];
      const radius = scaleSize(atom.element?.radius ?? 40);
      const color = atom.element?.color ?? 'purple';

      return {
        str: `  <circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" />`,
        z: atom.z,
      };
    }),
    ...Object.values(molecule.bonds).map((bond) => {
      const atom1 = molecule.atoms[bond.a1];
      const atom2 = molecule.atoms[bond.a2];

      const w = scaleSize(10);
      const [x1, y1] = [scaleCoord(atom1.x), scaleCoord(atom1.y)];
      const [x2, y2] = [scaleCoord(atom2.x), scaleCoord(atom2.y)];

      const len = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
      const dx = (x2 - x1) / len;
      const dy = (y2 - y1) / len;

      const [a, b, c, d, e, f, g, h] = [
        x1 - w * dy,
        y1 + w * dx,
        x1 + w * dy,
        y1 - w * dx,
        x2 + w * dy,
        y2 - w * dx,
        x2 - w * dy,
        y2 + w * dx,
      ];

      return {
        str: `  <polygon points="${a},${b} ${c},${d} ${e},${f} ${g},${h}" fill="gray" />`,
        z: (atom1.z + atom2.z) / 2,
      };
    }),
  ];
  let res = '';
  res += `<svg version="1.1" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">\n`;
  res += objects
    .sort((a, b) => a.z - b.z)
    .map((o) => o.str)
    .join('\n');
  res += `</svg>`;

  return res;
}
