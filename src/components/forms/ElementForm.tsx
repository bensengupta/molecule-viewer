import { AppError, handleFormTRPCErrors } from '@/utils/errors';
import { trpc } from '@/utils/trpc';
import clsx from 'clsx';
import { useEffect } from 'react';
import { ElementSchema } from '../../schemas/element';
import type { Element } from '../../ts/types';
import { useZodForm } from '../../utils/forms';
import FormError from './FormError';

interface ElementFormProps {
  mode: 'Create' | 'Edit';
  element: Element;
  onDone: () => unknown;
}

export default function ElementForm({
  mode,
  element,
  ...props
}: ElementFormProps) {
  const form = useZodForm({ defaultValues: element, schema: ElementSchema });
  useEffect(() => {
    form.setValue('code', element.code);
    form.setValue('name', element.name);
    form.setValue('color', element.color);
    form.setValue('radius', element.radius);
  }, [element]);

  const onDone = () => (form.clearErrors(), props.onDone());

  const utils = trpc.useContext();

  const onSuccess = () => {
    utils.element.list.invalidate();
    onDone();
  };
  const onError = (err: AppError) => handleFormTRPCErrors(err, form.setError);
  const elementCreate = trpc.element.create.useMutation({ onSuccess, onError });
  const elementUpdate = trpc.element.update.useMutation({ onSuccess, onError });
  const elementDelete = trpc.element.delete.useMutation({ onSuccess, onError });

  const onFormSubmit = (data: Element) => {
    if (mode === 'Create') {
      elementCreate.mutate(data);
    } else {
      elementUpdate.mutate(data);
    }
  };

  const buttonsDisabled =
    elementCreate.isLoading ||
    elementUpdate.isLoading ||
    elementDelete.isLoading;

  const onDelete = () => elementDelete.mutate(element.code);
  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)}>
      <h3 className="text-lg font-bold">{mode} element</h3>
      <div className="form-control w-full max-w-xs">
        <label className="label">Symbol</label>
        <input
          type="text"
          className="input-bordered input w-full max-w-xs"
          disabled={mode === 'Edit'}
          {...form.register('code')}
        />
        <FormError error={form.formState.errors.code} />

        <label className="label">Name</label>
        <input
          type="text"
          className="input-bordered input w-full max-w-xs"
          {...form.register('name')}
        />
        <FormError error={form.formState.errors.name} />

        <label className="label">Color</label>
        <input
          type="color"
          className="input-bordered input w-20"
          {...form.register('color')}
        />
        <FormError error={form.formState.errors.color} />

        <label className="label">Radius</label>
        <input
          type="number"
          step="1"
          className="input-bordered input w-full max-w-xs"
          {...form.register('radius', { valueAsNumber: true })}
        />
        <FormError error={form.formState.errors.radius} />
      </div>
      <div className="modal-action">
        {mode === 'Edit' && (
          <button
            type="button"
            onClick={onDelete}
            disabled={buttonsDisabled}
            className={clsx(
              'btn-outline btn-error btn',
              elementDelete.isLoading && 'loading'
            )}
          >
            Delete
          </button>
        )}
        <button className="btn-outline btn" type="button" onClick={onDone}>
          Close
        </button>
        <button
          className={clsx(
            'btn',
            (elementCreate.isLoading || elementUpdate.isLoading) && 'loading'
          )}
          type="submit"
          disabled={buttonsDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
