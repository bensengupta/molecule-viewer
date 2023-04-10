import ElementListItem from '@/components/ElementListItem';
import ElementForm from '@/components/forms/ElementForm';
import FuseSearchInput, { useFuseSearch } from '@/components/FuseSearch';
import Modal, { useModal } from '@/components/Modal';
import Layout from '@/layouts/Layout';
import type { Element } from '@/ts/types';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';

const EMPTY_ELEMENT: Element = {
  code: '',
  color: '#ffffff',
  name: '',
  radius: 40,
};

export default function ElementsPage() {
  const query = trpc.element.list.useQuery();
  const elements = query.data ?? [];
  const modal = useModal();

  // NOTE: useEffect may be needed here to make sure prop changes are reflected in useState!
  const [currentElement, setCurrentElement] = useState<number>(elements.length);

  const search = useFuseSearch(elements, [{ name: 'name', weight: 2 }, 'code']);

  return (
    <Layout title="Elements">
      <div className="space-y-3 p-4">
        <div className="flex flex-row items-center space-x-4">
          <h1 className="text-4xl font-semibold">Elements</h1>

          <label
            className="btn-sm btn"
            htmlFor="element-modal"
            onClick={() => setCurrentElement(elements.length)}
          >
            Add
          </label>
        </div>

        <FuseSearchInput search={search} className="w-full sm:max-w-md" />

        <div className="grid gap-3 sm:grid-cols-auto-fill">
          {search.results().map(({ item: el, refIndex: idx }) => (
            <ElementListItem
              key={el.code}
              onClick={() => setCurrentElement(idx)}
              {...el}
            />
          ))}
        </div>
      </div>

      <Modal id="element-modal" control={modal}>
        <ElementForm
          mode={currentElement === elements.length ? 'Create' : 'Edit'}
          element={elements[currentElement] ?? EMPTY_ELEMENT}
          onDone={modal.hide}
        />
      </Modal>
    </Layout>
  );
}
