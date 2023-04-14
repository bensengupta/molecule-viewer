import { ReactNode } from "react";

export default function Centered({ children }: { children: ReactNode }) {
	return <div className="grid h-full w-full place-items-center">{children}</div>;
}

