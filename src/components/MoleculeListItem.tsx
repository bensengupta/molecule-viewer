import { MoleculeListOutput } from '@/utils/trpc';
import Image from 'next/image';
import { ValuesType } from 'utility-types';

interface MoleculeListItemProps extends ValuesType<MoleculeListOutput> {
  onClick: () => unknown;
}

export default function MoleculeListItem({
  name,
  numAtoms,
  numBonds,
  previewUrl,
  onClick,
}: MoleculeListItemProps) {
  const atomLabel = numAtoms === 1 ? 'atom' : 'atoms';
  const bondLabel = numBonds === 1 ? 'bond' : 'bonds';

  return (
    <label
      htmlFor="molecule-view-modal"
      className="flex w-full cursor-pointer select-none flex-row items-center space-x-3 rounded-lg border border-base-300 bg-base-100 px-5 py-3 drop-shadow-sm transition hover:bg-base-200 sm:w-80"
      onClick={() => onClick()}
    >
      <Image
        src={previewUrl}
        alt="Molecule preview"
        width={64}
        height={64}
        quality={100}
      />
      <div className="overflow-hidden">
        <p className="overflow-hidden text-ellipsis font-medium">{name}</p>
        <p className="text-sm">
          {numAtoms} {atomLabel} • {numBonds} {bondLabel}
        </p>
      </div>
    </label>
  );
}
