import CenteredSpinner from '@/components/CenteredSpinner';
import Layout from '@/layouts/Layout';
import { trpc } from '@/utils/trpc';
import { Leva } from 'leva';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MoleculeView = dynamic(() => import('@/components/canvas/MoleculeView'), {
  loading: () => <CenteredSpinner />,
});

export default function MoleculePage() {
  const router = useRouter();
  const name = (router.query.name as string) || '';

  const query = trpc.molecule.getByName.useQuery(name, { enabled: false });

  useEffect(() => {
    if (name) {
      query.refetch();
    }
  }, [name]);

  return (
    <Layout title="Molecule viewer" kind="full">
      {!query.data ? (
        <CenteredSpinner />
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
