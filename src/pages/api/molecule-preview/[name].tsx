import { prisma } from '@/server/db';
import { populateMolecule } from '@/server/utils/db';
import { prepopulateMoleculeArgs } from '@/server/utils/db';
import { clamp } from '@/utils/helpers';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
	runtime: 'edge',
};

const scaleCoord = (x: number) => 100 * x + 500;
const scaleSize = (x: number) => 1.5 * x;

function notFoundResponse(width: number) {
	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 128,
					background: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					textAlign: 'center',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				Not Found!
			</div>
		),
		{
			width,
			height: width,
		},
	);
}

export default async function handler(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const name = searchParams.get('name')
	const width = clamp(parseInt(searchParams.get('width') ?? '800', 10), 64, 1000);

	if (!name) return notFoundResponse(width);

	const dbResult = await prisma.molecule.findFirst({ ...prepopulateMoleculeArgs(), where: { name } })

	if (!dbResult) return notFoundResponse(width);

	const molecule = populateMolecule(dbResult)

	const objects = [
		...Object.values(molecule.atoms).map((atom, idx) => {
			const [x, y] = [scaleCoord(atom.x), scaleCoord(atom.y)];
			const radius = scaleSize(atom.element?.radius ?? 40);
			const color = atom.element?.color ?? 'purple';

			return {
				elem: <circle key={`atom${idx}`} cx={x} cy={y} r={radius} fill={color} />,
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
				elem: <polygon key={bond.a1 + bond.a2} points={`${a},${b} ${c},${d} ${e},${f} ${g},${h}`} fill="gray" />,
				z: (atom1.z + atom2.z) / 2,
			};
		}),
	];

	return new ImageResponse(
		(
			<svg height={width} width={width} version="1.1" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
				{objects.sort((a, b) => a.z - b.z).map((o) => o.elem)}
			</svg>
		),
		{
			width,
			height: width,
			headers: {
				'cache-control': 'max-age=30'
			}
		},
	);
}