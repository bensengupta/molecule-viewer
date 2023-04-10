import { MoleculeNameSchema } from '@/schemas/molecule';
import { AppError, handleFormTRPCErrors } from '@/utils/errors';
import { trpc } from '@/utils/trpc';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect } from 'react';
import { z } from 'zod';
import { useZodForm } from '../../utils/forms';
import FormError from './FormError';

interface MoleculeViewFormProps {
  name: string;
  onDone: () => unknown;
}

export default function MoleculeViewForm({
  name: from,
  ...props
}: MoleculeViewFormProps) {
  const form = useZodForm({
    defaultValues: { name: from },
    schema: z.object({ name: MoleculeNameSchema }),
  });
  useEffect(() => {
    form.setValue('name', from);
  }, [from]);

  const onDone = () => (form.clearErrors(), props.onDone());

  const utils = trpc.useContext();

  const onSuccess = () => {
    utils.molecule.list.invalidate();
    onDone();
  };
  const onError = (err: AppError) => handleFormTRPCErrors(err, form.setError);
  const moleculeRename = trpc.molecule.rename.useMutation({
    onSuccess,
    onError,
  });
  const moleculeDelete = trpc.molecule.delete.useMutation({
    onSuccess,
    onError,
  });

  const onFormSubmit = ({ name: to }: { name: string }) =>
    moleculeRename.mutate({ from, to });

  const onDelete = () => moleculeDelete.mutate(from);

  const buttonsDisabled = moleculeRename.isLoading || moleculeDelete.isLoading;

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)}>
      <h3 className="text-lg font-bold">Molecule</h3>
      <div className="form-control w-full max-w-xs">
        <label className="label">Name</label>
        <input
          type="text"
          className="input-bordered input w-full max-w-xs"
          {...form.register('name')}
        />
        <FormError error={form.formState.errors.name} />

        <label className="label">Viewer</label>
        <Link className="btn" href={`/molecule/${from}`}>
          View Molecule
        </Link>
      </div>
      <div className="modal-action">
        <button
          type="button"
          onClick={onDelete}
          disabled={buttonsDisabled}
          className={clsx(
            'btn-outline btn-error btn',
            moleculeDelete.isLoading && 'loading'
          )}
        >
          Delete
        </button>
        <button type="button" className="btn-outline btn" onClick={onDone}>
          Close
        </button>
        <button
          type="submit"
          disabled={buttonsDisabled}
          className={clsx('btn', moleculeRename.isLoading && 'loading')}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
