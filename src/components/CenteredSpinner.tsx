import Spinner from './Spinner';

export default function CenteredSpinner() {
  return (
    <div className="grid h-full w-full place-items-center">
      <Spinner size="lg" />
    </div>
  );
}
