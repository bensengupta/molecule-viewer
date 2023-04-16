import {
  AtomWithElement,
  PopulatedMolecule,
  type Bond as getBond,
} from '@/ts/types';
import { uniqueWith } from '@/utils/helpers';
import Color from 'color';
import { MathUtils, Vector3 } from 'three';

const DEFAULT_RADIUS = 40;

const scaleCoord = (x: number) => 100 * x + 500;
const scaleSize = (x: number) => 1.5 * x;

function getAtom(id: string, atom: AtomWithElement) {
  const [x, y] = [scaleCoord(atom.x), scaleCoord(atom.y)];
  const radius = scaleSize(atom.element?.radius ?? DEFAULT_RADIUS);
  const color = atom.element ? `url(#atom-${atom.element.code})` : 'purple';

  return [<circle key={`atom-${id}`} cx={x} cy={y} r={radius} fill={color} />];
}

function getBond(id: string, atom1: AtomWithElement, atom2: AtomWithElement) {
  const w = scaleSize(10);
  let A = new Vector3(
    scaleCoord(atom1.x),
    scaleCoord(atom1.y),
    scaleCoord(atom1.z)
  );
  let B = new Vector3(
    scaleCoord(atom2.x),
    scaleCoord(atom2.y),
    scaleCoord(atom2.z)
  );

  const vecAtoB = new Vector3().subVectors(B, A);
  const unitVecAtoB = vecAtoB.clone().normalize();
  const unitVecAtoB2D = vecAtoB.clone().setZ(0).normalize();

  function distanceBondCenterToEdge(atom: AtomWithElement) {
    // Multiplying the unit vector by the radius may result in some cases
    // where bond ends are sticking out of the atom sphere
    // The below formula will "tuck" the bond ends into the sphere a little
    // bit so that the ends are no longer visible
    // https://math.stackexchange.com/a/1391504
    const radius = scaleSize(atom.element?.radius ?? DEFAULT_RADIUS);
    return w <= radius ? Math.sqrt(radius ** 2 - w ** 2) : 0;
  }

  A.add(unitVecAtoB.clone().multiplyScalar(distanceBondCenterToEdge(atom1)));
  B.sub(unitVecAtoB.clone().multiplyScalar(distanceBondCenterToEdge(atom2)));

  const p1 = [A.x - w * unitVecAtoB2D.y, A.y + w * unitVecAtoB2D.x];
  const p2 = [A.x + w * unitVecAtoB2D.y, A.y - w * unitVecAtoB2D.x];
  const p3 = [B.x + w * unitVecAtoB2D.y, B.y - w * unitVecAtoB2D.x];
  const p4 = [B.x - w * unitVecAtoB2D.y, B.y + w * unitVecAtoB2D.x];

  const isDownwardsSlope = unitVecAtoB.x * unitVecAtoB.y > 0;
  const isGradientSwapped = p1[0] > p2[0];

  const grad1 = isGradientSwapped ? [...p2] : [...p1];
  const grad2 = isGradientSwapped ? [...p1] : [...p2];

  let colors = ['#454545', '#606060', '#454545', '#252525'];

  if (isDownwardsSlope) {
    colors = ['#252525', '#404040', '#252525', '#050505'];
    const mult = isGradientSwapped ? 1 : -1;
    grad2[0] -= 2 * w * unitVecAtoB2D.y * mult;
    grad2[1] += 2 * w * unitVecAtoB2D.x * mult;
  }

  if (B.z > A.z) {
    const temp = A;
    A = B;
    B = temp;
  }

  function pfmt(pt: number[]) {
    return `${pt[0].toFixed(2)},${pt[1].toFixed(2)}`;
  }

  const capGradientAngle =
    90 - MathUtils.RAD2DEG * Math.atan2(unitVecAtoB.y, unitVecAtoB.x);
  const capRotateAngle =
    MathUtils.RAD2DEG * Math.atan2(-unitVecAtoB.x, unitVecAtoB.y);

  return [
    <linearGradient
      key={`bond-gradient-${id}`}
      id={`bond-${id}`}
      x1={grad1[0]}
      y1={grad1[1]}
      x2={grad2[0]}
      y2={grad2[1]}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0%" stopColor={colors[0]} />
      <stop offset="25%" stopColor={colors[1]} />
      <stop offset="50%" stopColor={colors[2]} />
      <stop offset="100%" stopColor={colors[3]} />
    </linearGradient>,
    <linearGradient
      key={`cap-gradient-${id}`}
      id={`cap-${id}`}
      x1={grad1[0]}
      y1={grad1[1]}
      x2={grad2[0]}
      y2={grad2[1]}
      gradientUnits="userSpaceOnUse"
      gradientTransform={`rotate(${capGradientAngle}, ${B.x}, ${B.y})`}
    >
      <stop offset="0%" stopColor={colors[0]} />
      <stop offset="25%" stopColor={colors[1]} />
      <stop offset="50%" stopColor={colors[2]} />
      <stop offset="100%" stopColor={colors[3]} />
    </linearGradient>,
    <polygon
      key={`bond-${id}`}
      points={`${pfmt(p1)} ${pfmt(p2)} ${pfmt(p3)} ${pfmt(p4)}`}
      fill={`url(#bond-${id})`}
    />,
    <ellipse
      key={`cap-${id}`}
      cx={B.x}
      cy={B.y}
      rx={w}
      ry={w * Math.abs(unitVecAtoB.z)}
      transform={`rotate(${capRotateAngle}, ${B.x}, ${B.y})`}
      fill={`url(#cap-${id})`}
    />,
  ];
}

