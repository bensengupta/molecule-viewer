import { AppRouter } from '@/server/routers/_app';
import { TRPCClientError, TRPCClientErrorLike } from '@trpc/client';
import { FieldValues, UseFormSetError } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export type AppError = TRPCClientErrorLike<AppRouter>;

export function handleFormTRPCErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
) {
  if (error instanceof TRPCClientError) {
    if (error.data?.type === 'validation') {
      for (const key in error.data.fieldErrors) {
        const messages = error.data.fieldErrors[key];
        if (messages && messages.length > 0) {
          setError(key as any, { message: messages.join('. ') });
        }
      }
    } else {
      toast.error(error.message);
    }
  }
}
