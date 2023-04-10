import { MoleculeSchema } from '@/schemas/molecule';
import { AppError, handleFormTRPCErrors } from '@/utils/errors';
import { trpc } from '@/utils/trpc';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { useZodForm } from '../../utils/forms';
import FormError from './FormError';

interface MoleculeCreateFormProps {
  onDone: () => unknown;
}

export default function MoleculeCreateForm(props: MoleculeCreateFormProps) {
  const form = useZodForm<MoleculeSchema>({ schema: MoleculeSchema });

  const onDone = () => (form.clearErrors(), props.onDone());

  const utils = trpc.useContext();

  const onSuccess = () => {
    utils.molecule.list.invalidate();
    onDone();
  };
  const onError = (err: AppError) => handleFormTRPCErrors(err, form.setError);
  const moleculeAdd = trpc.molecule.add.useMutation({ onSuccess, onError });

  const onFormSubmit = (data: MoleculeSchema) => moleculeAdd.mutate(data);

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)}>
      <h3 className="text-lg font-bold">Add molecule</h3>
      <div className="form-control w-full max-w-xs">
        <label className="label">Name</label>
        <input
          type="text"
          className="input-bordered input w-full max-w-xs"
          {...form.register('name')}
        />
        <FormError error={form.formState.errors.name} />

        <label className="label">SDF File</label>
        <Controller
          control={form.control}
          name="fileContents"
          render={({ field: { value, ...field } }) => {
            return (
              <input
                {...field}
                type="file"
                className="file-input-bordered file-input w-full max-w-xs"
                onChange={async (evt) => {
                  const file = evt.target.files?.item(0);

                  if (!file) {
                    return field.onChange('');
                  }

                  // If file exceeds 2 MB
                  if (file.size > 1 * 1024 * 1024) {
                    return field.onChange('');
                  }

                  const text = await file.text();

                  const firstLine = text.split('\n')[0].trim();
                  if (firstLine && !form.getValues().name)
                    form.setValue('name', firstLine);

                  return field.onChange(text);
                }}
              />
            );
          }}
        />
        <FormError error={form.formState.errors.fileContents} />
      </div>
      <div className="modal-action">
        <button type="button" className="btn-outline btn" onClick={onDone}>
          Close
        </button>
        <button
          type="submit"
          className={clsx('btn', moleculeAdd.isLoading && 'loading')}
          disabled={moleculeAdd.isLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
