import type { Element } from '../ts/types';
import Circle from './Circle';

interface ElementListItemProps extends Element {
  onClick: () => unknown;
}

export default function ElementListItem({
  onClick,
  name,
  radius,
  color,
  code,
}: ElementListItemProps) {
  return (
    <label
      htmlFor="element-modal"
      className="flex w-full cursor-pointer select-none flex-row items-center rounded-lg border border-base-300 bg-base-100 px-5 py-3 drop-shadow-sm transition hover:bg-base-200 sm:w-80"
      onClick={() => onClick()}
    >
      <p className="w-16 text-3xl font-bold text-accent-content">{code}</p>
      <div>
        <p className="font-medium">{name}</p>
        <div className="flex flex-row space-x-1">
          <p className="text-sm">Radius: {radius} • Color:</p>
          <Circle color={color} className="w-3" />
          <p className="font-mono text-sm">{color.substring(1)}</p>
        </div>
      </div>
    </label>
  );
}
