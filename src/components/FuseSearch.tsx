import clsx from 'clsx';
import type Fuse from 'fuse.js';
import { HTMLProps, useRef, useState } from 'react';

export function useFuseSearch<T>(items: T[], keys: Fuse.FuseOptionKey<T>[]) {
  const [pattern, setPattern] = useState('');
  let fuse = useRef<Fuse<T> | null>(null);

  return {
    pattern,
    setPattern: async (newPattern: string) => {
      if (!fuse.current) {
        console.log('fuse init');
        const Fuse = (await import('fuse.js')).default;
        fuse.current = new Fuse(items, { keys });
      }
      setPattern(newPattern);
    },
    results: (): Fuse.FuseResult<T>[] => {
      return pattern === '' || !fuse.current
        ? items.map((item, refIndex) => ({ item, refIndex }))
        : fuse.current.search(pattern);
    },
  };
}

interface FuseSearchInputProps extends HTMLProps<HTMLInputElement> {
  search: ReturnType<typeof useFuseSearch>;
}

export default function FuseSearchInput({
  className,
  search,
  ...props
}: FuseSearchInputProps) {
  return (
    <input
      name="search"
      type="search"
      placeholder="Search"
      value={search.pattern}
      onChange={(e) => search.setPattern(e.target.value)}
      className={clsx('input-bordered input', className)}
      {...props}
    />
  );
}
