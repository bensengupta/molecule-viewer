export function arrToObj<K extends string, T extends Record<K, string>>(
  arr: T[],
  key: K
) {
  return arr.reduce<Record<string, T>>(
    (acc, cur) => ((acc[cur[key]] = cur), acc),
    {}
  );
}

export function mapObj<
  T extends {},
  V extends T[keyof T],
  K,
  F extends (value: V) => K
>(obj: T, func: F) {
  return Object.fromEntries<K>(
    Object.entries<V>(obj).map(([key, value]) => [key, func(value)])
  );
}

export function uniqueWith<T>(arr: T[], fn: (a: T, b: T) => boolean) {
  return arr.filter(
    (element, index) => arr.findIndex((step) => fn(element, step)) === index
  );
}

export function unique<T>(arr: T[]) {
  return uniqueWith(arr, (a, b) => a === b);
}

export function commaList(strs: string[]) {
  if (strs.length === 0) return '';
  if (strs.length === 1) return strs[0];
  if (strs.length === 2) return strs[0] + ' and ' + strs[1];
  return strs.slice(0, -1).join(', ') + ', and ' + strs.at(-1);
}
