import type { SVGProps } from 'react';

export default function Circle({ color, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle
        cx="25"
        cy="25"
        r="23"
        fill={color}
        className="stroke-slate-600 stroke-2"
      />
    </svg>
  );
}
