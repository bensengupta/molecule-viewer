import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

function Header() {
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/molecules">Molecules</Link>
            </li>
            <li>
              <Link href="/elements">Elements</Link>
            </li>
          </ul>
        </div>
        <Link className="btn-ghost btn text-xl normal-case" href="/">
          Molecule Viewer
        </Link>
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/molecules">Molecules</Link>
            </li>
            <li>
              <Link href="/elements">Elements</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

interface LayoutProps {
  title: string;
  children: ReactNode;
  kind?: 'centered' | 'full';
  header?: boolean;
}

export default function Layout({
  title,
  children,
  kind = 'centered',
  header = true,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col">
        {header && <Header />}
        <main
          className={clsx(
            kind === 'centered' && 'mx-auto w-full max-w-5xl mt-4',
            'flex-shrink flex-grow'
          )}
        >
          {children}
        </main>
      </div>
    </>
  );
}
