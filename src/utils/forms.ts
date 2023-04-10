import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, UseFormProps, useForm } from 'react-hook-form';
import type { ZodType, ZodTypeDef } from 'zod';

// From TRPC Kitchen Sink
// https://kitchen-sink.trpc.io/react-hook-form?file=feature%2Freact-hook-form%2Findex.tsx#content
export function useZodForm<
  T extends FieldValues,
  TSchema extends ZodType<T, ZodTypeDef, T> = ZodType<T, ZodTypeDef, T>
>(props: Omit<UseFormProps<T>, 'resolver'> & { schema: TSchema }) {
  const form = useForm<T>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
}
