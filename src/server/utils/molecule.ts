import { getBaseUrl } from '@/utils/trpc';

export function getMoleculePreviewUrl(name: string) {
  return `${getBaseUrl()}/api/molecule-preview/${encodeURIComponent(name)}`;
}
