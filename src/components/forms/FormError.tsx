interface FormErrorProps {
  error?: { message?: string };
}

export default function FormError({ error }: FormErrorProps) {
  return error ? (
    <label className="label">
      <span className="text-xs leading-4 text-error">{error.message}</span>
    </label>
  ) : null;
}
