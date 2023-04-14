import clsx from "clsx";
import { HTMLAttributes } from "react";

export default function Centered({ children, className }: HTMLAttributes<HTMLDivElement>) {
	return <div className={clsx("grid h-full w-full place-items-center", className)}>{children}</div>;
}