export function getMoleculeSVGPreview(
  molecule: PopulatedMolecule,
  size: number
) {
  const objects = [
    ...Object.entries(molecule.atoms).map(([id, atom]) => ({
      elem: getAtom(id, atom),
      z: atom.z + 0.00001,
    })),
    ...Object.entries(molecule.bonds).map(([id, bond]) => {
      const atom1 = molecule.atoms[bond.a1];
      const atom2 = molecule.atoms[bond.a2];
      return {
        elem: getBond(id, atom1, atom2),
        z: (atom1.z + atom2.z) / 2,
      };
    }),
  ];

  const uniqueElements = uniqueWith(
    Object.values(molecule.atoms)
      .filter(Boolean)
      .map((at) => at.element!),
    (a, b) => a.code === b.code
  );

  const radialGradients = uniqueElements.map((el) => (
    <radialGradient
      key={`atom-gradient-${el.code}`}
      id={`atom-${el.code}`}
      cx="-50%"
      cy="-50%"
      r="220%"
      fx="20%"
      fy="20%"
    >
      <stop
        offset="0%"
        stop-color={Color(el.color, 'hex').lighten(0.2).hex()}
      />
      <stop
        offset="50%"
        stop-color={Color(el.color, 'hex').darken(0.35).hex()}
      />
      <stop
        offset="100%"
        stop-color={Color(el.color, 'hex').darken(0.7).hex()}
      />
    </radialGradient>
  ));

  // ==============================================================
  // Calculate left, right, top, and bottom values for bounding box
  // ==============================================================

  const minmaxPts = Object.values(molecule.atoms).flatMap((at) => {
    const radius = scaleSize(at.element?.radius ?? DEFAULT_RADIUS);
    const [x, y] = [scaleCoord(at.x), scaleCoord(at.y)];
    return [
      [Math.floor(x - radius), Math.floor(y - radius)],
      [Math.ceil(x + radius), Math.ceil(y + radius)],
    ];
  });

  const BIG_NUMBER = 10000;
  let [left, right, top, bottom] = minmaxPts.reduce(
    (prev, cur) => [
      Math.min(prev[0], cur[0]),
      Math.max(prev[1], cur[0]),
      Math.min(prev[2], cur[1]),
      Math.max(prev[3], cur[1]),
    ],
    [BIG_NUMBER, -BIG_NUMBER, BIG_NUMBER, -BIG_NUMBER]
  );

  let width = right - left;
  let height = bottom - top;
  if (width > height) {
    top -= Math.ceil((width - height) / 2);
    height = width;
  } else {
    left -= Math.ceil((height - width) / 2);
    width = height;
  }

  return (
    <svg
      height={size}
      width={size}
      version="1.1"
      viewBox={`${left} ${top} ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {radialGradients}
      {objects.sort((a, b) => a.z - b.z).flatMap((o) => o.elem)}
    </svg>
  );
}
