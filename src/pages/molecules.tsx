import MoleculeCreateForm from '@/components/forms/MoleculeCreateForm';
import MoleculeViewForm from '@/components/forms/MoleculeViewForm';
import FuseSearchInput, { useFuseSearch } from '@/components/FuseSearch';
import Modal, { useModal } from '@/components/Modal';
import MoleculeListItem from '@/components/MoleculeListItem';
import Layout from '@/layouts/Layout';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';

export default function MoleculePage() {
  const query = trpc.molecule.list.useQuery();
  const molecules = query.data ?? [];

  const [molName, setMolName] = useState('');

  const createModal = useModal();
  const viewModal = useModal();
  const search = useFuseSearch(molecules, [
    { name: 'name', weight: 2 },
    'uniqueElements',
  ]);

  return (
    <Layout title="Molecules">
      <div className="space-y-3 p-4">
        <div className="flex flex-row items-center space-x-4">
          <h1 className="text-4xl font-semibold">Molecules</h1>

          <label className="btn-sm btn" htmlFor="molecule-create-modal">
            Add
          </label>
        </div>

        <FuseSearchInput search={search} className="w-full sm:max-w-md" />

        <div className="grid gap-3 sm:grid-cols-auto-fill">
          {search.results().map(({ item: mol }) => (
            <MoleculeListItem
              key={mol.name}
              onClick={() => setMolName(mol.name)}
              {...mol}
            />
          ))}
        </div>
      </div>

      <Modal id="molecule-create-modal" control={createModal}>
        <MoleculeCreateForm onDone={createModal.hide} />
      </Modal>
      <Modal id="molecule-view-modal" control={viewModal}>
        <MoleculeViewForm name={molName} onDone={viewModal.hide} />
      </Modal>
    </Layout>
  );
}
