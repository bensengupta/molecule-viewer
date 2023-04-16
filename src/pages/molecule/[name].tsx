import CenteredNotFound from '@/components/CenteredNotFound';
import CenteredSpinner from '@/components/CenteredSpinner';
import Layout from '@/layouts/Layout';
import { getMoleculePreviewUrl } from '@/server/utils/molecule';
import { trpc } from '@/utils/trpc';
import { Leva } from 'leva';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const MoleculeView = dynamic(() => import('@/components/canvas/MoleculeView'), {
  loading: () => <CenteredSpinner />,
  ssr: false,
});

export default function MoleculePage() {
  const router = useRouter();
  const name = (router.query.name as string) || '';

  const query = trpc.molecule.getByName.useQuery(name);

  return (
    <Layout
      kind="full"
      seo={{
        title: `${name} - Molecule Viewer`,
        description: `3D view of the molecule "${name}"`,
        openGraph: {
          images: [
            {
              url: `${getMoleculePreviewUrl(name)}?w=800`,
              height: 800,
              width: 800,
              alt: 'Molecule Preview',
            },
          ],
        },
      }}
    >
      {!query.data ? (
        query.isLoading ? (
          <CenteredSpinner />
        ) : (
          <CenteredNotFound />
        )
      ) : (
        <>
          <MoleculeView molecule={query.data} />
          <aside className="fixed right-4 top-20 z-50 w-72">
            <Leva fill />
          </aside>
        </>
      )}
    </Layout>
  );
}
