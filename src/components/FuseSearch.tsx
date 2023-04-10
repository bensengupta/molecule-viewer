import clsx from 'clsx';
import Fuse from 'fuse.js';
import { HTMLProps, useState } from 'react';

export function useFuseSearch<T>(items: T[], keys: Fuse.FuseOptionKey<T>[]) {
  const [pattern, setPattern] = useState('');
  const fuse = new Fuse<T>(items, { keys });

  return {
    pattern,
    setPattern,
    results: (): Fuse.FuseResult<T>[] => {
      if (pattern === '') {
        return items.map((item, refIndex) => ({ item, refIndex }));
      }
      return fuse.search(pattern).map((res) => res);
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
